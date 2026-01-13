import { z } from "zod";

// Location & Access schema
export const locationAccessSchema = z.object({
  // Location preference
  locationMethod: z.enum(["gps", "manual", "prefer_not"]).optional(),
  
  // GPS coordinates (if using geolocation)
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  
  // Manual location input
  city: z.string().optional(),
  province: z.string().optional(),
  region: z.string().optional(),
  
  // Setting
  settingType: z.enum(["urban", "rural", "not_sure"]).optional(),
  
  // Travel burden
  distanceToClinic: z.enum(["less_5km", "5_20km", "20_50km", "more_50km"]).optional(),
  transportDifficulty: z.enum(["easy", "moderate", "difficult"]).optional(),
  costBarrier: z.enum(["low", "moderate", "high"]).optional(),
});

export type LocationAccess = z.infer<typeof locationAccessSchema>;

// Assessment form data schema
export const assessmentSchema = z.object({
  // Demographics
  age: z.number().min(18).max(120),
  gender: z.enum(["male", "female", "other"]),
  
  // Physical measurements
  weight: z.number().min(30).max(300), // kg
  height: z.number().min(100).max(250), // cm
  waistCircumference: z.number().min(50).max(200).optional(), // cm
  
  // Medical history
  familyHistoryDiabetes: z.boolean(),
  familyHistoryHeartDisease: z.boolean(),
  personalHistoryHighBloodPressure: z.boolean(),
  personalHistoryHighCholesterol: z.boolean(),
  previousGestationalDiabetes: z.boolean().optional(), // for females
  
  // Lifestyle factors
  physicalActivityLevel: z.enum(["sedentary", "light", "moderate", "active"]),
  smokingStatus: z.enum(["never", "former", "current"]),
  dietQuality: z.enum(["poor", "fair", "good", "excellent"]),
  sleepHours: z.number().min(3).max(14),
  stressLevel: z.enum(["low", "moderate", "high", "very_high"]),
  
  // Symptoms
  frequentThirst: z.boolean(),
  frequentUrination: z.boolean(),
  unexplainedWeightChange: z.boolean(),
  fatigue: z.boolean(),
  blurredVision: z.boolean(),
  slowHealingWounds: z.boolean(),
  chestPain: z.boolean(),
  shortnessOfBreath: z.boolean(),
  
  // Location & Access (optional)
  locationAccess: locationAccessSchema.optional(),
});

export type Assessment = z.infer<typeof assessmentSchema>;

// Risk level types
export type RiskLevel = "low" | "moderate" | "high";
export type UrgencyLevel = "monitor" | "see_doctor_soon" | "urgent";

// Risk factor with explanation
export interface RiskFactor {
  id: string;
  nameKey: string; // translation key
  explanationKey: string; // translation key for why it matters
  severity: "low" | "medium" | "high";
}

// Lifestyle suggestion
export interface LifestyleSuggestion {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

// Warning sign
export interface WarningSign {
  id: string;
  signKey: string;
  actionKey: string;
}

// Care pathway recommendation
export interface CarePathway {
  whereToGoKey: string;
  whenToGoKey: string;
  additionalGuidanceKey?: string;
  isRural: boolean;
  hasHighAccessBarrier: boolean;
}

// Facility recommendation for results
export interface FacilityRecommendation {
  facilityId: string;
  name: string;
  type: string;
  distance?: number;
  phone?: string;
  email?: string;
  mapsUrl?: string;
}

// Complete risk assessment result
export interface RiskResult {
  diabetesRisk: RiskLevel;
  cardiovascularRisk: RiskLevel;
  overallRisk: RiskLevel;
  urgency: UrgencyLevel;
  contributingFactors: RiskFactor[];
  lifestyleSuggestions: LifestyleSuggestion[];
  warningSigns: WarningSign[];
  bmi: number;
  bmiCategory: string;
  carePathway?: CarePathway;
  recommendedFacilities?: FacilityRecommendation[];
  locationProvided: boolean;
}

// Language type
export type Language = "en" | "fr" | "ar" | "am";

// API response type
export interface AssessmentResponse {
  success: boolean;
  result: RiskResult;
}
