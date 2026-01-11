import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/language-context";
import { apiRequest } from "@/lib/queryClient";
import type { Assessment, RiskResult } from "@shared/schema";

const TOTAL_STEPS = 5;

interface FormData {
  age: number;
  gender: "male" | "female" | "other";
  weight: number;
  height: number;
  waistCircumference: number;
  familyHistoryDiabetes: boolean;
  familyHistoryHeartDisease: boolean;
  personalHistoryHighBloodPressure: boolean;
  personalHistoryHighCholesterol: boolean;
  previousGestationalDiabetes: boolean;
  physicalActivityLevel: "sedentary" | "light" | "moderate" | "active";
  smokingStatus: "never" | "former" | "current";
  dietQuality: "poor" | "fair" | "good" | "excellent";
  sleepHours: number;
  stressLevel: "low" | "moderate" | "high" | "very_high";
  frequentThirst: boolean;
  frequentUrination: boolean;
  unexplainedWeightChange: boolean;
  fatigue: boolean;
  blurredVision: boolean;
  slowHealingWounds: boolean;
  chestPain: boolean;
  shortnessOfBreath: boolean;
}

const initialFormData: FormData = {
  age: 35,
  gender: "male",
  weight: 70,
  height: 170,
  waistCircumference: 0,
  familyHistoryDiabetes: false,
  familyHistoryHeartDisease: false,
  personalHistoryHighBloodPressure: false,
  personalHistoryHighCholesterol: false,
  previousGestationalDiabetes: false,
  physicalActivityLevel: "moderate",
  smokingStatus: "never",
  dietQuality: "fair",
  sleepHours: 7,
  stressLevel: "moderate",
  frequentThirst: false,
  frequentUrination: false,
  unexplainedWeightChange: false,
  fatigue: false,
  blurredVision: false,
  slowHealingWounds: false,
  chestPain: false,
  shortnessOfBreath: false,
};

export default function AssessmentPage() {
  const { t, isRTL } = useLanguage();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async (data: Assessment) => {
      const response = await apiRequest("POST", "/api/assess", data);
      const result = await response.json();
      return result as { success: boolean; result: RiskResult };
    },
    onSuccess: (data) => {
      sessionStorage.setItem("assessmentResult", JSON.stringify(data.result));
      setLocation("/results");
    },
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.age || formData.age < 18 || formData.age > 120) {
        newErrors.age = t("validation.ageRange");
      }
    }

    if (step === 2) {
      if (!formData.weight || formData.weight < 30 || formData.weight > 300) {
        newErrors.weight = t("validation.weightRange");
      }
      if (!formData.height || formData.height < 100 || formData.height > 250) {
        newErrors.height = t("validation.heightRange");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < TOTAL_STEPS) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const assessmentData: Assessment = {
      age: formData.age,
      gender: formData.gender,
      weight: formData.weight,
      height: formData.height,
      waistCircumference: formData.waistCircumference > 0 ? formData.waistCircumference : undefined,
      familyHistoryDiabetes: formData.familyHistoryDiabetes,
      familyHistoryHeartDisease: formData.familyHistoryHeartDisease,
      personalHistoryHighBloodPressure: formData.personalHistoryHighBloodPressure,
      personalHistoryHighCholesterol: formData.personalHistoryHighCholesterol,
      previousGestationalDiabetes: formData.gender === "female" ? formData.previousGestationalDiabetes : undefined,
      physicalActivityLevel: formData.physicalActivityLevel,
      smokingStatus: formData.smokingStatus,
      dietQuality: formData.dietQuality,
      sleepHours: formData.sleepHours,
      stressLevel: formData.stressLevel,
      frequentThirst: formData.frequentThirst,
      frequentUrination: formData.frequentUrination,
      unexplainedWeightChange: formData.unexplainedWeightChange,
      fatigue: formData.fatigue,
      blurredVision: formData.blurredVision,
      slowHealingWounds: formData.slowHealingWounds,
      chestPain: formData.chestPain,
      shortnessOfBreath: formData.shortnessOfBreath,
    };

    mutation.mutate(assessmentData);
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="container max-w-2xl px-4 py-8 md:py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">{t("assessment.title")}</span>
          <span className="text-muted-foreground">
            {t("assessment.progress", { current: step, total: TOTAL_STEPS })}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>{t(`step${step}.title`)}</CardTitle>
          <CardDescription>{t(`step${step}.desc`)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Demographics */}
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="age">{t("field.age")}</Label>
                <Input
                  id="age"
                  type="number"
                  min={18}
                  max={120}
                  value={formData.age}
                  onChange={(e) => updateField("age", parseInt(e.target.value) || 0)}
                  placeholder={t("field.age.placeholder")}
                  data-testid="input-age"
                />
                {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
              </div>

              <div className="space-y-3">
                <Label>{t("field.gender")}</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => updateField("gender", value as FormData["gender"])}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="male" id="male" data-testid="radio-gender-male" />
                    <Label htmlFor="male" className="font-normal">{t("field.gender.male")}</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="female" id="female" data-testid="radio-gender-female" />
                    <Label htmlFor="female" className="font-normal">{t("field.gender.female")}</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="other" id="other" data-testid="radio-gender-other" />
                    <Label htmlFor="other" className="font-normal">{t("field.gender.other")}</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          {/* Step 2: Physical Measurements */}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="weight">{t("field.weight")}</Label>
                <Input
                  id="weight"
                  type="number"
                  min={30}
                  max={300}
                  value={formData.weight}
                  onChange={(e) => updateField("weight", parseInt(e.target.value) || 0)}
                  placeholder={t("field.weight.placeholder")}
                  data-testid="input-weight"
                />
                {errors.weight && <p className="text-sm text-destructive">{errors.weight}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">{t("field.height")}</Label>
                <Input
                  id="height"
                  type="number"
                  min={100}
                  max={250}
                  value={formData.height}
                  onChange={(e) => updateField("height", parseInt(e.target.value) || 0)}
                  placeholder={t("field.height.placeholder")}
                  data-testid="input-height"
                />
                {errors.height && <p className="text-sm text-destructive">{errors.height}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="waist">{t("field.waist")}</Label>
                <Input
                  id="waist"
                  type="number"
                  min={0}
                  max={200}
                  value={formData.waistCircumference || ""}
                  onChange={(e) => updateField("waistCircumference", parseInt(e.target.value) || 0)}
                  placeholder={t("field.waist.placeholder")}
                  data-testid="input-waist"
                />
                <p className="text-xs text-muted-foreground">{t("field.waist.help")}</p>
              </div>
            </>
          )}

          {/* Step 3: Medical History */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox
                  id="familyDiabetes"
                  checked={formData.familyHistoryDiabetes}
                  onCheckedChange={(checked) => updateField("familyHistoryDiabetes", !!checked)}
                  data-testid="checkbox-family-diabetes"
                />
                <Label htmlFor="familyDiabetes" className="font-normal leading-tight">
                  {t("field.familyDiabetes")}
                </Label>
              </div>

              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox
                  id="familyHeart"
                  checked={formData.familyHistoryHeartDisease}
                  onCheckedChange={(checked) => updateField("familyHistoryHeartDisease", !!checked)}
                  data-testid="checkbox-family-heart"
                />
                <Label htmlFor="familyHeart" className="font-normal leading-tight">
                  {t("field.familyHeart")}
                </Label>
              </div>

              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox
                  id="highBP"
                  checked={formData.personalHistoryHighBloodPressure}
                  onCheckedChange={(checked) => updateField("personalHistoryHighBloodPressure", !!checked)}
                  data-testid="checkbox-high-bp"
                />
                <Label htmlFor="highBP" className="font-normal leading-tight">
                  {t("field.highBP")}
                </Label>
              </div>

              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox
                  id="highCholesterol"
                  checked={formData.personalHistoryHighCholesterol}
                  onCheckedChange={(checked) => updateField("personalHistoryHighCholesterol", !!checked)}
                  data-testid="checkbox-high-cholesterol"
                />
                <Label htmlFor="highCholesterol" className="font-normal leading-tight">
                  {t("field.highCholesterol")}
                </Label>
              </div>

              {formData.gender === "female" && (
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Checkbox
                    id="gestational"
                    checked={formData.previousGestationalDiabetes}
                    onCheckedChange={(checked) => updateField("previousGestationalDiabetes", !!checked)}
                    data-testid="checkbox-gestational"
                  />
                  <Label htmlFor="gestational" className="font-normal leading-tight">
                    {t("field.gestational")}
                  </Label>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Lifestyle */}
          {step === 4 && (
            <>
              <div className="space-y-3">
                <Label>{t("field.activity")}</Label>
                <RadioGroup
                  value={formData.physicalActivityLevel}
                  onValueChange={(value) => updateField("physicalActivityLevel", value as FormData["physicalActivityLevel"])}
                  className="space-y-2"
                >
                  {(["sedentary", "light", "moderate", "active"] as const).map((level) => (
                    <div key={level} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <RadioGroupItem value={level} id={`activity-${level}`} data-testid={`radio-activity-${level}`} />
                      <Label htmlFor={`activity-${level}`} className="font-normal">
                        {t(`field.activity.${level}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>{t("field.smoking")}</Label>
                <RadioGroup
                  value={formData.smokingStatus}
                  onValueChange={(value) => updateField("smokingStatus", value as FormData["smokingStatus"])}
                  className="space-y-2"
                >
                  {(["never", "former", "current"] as const).map((status) => (
                    <div key={status} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <RadioGroupItem value={status} id={`smoking-${status}`} data-testid={`radio-smoking-${status}`} />
                      <Label htmlFor={`smoking-${status}`} className="font-normal">
                        {t(`field.smoking.${status}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>{t("field.diet")}</Label>
                <RadioGroup
                  value={formData.dietQuality}
                  onValueChange={(value) => updateField("dietQuality", value as FormData["dietQuality"])}
                  className="space-y-2"
                >
                  {(["poor", "fair", "good", "excellent"] as const).map((quality) => (
                    <div key={quality} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <RadioGroupItem value={quality} id={`diet-${quality}`} data-testid={`radio-diet-${quality}`} />
                      <Label htmlFor={`diet-${quality}`} className="font-normal">
                        {t(`field.diet.${quality}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>{t("field.sleep")}: {formData.sleepHours} hours</Label>
                <Slider
                  value={[formData.sleepHours]}
                  onValueChange={(value) => updateField("sleepHours", value[0])}
                  min={3}
                  max={14}
                  step={1}
                  data-testid="slider-sleep"
                />
              </div>

              <div className="space-y-3">
                <Label>{t("field.stress")}</Label>
                <RadioGroup
                  value={formData.stressLevel}
                  onValueChange={(value) => updateField("stressLevel", value as FormData["stressLevel"])}
                  className="flex flex-wrap gap-4"
                >
                  {(["low", "moderate", "high", "very_high"] as const).map((level) => (
                    <div key={level} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RadioGroupItem value={level} id={`stress-${level}`} data-testid={`radio-stress-${level}`} />
                      <Label htmlFor={`stress-${level}`} className="font-normal">
                        {t(`field.stress.${level === "very_high" ? "veryHigh" : level}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          {/* Step 5: Symptoms */}
          {step === 5 && (
            <div className="space-y-4">
              {[
                { field: "frequentThirst" as const, label: "field.thirst" },
                { field: "frequentUrination" as const, label: "field.urination" },
                { field: "unexplainedWeightChange" as const, label: "field.weightChange" },
                { field: "fatigue" as const, label: "field.fatigue" },
                { field: "blurredVision" as const, label: "field.vision" },
                { field: "slowHealingWounds" as const, label: "field.wounds" },
                { field: "chestPain" as const, label: "field.chestPain" },
                { field: "shortnessOfBreath" as const, label: "field.breathing" },
              ].map(({ field, label }) => (
                <div key={field} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Checkbox
                    id={field}
                    checked={formData[field]}
                    onCheckedChange={(checked) => updateField(field, !!checked)}
                    data-testid={`checkbox-${field}`}
                  />
                  <Label htmlFor={field} className="font-normal leading-tight">
                    {t(label)}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
          className="gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          {t("assessment.back")}
        </Button>

        <Button
          onClick={handleNext}
          disabled={mutation.isPending}
          className="gap-2"
          data-testid="button-next"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : step === TOTAL_STEPS ? (
            t("assessment.submit")
          ) : (
            <>
              {t("assessment.next")}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </>
          )}
        </Button>
      </div>

      {mutation.isError && (
        <div className="mt-4 rounded-lg bg-destructive/10 p-4 text-center text-destructive">
          An error occurred. Please try again.
        </div>
      )}
    </div>
  );
}
