import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Heart,
  Activity,
  Clock,
  ArrowRight,
  RefreshCw,
  Printer,
  Scale,
  Moon,
  Dumbbell,
  Apple,
  Cigarette,
  Stethoscope,
  Droplets,
  Brain,
  Calendar,
  Phone,
  ExternalLink,
  Shield,
  MapPin,
  Navigation,
  Mail,
  Copy,
  Building2,
  Hospital,
  AlertOctagon,
  Info,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/language-context";
import type { AssessmentApiResponse, RiskLevel, UrgencyLevel } from "@shared/schema";

const riskColors: Record<RiskLevel, string> = {
  low: "bg-risk-low text-white",
  moderate: "bg-risk-moderate text-white",
  high: "bg-risk-high text-white",
};

const riskBgColors: Record<RiskLevel, string> = {
  low: "bg-risk-low/10 border-risk-low/30",
  moderate: "bg-risk-moderate/10 border-risk-moderate/30",
  high: "bg-risk-high/10 border-risk-high/30",
};

const riskTextColors: Record<RiskLevel, string> = {
  low: "text-risk-low",
  moderate: "text-risk-moderate",
  high: "text-risk-high",
};

const urgencyColors: Record<UrgencyLevel, string> = {
  monitor: "bg-urgency-monitor/10 border-urgency-monitor/30 text-urgency-monitor",
  see_doctor_soon: "bg-urgency-soon/10 border-urgency-soon/30 text-urgency-soon",
  urgent: "bg-urgency-urgent/10 border-urgency-urgent/30 text-urgency-urgent",
};

const urgencyIcons: Record<UrgencyLevel, typeof CheckCircle2> = {
  monitor: CheckCircle2,
  see_doctor_soon: Clock,
  urgent: AlertTriangle,
};

const riskIcons: Record<RiskLevel, typeof CheckCircle2> = {
  low: CheckCircle2,
  moderate: AlertCircle,
  high: AlertTriangle,
};

const lifestyleIcons: Record<string, typeof Heart> = {
  exercise: Dumbbell,
  diet: Apple,
  weight: Scale,
  smoking: Cigarette,
  sleep: Moon,
  stress: Brain,
  checkups: Stethoscope,
  water: Droplets,
};

function isValidApiResponse(data: unknown): data is AssessmentApiResponse {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;

  if (!obj.urgency || typeof obj.urgency !== "object") return false;
  if (!obj.longTermRisk || typeof obj.longTermRisk !== "object") return false;
  if (!obj.meta || typeof obj.meta !== "object") return false;

  const meta = obj.meta as Record<string, unknown>;
  if (meta.isPediatricUnsupported) return true;

  const urgency = obj.urgency as Record<string, unknown>;
  const longTermRisk = obj.longTermRisk as Record<string, unknown>;
  const validRiskLevels = ["low", "moderate", "high"];
  const validUrgency = ["monitor", "see_doctor_soon", "urgent"];

  return (
    typeof urgency.level === "string" && validUrgency.includes(urgency.level) &&
    Array.isArray(urgency.factors) &&
    typeof longTermRisk.level === "string" && validRiskLevels.includes(longTermRisk.level) &&
    typeof longTermRisk.bmi === "number" &&
    Array.isArray(longTermRisk.factors) &&
    Array.isArray(obj.lifestyleSuggestions) &&
    Array.isArray(obj.warningSigns)
  );
}

export default function ResultsPage() {
  const { t, isRTL } = useLanguage();
  const [, setLocation] = useLocation();
  const [data, setData] = useState<AssessmentApiResponse | null>(null);
  const { toast } = useToast();

  const handleCopySummary = () => {
    if (!data) return;

    const allFactors = [...data.urgency.factors, ...data.longTermRisk.factors];

    const summary = `${t("results.title")}
---
${t("urgency.title")}: ${t(`urgency.${data.urgency.level === "see_doctor_soon" ? "soon" : data.urgency.level}`)}
${t("risk.longterm")}: ${t(`risk.${data.longTermRisk.level}`)}
${data.longTermRisk.bmi > 0 ? `BMI: ${data.longTermRisk.bmi.toFixed(1)} (${t(`bmi.${data.longTermRisk.bmiCategory}`)})` : ""}

${t("factors.title")}:
${allFactors.map(f => `- ${t(f.nameKey)}`).join('\n')}

${t("lifestyle.title")}:
${data.lifestyleSuggestions.slice(0, 3).map(s => `- ${t(s.titleKey)}`).join('\n')}

${t("results.disclaimer")}
`;

    navigator.clipboard.writeText(summary).then(() => {
      toast({
        title: t("facility.copied"),
        duration: 2000,
      });
    });
  };

  const getFacilityTypeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return Hospital;
      case "emergency":
        return AlertOctagon;
      default:
        return Building2;
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("assessmentResult");
    if (stored && stored.trim() !== "") {
      try {
        const parsed = JSON.parse(stored);
        if (isValidApiResponse(parsed)) {
          setData(parsed);
        } else {
          setLocation("/");
        }
      } catch {
        setLocation("/");
      }
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (data.meta.isPediatricUnsupported) {
    const hasUrgentPediatric = data.urgency.level === "urgent";
    return (
      <div className="container max-w-4xl px-4 py-8 md:py-12">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">{t("results.title")}</h1>

        <div className="mb-8 rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
          <Shield className="mx-auto mb-2 h-5 w-5" />
          {t("results.disclaimer")}
        </div>

        {hasUrgentPediatric && (
          <Card className={`mb-6 border-2 ${urgencyColors.urgent}`} data-testid="card-pediatric-urgent">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 shrink-0" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{t("urgency.title")}: {t("urgency.urgent")}</h3>
                  <p className="text-sm opacity-90">{t("urgency.urgent.desc")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6 border-2" data-testid="card-pediatric-unsupported">
          <CardContent className="p-6 text-center">
            <Info className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-3 text-xl font-semibold">{t("pediatric.unsupported.title")}</h2>
            <p className="mb-4 text-muted-foreground">{t("pediatric.unsupported.desc")}</p>
            <p className="text-sm text-muted-foreground">{t("pediatric.unsupported.emergency")}</p>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4 rounded-lg bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">{t("results.disclaimer")}</p>
          <Link href="/assessment">
            <Button variant="outline" className="gap-2" data-testid="button-new-assessment">
              <RefreshCw className="h-4 w-4" />
              {t("action.restart")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const UrgencyIcon = urgencyIcons[data.urgency.level];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container max-w-4xl px-4 py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold md:text-3xl">{t("results.title")}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopySummary} className="gap-2" data-testid="button-copy">
            <Copy className="h-4 w-4" />
            {t("action.copy")}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2" data-testid="button-print">
            <Printer className="h-4 w-4" />
            {t("action.print")}
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2" data-testid="button-restart">
              <RefreshCw className="h-4 w-4" />
              {t("action.restart")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 rounded-lg bg-muted/50 p-4 text-center text-sm text-muted-foreground">
        <Shield className="mx-auto mb-2 h-5 w-5" />
        {t("results.disclaimer")}
      </div>

      <Card className={`mb-6 border-2 ${urgencyColors[data.urgency.level]}`} data-testid="card-urgency">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
            <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${
              data.urgency.level === "urgent" ? "bg-urgency-urgent/20" :
              data.urgency.level === "see_doctor_soon" ? "bg-urgency-soon/20" : "bg-urgency-monitor/20"
            }`}>
              <UrgencyIcon className="h-10 w-10" />
            </div>
            <div className="flex-1 text-center md:text-start">
              <p className="mb-1 text-sm font-medium text-muted-foreground">{t("urgency.title")}</p>
              <h2 className="mb-2 text-3xl font-bold">
                {t(`urgency.${data.urgency.level === "see_doctor_soon" ? "soon" : data.urgency.level}`)}
              </h2>
              <p className="opacity-90">
                {t(`urgency.${data.urgency.level === "see_doctor_soon" ? "soon" : data.urgency.level}.desc`)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {data.urgency.factors && data.urgency.factors.length > 0 && (
        <Card className="mb-8 border-2" data-testid="card-urgency-factors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              {t("factors.urgency.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {data.urgency.factors.map((factor) => (
                <AccordionItem key={factor.id} value={factor.id}>
                  <AccordionTrigger className="text-start hover:no-underline" data-testid={`accordion-urgency-factor-${factor.id}`}>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={
                          factor.severity === "high"
                            ? "border-risk-high text-risk-high"
                            : factor.severity === "medium"
                            ? "border-risk-moderate text-risk-moderate"
                            : "border-muted-foreground"
                        }
                      >
                        {factor.severity === "high" ? "!" : factor.severity === "medium" ? "•" : "○"}
                      </Badge>
                      <span className="font-medium">{t(factor.nameKey)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="mb-2 text-sm font-medium text-muted-foreground">{t("factors.why")}</p>
                      <p className="text-sm">{t(factor.explanationKey)}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8 border-2 border-amber-500/30 bg-amber-500/5" data-testid="card-call-ahead">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <PhoneCall className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <p className="font-medium text-sm">{t("facility.callAhead")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("facility.emergencyNote")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-muted-foreground">{t("risk.longterm")}</h2>
        <p className="text-sm text-muted-foreground">{t("risk.longterm.desc")}</p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Card className={`border-2 ${riskBgColors[data.longTermRisk.diabetesRisk]}`} data-testid="card-diabetes-risk">
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${riskColors[data.longTermRisk.diabetesRisk]}`}>
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("risk.diabetes")}</p>
              <p className={`text-xl font-bold ${riskTextColors[data.longTermRisk.diabetesRisk]}`}>
                {t(`risk.${data.longTermRisk.diabetesRisk}`)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${riskBgColors[data.longTermRisk.cardiovascularRisk]}`} data-testid="card-cardio-risk">
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${riskColors[data.longTermRisk.cardiovascularRisk]}`}>
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("risk.cardiovascular")}</p>
              <p className={`text-xl font-bold ${riskTextColors[data.longTermRisk.cardiovascularRisk]}`}>
                {t(`risk.${data.longTermRisk.cardiovascularRisk}`)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.longTermRisk.bmi > 0 && (
        <Card className="mb-6 border-2" data-testid="card-bmi">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("bmi.value")}</p>
                <p className="text-xl font-bold">{data.longTermRisk.bmi.toFixed(1)}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {t(`bmi.${data.longTermRisk.bmiCategory}`)}
            </Badge>
          </CardContent>
        </Card>
      )}

      {data.longTermRisk.factors && data.longTermRisk.factors.length > 0 && (
        <Card className="mb-8 border-2" data-testid="card-risk-factors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              {t("factors.risk.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {data.longTermRisk.factors.map((factor) => (
                <AccordionItem key={factor.id} value={factor.id}>
                  <AccordionTrigger className="text-start hover:no-underline" data-testid={`accordion-risk-factor-${factor.id}`}>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={
                          factor.severity === "high"
                            ? "border-risk-high text-risk-high"
                            : factor.severity === "medium"
                            ? "border-risk-moderate text-risk-moderate"
                            : "border-muted-foreground"
                        }
                      >
                        {factor.severity === "high" ? "!" : factor.severity === "medium" ? "•" : "○"}
                      </Badge>
                      <span className="font-medium">{t(factor.nameKey)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="mb-2 text-sm font-medium text-muted-foreground">{t("factors.why")}</p>
                      <p className="text-sm">{t(factor.explanationKey)}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8 border-2" data-testid="card-lifestyle">
        <CardHeader>
          <CardTitle>{t("lifestyle.title")}</CardTitle>
          <CardDescription>{t("lifestyle.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.lifestyleSuggestions.map((suggestion) => {
              const IconComponent = lifestyleIcons[suggestion.icon] || Heart;
              return (
                <Card key={suggestion.id} className="hover-elevate">
                  <CardContent className="flex gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">{t(suggestion.titleKey)}</h4>
                      <p className="text-sm text-muted-foreground">{t(suggestion.descriptionKey)}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-2 border-risk-high/20 bg-risk-high/5" data-testid="card-warnings">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-risk-high">
            <AlertTriangle className="h-5 w-5" />
            {t("warning.title")}
          </CardTitle>
          <CardDescription>{t("warning.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.warningSigns.map((warning) => (
              <div key={warning.id} className="flex items-start gap-3 rounded-lg bg-background p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-risk-high" />
                <div>
                  <p className="font-medium">{t(warning.signKey)}</p>
                  <p className="text-sm text-muted-foreground">{t(warning.actionKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-2" data-testid="card-doctor-timeline">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            {t("doctor.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-4">
            <div className="absolute bottom-4 top-4 left-6 w-0.5 bg-border rtl:left-auto rtl:right-6" />

            {(["routine", "soon", "urgent", "emergency"] as const).map((level) => (
              <div key={level} className="relative flex gap-4">
                <div
                  className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${
                    level === "emergency"
                      ? "border-risk-high bg-risk-high/10"
                      : level === "urgent"
                      ? "border-risk-moderate bg-risk-moderate/10"
                      : level === "soon"
                      ? "border-primary bg-primary/10"
                      : "border-muted bg-muted"
                  }`}
                >
                  {level === "emergency" ? (
                    <Phone className="h-5 w-5 text-risk-high" />
                  ) : level === "urgent" ? (
                    <AlertTriangle className="h-5 w-5 text-risk-moderate" />
                  ) : level === "soon" ? (
                    <Calendar className="h-5 w-5 text-primary" />
                  ) : (
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <h4 className="font-semibold">{t(`doctor.${level}`)}</h4>
                  <p className="text-sm text-muted-foreground">{t(`doctor.${level}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {data.carePathway && (
        <Card className="mb-8 border-2" data-testid="card-care-pathway">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Navigation className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>{t("pathway.title")}</CardTitle>
                <CardDescription>{t("pathway.subtitle")}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
              <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">{t("pathway.where")}</p>
                <p className="font-semibold">{t(data.carePathway.whereToGoKey)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
              <Clock className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">{t("pathway.when")}</p>
                <p className="font-semibold">{t(data.carePathway.whenToGoKey)}</p>
              </div>
            </div>

            {data.carePathway.additionalGuidanceKey && (
              <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-amber-600 dark:text-amber-400 mb-1">{t("pathway.additional")}</p>
                  <p className="text-sm">{t(data.carePathway.additionalGuidanceKey)}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {data.facilityRecommendations && data.facilityRecommendations.length > 0 && (
        <Card className="mb-8 border-2" data-testid="card-facilities">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Hospital className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>{t("facilities.title")}</CardTitle>
                <CardDescription>{t("facilities.subtitle")}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.facilityRecommendations.map((facility, index) => {
                const FacilityIcon = getFacilityTypeIcon(facility.type);
                return (
                  <div
                    key={facility.facilityId}
                    className="rounded-lg border p-4"
                    data-testid={`facility-card-${index}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          facility.type === "emergency" ? "bg-risk-high/10" :
                          facility.type === "hospital" ? "bg-primary/10" : "bg-muted"
                        }`}>
                          <FacilityIcon className={`h-5 w-5 ${
                            facility.type === "emergency" ? "text-risk-high" :
                            facility.type === "hospital" ? "text-primary" : "text-muted-foreground"
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{facility.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{t(`facility.type.${facility.type}`)}</p>
                          {facility.distance && (
                            <p className="text-sm text-muted-foreground">{facility.distance.toFixed(1)} km</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a href={facility.mapsUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-2" data-testid={`button-directions-${index}`}>
                          <Navigation className="h-4 w-4" />
                          {t("facility.directions")}
                        </Button>
                      </a>
                      {facility.phone && (
                        <a href={`tel:${facility.phone}`}>
                          <Button variant="outline" size="sm" className="gap-2" data-testid={`button-call-${index}`}>
                            <Phone className="h-4 w-4" />
                            {t("facility.call")}
                          </Button>
                        </a>
                      )}
                      {facility.email && (
                        <a href={`mailto:${facility.email}`}>
                          <Button variant="outline" size="sm" className="gap-2" data-testid={`button-email-${index}`}>
                            <Mail className="h-4 w-4" />
                            {t("facility.email")}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8 border-2" data-testid="card-resources">
        <CardHeader>
          <CardTitle>{t("resources.title")}</CardTitle>
          <CardDescription>{t("resources.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: "who", href: "https://www.who.int/health-topics/diabetes", domain: "who.int", color: "text-blue-500", bg: "bg-blue-500/10" },
              { id: "morocco", href: "https://www.sante.gov.ma", domain: "sante.gov.ma", color: "text-red-500", bg: "bg-red-500/10", label: "MS" },
              { id: "cdc", href: "https://www.cdc.gov/diabetes", domain: "cdc.gov", color: "text-indigo-500", bg: "bg-indigo-500/10" },
              { id: "dabadoc", href: "https://www.dabadoc.com", domain: "dabadoc.com", color: "text-cyan-500", bg: "bg-cyan-500/10", label: "DD" },
              { id: "medma", href: "https://www.med.ma", domain: "med.ma", color: "text-orange-500", bg: "bg-orange-500/10", label: "med" },
              { id: "ada", href: "https://diabetes.org", domain: "diabetes.org", color: "text-teal-500", bg: "bg-teal-500/10" },
            ].map((resource) => (
              <a
                key={resource.id}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border p-4 hover-elevate"
                data-testid={`link-${resource.id}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${resource.bg}`}>
                  <span className={`text-sm font-bold ${resource.color}`}>
                    {resource.label || resource.id.toUpperCase().slice(0, 3)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t(`trust.${resource.id}`)}</p>
                  <p className="text-xs text-muted-foreground">{resource.domain}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center gap-4 rounded-lg bg-muted/30 p-8 text-center">
        <p className="text-muted-foreground">{t("results.disclaimer")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/assessment">
            <Button variant="outline" className="gap-2" data-testid="button-new-assessment">
              <RefreshCw className="h-4 w-4" />
              {t("action.restart")}
            </Button>
          </Link>
          <Button className="gap-2" data-testid="button-find-doctor">
            <Stethoscope className="h-4 w-4" />
            {t("action.findDoctor")}
            <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
