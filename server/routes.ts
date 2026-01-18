import type { Express } from "express";
import { createServer, type Server } from "http";
import { assessmentSchema } from "../shared/schema";
import type { Assessment, RiskResult, RiskFactor, LifestyleSuggestion, WarningSign, RiskLevel, UrgencyLevel, CarePathway, FacilityRecommendation } from "../shared/schema";
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

// Calculate risk scores based on assessment data
function calculateRiskAssessment(data: Assessment): RiskResult {
  let diabetesScore = 0;
  let cardiovascularScore = 0;
  const contributingFactors: RiskFactor[] = [];

  // Calculate BMI
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = getBMICategory(bmi);
  
  // Get age info
  const ageGroup = getAgeGroup(data.ageValue, data.ageUnit);
  const ageInYears = getAgeInYears(data.ageValue, data.ageUnit);

  // Age-appropriate risk assessment
  if (ageGroup === "infant" || ageGroup === "child") {
    // Pediatric assessment - different risk factors
    // Focus on Type 1 diabetes warning signs and growth concerns
    
    // Pediatric symptoms - use same fields as form
    if (data.frequentThirst) {
      diabetesScore += 3;
      contributingFactors.push({
        id: "thirst",
        nameKey: "factor.thirst",
        explanationKey: "factor.thirst.explanation",
        severity: "high",
      });
    }
    
    if (data.frequentUrination) {
      diabetesScore += 3;
      contributingFactors.push({
        id: "urination",
        nameKey: "factor.urination",
        explanationKey: "factor.urination.explanation",
        severity: "high",
      });
    }
    
    if (data.unexplainedWeightChange) {
      diabetesScore += 3;
      contributingFactors.push({
        id: "weightChange",
        nameKey: "factor.weightChange",
        explanationKey: "factor.weightChange.explanation",
        severity: "high",
      });
    }
    
    if (data.frequentInfections) {
      diabetesScore += 2;
      contributingFactors.push({
        id: "infections",
        nameKey: "factor.infections",
        explanationKey: "factor.infections.explanation",
        severity: "medium",
      });
    }
    
    if (data.growthConcerns) {
      diabetesScore += 1;
      contributingFactors.push({
        id: "growth",
        nameKey: "factor.growth",
        explanationKey: "factor.growth.explanation",
        severity: "medium",
      });
    }
    
    // Infant-specific
    if (ageGroup === "infant") {
      if (data.irritability) {
        diabetesScore += 2;
        contributingFactors.push({
          id: "irritability",
          nameKey: "factor.irritability",
          explanationKey: "factor.irritability.explanation",
          severity: "medium",
        });
      }
      
      if (data.poorFeeding) {
        diabetesScore += 2;
        contributingFactors.push({
          id: "poorFeeding",
          nameKey: "factor.poorFeeding",
          explanationKey: "factor.poorFeeding.explanation",
          severity: "medium",
        });
      }
      
      if (data.wetDiapers === "increased") {
        diabetesScore += 2;
        contributingFactors.push({
          id: "wetDiapers",
          nameKey: "factor.wetDiapers",
          explanationKey: "factor.wetDiapers.explanation",
          severity: "medium",
        });
      }
    }
    
    // Family history still relevant for pediatric
    if (data.familyHistoryDiabetes) {
      diabetesScore += 2;
      contributingFactors.push({
        id: "family",
        nameKey: "factor.familyDiabetes",
        explanationKey: "factor.familyDiabetes.explanation",
        severity: "medium",
      });
    }
    
  } else {
    // Adult/adolescent risk assessment (original logic)
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
  } // End of adult/adolescent risk assessment

  // BMI factor - only for adolescents and adults (pediatric BMI requires different assessment)
  if (ageGroup === "adolescent" || ageGroup === "adult") {
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

  // Family history - diabetes
  if (data.familyHistoryDiabetes) {
    diabetesScore += 3;
    contributingFactors.push({
      id: "familyDiabetes",
      nameKey: "factor.familyDiabetes",
      explanationKey: "factor.familyDiabetes.explanation",
      severity: "high",
    });
  }

  // Family history - heart disease
  if (data.familyHistoryHeartDisease) {
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
      id: "gestational",
      nameKey: "factor.familyDiabetes",
      explanationKey: "factor.familyDiabetes.explanation",
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
  if (data.sleepHours < 6 || data.sleepHours > 9) {
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

  // Symptoms
  const symptomCount = [
    data.frequentThirst,
    data.frequentUrination,
    data.unexplainedWeightChange,
    data.fatigue,
    data.blurredVision,
    data.slowHealingWounds,
  ].filter(Boolean).length;

  const cardioSymptomCount = [
    data.chestPain,
    data.shortnessOfBreath,
  ].filter(Boolean).length;

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

  if (cardioSymptomCount >= 2) {
    cardiovascularScore += 5;
  } else if (cardioSymptomCount >= 1) {
    cardiovascularScore += 3;
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

  const diabetesRisk = getDiabetesRisk(diabetesScore);
  const cardiovascularRisk = getCardiovascularRisk(cardiovascularScore);

  // Overall risk is the higher of the two
  const overallRisk: RiskLevel = 
    diabetesRisk === "high" || cardiovascularRisk === "high" ? "high" :
    diabetesRisk === "moderate" || cardiovascularRisk === "moderate" ? "moderate" : "low";

  // Determine urgency
  let urgency: UrgencyLevel = "monitor";
  
  if (data.chestPain || data.shortnessOfBreath) {
    urgency = "urgent";
  } else if (overallRisk === "high" || symptomCount >= 3) {
    urgency = "see_doctor_soon";
  } else if (overallRisk === "moderate") {
    urgency = "see_doctor_soon";
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

  if (data.sleepHours < 7 || data.sleepHours > 8) {
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

    if (data.locationAccess.latitude && data.locationAccess.longitude) {
      // Use GPS coordinates to find nearest facilities
      const facilityType = urgency === "urgent" ? undefined : undefined;
      const needsEmergency = urgency === "urgent";
      
      nearbyFacilities = findNearestFacilities(
        data.locationAccess.latitude,
        data.locationAccess.longitude,
        { hasEmergency: needsEmergency || undefined, limit: 3 }
      );
    } else if (data.locationAccess.region || data.locationAccess.province || data.locationAccess.city) {
      // Use manual location to find facilities in region
      const searchTerm = data.locationAccess.region || data.locationAccess.province || data.locationAccess.city || "";
      const needsEmergency = urgency === "urgent";
      
      nearbyFacilities = findFacilitiesByRegion(searchTerm, {
        hasEmergency: needsEmergency || undefined,
        limit: 3,
      });
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

  return {
    diabetesRisk,
    cardiovascularRisk,
    overallRisk,
    urgency,
    contributingFactors,
    lifestyleSuggestions,
    warningSigns,
    bmi,
    bmiCategory,
    carePathway,
    recommendedFacilities,
    locationProvided,
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health assessment endpoint
  app.post("/api/assess", (req, res) => {
    try {
      console.log("Received assessment data:", JSON.stringify(req.body, null, 2));
      
      // Validate input
      const validationResult = assessmentSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        console.error("Validation errors:", validationResult.error.errors);
        return res.status(400).json({
          success: false,
          error: "Invalid assessment data",
          details: validationResult.error.errors,
        });
      }

      const assessmentData = validationResult.data;
      const result = calculateRiskAssessment(assessmentData);

      res.json({
        success: true,
        result,
      });
    } catch (error) {
      console.error("Assessment error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to process assessment",
      });
    }
  });

  return httpServer;
}
