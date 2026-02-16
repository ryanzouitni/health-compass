import type { Express } from "express";
import { createServer, type Server } from "http";
import { assessmentSchema } from "../shared/schema";
import type { Assessment, AssessmentApiResponse, RiskFactor, LifestyleSuggestion, WarningSign, RiskLevel, UrgencyLevel, CarePathway, FacilityRecommendation } from "../shared/schema";
import { findNearestFacilities, findFacilitiesByRegion, type HealthcareFacility } from "../shared/facilities";

// Calculate BMI
function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Get BMI category
function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

// Get age group from age value and unit
type AgeGroup = "infant" | "child" | "adolescent" | "adult";

function getAgeGroup(ageValue: number, ageUnit: "years" | "months"): AgeGroup {
  const ageInMonths = ageUnit === "months" ? ageValue : ageValue * 12;
  if (ageInMonths <= 24) return "infant"; // 0-2 years (inclusive)
  if (ageInMonths <= 144) return "child"; // 2-12 years (inclusive)
  if (ageInMonths < 216) return "adolescent"; // 12-18 years
  return "adult"; // 18+ years
}

function getAgeInYears(ageValue: number, ageUnit: "years" | "months"): number {
  return ageUnit === "months" ? ageValue / 12 : ageValue;
}

function getRecommendedActionKey(urgency: UrgencyLevel): string {
  switch (urgency) {
    case "urgent": return "action.emergency";
    case "see_doctor_soon": return "action.soon";
    case "monitor": return "action.routine";
  }
}

function calculateRiskAssessment(data: Assessment): AssessmentApiResponse {
  // Get age info
  const ageGroup = getAgeGroup(data.ageValue, data.ageUnit);
  const ageInYears = getAgeInYears(data.ageValue, data.ageUnit);

  if (ageGroup === "infant" || ageGroup === "child") {
    const pedUrgencyFactors: RiskFactor[] = [];
    const pediatricRedFlags = [data.fruityBreath, data.lethargy, data.vomiting].filter(Boolean).length;
    const hasUrgentPediatricSymptoms = pediatricRedFlags >= 2;
    const pedUrgencyLevel: UrgencyLevel = hasUrgentPediatricSymptoms ? "urgent" : "monitor";

    if (hasUrgentPediatricSymptoms) {
      pedUrgencyFactors.push({
        id: "pediatricUrgent",
        nameKey: "factor.pediatricUrgent",
        explanationKey: "factor.pediatricUrgent.explanation",
        severity: "high",
      });
    }

    return {
      success: true,
      urgency: {
        level: pedUrgencyLevel,
        factors: pedUrgencyFactors,
        recommendedActionKey: getRecommendedActionKey(pedUrgencyLevel),
      },
      longTermRisk: {
        level: "low" as RiskLevel,
        diabetesRisk: "low" as RiskLevel,
        cardiovascularRisk: "low" as RiskLevel,
        score: 0,
        factors: [{
          id: "pediatricUnsupported",
          nameKey: "factor.pediatricUnsupported",
          explanationKey: "factor.pediatricUnsupported.explanation",
          severity: "low" as const,
        }],
        bmi: 0,
        bmiCategory: "normal",
      },
      lifestyleSuggestions: [],
      warningSigns: [
        { id: "chestPain", signKey: "warning.chestPain", actionKey: "warning.chestPain.action" },
        { id: "breathing", signKey: "warning.breathing", actionKey: "warning.breathing.action" },
      ],
      facilityRecommendations: undefined,
      meta: {
        isPediatricUnsupported: true,
        disclaimerKey: "disclaimer.notDiagnosis",
        locationProvided: false,
      },
    };
  }

  let diabetesScore = 0;
  let cardiovascularScore = 0;
  const contributingFactors: RiskFactor[] = [];

  // Calculate BMI
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);

  // Age factor (risk increases after 45)
  if (ageInYears >= 65) {
    diabetesScore += 3;
    cardiovascularScore += 4;
    contributingFactors.push({
      id: "age",
      nameKey: "factor.age",
      explanationKey: "factor.age.explanation",
      severity: "high",
    });
  } else if (ageInYears >= 55) {
    diabetesScore += 2;
    cardiovascularScore += 3;
    contributingFactors.push({
      id: "age",
      nameKey: "factor.age",
      explanationKey: "factor.age.explanation",
      severity: "medium",
    });
  } else if (ageInYears >= 45) {
    diabetesScore += 1;
    cardiovascularScore += 2;
    contributingFactors.push({
      id: "age",
      nameKey: "factor.age",
      explanationKey: "factor.age.explanation",
      severity: "low",
    });
  }

  const isPediatric = false;

  // BMI factor - only for adolescents and adults (pediatric BMI requires different assessment)
  if (!isPediatric) {
    if (bmi >= 35) {
      diabetesScore += 4;
      cardiovascularScore += 3;
      contributingFactors.push({
        id: "bmi",
        nameKey: "factor.bmi",
        explanationKey: "factor.bmi.explanation",
        severity: "high",
      });
    } else if (bmi >= 30) {
      diabetesScore += 3;
      cardiovascularScore += 2;
      contributingFactors.push({
        id: "bmi",
        nameKey: "factor.bmi",
        explanationKey: "factor.bmi.explanation",
        severity: "medium",
      });
    } else if (bmi >= 25) {
      diabetesScore += 1;
      cardiovascularScore += 1;
      contributingFactors.push({
        id: "bmi",
        nameKey: "factor.bmi",
        explanationKey: "factor.bmi.explanation",
        severity: "low",
      });
    }
  }

  // Waist circumference (if provided)
  if (data.waistCircumference) {
    const waistThreshold = data.gender === "male" ? 102 : 88;
    if (data.waistCircumference > waistThreshold) {
      diabetesScore += 2;
      cardiovascularScore += 2;
      contributingFactors.push({
        id: "waist",
        nameKey: "factor.waist",
        explanationKey: "factor.waist.explanation",
        severity: "medium",
      });
    }
  }

  // Family history - diabetes (only for non-pediatric; pediatric already scored above)
  if (!isPediatric && data.familyHistoryDiabetes) {
    diabetesScore += 3;
    contributingFactors.push({
      id: "familyDiabetes",
      nameKey: "factor.familyDiabetes",
      explanationKey: "factor.familyDiabetes.explanation",
      severity: "high",
    });
  }

  // Family history - heart disease
  if (!isPediatric && data.familyHistoryHeartDisease) {
    cardiovascularScore += 3;
    contributingFactors.push({
      id: "familyHeart",
      nameKey: "factor.familyHeart",
      explanationKey: "factor.familyHeart.explanation",
      severity: "high",
    });
  }

  // High blood pressure
  if (data.personalHistoryHighBloodPressure) {
    diabetesScore += 1;
    cardiovascularScore += 4;
    contributingFactors.push({
      id: "highBP",
      nameKey: "factor.highBP",
      explanationKey: "factor.highBP.explanation",
      severity: "high",
    });
  }

  // High cholesterol
  if (data.personalHistoryHighCholesterol) {
    cardiovascularScore += 3;
    contributingFactors.push({
      id: "highCholesterol",
      nameKey: "factor.highCholesterol",
      explanationKey: "factor.highCholesterol.explanation",
      severity: "medium",
    });
  }

  // Previous gestational diabetes
  if (data.previousGestationalDiabetes) {
    diabetesScore += 3;
    contributingFactors.push({
      id: "gestationalDiabetes",
      nameKey: "factor.gestationalDiabetes",
      explanationKey: "factor.gestationalDiabetes.explanation",
      severity: "medium",
    });
  }

  // Physical activity
  if (data.physicalActivityLevel === "sedentary") {
    diabetesScore += 2;
    cardiovascularScore += 2;
    contributingFactors.push({
      id: "sedentary",
      nameKey: "factor.sedentary",
      explanationKey: "factor.sedentary.explanation",
      severity: "medium",
    });
  } else if (data.physicalActivityLevel === "light") {
    diabetesScore += 1;
    cardiovascularScore += 1;
    contributingFactors.push({
      id: "sedentary",
      nameKey: "factor.sedentary",
      explanationKey: "factor.sedentary.explanation",
      severity: "low",
    });
  }

  // Smoking
  if (data.smokingStatus === "current") {
    diabetesScore += 1;
    cardiovascularScore += 4;
    contributingFactors.push({
      id: "smoking",
      nameKey: "factor.smoking",
      explanationKey: "factor.smoking.explanation",
      severity: "high",
    });
  } else if (data.smokingStatus === "former") {
    cardiovascularScore += 1;
    contributingFactors.push({
      id: "smoking",
      nameKey: "factor.smoking",
      explanationKey: "factor.smoking.explanation",
      severity: "low",
    });
  }

  // Diet quality
  if (data.dietQuality === "poor") {
    diabetesScore += 2;
    cardiovascularScore += 2;
    contributingFactors.push({
      id: "diet",
      nameKey: "factor.diet",
      explanationKey: "factor.diet.explanation",
      severity: "medium",
    });
  } else if (data.dietQuality === "fair") {
    diabetesScore += 1;
    cardiovascularScore += 1;
    contributingFactors.push({
      id: "diet",
      nameKey: "factor.diet",
      explanationKey: "factor.diet.explanation",
      severity: "low",
    });
  }

  // Sleep
  if (data.sleepHours && (data.sleepHours < 6 || data.sleepHours > 9)) {
    diabetesScore += 1;
    cardiovascularScore += 1;
    contributingFactors.push({
      id: "sleep",
      nameKey: "factor.sleep",
      explanationKey: "factor.sleep.explanation",
      severity: "low",
    });
  }

  // Stress
  if (data.stressLevel === "very_high") {
    cardiovascularScore += 2;
    contributingFactors.push({
      id: "stress",
      nameKey: "factor.stress",
      explanationKey: "factor.stress.explanation",
      severity: "medium",
    });
  } else if (data.stressLevel === "high") {
    cardiovascularScore += 1;
    contributingFactors.push({
      id: "stress",
      nameKey: "factor.stress",
      explanationKey: "factor.stress.explanation",
      severity: "low",
    });
  }

  // Symptoms - expanded list
  const diabetesSymptomCount = [
    data.frequentThirst,
    data.frequentUrination,
    data.unexplainedWeightChange,
    data.fatigue,
    data.blurredVision,
    data.slowHealingWounds,
    data.numbnessTingling,
    data.frequentHunger,
    data.dryMouth,
    data.itchySkin,
    data.skinChanges,
  ].filter(Boolean).length;
  
  // Additional symptoms that contribute to overall health concern
  const additionalSymptomCount = [
    data.dizziness,
    data.muscleCramps,
    data.headaches,
    data.nausea,
    data.excessiveSweating,
  ].filter(Boolean).length;

  const cardioSymptomCount = [
    data.chestPain,
    data.shortnessOfBreath,
    data.irregularHeartbeat,
    data.swollenFeetAnkles,
  ].filter(Boolean).length;
  
  // Pediatric-specific urgent symptoms (DKA warning signs)
  const pediatricUrgentSymptoms = [
    data.fruityBreath,
    data.lethargy,
    data.vomiting,
  ].filter(Boolean).length;
  
  // Custom symptoms contribute to risk if present
  const hasCustomSymptoms = data.customSymptoms && data.customSymptoms.trim().length > 0;
  
  
  // Combined symptom count for scoring (skip for pediatric - already scored above)
  const symptomCount = diabetesSymptomCount;

  if (!isPediatric) {
    if (symptomCount >= 3) {
      diabetesScore += 4;
      contributingFactors.push({
        id: "symptoms",
        nameKey: "factor.symptoms",
        explanationKey: "factor.symptoms.explanation",
        severity: "high",
      });
    } else if (symptomCount >= 2) {
      diabetesScore += 2;
      contributingFactors.push({
        id: "symptoms",
        nameKey: "factor.symptoms",
        explanationKey: "factor.symptoms.explanation",
        severity: "medium",
      });
    } else if (symptomCount >= 1) {
      diabetesScore += 1;
      contributingFactors.push({
        id: "symptoms",
        nameKey: "factor.symptoms",
        explanationKey: "factor.symptoms.explanation",
        severity: "low",
      });
    }
  }

  if (cardioSymptomCount >= 3) {
    cardiovascularScore += 6;
    contributingFactors.push({
      id: "cardioSymptoms",
      nameKey: "factor.cardioSymptoms",
      explanationKey: "factor.cardioSymptoms.explanation",
      severity: "high",
    });
  } else if (cardioSymptomCount >= 2) {
    cardiovascularScore += 5;
  } else if (cardioSymptomCount >= 1) {
    cardiovascularScore += 3;
  }
  
  // Additional symptoms add minor risk
  if (additionalSymptomCount >= 3) {
    diabetesScore += 1;
    cardiovascularScore += 1;
    contributingFactors.push({
      id: "multipleAdditionalSymptoms",
      nameKey: "factor.multipleAdditionalSymptoms",
      explanationKey: "factor.multipleAdditionalSymptoms.explanation",
      severity: "low",
    });
  }
  
  // Custom symptoms add to risk if present (person is concerned enough to report them)
  if (hasCustomSymptoms) {
    diabetesScore += 1;
    cardiovascularScore += 1;
    contributingFactors.push({
      id: "customSymptoms",
      nameKey: "factor.customSymptoms",
      explanationKey: "factor.customSymptoms.explanation",
      severity: "medium",
    });
  }
  
  // Pediatric urgent symptoms (potential DKA) - critical
  if (pediatricUrgentSymptoms >= 2) {
    diabetesScore += 4;
    contributingFactors.push({
      id: "pediatricUrgent",
      nameKey: "factor.pediatricUrgent",
      explanationKey: "factor.pediatricUrgent.explanation",
      severity: "high",
    });
  } else if (pediatricUrgentSymptoms >= 1) {
    diabetesScore += 2;
  }

  // Determine risk levels
  const getDiabetesRisk = (score: number): RiskLevel => {
    if (score >= 8) return "high";
    if (score >= 4) return "moderate";
    return "low";
  };

  const getCardiovascularRisk = (score: number): RiskLevel => {
    if (score >= 10) return "high";
    if (score >= 5) return "moderate";
    return "low";
  };

  // Determine urgency FIRST - this affects risk levels
  let urgency: UrgencyLevel = "monitor";
  let hasUrgentCardioSymptoms = false;
  let hasPediatricUrgentSymptoms = false;
  
  // Check for urgent conditions based on explicit checkbox selections only
  if (data.chestPain || data.shortnessOfBreath || data.irregularHeartbeat) {
    urgency = "urgent";
    hasUrgentCardioSymptoms = true;
    // Add contributing factor for urgent cardiovascular symptoms
    contributingFactors.push({
      id: "urgentCardio",
      nameKey: "factor.urgentCardio",
      explanationKey: "factor.urgentCardio.explanation",
      severity: "high",
    });
  }
  
  if (pediatricUrgentSymptoms >= 2) {
    urgency = "urgent";
    hasPediatricUrgentSymptoms = true;
  }
  
  // Calculate base risk levels
  let diabetesRisk = getDiabetesRisk(diabetesScore);
  let cardiovascularRisk = getCardiovascularRisk(cardiovascularScore);
  
  // IMPORTANT: When urgent symptoms are present, risk levels must be at least moderate
  // to avoid contradictory messaging (low risk but urgent action)
  if (hasUrgentCardioSymptoms) {
    // Chest pain, shortness of breath, or irregular heartbeat = at least moderate cardio risk
    if (cardiovascularRisk === "low") {
      cardiovascularRisk = "moderate";
    }
  }
  
  if (hasPediatricUrgentSymptoms) {
    // Pediatric DKA signs = at least moderate diabetes risk
    if (diabetesRisk === "low") {
      diabetesRisk = "moderate";
    }
  }
  
  // Overall risk is the higher of the two
  const overallRisk: RiskLevel = 
    diabetesRisk === "high" || cardiovascularRisk === "high" ? "high" :
    diabetesRisk === "moderate" || cardiovascularRisk === "moderate" ? "moderate" : "low";

  // Set remaining urgency levels based on overall risk
  if (urgency !== "urgent") {
    if (overallRisk === "high" || symptomCount >= 3 || cardioSymptomCount >= 2) {
      urgency = "see_doctor_soon";
    } else if (overallRisk === "moderate" || hasCustomSymptoms) {
      urgency = "see_doctor_soon";
    }
  }

  // Generate lifestyle suggestions based on risk factors
  const lifestyleSuggestions: LifestyleSuggestion[] = [];

  if (data.physicalActivityLevel === "sedentary" || data.physicalActivityLevel === "light") {
    lifestyleSuggestions.push({
      id: "exercise",
      titleKey: "lifestyle.exercise.title",
      descriptionKey: "lifestyle.exercise.desc",
      icon: "exercise",
    });
  }

  if (data.dietQuality === "poor" || data.dietQuality === "fair") {
    lifestyleSuggestions.push({
      id: "diet",
      titleKey: "lifestyle.diet.title",
      descriptionKey: "lifestyle.diet.desc",
      icon: "diet",
    });
  }

  if (bmi >= 25) {
    lifestyleSuggestions.push({
      id: "weight",
      titleKey: "lifestyle.weight.title",
      descriptionKey: "lifestyle.weight.desc",
      icon: "weight",
    });
  }

  if (data.smokingStatus === "current") {
    lifestyleSuggestions.push({
      id: "smoking",
      titleKey: "lifestyle.smoking.title",
      descriptionKey: "lifestyle.smoking.desc",
      icon: "smoking",
    });
  }

  if (data.sleepHours && (data.sleepHours < 7 || data.sleepHours > 8)) {
    lifestyleSuggestions.push({
      id: "sleep",
      titleKey: "lifestyle.sleep.title",
      descriptionKey: "lifestyle.sleep.desc",
      icon: "sleep",
    });
  }

  if (data.stressLevel === "high" || data.stressLevel === "very_high") {
    lifestyleSuggestions.push({
      id: "stress",
      titleKey: "lifestyle.stress.title",
      descriptionKey: "lifestyle.stress.desc",
      icon: "stress",
    });
  }

  // Always include checkups and hydration
  lifestyleSuggestions.push({
    id: "checkups",
    titleKey: "lifestyle.checkups.title",
    descriptionKey: "lifestyle.checkups.desc",
    icon: "checkups",
  });

  lifestyleSuggestions.push({
    id: "water",
    titleKey: "lifestyle.water.title",
    descriptionKey: "lifestyle.water.desc",
    icon: "water",
  });

  // Warning signs
  const warningSigns: WarningSign[] = [
    { id: "chestPain", signKey: "warning.chestPain", actionKey: "warning.chestPain.action" },
    { id: "breathing", signKey: "warning.breathing", actionKey: "warning.breathing.action" },
    { id: "thirst", signKey: "warning.thirst", actionKey: "warning.thirst.action" },
    { id: "vision", signKey: "warning.vision", actionKey: "warning.vision.action" },
    { id: "numbness", signKey: "warning.numbness", actionKey: "warning.numbness.action" },
    { id: "wounds", signKey: "warning.wounds", actionKey: "warning.wounds.action" },
  ];

  // Determine if location was provided
  const locationProvided = !!(data.locationAccess && 
    (data.locationAccess.locationMethod === "gps" || data.locationAccess.locationMethod === "manual"));

  // Generate care pathway based on urgency and access barriers
  let carePathway: CarePathway | undefined;
  let recommendedFacilities: FacilityRecommendation[] | undefined;

  if (data.locationAccess) {
    const isRural = data.locationAccess.settingType === "rural";
    const hasHighAccessBarrier = 
      data.locationAccess.distanceToClinic === "more_50km" ||
      data.locationAccess.distanceToClinic === "20_50km" ||
      data.locationAccess.transportDifficulty === "difficult" ||
      data.locationAccess.costBarrier === "high";

    // Generate care pathway recommendations
    let whereToGoKey = "pathway.where.routine";
    let whenToGoKey = "pathway.when.routine";
    let additionalGuidanceKey: string | undefined;

    if (urgency === "urgent") {
      whereToGoKey = "pathway.where.emergency";
      whenToGoKey = "pathway.when.now";
      if (isRural || hasHighAccessBarrier) {
        additionalGuidanceKey = "pathway.urgent.rural";
      }
    } else if (urgency === "see_doctor_soon") {
      whereToGoKey = overallRisk === "high" ? "pathway.where.hospital" : "pathway.where.healthCenter";
      whenToGoKey = "pathway.when.fewDays";
      if (isRural || hasHighAccessBarrier) {
        additionalGuidanceKey = "pathway.soon.rural";
      }
    } else {
      whereToGoKey = "pathway.where.clinic";
      whenToGoKey = "pathway.when.twoWeeks";
      if (isRural || hasHighAccessBarrier) {
        additionalGuidanceKey = "pathway.monitor.rural";
      }
    }

    carePathway = {
      whereToGoKey,
      whenToGoKey,
      additionalGuidanceKey,
      isRural,
      hasHighAccessBarrier,
    };

    // Find recommended facilities based on location
    let nearbyFacilities: (HealthcareFacility & { distance?: number })[] = [];

    // Facility filtering based on urgency
    const needsEmergency = urgency === "urgent";

    if (data.locationAccess.latitude && data.locationAccess.longitude) {
      nearbyFacilities = findNearestFacilities(
        data.locationAccess.latitude,
        data.locationAccess.longitude,
        { hasEmergency: needsEmergency || undefined, limit: 3 }
      );
    } else if (data.locationAccess.region || data.locationAccess.province || data.locationAccess.city) {
      const searchTerm = data.locationAccess.region || data.locationAccess.province || data.locationAccess.city || "";
      nearbyFacilities = findFacilitiesByRegion(searchTerm, {
        hasEmergency: needsEmergency || undefined,
        limit: 3,
      });
    }

    // Filter by facility type based on urgency
    if (urgency === "urgent") {
      nearbyFacilities = nearbyFacilities.filter(f => f.type === "hospital" || f.type === "emergency");
    }

    if (nearbyFacilities.length > 0) {
      recommendedFacilities = nearbyFacilities.map((facility) => {
        const lat = facility.latitude;
        const lng = facility.longitude;
        const mapsUrl = lat && lng 
          ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.name + " " + facility.city)}`;

        return {
          facilityId: facility.id,
          name: facility.name,
          type: facility.type,
          distance: "distance" in facility ? facility.distance : undefined,
          phone: facility.phone,
          email: facility.email,
          mapsUrl,
        };
      });
    }
  }

  const urgencyFactorIds = ["urgentCardio", "cardioSymptoms", "pediatricUrgent", "symptoms", "customSymptoms", "multipleAdditionalSymptoms"];
  const urgencyFactors = contributingFactors.filter(f => urgencyFactorIds.includes(f.id));
  const riskFactors = contributingFactors.filter(f => !urgencyFactorIds.includes(f.id));

  const overallScore = Math.max(diabetesScore, cardiovascularScore);

  return {
    success: true,
    urgency: {
      level: urgency,
      factors: urgencyFactors,
      recommendedActionKey: getRecommendedActionKey(urgency),
    },
    longTermRisk: {
      level: overallRisk,
      diabetesRisk,
      cardiovascularRisk,
      score: overallScore,
      factors: riskFactors,
      bmi,
      bmiCategory,
    },
    lifestyleSuggestions,
    warningSigns,
    carePathway,
    facilityRecommendations: recommendedFacilities,
    meta: {
      isPediatricUnsupported: false,
      disclaimerKey: "disclaimer.notDiagnosis",
      locationProvided,
      facilityNoteKey: recommendedFacilities && recommendedFacilities.length > 0
        ? "facility.callFirstHoursMayVary"
        : undefined,
    },
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/assess", (req, res) => {
    try {
      const validationResult = assessmentSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        console.info("Assessment validation failed", { route: "/api/assess", errorCount: validationResult.error.errors.length });
        return res.status(400).json({
          success: false,
          error: "Invalid assessment data",
          details: validationResult.error.errors,
        });
      }

      console.info("Assessment request", { route: "/api/assess" });
      const assessmentData = validationResult.data;
      const response = calculateRiskAssessment(assessmentData);

      res.json(response);
    } catch (error) {
      console.error("Assessment processing error");
      res.status(500).json({
        success: false,
        error: "Failed to process assessment",
      });
    }
  });

  return httpServer;
}
