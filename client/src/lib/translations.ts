import type { Language } from "@shared/schema";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & General
    "app.title": "Health Risk Assessment",
    "app.subtitle": "Type 2 Diabetes & Cardiovascular Risk",
    "nav.home": "Home",
    "nav.assessment": "Assessment",
    "nav.about": "About",
    "language.select": "Language",
    
    // Landing Page
    "hero.title": "Understand Your Health Risk",
    "hero.subtitle": "A simple, confidential assessment to help you understand your risk for Type 2 diabetes and heart disease",
    "hero.cta": "Start Assessment",
    "hero.time": "Takes about 5 minutes",
    "hero.disclaimer": "This tool provides general health information, not medical diagnosis",
    
    // How It Works
    "how.title": "How It Works",
    "how.step1.title": "Answer Questions",
    "how.step1.desc": "Share basic information about your health, lifestyle, and family history",
    "how.step2.title": "Get Your Results",
    "how.step2.desc": "Receive a personalized risk assessment with clear explanations",
    "how.step3.title": "Take Action",
    "how.step3.desc": "Learn what steps you can take and when to see a doctor",
    
    // Why This Matters
    "why.title": "Why This Matters",
    "why.stat1.number": "1 in 10",
    "why.stat1.label": "Adults have diabetes worldwide",
    "why.stat2.number": "50%",
    "why.stat2.label": "Of cases are undiagnosed",
    "why.stat3.number": "80%",
    "why.stat3.label": "Can be prevented with lifestyle changes",
    
    // Trust Section
    "trust.title": "Trusted Information",
    "trust.desc": "Our assessment is based on guidelines from leading health organizations",
    "trust.who": "World Health Organization",
    "trust.morocco": "Morocco Ministry of Health",
    "trust.cdc": "CDC (Centers for Disease Control)",
    "trust.ada": "American Diabetes Association",
    
    // Assessment Form
    "assessment.title": "Health Assessment",
    "assessment.progress": "Step {current} of {total}",
    "assessment.next": "Continue",
    "assessment.back": "Back",
    "assessment.submit": "Get Results",
    
    // Step 1: Demographics
    "step1.title": "About You",
    "step1.desc": "Let's start with some basic information",
    "field.age": "Age",
    "field.age.placeholder": "Enter your age",
    "field.gender": "Gender",
    "field.gender.male": "Male",
    "field.gender.female": "Female",
    "field.gender.other": "Other",
    
    // Step 2: Physical Measurements
    "step2.title": "Physical Measurements",
    "step2.desc": "Your body measurements help us assess risk",
    "field.weight": "Weight (kg)",
    "field.weight.placeholder": "Enter your weight",
    "field.height": "Height (cm)",
    "field.height.placeholder": "Enter your height",
    "field.waist": "Waist Circumference (cm)",
    "field.waist.placeholder": "Optional - measure at navel",
    "field.waist.help": "Measure around your belly at navel level",
    
    // Step 3: Medical History
    "step3.title": "Medical History",
    "step3.desc": "Family and personal health history",
    "field.familyDiabetes": "Family history of diabetes (parent or sibling)",
    "field.familyHeart": "Family history of heart disease",
    "field.highBP": "Have you been told you have high blood pressure?",
    "field.highCholesterol": "Have you been told you have high cholesterol?",
    "field.gestational": "History of gestational diabetes (pregnancy diabetes)",
    
    // Step 4: Lifestyle
    "step4.title": "Lifestyle Habits",
    "step4.desc": "Your daily habits affect your health",
    "field.activity": "Physical Activity Level",
    "field.activity.sedentary": "Sedentary (little to no exercise)",
    "field.activity.light": "Light (1-2 days per week)",
    "field.activity.moderate": "Moderate (3-4 days per week)",
    "field.activity.active": "Active (5+ days per week)",
    "field.smoking": "Smoking Status",
    "field.smoking.never": "Never smoked",
    "field.smoking.former": "Former smoker",
    "field.smoking.current": "Current smoker",
    "field.diet": "Diet Quality",
    "field.diet.poor": "Poor (mostly processed foods)",
    "field.diet.fair": "Fair (some healthy foods)",
    "field.diet.good": "Good (mostly healthy foods)",
    "field.diet.excellent": "Excellent (balanced, whole foods)",
    "field.sleep": "Average Sleep Hours",
    "field.stress": "Stress Level",
    "field.stress.low": "Low",
    "field.stress.moderate": "Moderate",
    "field.stress.high": "High",
    "field.stress.veryHigh": "Very High",
    
    // Step 5: Symptoms
    "step5.title": "Current Symptoms",
    "step5.desc": "Have you experienced any of these recently?",
    "field.thirst": "Frequent thirst",
    "field.urination": "Frequent urination",
    "field.weightChange": "Unexplained weight loss or gain",
    "field.fatigue": "Unusual fatigue or tiredness",
    "field.vision": "Blurred vision",
    "field.wounds": "Slow healing cuts or wounds",
    "field.chestPain": "Chest pain or discomfort",
    "field.breathing": "Shortness of breath",
    
    // Results Page
    "results.title": "Your Assessment Results",
    "results.disclaimer": "This is not a medical diagnosis. Please consult a healthcare professional.",
    
    // Risk Levels
    "risk.diabetes": "Diabetes Risk",
    "risk.cardiovascular": "Cardiovascular Risk",
    "risk.overall": "Overall Risk Level",
    "risk.low": "Low",
    "risk.moderate": "Moderate",
    "risk.high": "High",
    "risk.low.desc": "Your risk factors are well-managed. Continue healthy habits.",
    "risk.moderate.desc": "Some risk factors present. Consider lifestyle changes and regular check-ups.",
    "risk.high.desc": "Multiple risk factors identified. We recommend seeing a doctor soon.",
    
    // Urgency Levels
    "urgency.title": "Recommended Action",
    "urgency.monitor": "Monitor",
    "urgency.monitor.desc": "Continue your healthy lifestyle and schedule a regular check-up within the next few months.",
    "urgency.soon": "See a Doctor Soon",
    "urgency.soon.desc": "We recommend scheduling an appointment with your doctor within the next few weeks.",
    "urgency.urgent": "Urgent - See a Doctor Now",
    "urgency.urgent.desc": "Based on your symptoms, we strongly recommend seeing a healthcare provider as soon as possible.",
    
    // Contributing Factors
    "factors.title": "Factors Affecting Your Risk",
    "factors.why": "Why This Matters",
    
    // Factor Names
    "factor.age": "Age",
    "factor.bmi": "Body Mass Index (BMI)",
    "factor.waist": "Waist Circumference",
    "factor.familyDiabetes": "Family History of Diabetes",
    "factor.familyHeart": "Family History of Heart Disease",
    "factor.highBP": "High Blood Pressure",
    "factor.highCholesterol": "High Cholesterol",
    "factor.sedentary": "Low Physical Activity",
    "factor.smoking": "Smoking",
    "factor.diet": "Diet Quality",
    "factor.sleep": "Sleep Pattern",
    "factor.stress": "Stress Level",
    "factor.symptoms": "Current Symptoms",
    
    // Factor Explanations
    "factor.age.explanation": "Risk of diabetes and heart disease increases with age, especially after 45 years.",
    "factor.bmi.explanation": "Higher body weight increases strain on your heart and affects how your body uses insulin.",
    "factor.waist.explanation": "Fat around the belly is linked to higher risk of diabetes and heart problems.",
    "factor.familyDiabetes.explanation": "If close family members have diabetes, your genetic risk is higher.",
    "factor.familyHeart.explanation": "Heart disease can run in families, making regular monitoring important.",
    "factor.highBP.explanation": "High blood pressure damages blood vessels and makes the heart work harder.",
    "factor.highCholesterol.explanation": "High cholesterol can build up in arteries, reducing blood flow.",
    "factor.sedentary.explanation": "Regular physical activity helps control weight and improves heart health.",
    "factor.smoking.explanation": "Smoking damages blood vessels and significantly increases heart disease risk.",
    "factor.diet.explanation": "A healthy diet helps maintain proper blood sugar and cholesterol levels.",
    "factor.sleep.explanation": "Poor sleep affects hormones that control appetite and blood sugar.",
    "factor.stress.explanation": "Chronic stress can raise blood pressure and lead to unhealthy habits.",
    "factor.symptoms.explanation": "These symptoms may indicate early signs of diabetes or heart problems.",
    
    // Lifestyle Suggestions
    "lifestyle.title": "Lifestyle Suggestions",
    "lifestyle.subtitle": "Small changes can make a big difference",
    "lifestyle.exercise.title": "Stay Active",
    "lifestyle.exercise.desc": "Aim for 30 minutes of moderate activity most days. Walking, swimming, or cycling are great options.",
    "lifestyle.diet.title": "Eat Well",
    "lifestyle.diet.desc": "Choose whole grains, vegetables, fruits, and lean proteins. Limit processed foods and sugary drinks.",
    "lifestyle.weight.title": "Maintain Healthy Weight",
    "lifestyle.weight.desc": "Even losing 5-7% of body weight can significantly reduce diabetes risk.",
    "lifestyle.smoking.title": "Quit Smoking",
    "lifestyle.smoking.desc": "Stopping smoking at any age improves heart health and reduces disease risk.",
    "lifestyle.sleep.title": "Get Good Sleep",
    "lifestyle.sleep.desc": "Aim for 7-8 hours of quality sleep each night for better overall health.",
    "lifestyle.stress.title": "Manage Stress",
    "lifestyle.stress.desc": "Practice relaxation techniques, spend time with loved ones, or try meditation.",
    "lifestyle.checkups.title": "Regular Check-ups",
    "lifestyle.checkups.desc": "Visit your doctor regularly to monitor blood pressure, blood sugar, and cholesterol.",
    "lifestyle.water.title": "Stay Hydrated",
    "lifestyle.water.desc": "Drink plenty of water throughout the day. Limit sugary beverages and excessive caffeine.",
    
    // Warning Signs
    "warning.title": "Warning Signs to Watch",
    "warning.subtitle": "Seek medical attention if you experience",
    "warning.chestPain": "Chest pain or pressure",
    "warning.chestPain.action": "Seek immediate medical help",
    "warning.breathing": "Sudden shortness of breath",
    "warning.breathing.action": "This could be serious - see a doctor right away",
    "warning.thirst": "Excessive thirst and urination",
    "warning.thirst.action": "These are common signs of diabetes - get tested",
    "warning.vision": "Sudden vision changes",
    "warning.vision.action": "Could indicate diabetes or other conditions",
    "warning.numbness": "Numbness in hands or feet",
    "warning.numbness.action": "May indicate nerve damage - consult a doctor",
    "warning.wounds": "Wounds that won't heal",
    "warning.wounds.action": "Poor healing can be a sign of diabetes",
    "warning.fatigue": "Extreme fatigue",
    "warning.fatigue.action": "Persistent tiredness warrants a check-up",
    "warning.dizziness": "Dizziness or fainting",
    "warning.dizziness.action": "Could indicate heart or blood sugar issues",
    
    // When to See a Doctor
    "doctor.title": "When to See a Doctor",
    "doctor.routine": "Routine Visit",
    "doctor.routine.desc": "Schedule a regular health check-up to monitor your vitals",
    "doctor.soon": "Soon",
    "doctor.soon.desc": "Make an appointment within the next few weeks",
    "doctor.urgent": "Urgently",
    "doctor.urgent.desc": "Seek medical attention as soon as possible",
    "doctor.emergency": "Emergency",
    "doctor.emergency.desc": "Call emergency services or go to the nearest hospital",
    
    // Resources
    "resources.title": "Trusted Resources",
    "resources.subtitle": "Learn more from these reliable sources",
    
    // BMI Categories
    "bmi.underweight": "Underweight",
    "bmi.normal": "Normal weight",
    "bmi.overweight": "Overweight",
    "bmi.obese": "Obese",
    "bmi.value": "Your BMI",
    
    // Actions
    "action.restart": "Start New Assessment",
    "action.print": "Print Results",
    "action.findDoctor": "Find a Doctor",
    
    // Footer
    "footer.disclaimer": "This tool is for informational purposes only and does not constitute medical advice.",
    "footer.privacy": "Your information is not stored or shared.",
    "footer.copyright": "© 2024 Health Risk Assessment",
    
    // Validation
    "validation.required": "This field is required",
    "validation.ageRange": "Age must be between 18 and 120",
    "validation.weightRange": "Weight must be between 30 and 300 kg",
    "validation.heightRange": "Height must be between 100 and 250 cm",
  },
  
  fr: {
    // Navigation & General
    "app.title": "Évaluation des Risques de Santé",
    "app.subtitle": "Diabète de Type 2 et Risque Cardiovasculaire",
    "nav.home": "Accueil",
    "nav.assessment": "Évaluation",
    "nav.about": "À propos",
    "language.select": "Langue",
    
    // Landing Page
    "hero.title": "Comprenez Votre Risque de Santé",
    "hero.subtitle": "Une évaluation simple et confidentielle pour vous aider à comprendre votre risque de diabète de type 2 et de maladie cardiaque",
    "hero.cta": "Commencer l'Évaluation",
    "hero.time": "Prend environ 5 minutes",
    "hero.disclaimer": "Cet outil fournit des informations générales sur la santé, pas un diagnostic médical",
    
    // How It Works
    "how.title": "Comment Ça Marche",
    "how.step1.title": "Répondez aux Questions",
    "how.step1.desc": "Partagez des informations de base sur votre santé, mode de vie et antécédents familiaux",
    "how.step2.title": "Obtenez Vos Résultats",
    "how.step2.desc": "Recevez une évaluation personnalisée des risques avec des explications claires",
    "how.step3.title": "Agissez",
    "how.step3.desc": "Apprenez les étapes à suivre et quand consulter un médecin",
    
    // Why This Matters
    "why.title": "Pourquoi C'est Important",
    "why.stat1.number": "1 sur 10",
    "why.stat1.label": "Adultes ont le diabète dans le monde",
    "why.stat2.number": "50%",
    "why.stat2.label": "Des cas ne sont pas diagnostiqués",
    "why.stat3.number": "80%",
    "why.stat3.label": "Peuvent être prévenus par des changements de mode de vie",
    
    // Trust Section
    "trust.title": "Informations Fiables",
    "trust.desc": "Notre évaluation est basée sur les directives des principales organisations de santé",
    "trust.who": "Organisation Mondiale de la Santé",
    "trust.morocco": "Ministère de la Santé du Maroc",
    "trust.cdc": "CDC (Centres de Contrôle des Maladies)",
    "trust.ada": "Association Américaine du Diabète",
    
    // Assessment Form
    "assessment.title": "Évaluation de Santé",
    "assessment.progress": "Étape {current} sur {total}",
    "assessment.next": "Continuer",
    "assessment.back": "Retour",
    "assessment.submit": "Obtenir les Résultats",
    
    // Step 1: Demographics
    "step1.title": "À Propos de Vous",
    "step1.desc": "Commençons par quelques informations de base",
    "field.age": "Âge",
    "field.age.placeholder": "Entrez votre âge",
    "field.gender": "Genre",
    "field.gender.male": "Homme",
    "field.gender.female": "Femme",
    "field.gender.other": "Autre",
    
    // Step 2: Physical Measurements
    "step2.title": "Mesures Physiques",
    "step2.desc": "Vos mesures corporelles nous aident à évaluer le risque",
    "field.weight": "Poids (kg)",
    "field.weight.placeholder": "Entrez votre poids",
    "field.height": "Taille (cm)",
    "field.height.placeholder": "Entrez votre taille",
    "field.waist": "Tour de Taille (cm)",
    "field.waist.placeholder": "Optionnel - mesuré au niveau du nombril",
    "field.waist.help": "Mesurez autour de votre ventre au niveau du nombril",
    
    // Step 3: Medical History
    "step3.title": "Antécédents Médicaux",
    "step3.desc": "Historique de santé familiale et personnelle",
    "field.familyDiabetes": "Antécédents familiaux de diabète (parent ou frère/sœur)",
    "field.familyHeart": "Antécédents familiaux de maladie cardiaque",
    "field.highBP": "Vous a-t-on dit que vous avez une tension artérielle élevée?",
    "field.highCholesterol": "Vous a-t-on dit que vous avez un taux de cholestérol élevé?",
    "field.gestational": "Antécédents de diabète gestationnel (diabète de grossesse)",
    
    // Step 4: Lifestyle
    "step4.title": "Habitudes de Vie",
    "step4.desc": "Vos habitudes quotidiennes affectent votre santé",
    "field.activity": "Niveau d'Activité Physique",
    "field.activity.sedentary": "Sédentaire (peu ou pas d'exercice)",
    "field.activity.light": "Léger (1-2 jours par semaine)",
    "field.activity.moderate": "Modéré (3-4 jours par semaine)",
    "field.activity.active": "Actif (5+ jours par semaine)",
    "field.smoking": "Statut Tabagique",
    "field.smoking.never": "N'a jamais fumé",
    "field.smoking.former": "Ancien fumeur",
    "field.smoking.current": "Fumeur actuel",
    "field.diet": "Qualité de l'Alimentation",
    "field.diet.poor": "Mauvaise (principalement des aliments transformés)",
    "field.diet.fair": "Passable (quelques aliments sains)",
    "field.diet.good": "Bonne (principalement des aliments sains)",
    "field.diet.excellent": "Excellente (aliments équilibrés et complets)",
    "field.sleep": "Heures de Sommeil Moyennes",
    "field.stress": "Niveau de Stress",
    "field.stress.low": "Faible",
    "field.stress.moderate": "Modéré",
    "field.stress.high": "Élevé",
    "field.stress.veryHigh": "Très Élevé",
    
    // Step 5: Symptoms
    "step5.title": "Symptômes Actuels",
    "step5.desc": "Avez-vous ressenti l'un de ces symptômes récemment?",
    "field.thirst": "Soif fréquente",
    "field.urination": "Mictions fréquentes",
    "field.weightChange": "Perte ou gain de poids inexpliqué",
    "field.fatigue": "Fatigue ou lassitude inhabituelle",
    "field.vision": "Vision floue",
    "field.wounds": "Cicatrisation lente des coupures ou blessures",
    "field.chestPain": "Douleur ou gêne thoracique",
    "field.breathing": "Essoufflement",
    
    // Results Page
    "results.title": "Résultats de Votre Évaluation",
    "results.disclaimer": "Ceci n'est pas un diagnostic médical. Veuillez consulter un professionnel de santé.",
    
    // Risk Levels
    "risk.diabetes": "Risque de Diabète",
    "risk.cardiovascular": "Risque Cardiovasculaire",
    "risk.overall": "Niveau de Risque Global",
    "risk.low": "Faible",
    "risk.moderate": "Modéré",
    "risk.high": "Élevé",
    "risk.low.desc": "Vos facteurs de risque sont bien gérés. Continuez vos bonnes habitudes.",
    "risk.moderate.desc": "Certains facteurs de risque présents. Envisagez des changements de mode de vie et des contrôles réguliers.",
    "risk.high.desc": "Plusieurs facteurs de risque identifiés. Nous vous recommandons de consulter un médecin bientôt.",
    
    // Urgency Levels
    "urgency.title": "Action Recommandée",
    "urgency.monitor": "Surveiller",
    "urgency.monitor.desc": "Continuez votre mode de vie sain et planifiez un contrôle régulier dans les prochains mois.",
    "urgency.soon": "Consultez un Médecin Bientôt",
    "urgency.soon.desc": "Nous vous recommandons de prendre rendez-vous avec votre médecin dans les prochaines semaines.",
    "urgency.urgent": "Urgent - Consultez un Médecin Maintenant",
    "urgency.urgent.desc": "Sur la base de vos symptômes, nous vous recommandons fortement de consulter un professionnel de santé dès que possible.",
    
    // Contributing Factors
    "factors.title": "Facteurs Affectant Votre Risque",
    "factors.why": "Pourquoi C'est Important",
    
    // Factor Names
    "factor.age": "Âge",
    "factor.bmi": "Indice de Masse Corporelle (IMC)",
    "factor.waist": "Tour de Taille",
    "factor.familyDiabetes": "Antécédents Familiaux de Diabète",
    "factor.familyHeart": "Antécédents Familiaux de Maladie Cardiaque",
    "factor.highBP": "Tension Artérielle Élevée",
    "factor.highCholesterol": "Cholestérol Élevé",
    "factor.sedentary": "Faible Activité Physique",
    "factor.smoking": "Tabagisme",
    "factor.diet": "Qualité de l'Alimentation",
    "factor.sleep": "Habitudes de Sommeil",
    "factor.stress": "Niveau de Stress",
    "factor.symptoms": "Symptômes Actuels",
    
    // Factor Explanations
    "factor.age.explanation": "Le risque de diabète et de maladie cardiaque augmente avec l'âge, surtout après 45 ans.",
    "factor.bmi.explanation": "Un poids corporel plus élevé augmente la tension sur votre cœur et affecte l'utilisation de l'insuline par votre corps.",
    "factor.waist.explanation": "La graisse autour du ventre est liée à un risque plus élevé de diabète et de problèmes cardiaques.",
    "factor.familyDiabetes.explanation": "Si des membres proches de la famille ont le diabète, votre risque génétique est plus élevé.",
    "factor.familyHeart.explanation": "Les maladies cardiaques peuvent être héréditaires, rendant la surveillance régulière importante.",
    "factor.highBP.explanation": "L'hypertension artérielle endommage les vaisseaux sanguins et fait travailler le cœur plus fort.",
    "factor.highCholesterol.explanation": "Un cholestérol élevé peut s'accumuler dans les artères, réduisant le flux sanguin.",
    "factor.sedentary.explanation": "L'activité physique régulière aide à contrôler le poids et améliore la santé cardiaque.",
    "factor.smoking.explanation": "Le tabagisme endommage les vaisseaux sanguins et augmente significativement le risque de maladie cardiaque.",
    "factor.diet.explanation": "Une alimentation saine aide à maintenir des niveaux appropriés de sucre et de cholestérol dans le sang.",
    "factor.sleep.explanation": "Un mauvais sommeil affecte les hormones qui contrôlent l'appétit et la glycémie.",
    "factor.stress.explanation": "Le stress chronique peut augmenter la pression artérielle et mener à des habitudes malsaines.",
    "factor.symptoms.explanation": "Ces symptômes peuvent indiquer des signes précoces de diabète ou de problèmes cardiaques.",
    
    // Lifestyle Suggestions
    "lifestyle.title": "Suggestions de Mode de Vie",
    "lifestyle.subtitle": "De petits changements peuvent faire une grande différence",
    "lifestyle.exercise.title": "Restez Actif",
    "lifestyle.exercise.desc": "Visez 30 minutes d'activité modérée la plupart des jours. La marche, la natation ou le vélo sont d'excellentes options.",
    "lifestyle.diet.title": "Mangez Bien",
    "lifestyle.diet.desc": "Choisissez des céréales complètes, des légumes, des fruits et des protéines maigres. Limitez les aliments transformés et les boissons sucrées.",
    "lifestyle.weight.title": "Maintenez un Poids Sain",
    "lifestyle.weight.desc": "Même perdre 5-7% du poids corporel peut réduire significativement le risque de diabète.",
    "lifestyle.smoking.title": "Arrêtez de Fumer",
    "lifestyle.smoking.desc": "Arrêter de fumer à tout âge améliore la santé cardiaque et réduit le risque de maladie.",
    "lifestyle.sleep.title": "Dormez Bien",
    "lifestyle.sleep.desc": "Visez 7-8 heures de sommeil de qualité chaque nuit pour une meilleure santé globale.",
    "lifestyle.stress.title": "Gérez le Stress",
    "lifestyle.stress.desc": "Pratiquez des techniques de relaxation, passez du temps avec vos proches ou essayez la méditation.",
    "lifestyle.checkups.title": "Contrôles Réguliers",
    "lifestyle.checkups.desc": "Consultez votre médecin régulièrement pour surveiller la tension artérielle, la glycémie et le cholestérol.",
    "lifestyle.water.title": "Restez Hydraté",
    "lifestyle.water.desc": "Buvez beaucoup d'eau tout au long de la journée. Limitez les boissons sucrées et la caféine excessive.",
    
    // Warning Signs
    "warning.title": "Signes d'Alerte à Surveiller",
    "warning.subtitle": "Consultez un médecin si vous ressentez",
    "warning.chestPain": "Douleur ou pression thoracique",
    "warning.chestPain.action": "Demandez une aide médicale immédiate",
    "warning.breathing": "Essoufflement soudain",
    "warning.breathing.action": "Cela pourrait être grave - consultez un médecin immédiatement",
    "warning.thirst": "Soif et mictions excessives",
    "warning.thirst.action": "Ce sont des signes courants de diabète - faites-vous tester",
    "warning.vision": "Changements soudains de vision",
    "warning.vision.action": "Pourrait indiquer un diabète ou d'autres conditions",
    "warning.numbness": "Engourdissement des mains ou des pieds",
    "warning.numbness.action": "Peut indiquer des lésions nerveuses - consultez un médecin",
    "warning.wounds": "Blessures qui ne guérissent pas",
    "warning.wounds.action": "Une mauvaise cicatrisation peut être un signe de diabète",
    "warning.fatigue": "Fatigue extrême",
    "warning.fatigue.action": "Une fatigue persistante justifie un bilan",
    "warning.dizziness": "Étourdissements ou évanouissements",
    "warning.dizziness.action": "Pourrait indiquer des problèmes cardiaques ou de glycémie",
    
    // When to See a Doctor
    "doctor.title": "Quand Consulter un Médecin",
    "doctor.routine": "Visite de Routine",
    "doctor.routine.desc": "Planifiez un bilan de santé régulier pour surveiller vos constantes",
    "doctor.soon": "Bientôt",
    "doctor.soon.desc": "Prenez rendez-vous dans les prochaines semaines",
    "doctor.urgent": "Urgent",
    "doctor.urgent.desc": "Consultez un médecin dès que possible",
    "doctor.emergency": "Urgence",
    "doctor.emergency.desc": "Appelez les services d'urgence ou rendez-vous à l'hôpital le plus proche",
    
    // Resources
    "resources.title": "Ressources Fiables",
    "resources.subtitle": "En savoir plus sur ces sources fiables",
    
    // BMI Categories
    "bmi.underweight": "Insuffisance pondérale",
    "bmi.normal": "Poids normal",
    "bmi.overweight": "Surpoids",
    "bmi.obese": "Obésité",
    "bmi.value": "Votre IMC",
    
    // Actions
    "action.restart": "Nouvelle Évaluation",
    "action.print": "Imprimer les Résultats",
    "action.findDoctor": "Trouver un Médecin",
    
    // Footer
    "footer.disclaimer": "Cet outil est à titre informatif uniquement et ne constitue pas un avis médical.",
    "footer.privacy": "Vos informations ne sont pas stockées ni partagées.",
    "footer.copyright": "© 2024 Évaluation des Risques de Santé",
    
    // Validation
    "validation.required": "Ce champ est obligatoire",
    "validation.ageRange": "L'âge doit être entre 18 et 120",
    "validation.weightRange": "Le poids doit être entre 30 et 300 kg",
    "validation.heightRange": "La taille doit être entre 100 et 250 cm",
  },
  
  ar: {
    // Navigation & General
    "app.title": "تقييم المخاطر الصحية",
    "app.subtitle": "السكري من النوع 2 ومخاطر القلب والأوعية الدموية",
    "nav.home": "الرئيسية",
    "nav.assessment": "التقييم",
    "nav.about": "حول",
    "language.select": "اللغة",
    
    // Landing Page
    "hero.title": "افهم مخاطرك الصحية",
    "hero.subtitle": "تقييم بسيط وسري لمساعدتك على فهم مخاطر الإصابة بالسكري من النوع 2 وأمراض القلب",
    "hero.cta": "ابدأ التقييم",
    "hero.time": "يستغرق حوالي 5 دقائق",
    "hero.disclaimer": "هذه الأداة تقدم معلومات صحية عامة وليست تشخيصاً طبياً",
    
    // How It Works
    "how.title": "كيف يعمل",
    "how.step1.title": "أجب عن الأسئلة",
    "how.step1.desc": "شارك معلومات أساسية عن صحتك ونمط حياتك وتاريخ عائلتك",
    "how.step2.title": "احصل على نتائجك",
    "how.step2.desc": "احصل على تقييم شخصي للمخاطر مع شرح واضح",
    "how.step3.title": "اتخذ إجراء",
    "how.step3.desc": "تعلم الخطوات التي يمكنك اتخاذها ومتى تراجع الطبيب",
    
    // Why This Matters
    "why.title": "لماذا هذا مهم",
    "why.stat1.number": "1 من 10",
    "why.stat1.label": "بالغين مصابون بالسكري حول العالم",
    "why.stat2.number": "50%",
    "why.stat2.label": "من الحالات غير مشخصة",
    "why.stat3.number": "80%",
    "why.stat3.label": "يمكن الوقاية منها بتغيير نمط الحياة",
    
    // Trust Section
    "trust.title": "معلومات موثوقة",
    "trust.desc": "تقييمنا مبني على إرشادات منظمات الصحة الرائدة",
    "trust.who": "منظمة الصحة العالمية",
    "trust.morocco": "وزارة الصحة المغربية",
    "trust.cdc": "مراكز السيطرة على الأمراض",
    "trust.ada": "الجمعية الأمريكية للسكري",
    
    // Assessment Form
    "assessment.title": "التقييم الصحي",
    "assessment.progress": "الخطوة {current} من {total}",
    "assessment.next": "متابعة",
    "assessment.back": "رجوع",
    "assessment.submit": "احصل على النتائج",
    
    // Step 1: Demographics
    "step1.title": "عنك",
    "step1.desc": "لنبدأ ببعض المعلومات الأساسية",
    "field.age": "العمر",
    "field.age.placeholder": "أدخل عمرك",
    "field.gender": "الجنس",
    "field.gender.male": "ذكر",
    "field.gender.female": "أنثى",
    "field.gender.other": "آخر",
    
    // Step 2: Physical Measurements
    "step2.title": "القياسات الجسدية",
    "step2.desc": "قياساتك الجسدية تساعدنا في تقييم المخاطر",
    "field.weight": "الوزن (كجم)",
    "field.weight.placeholder": "أدخل وزنك",
    "field.height": "الطول (سم)",
    "field.height.placeholder": "أدخل طولك",
    "field.waist": "محيط الخصر (سم)",
    "field.waist.placeholder": "اختياري - قس عند السرة",
    "field.waist.help": "قس حول بطنك عند مستوى السرة",
    
    // Step 3: Medical History
    "step3.title": "التاريخ الطبي",
    "step3.desc": "التاريخ الصحي العائلي والشخصي",
    "field.familyDiabetes": "تاريخ عائلي للسكري (أب أو أم أو أخ)",
    "field.familyHeart": "تاريخ عائلي لأمراض القلب",
    "field.highBP": "هل أخبرك أحد أن لديك ضغط دم مرتفع؟",
    "field.highCholesterol": "هل أخبرك أحد أن لديك كوليسترول مرتفع؟",
    "field.gestational": "تاريخ سكري الحمل",
    
    // Step 4: Lifestyle
    "step4.title": "عادات الحياة",
    "step4.desc": "عاداتك اليومية تؤثر على صحتك",
    "field.activity": "مستوى النشاط البدني",
    "field.activity.sedentary": "خامل (قليل أو لا تمارين)",
    "field.activity.light": "خفيف (1-2 يوم في الأسبوع)",
    "field.activity.moderate": "معتدل (3-4 أيام في الأسبوع)",
    "field.activity.active": "نشط (5+ أيام في الأسبوع)",
    "field.smoking": "حالة التدخين",
    "field.smoking.never": "لم أدخن أبداً",
    "field.smoking.former": "مدخن سابق",
    "field.smoking.current": "مدخن حالي",
    "field.diet": "جودة النظام الغذائي",
    "field.diet.poor": "ضعيف (أغلبها أطعمة معالجة)",
    "field.diet.fair": "مقبول (بعض الأطعمة الصحية)",
    "field.diet.good": "جيد (أغلبها أطعمة صحية)",
    "field.diet.excellent": "ممتاز (متوازن وطبيعي)",
    "field.sleep": "متوسط ساعات النوم",
    "field.stress": "مستوى الإجهاد",
    "field.stress.low": "منخفض",
    "field.stress.moderate": "معتدل",
    "field.stress.high": "مرتفع",
    "field.stress.veryHigh": "مرتفع جداً",
    
    // Step 5: Symptoms
    "step5.title": "الأعراض الحالية",
    "step5.desc": "هل عانيت من أي من هذه مؤخراً؟",
    "field.thirst": "عطش متكرر",
    "field.urination": "تبول متكرر",
    "field.weightChange": "تغير غير مبرر في الوزن",
    "field.fatigue": "إرهاق أو تعب غير عادي",
    "field.vision": "رؤية ضبابية",
    "field.wounds": "بطء التئام الجروح",
    "field.chestPain": "ألم أو انزعاج في الصدر",
    "field.breathing": "ضيق في التنفس",
    
    // Results Page
    "results.title": "نتائج تقييمك",
    "results.disclaimer": "هذا ليس تشخيصاً طبياً. يرجى استشارة متخصص في الرعاية الصحية.",
    
    // Risk Levels
    "risk.diabetes": "خطر السكري",
    "risk.cardiovascular": "خطر القلب والأوعية الدموية",
    "risk.overall": "مستوى الخطر الإجمالي",
    "risk.low": "منخفض",
    "risk.moderate": "معتدل",
    "risk.high": "مرتفع",
    "risk.low.desc": "عوامل الخطر لديك مسيطر عليها. استمر في العادات الصحية.",
    "risk.moderate.desc": "بعض عوامل الخطر موجودة. فكر في تغييرات نمط الحياة والفحوصات المنتظمة.",
    "risk.high.desc": "تم تحديد عدة عوامل خطر. نوصي بزيارة الطبيب قريباً.",
    
    // Urgency Levels
    "urgency.title": "الإجراء الموصى به",
    "urgency.monitor": "مراقبة",
    "urgency.monitor.desc": "استمر في نمط حياتك الصحي وحدد موعداً لفحص منتظم خلال الأشهر القادمة.",
    "urgency.soon": "راجع طبيباً قريباً",
    "urgency.soon.desc": "نوصي بتحديد موعد مع طبيبك خلال الأسابيع القادمة.",
    "urgency.urgent": "عاجل - راجع طبيباً الآن",
    "urgency.urgent.desc": "بناءً على أعراضك، نوصي بشدة بزيارة مقدم رعاية صحية في أقرب وقت ممكن.",
    
    // Contributing Factors
    "factors.title": "العوامل المؤثرة على مخاطرك",
    "factors.why": "لماذا هذا مهم",
    
    // Factor Names
    "factor.age": "العمر",
    "factor.bmi": "مؤشر كتلة الجسم",
    "factor.waist": "محيط الخصر",
    "factor.familyDiabetes": "تاريخ عائلي للسكري",
    "factor.familyHeart": "تاريخ عائلي لأمراض القلب",
    "factor.highBP": "ضغط دم مرتفع",
    "factor.highCholesterol": "كوليسترول مرتفع",
    "factor.sedentary": "قلة النشاط البدني",
    "factor.smoking": "التدخين",
    "factor.diet": "جودة النظام الغذائي",
    "factor.sleep": "نمط النوم",
    "factor.stress": "مستوى الإجهاد",
    "factor.symptoms": "الأعراض الحالية",
    
    // Factor Explanations
    "factor.age.explanation": "يزداد خطر السكري وأمراض القلب مع التقدم في العمر، خاصة بعد 45 سنة.",
    "factor.bmi.explanation": "الوزن الزائد يزيد الضغط على قلبك ويؤثر على طريقة استخدام جسمك للأنسولين.",
    "factor.waist.explanation": "الدهون حول البطن مرتبطة بارتفاع خطر السكري ومشاكل القلب.",
    "factor.familyDiabetes.explanation": "إذا كان أفراد الأسرة القريبون مصابين بالسكري، فإن خطرك الوراثي أعلى.",
    "factor.familyHeart.explanation": "أمراض القلب يمكن أن تكون وراثية، مما يجعل المراقبة المنتظمة مهمة.",
    "factor.highBP.explanation": "ضغط الدم المرتفع يضر الأوعية الدموية ويجعل القلب يعمل بجهد أكبر.",
    "factor.highCholesterol.explanation": "الكوليسترول المرتفع يمكن أن يتراكم في الشرايين، مما يقلل تدفق الدم.",
    "factor.sedentary.explanation": "النشاط البدني المنتظم يساعد في التحكم بالوزن ويحسن صحة القلب.",
    "factor.smoking.explanation": "التدخين يضر الأوعية الدموية ويزيد بشكل كبير من خطر أمراض القلب.",
    "factor.diet.explanation": "النظام الغذائي الصحي يساعد في الحفاظ على مستويات مناسبة من السكر والكوليسترول في الدم.",
    "factor.sleep.explanation": "النوم السيء يؤثر على الهرمونات التي تتحكم في الشهية وسكر الدم.",
    "factor.stress.explanation": "الإجهاد المزمن يمكن أن يرفع ضغط الدم ويؤدي إلى عادات غير صحية.",
    "factor.symptoms.explanation": "هذه الأعراض قد تشير إلى علامات مبكرة للسكري أو مشاكل القلب.",
    
    // Lifestyle Suggestions
    "lifestyle.title": "اقتراحات نمط الحياة",
    "lifestyle.subtitle": "التغييرات الصغيرة يمكن أن تحدث فرقاً كبيراً",
    "lifestyle.exercise.title": "ابق نشطاً",
    "lifestyle.exercise.desc": "استهدف 30 دقيقة من النشاط المعتدل معظم الأيام. المشي والسباحة وركوب الدراجات خيارات رائعة.",
    "lifestyle.diet.title": "كل جيداً",
    "lifestyle.diet.desc": "اختر الحبوب الكاملة والخضروات والفواكه والبروتينات الخالية من الدهون. قلل من الأطعمة المعالجة والمشروبات السكرية.",
    "lifestyle.weight.title": "حافظ على وزن صحي",
    "lifestyle.weight.desc": "حتى فقدان 5-7% من وزن الجسم يمكن أن يقلل بشكل كبير من خطر السكري.",
    "lifestyle.smoking.title": "أقلع عن التدخين",
    "lifestyle.smoking.desc": "التوقف عن التدخين في أي عمر يحسن صحة القلب ويقلل من خطر المرض.",
    "lifestyle.sleep.title": "احصل على نوم جيد",
    "lifestyle.sleep.desc": "استهدف 7-8 ساعات من النوم الجيد كل ليلة لصحة عامة أفضل.",
    "lifestyle.stress.title": "تعامل مع الإجهاد",
    "lifestyle.stress.desc": "مارس تقنيات الاسترخاء، اقض وقتاً مع أحبائك، أو جرب التأمل.",
    "lifestyle.checkups.title": "فحوصات منتظمة",
    "lifestyle.checkups.desc": "زر طبيبك بانتظام لمراقبة ضغط الدم وسكر الدم والكوليسترول.",
    "lifestyle.water.title": "حافظ على رطوبتك",
    "lifestyle.water.desc": "اشرب الكثير من الماء طوال اليوم. قلل من المشروبات السكرية والكافيين المفرط.",
    
    // Warning Signs
    "warning.title": "علامات تحذيرية يجب مراقبتها",
    "warning.subtitle": "اطلب الرعاية الطبية إذا عانيت من",
    "warning.chestPain": "ألم أو ضغط في الصدر",
    "warning.chestPain.action": "اطلب المساعدة الطبية فوراً",
    "warning.breathing": "ضيق تنفس مفاجئ",
    "warning.breathing.action": "قد يكون خطيراً - راجع طبيباً فوراً",
    "warning.thirst": "عطش وتبول مفرط",
    "warning.thirst.action": "هذه علامات شائعة للسكري - اخضع للفحص",
    "warning.vision": "تغيرات مفاجئة في الرؤية",
    "warning.vision.action": "قد تشير إلى السكري أو حالات أخرى",
    "warning.numbness": "خدر في اليدين أو القدمين",
    "warning.numbness.action": "قد يشير إلى تلف الأعصاب - استشر طبيباً",
    "warning.wounds": "جروح لا تلتئم",
    "warning.wounds.action": "ضعف الشفاء قد يكون علامة على السكري",
    "warning.fatigue": "إرهاق شديد",
    "warning.fatigue.action": "التعب المستمر يستدعي فحصاً",
    "warning.dizziness": "دوار أو إغماء",
    "warning.dizziness.action": "قد يشير إلى مشاكل في القلب أو سكر الدم",
    
    // When to See a Doctor
    "doctor.title": "متى تراجع الطبيب",
    "doctor.routine": "زيارة روتينية",
    "doctor.routine.desc": "حدد موعداً لفحص صحي منتظم لمراقبة مؤشراتك الحيوية",
    "doctor.soon": "قريباً",
    "doctor.soon.desc": "حدد موعداً خلال الأسابيع القادمة",
    "doctor.urgent": "عاجل",
    "doctor.urgent.desc": "اطلب الرعاية الطبية في أقرب وقت ممكن",
    "doctor.emergency": "طوارئ",
    "doctor.emergency.desc": "اتصل بخدمات الطوارئ أو اذهب إلى أقرب مستشفى",
    
    // Resources
    "resources.title": "مصادر موثوقة",
    "resources.subtitle": "تعلم المزيد من هذه المصادر الموثوقة",
    
    // BMI Categories
    "bmi.underweight": "نقص الوزن",
    "bmi.normal": "وزن طبيعي",
    "bmi.overweight": "زيادة الوزن",
    "bmi.obese": "سمنة",
    "bmi.value": "مؤشر كتلة جسمك",
    
    // Actions
    "action.restart": "ابدأ تقييماً جديداً",
    "action.print": "طباعة النتائج",
    "action.findDoctor": "ابحث عن طبيب",
    
    // Footer
    "footer.disclaimer": "هذه الأداة لأغراض إعلامية فقط ولا تشكل نصيحة طبية.",
    "footer.privacy": "معلوماتك لا يتم تخزينها أو مشاركتها.",
    "footer.copyright": "© 2024 تقييم المخاطر الصحية",
    
    // Validation
    "validation.required": "هذا الحقل مطلوب",
    "validation.ageRange": "يجب أن يكون العمر بين 18 و 120",
    "validation.weightRange": "يجب أن يكون الوزن بين 30 و 300 كجم",
    "validation.heightRange": "يجب أن يكون الطول بين 100 و 250 سم",
  },
  
  am: {
    // Navigation & General - Amazigh (Tamazight)
    "app.title": "ⴰⵙⴼⵔⴰⵙ ⵏ ⵜⵎⴰⴳⵉⵜ ⵏ ⵜⴷⵓⵙⵉ",
    "app.subtitle": "ⴰⵙⵓⴽⵔ ⵏ ⵡⴰⵏⴰⵡ 2 ⴷ ⵜⵎⴰⴳⵉⵜ ⵏ ⵓⵍ",
    "nav.home": "ⴰⵙⵏⵓⴱⴳ",
    "nav.assessment": "ⴰⵙⴼⵔⴰⵙ",
    "nav.about": "ⵖⴼ",
    "language.select": "ⵜⵓⵜⵍⴰⵢⵜ",
    
    // Landing Page
    "hero.title": "ⵔⵎⵙ ⵜⵎⴰⴳⵉⵜ ⵏⵏⴽ ⵏ ⵜⴷⵓⵙⵉ",
    "hero.subtitle": "ⴰⵙⴼⵔⴰⵙ ⴰⵎⵢⴰⵏ ⴷ ⵓⵙⵓⴼⵓⵖ ⴰⵎ ⴰⴷ ⴽ ⵉⵄⴰⵡⵏ ⴰⴷ ⵜⵔⵎⵙⴷ ⵜⵎⴰⴳⵉⵜ ⵏⵏⴽ",
    "hero.cta": "ⵙⵏⵜⵉ ⴰⵙⴼⵔⴰⵙ",
    "hero.time": "ⵉⵜⵜⴰⵡⵙ 5 ⵏ ⵜⵓⵙⴷⵉⴷⵉⵏ",
    "hero.disclaimer": "ⴰⵍⵍⴰⵍ ⴰⴷ ⵉⵜⵜⴰⴽⴰ ⵜⵉⵙⵖⴰⵏⵉⵏ ⵜⵉⵎⴰⵜⴰⵢⵉⵏ ⵏ ⵜⴷⵓⵙⵉ",
    
    // How It Works
    "how.title": "ⵎⴰⵎⴽ ⵉⵜⵜⵅⴷⴰⵎ",
    "how.step1.title": "ⵔⴰⵔ ⵉ ⵉⵙⵇⵙⵉⵜⵏ",
    "how.step1.desc": "ⴱⴷⵔ ⵜⵉⵙⵖⴰⵏⵉⵏ ⵜⵉⴷⵙⵍⴰⵏⵉⵏ ⵖⴼ ⵜⴷⵓⵙⵉ ⵏⵏⴽ",
    "how.step2.title": "ⵜⵜⴼ ⵜⵉⵢⴰⴼⵓⵜⵉⵏ ⵏⵏⴽ",
    "how.step2.desc": "ⵜⵜⴼ ⴰⵙⴼⵔⴰⵙ ⵏ ⵜⵎⴰⴳⵉⵜ ⴰⵏⵉⵎⴰⵏ",
    "how.step3.title": "ⵙⴽⵔ ⴰⵎⵙⴽⴰⵔ",
    "how.step3.desc": "ⵍⵎⴷ ⵜⵉⵡⵓⵔⵉⵡⵉⵏ ⴰⴷ ⵜⵙⴽⵔⴷ",
    
    // Why This Matters
    "why.title": "ⵎⴰⵖⴼ ⴰⴷ ⵉⵀⵎⵎⴰ",
    "why.stat1.number": "1 ⵙⴳ 10",
    "why.stat1.label": "ⵉⵎⵖⴰⵔⵏ ⴷⴰⵔⵙⵏ ⴰⵙⵓⴽⵔ ⴳ ⵓⵎⴰⴹⴰⵍ",
    "why.stat2.number": "50%",
    "why.stat2.label": "ⵙⴳ ⵉⵎⴰⵇⵇⴰⵏ ⵓⵔ ⵜⵢⵓⵙⵙⴰⵏ",
    "why.stat3.number": "80%",
    "why.stat3.label": "ⵉⵣⵎⵔ ⴰⴷ ⵢⵜⵜⵡⴰⵃⴹⴰ ⵙ ⵓⵙⵏⴼⵍ ⵏ ⵜⵓⴷⵔⵜ",
    
    // Trust Section
    "trust.title": "ⵜⵉⵙⵖⴰⵏⵉⵏ ⵜⴰⵎⵎⴰⵏⵉⵏ",
    "trust.desc": "ⴰⵙⴼⵔⴰⵙ ⵏⵏⵖ ⵉⵙⵏⴰⵢ ⵖⴼ ⵉⵏⵓⵎⴰⴽⵏ ⵏ ⵜⵎⴰⴷⴷⴰⵙⵉⵏ ⵏ ⵜⴷⵓⵙⵉ",
    "trust.who": "ⴰⵙⵇⵇⵉⵎ ⴰⵎⴰⴹⵍⴰⵏ ⵏ ⵜⴷⵓⵙⵉ",
    "trust.morocco": "ⵜⴰⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴷⵓⵙⵉ ⵏ ⵍⵎⵖⵔⵉⴱ",
    "trust.cdc": "ⵉⵙⴰⴳⵓⵔⵏ ⵏ ⵓⵙⵡⵓⴷⴷⵓ ⵏ ⵜⵎⴰⴹⵓⵏⵉⵏ",
    "trust.ada": "ⵜⴰⵎⵓⵏⵜ ⵜⴰⵎⴰⵔⵉⴽⴰⵏⵉⵜ ⵏ ⵓⵙⵓⴽⵔ",
    
    // Assessment Form
    "assessment.title": "ⴰⵙⴼⵔⴰⵙ ⵏ ⵜⴷⵓⵙⵉ",
    "assessment.progress": "ⴰⵙⵓⵔⵙ {current} ⵙⴳ {total}",
    "assessment.next": "ⴽⵎⵍ",
    "assessment.back": "ⵓⵖⴰⵍ",
    "assessment.submit": "ⵜⵜⴼ ⵜⵉⵢⴰⴼⵓⵜⵉⵏ",
    
    // Step 1: Demographics
    "step1.title": "ⵖⴼ ⵉⵎⴰⵏ ⵏⵏⴽ",
    "step1.desc": "ⴰⴷ ⵏⵙⵏⵜⵉ ⵙ ⵜⵉⵙⵖⴰⵏⵉⵏ ⵜⵉⴷⵙⵍⴰⵏⵉⵏ",
    "field.age": "ⵜⴰⵎⵣⵉ",
    "field.age.placeholder": "ⵙⴽⵛⵎ ⵜⴰⵎⵣⵉ ⵏⵏⴽ",
    "field.gender": "ⵜⴰⵏⴰⵡⵜ",
    "field.gender.male": "ⴰⵔⴳⴰⵣ",
    "field.gender.female": "ⵜⴰⵎⵟⵟⵓⴹⵜ",
    "field.gender.other": "ⵢⴰⴹⵏ",
    
    // Step 2: Physical Measurements
    "step2.title": "ⵜⵉⵙⴽⵜⵉⵢⵉⵏ ⵜⵉⴳⵎⴰⵏⵉⵏ",
    "step2.desc": "ⵜⵉⵙⴽⵜⵉⵢⵉⵏ ⵏⵏⴽ ⴷⴰ ⵖ ⵜⵜⴰⵡⵙⵏⵜ ⴳ ⵓⵙⴼⵔⴰⵙ",
    "field.weight": "ⴰⵜⵉⴳ (ⴽⴳ)",
    "field.weight.placeholder": "ⵙⴽⵛⵎ ⴰⵜⵉⴳ ⵏⵏⴽ",
    "field.height": "ⵜⵉⵖⵣⵉ (ⵙⵎ)",
    "field.height.placeholder": "ⵙⴽⵛⵎ ⵜⵉⵖⵣⵉ ⵏⵏⴽ",
    "field.waist": "ⵜⴰⵙⵉⴽⵜ ⵏ ⵜⴰⴷⵓⵜ (ⵙⵎ)",
    "field.waist.placeholder": "ⵓⵔ ⵉⵍⵍⵉ ⵉⵍⴰⵇ",
    "field.waist.help": "ⵙⴽⵜ ⴰⵎⵎⴰⵙ ⵏ ⵜⴰⴷⵓⵜ",
    
    // Step 3: Medical History
    "step3.title": "ⴰⵎⵣⵔⵓⵢ ⴰⵎⵙⵏⴼⴰⵔ",
    "step3.desc": "ⴰⵎⵣⵔⵓⵢ ⵏ ⵜⴷⵓⵙⵉ ⵏ ⵜⵡⵊⴰ ⴷ ⵓⵏⵉⵎⴰⵏ",
    "field.familyDiabetes": "ⴰⵎⵣⵔⵓⵢ ⵏ ⵜⵡⵊⴰ ⵏ ⵓⵙⵓⴽⵔ",
    "field.familyHeart": "ⴰⵎⵣⵔⵓⵢ ⵏ ⵜⵡⵊⴰ ⵏ ⵜⵎⴰⴹⵓⵏⵜ ⵏ ⵓⵍ",
    "field.highBP": "ⵉⵙ ⴷⴰⵔⴽ ⴰⵙⵓⵔⴼ ⵏ ⵓⵙⵓⴳ ⴰⵎⴰⵜⴰⵢ?",
    "field.highCholesterol": "ⵉⵙ ⴷⴰⵔⴽ ⴰⴽⵓⵍⵉⵙⵜⵉⵔⵓⵍ ⴰⵎⴰⵜⴰⵢ?",
    "field.gestational": "ⴰⵎⵣⵔⵓⵢ ⵏ ⵓⵙⵓⴽⵔ ⵏ ⵜⴰⴷⵉⵏⵜ",
    
    // Step 4: Lifestyle
    "step4.title": "ⵜⵉⵖⵓⵔⵉⵡⵉⵏ ⵏ ⵜⵓⴷⵔⵜ",
    "step4.desc": "ⵜⵉⵖⵓⵔⵉⵡⵉⵏ ⵏⵏⴽ ⴷⴰ ⵙⵡⵡⵓⵔⵉⵏⵜ ⵖⴼ ⵜⴷⵓⵙⵉ ⵏⵏⴽ",
    "field.activity": "ⴰⵙⵡⵉⵔ ⵏ ⵓⵙⴷⵓⵙ ⴰⴳⵎⴰⵏ",
    "field.activity.sedentary": "ⵉⴳⴳⵓⵜ (ⵉⵎⵉⴽ ⵏⵖ ⵓⵍⴰ ⵜⴰⵎⵔⴰⵔⵓⵜ)",
    "field.activity.light": "ⴰⴼⵙⵙⵓⵙ (1-2 ⵏ ⵡⵓⵙⵙⴰⵏ ⴳ ⵉⵎⴰⵍⴰⵙⵙ)",
    "field.activity.moderate": "ⴰⵏⴰⵎⵎⴰⵙ (3-4 ⵏ ⵡⵓⵙⵙⴰⵏ ⴳ ⵉⵎⴰⵍⴰⵙⵙ)",
    "field.activity.active": "ⵉⵙⴷⴷⵓⵙ (5+ ⵏ ⵡⵓⵙⵙⴰⵏ ⴳ ⵉⵎⴰⵍⴰⵙⵙ)",
    "field.smoking": "ⴰⴷⴷⴰⴷ ⵏ ⵓⴽⵎⵎⵙ",
    "field.smoking.never": "ⵓⵔ ⴷⴰ ⴽⵎⵎⵙⵖ ⴰⴱⴷⴰ",
    "field.smoking.former": "ⴰⴽⵎⵎⴰⵙ ⵉⵣⵔⵉⵏ",
    "field.smoking.current": "ⴰⴽⵎⵎⴰⵙ ⴰⵎⵉⵔⴰⵏ",
    "field.diet": "ⵜⴰⴼⴰⵔⵜ ⵏ ⵜⵉⴽⵛⵉ",
    "field.diet.poor": "ⴰⵅⵅⴰⵏ",
    "field.diet.fair": "ⵉⵅⵓⵍⴼ",
    "field.diet.good": "ⵉⵖⵓⴷⴰ",
    "field.diet.excellent": "ⵉⴼⵓⵍⴽⵉ",
    "field.sleep": "ⵉⵙⵔⴰⴳⵏ ⵏ ⵓⴳⵏ",
    "field.stress": "ⴰⵙⵡⵉⵔ ⵏ ⵓⴱⵔⴰⴽⴰⵏ",
    "field.stress.low": "ⵉⵎⵥⵥⵉ",
    "field.stress.moderate": "ⴰⵏⴰⵎⵎⴰⵙ",
    "field.stress.high": "ⵉⵎⵇⵇⵓⵔ",
    "field.stress.veryHigh": "ⵉⵎⵇⵇⵓⵔ ⴱⴰⵀⵔⴰ",
    
    // Step 5: Symptoms
    "step5.title": "ⵉⵏⵥⵉⵜⵏ ⵉⵎⵉⵔⴰⵏⵉⵏ",
    "step5.desc": "ⵉⵙ ⵜⵓⴼⴰⴷ ⵢⴰⵏ ⵙⴳ ⵉⴷⴰ ⵢⴰⵜⵜⵓⵢⵏ?",
    "field.thirst": "ⴼⴰⴹ ⵢⵜⵜⵓⵖⴰⵍⵏ",
    "field.urination": "ⵜⴰⴱⴰⵡⴰⵍⵜ ⵜⵜⵓⵖⴰⵍⵏⵜ",
    "field.weightChange": "ⴰⵙⵏⴼⵍ ⵏ ⵓⵜⵉⴳ ⵓⵔ ⵉⵜⵜⵡⴰⵙⵙⴰⵏ",
    "field.fatigue": "ⴰⵄⵢⴰ ⵓⵔ ⵉⵍⵍⵉⵏ ⴰⵎⴰⵜⴰⵢ",
    "field.vision": "ⵜⴰⵥⵕⵉ ⵜⴰⵥⵓⵖⵎⴰⵏⵜ",
    "field.wounds": "ⵉⵎⵊⵔⴰⵃ ⵓⵔ ⵉⵜⵜⴳⵏⴼⴰⵏ ⵓⵔⴰⵔ",
    "field.chestPain": "ⵜⴰⵣⵣⵓⵍⵜ ⴳ ⵉⴷⵎⴰⵔⵏ",
    "field.breathing": "ⵜⴰⵣⵣⵓⵍⵜ ⴳ ⵓⵙⵏⵓⴼⵙ",
    
    // Results Page
    "results.title": "ⵜⵉⵢⴰⴼⵓⵜⵉⵏ ⵏ ⵓⵙⴼⵔⴰⵙ ⵏⵏⴽ",
    "results.disclaimer": "ⴰⴷ ⵓⵔ ⵉⴳⵉ ⵓⵙⵉⵔⵎ ⴰⵎⵙⵏⴼⴰⵔ. ⵙⵜⵛⵉⵔ ⴰⵎⵙⵏⴼⴰⵔ.",
    
    // Risk Levels
    "risk.diabetes": "ⵜⵎⴰⴳⵉⵜ ⵏ ⵓⵙⵓⴽⵔ",
    "risk.cardiovascular": "ⵜⵎⴰⴳⵉⵜ ⵏ ⵓⵍ",
    "risk.overall": "ⴰⵙⵡⵉⵔ ⵏ ⵜⵎⴰⴳⵉⵜ ⴰⵎⴰⵜⴰⵢ",
    "risk.low": "ⵉⵎⵥⵥⵉ",
    "risk.moderate": "ⴰⵏⴰⵎⵎⴰⵙ",
    "risk.high": "ⵉⵎⵇⵇⵓⵔ",
    "risk.low.desc": "ⵉⵎⵙⴽⴰⵔⵏ ⵏ ⵜⵎⴰⴳⵉⵜ ⵏⵏⴽ ⵜⵜⵡⴰⵏⴱⴰⴹⵏ. ⴽⵎⵍ ⵜⵉⵖⵓⵔⵉⵡⵉⵏ ⵜⵉⴷⵓⵙⴰⵏⵉⵏ.",
    "risk.moderate.desc": "ⵍⵍⴰⵏⵜ ⴽⵔⴰ ⵏ ⵉⵎⵙⴽⴰⵔⵏ ⵏ ⵜⵎⴰⴳⵉⵜ. ⵙⵡⵓⵔⵉ ⵖⴼ ⵓⵙⵏⴼⵍ ⵏ ⵜⵓⴷⵔⵜ.",
    "risk.high.desc": "ⵜⵢⵓⵙⵙⴰⵏ ⵎⵏⵏⴰⵡⵜ ⵏ ⵉⵎⵙⴽⴰⵔⵏ ⵏ ⵜⵎⴰⴳⵉⵜ. ⵏⵔⴰ ⴰⴷ ⵜⵥⵕⴷ ⴰⵎⵙⵏⴼⴰⵔ ⵓⵔⴰⵔ.",
    
    // Urgency Levels
    "urgency.title": "ⴰⵎⵙⴽⴰⵔ ⵉⵜⵜⵓⵙⵜⴰⵢⵏ",
    "urgency.monitor": "ⵙⵡⵓⵜⵜⵓ",
    "urgency.monitor.desc": "ⴽⵎⵍ ⵜⵓⴷⵔⵜ ⵏⵏⴽ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴷ ⵙⵏⵢⵓⴷⴷⵓ ⴰⵙⵎⵓⵜⵜⵉ ⴰⵎⴰⵜⴰⵢ.",
    "urgency.soon": "ⵥⵕ ⴰⵎⵙⵏⴼⴰⵔ ⵓⵔⴰⵔ",
    "urgency.soon.desc": "ⵏⵔⴰ ⴰⴷ ⵜⵙⵏⵢⵓⴷⴷⵓⴷ ⵜⵉⵎⵍⵉⵍⵉⵜ ⴷ ⵓⵎⵙⵏⴼⴰⵔ ⵏⵏⴽ ⴳ ⵉⵎⴰⵍⴰⵙⵙⵏ ⴷ ⵢⵓⵛⴽⴰⵏ.",
    "urgency.urgent": "ⵉⵎⵎⵙⵜⵉ - ⵥⵕ ⴰⵎⵙⵏⴼⴰⵔ ⴷⵖⵉ",
    "urgency.urgent.desc": "ⵙ ⵓⵙⵏⴰⵢ ⵖⴼ ⵉⵏⵥⵉⵜⵏ ⵏⵏⴽ, ⵏⵔⴰ ⵙ ⵜⵣⵣⵓⵍⵜ ⴰⴷ ⵜⵥⵕⴷ ⴰⵎⵙⵏⴼⴰⵔ ⵙ ⵜⵣⵣⵉⴷⵔⵜ.",
    
    // Contributing Factors
    "factors.title": "ⵉⵎⵙⴽⴰⵔⵏ ⵉⵙⵡⵡⵓⵔⵉⵏ ⵖⴼ ⵜⵎⴰⴳⵉⵜ ⵏⵏⴽ",
    "factors.why": "ⵎⴰⵖⴼ ⴰⴷ ⵉⵀⵎⵎⴰ",
    
    // Factor Names
    "factor.age": "ⵜⴰⵎⵣⵉ",
    "factor.bmi": "ⴰⵎⵇⵇⵓⵏ ⵏ ⵓⵎⵓⵔⵙ ⵏ ⵜⴳⵎⵉ",
    "factor.waist": "ⵜⴰⵙⵉⴽⵜ ⵏ ⵜⴰⴷⵓⵜ",
    "factor.familyDiabetes": "ⴰⵎⵣⵔⵓⵢ ⵏ ⵜⵡⵊⴰ ⵏ ⵓⵙⵓⴽⵔ",
    "factor.familyHeart": "ⴰⵎⵣⵔⵓⵢ ⵏ ⵜⵡⵊⴰ ⵏ ⵜⵎⴰⴹⵓⵏⵜ ⵏ ⵓⵍ",
    "factor.highBP": "ⴰⵙⵓⵔⴼ ⵏ ⵓⵙⵓⴳ ⴰⵎⴰⵜⴰⵢ",
    "factor.highCholesterol": "ⴰⴽⵓⵍⵉⵙⵜⵉⵔⵓⵍ ⴰⵎⴰⵜⴰⵢ",
    "factor.sedentary": "ⵜⵉⵍⵉⵍⵍⵉ ⵏ ⵓⵙⴷⵓⵙ ⴰⴳⵎⴰⵏ",
    "factor.smoking": "ⴰⴽⵎⵎⵙ",
    "factor.diet": "ⵜⴰⴼⴰⵔⵜ ⵏ ⵜⵉⴽⵛⵉ",
    "factor.sleep": "ⴰⵎⴳⴳⴰⵍ ⵏ ⵓⴳⵏ",
    "factor.stress": "ⴰⵙⵡⵉⵔ ⵏ ⵓⴱⵔⴰⴽⴰⵏ",
    "factor.symptoms": "ⵉⵏⵥⵉⵜⵏ ⵉⵎⵉⵔⴰⵏⵉⵏ",
    
    // Factor Explanations (simplified Amazigh)
    "factor.age.explanation": "ⵜⵎⴰⴳⵉⵜ ⵏ ⵓⵙⵓⴽⵔ ⴷ ⵜⵎⴰⴹⵓⵏⵜ ⵏ ⵓⵍ ⴷⴰ ⵜⵜⵣⵣⵉⴳⵉⵣ ⵙ ⵜⵎⵣⵉ.",
    "factor.bmi.explanation": "ⴰⵜⵉⴳ ⵉⵎⵇⵇⵓⵔⵏ ⴷⴰ ⵉⵜⵜⴰⵡⵙ ⵜⴰⵣⵣⵓⵍⵜ ⵖⴼ ⵓⵍ ⵏⵏⴽ.",
    "factor.waist.explanation": "ⴰⴷⵔⵉⵎ ⴰⵎⵎⴰⵙ ⵏ ⵜⴰⴷⵓⵜ ⵉⵜⵜⵎⵓⵔⵙ ⴷ ⵜⵎⴰⴳⵉⵜ ⵉⵎⵇⵇⵓⵔⵏ.",
    "factor.familyDiabetes.explanation": "ⵎⴰ ⴷⴰⵔ ⵉⵎⴷⴷⵓⴽⴽⴰⵍ ⵏ ⵜⵡⵊⴰ ⴰⵙⵓⴽⵔ, ⵜⵎⴰⴳⵉⵜ ⵏⵏⴽ ⵜⵉⵎⵇⵇⵓⵔⴰⵏⵜ.",
    "factor.familyHeart.explanation": "ⵜⵎⴰⴹⵓⵏⵜ ⵏ ⵓⵍ ⵜⵣⵎⵔ ⴰⴷ ⵜⴽⴽ ⴳ ⵜⵡⵊⴰ.",
    "factor.highBP.explanation": "ⴰⵙⵓⵔⴼ ⵏ ⵓⵙⵓⴳ ⴰⵎⴰⵜⴰⵢ ⴷⴰ ⵉⵙⵡⵡⵓⵔⵉ ⵖⴼ ⵉⵎⵙⵓⴳⴰⵍ ⵏ ⵓⵙⵓⴳ.",
    "factor.highCholesterol.explanation": "ⴰⴽⵓⵍⵉⵙⵜⵉⵔⵓⵍ ⴰⵎⴰⵜⴰⵢ ⵉⵣⵎⵔ ⴰⴷ ⵢⵓⴳⵔ ⴳ ⵉⵎⵙⵓⴳⴰⵍ.",
    "factor.sedentary.explanation": "ⴰⵙⴷⵓⵙ ⴰⴳⵎⴰⵏ ⴷⴰ ⵉⵜⵜⴰⵡⵙ ⴳ ⵓⵙⵡⵓⴷⴷⵓ ⵏ ⵓⵜⵉⴳ.",
    "factor.smoking.explanation": "ⴰⴽⵎⵎⵙ ⴷⴰ ⵢⵙⵙⵡⵡⵓⵔⵉ ⵖⴼ ⵉⵎⵙⵓⴳⴰⵍ ⵏ ⵓⵙⵓⴳ.",
    "factor.diet.explanation": "ⵜⵉⴽⵛⵉ ⵜⴰⴷⵓⵙⴰⵏⵜ ⴷⴰ ⵜⵜⴰⵡⵙ ⴳ ⵓⵙⵙⵓⴷⵓ ⵏ ⵓⵙⵓⴽⵔ ⴳ ⵓⵙⵓⴳ.",
    "factor.sleep.explanation": "ⵓⴳⵏ ⵉⵏⵣⵏ ⴷⴰ ⵉⵙⵡⵡⵓⵔⵉ ⵖⴼ ⵉⵀⵓⵔⵎⵓⵏⵏ.",
    "factor.stress.explanation": "ⴰⴱⵔⴰⴽⴰⵏ ⵉⵎⵇⵇⵓⵔⵏ ⵉⵣⵎⵔ ⴰⴷ ⵢⵓⵙⵙⵓⴷⵓ ⴰⵙⵓⵔⴼ ⵏ ⵓⵙⵓⴳ.",
    "factor.symptoms.explanation": "ⵉⵏⵥⵉⵜⵏ ⴰⴷ ⵉⵣⵎⵔⵏ ⴰⴷ ⵉⵎⵎⵍⵏ ⵉⵏⵥⵉⵜⵏ ⵉⵎⵣⵡⴰⵔⵓⵜⵏ ⵏ ⵓⵙⵓⴽⵔ.",
    
    // Lifestyle Suggestions
    "lifestyle.title": "ⵉⵙⵜⵓⵛⵉⵏ ⵏ ⵜⵓⴷⵔⵜ",
    "lifestyle.subtitle": "ⵉⵙⵏⴼⴰⵍⵏ ⵉⵎⵥⵢⴰⵏⵏ ⵣⵎⵔⵏ ⴰⴷ ⵙⴽⵔⵏ ⴰⵙⵏⴼⵍ ⴰⵎⵇⵇⵔⴰⵏ",
    "lifestyle.exercise.title": "ⵇⵇⵉⵎ ⵜⵙⴷⵓⵙⴷ",
    "lifestyle.exercise.desc": "ⵙⵡⵓⵔⵉ 30 ⵏ ⵜⵓⵙⴷⵉⴷⵉⵏ ⵏ ⵓⵙⴷⵓⵙ ⴰⵏⴰⵎⵎⴰⵙ.",
    "lifestyle.diet.title": "ⵛⵛ ⵉⵖⵓⴷⴰⵏ",
    "lifestyle.diet.desc": "ⵙⵜⵢ ⵜⵉⴳⵎⵎⵉⵏ ⵜⵉⵎⴰⵙⴰⵢⵉⵏ ⴷ ⵉⵎⴰⴽⴰⵔⵏ ⴷ ⵉⵖⵉⵙⴰⵏ.",
    "lifestyle.weight.title": "ⵃⴹⵓ ⴰⵜⵉⴳ ⴰⴷⵓⵙⴰⵏ",
    "lifestyle.weight.desc": "ⵜⵉⵍⵉⵍⵍⵉ ⵏ 5-7% ⵏ ⵓⵜⵉⴳ ⵏ ⵜⴳⵎⵉ ⵜⵣⵎⵔ ⴰⴷ ⵜⵙⵉⵙⵙⵏ ⵜⵎⴰⴳⵉⵜ.",
    "lifestyle.smoking.title": "ⴱⴷⴷ ⴰⴽⵎⵎⵙ",
    "lifestyle.smoking.desc": "ⵜⵉⵍⵉⵍⵍⵉ ⵏ ⵓⴽⵎⵎⵙ ⴳ ⴽⵓ ⵜⵎⵣⵉ ⴷⴰ ⵜⵙⵙⴽⴽⵉⵔ ⵜⴷⵓⵙⵉ ⵏ ⵓⵍ.",
    "lifestyle.sleep.title": "ⵜⵜⴼ ⵓⴳⵏ ⵉⵖⵓⴷⴰⵏ",
    "lifestyle.sleep.desc": "ⵙⵡⵓⵔⵉ ⵖⴼ 7-8 ⵏ ⵉⵙⵔⴰⴳⵏ ⵏ ⵓⴳⵏ ⴽⵓ ⵉⴹ.",
    "lifestyle.stress.title": "ⵙⵡⵓⴷⴷⵓ ⴰⴱⵔⴰⴽⴰⵏ",
    "lifestyle.stress.desc": "ⵙⵡⵓⵔⵉ ⵉⵙⵏⴼⴰⵍⵏ ⵏ ⵓⵙⵎⵙⵉ, ⵣⵔⵉ ⴰⴽⵓⴷ ⴷ ⵡⵉⵏⵏⴰⴽ ⵜⵃⵎⵎⵍⴷ.",
    "lifestyle.checkups.title": "ⵉⵙⵎⵓⵜⵜⵉⵢⵏ ⵉⵎⴰⵜⴰⵢⵏ",
    "lifestyle.checkups.desc": "ⵥⵕ ⴰⵎⵙⵏⴼⴰⵔ ⵏⵏⴽ ⵙ ⵓⵎⴰⵜⴰⵢ ⴰⴷ ⵢⵙⵡⵓⵜⵜⵓ ⴰⵙⵓⵔⴼ ⵏ ⵓⵙⵓⴳ.",
    "lifestyle.water.title": "ⵇⵇⵉⵎ ⵜⵙⵎⴷⴷⵉⴷ",
    "lifestyle.water.desc": "ⵙⵙⵓ ⴰⵎⴰⵏ ⵉⴳⴳⵓⵜⵏ ⵎⴰⵕⵕⴰ ⴰⵙⵙ.",
    
    // Warning Signs
    "warning.title": "ⵉⵏⵥⵉⵜⵏ ⵏ ⵓⵙⵎⴽⵜⵉ ⴰⴷ ⵜⵙⵡⵓⵜⵜⵓⴷ",
    "warning.subtitle": "ⵔⵥⵎ ⴰⵎⵙⵏⴼⴰⵔ ⵎⴰ ⵜⵓⴼⴰⴷ",
    "warning.chestPain": "ⵜⴰⵣⵣⵓⵍⵜ ⵏⵖ ⴰⵙⵓⵔⴼ ⴳ ⵉⴷⵎⴰⵔⵏ",
    "warning.chestPain.action": "ⵔⵥⵎ ⵜⵉⵡⵉⵙⵉ ⵜⴰⵎⵙⵏⴼⴰⵔⵜ ⴷⵖⵉⴰ",
    "warning.breathing": "ⵜⴰⵣⵣⵓⵍⵜ ⴳ ⵓⵙⵏⵓⴼⵙ ⵜⴰⵣⵣⵉⴳⵣⵜ",
    "warning.breathing.action": "ⴰⴷ ⵢⵉⵍⵉ ⵉⵎⵎⵙⵜⵉ - ⵥⵕ ⴰⵎⵙⵏⴼⴰⵔ ⴷⵖⵉⴰ",
    "warning.thirst": "ⴼⴰⴹ ⴷ ⵜⴰⴱⴰⵡⴰⵍⵜ ⵉⵎⵇⵇⵓⵔⵏ",
    "warning.thirst.action": "ⴰⴷ ⴳⴰⵏ ⵉⵏⵥⵉⵜⵏ ⵏ ⵓⵙⵓⴽⵔ - ⵙⴽⵔ ⵜⴰⵔⵎⵉⵜ",
    "warning.vision": "ⵉⵙⵏⴼⴰⵍⵏ ⵉⵣⵣⵉⴳⵣⵏ ⴳ ⵜⵥⵕⵉ",
    "warning.vision.action": "ⵉⵣⵎⵔ ⴰⴷ ⵢⵎⵎⵍ ⴰⵙⵓⴽⵔ ⵏⵖ ⵜⵉⵖⴰⵔⴰⵙⵉⵏ ⵢⴰⴹⵏ",
    "warning.numbness": "ⵜⴰⵍⵍⵓⵏⵜ ⴳ ⵉⴼⴰⵙⵙⵏ ⵏⵖ ⵉⴹⴰⵕⵕⵏ",
    "warning.numbness.action": "ⵉⵣⵎⵔ ⴰⴷ ⵢⵎⵎⵍ ⵜⵓⵙⵙⵏⴰ ⵏ ⵉⵥⵓⵕⴰⵏ",
    "warning.wounds": "ⵉⵎⵊⵔⴰⵃ ⵓⵔ ⵉⵜⵜⴳⵏⴼⴰⵏ",
    "warning.wounds.action": "ⵜⵓⴳⵏⴼⴰ ⵜⴰⵎⵥⵢⴰⵏⵜ ⵜⵣⵎⵔ ⴰⴷ ⵜⴳ ⵜⴰⵎⴰⵜⴰⵔⵜ ⵏ ⵓⵙⵓⴽⵔ",
    "warning.fatigue": "ⴰⵄⵢⴰ ⵉⵎⵇⵇⵓⵔⵏ",
    "warning.fatigue.action": "ⴰⵄⵢⴰ ⵉⵇⵇⵉⵎⵏ ⵉⵍⴰⵇ ⴰⵙⵎⵓⵜⵜⵉ",
    "warning.dizziness": "ⵜⴰⵙⵎⵉⵔⵜ ⵏⵖ ⵜⴰⵎⵙⴽⵓⵔⵜ",
    "warning.dizziness.action": "ⵉⵣⵎⵔ ⴰⴷ ⵢⵎⵎⵍ ⵜⵓⵙⵙⵏⴰ ⵏ ⵓⵍ ⵏⵖ ⵓⵙⵓⴽⵔ",
    
    // When to See a Doctor
    "doctor.title": "ⵎⵍⵎⵉ ⴰⴷ ⵜⵥⵕⴷ ⴰⵎⵙⵏⴼⴰⵔ",
    "doctor.routine": "ⵜⵉⵎⵍⵉⵍⵉⵜ ⵜⴰⵎⴰⵜⴰⵢⵜ",
    "doctor.routine.desc": "ⵙⵏⵢⵓⴷⴷⵓ ⴰⵙⵎⵓⵜⵜⵉ ⴰⵎⴰⵜⴰⵢ ⵏ ⵜⴷⵓⵙⵉ",
    "doctor.soon": "ⵓⵔⴰⵔ",
    "doctor.soon.desc": "ⵙⴽⵔ ⵜⵉⵎⵍⵉⵍⵉⵜ ⴳ ⵉⵎⴰⵍⴰⵙⵙⵏ ⴷ ⵢⵓⵛⴽⴰⵏ",
    "doctor.urgent": "ⵉⵎⵎⵙⵜⵉ",
    "doctor.urgent.desc": "ⵔⵥⵎ ⴰⵎⵙⵏⴼⴰⵔ ⵙ ⵜⵣⵣⵉⴷⵔⵜ",
    "doctor.emergency": "ⵜⴰⵣⵣⵉⴳⵣⵜ",
    "doctor.emergency.desc": "ⵙⵉⵡⵍ ⵉ ⵜⵏⴰⴼⵓⵜⵉⵏ ⵏ ⵜⵣⵣⵉⴳⵣⵜ",
    
    // Resources
    "resources.title": "ⵉⵙⴰⴳⵓⵔⵏ ⵉⵎⴰⵎⵎⴰⵏⵏ",
    "resources.subtitle": "ⵉⵍⵎⴷ ⵓⴳⴳⴰⵔ ⵙⴳ ⵉⵙⴰⴳⵓⵔⵏ ⴰⴷ",
    
    // BMI Categories
    "bmi.underweight": "ⵜⵉⵍⵉⵍⵍⵉ ⵏ ⵓⵜⵉⴳ",
    "bmi.normal": "ⴰⵜⵉⴳ ⴰⵎⴰⵜⴰⵢ",
    "bmi.overweight": "ⴰⵜⵉⴳ ⵉⵎⵇⵇⵓⵔⵏ",
    "bmi.obese": "ⵜⴰⵣⴷⵓⵖⵜ",
    "bmi.value": "ⴰⵎⵇⵇⵓⵏ ⵏ ⵓⵎⵓⵔⵙ ⵏ ⵜⴳⵎⵉ ⵏⵏⴽ",
    
    // Actions
    "action.restart": "ⵙⵏⵜⵉ ⴰⵙⴼⵔⴰⵙ ⴰⵎⴰⵢⵏⵓ",
    "action.print": "ⵙⵉⴳⴳⵍ ⵜⵉⵢⴰⴼⵓⵜⵉⵏ",
    "action.findDoctor": "ⴰⴼ ⴰⵎⵙⵏⴼⴰⵔ",
    
    // Footer
    "footer.disclaimer": "ⴰⵍⵍⴰⵍ ⴰⴷ ⴷ ⵜⵙⵖⵏⵉ ⵜⴰⵎⴰⵜⴰⵢⵜ, ⵓⵔ ⵉⴳⵉ ⵓⵙⵜⴰⵢ ⴰⵎⵙⵏⴼⴰⵔ.",
    "footer.privacy": "ⵜⵉⵙⵖⴰⵏⵉⵏ ⵏⵏⴽ ⵓⵔ ⵜⵜⵡⴰⵃⴹⴰⵏⵜ ⵓⵔ ⵜⵜⵡⴰⴱⴹⴰⵏⵜ.",
    "footer.copyright": "© 2024 ⴰⵙⴼⵔⴰⵙ ⵏ ⵜⵎⴰⴳⵉⵜ ⵏ ⵜⴷⵓⵙⵉ",
    
    // Validation
    "validation.required": "ⵢⵓⵔ ⴰⴷ ⵉⵍⴰⵇ",
    "validation.ageRange": "ⵜⴰⵎⵣⵉ ⵉⵍⴰⵇ ⴰⴷ ⵜⵉⵍⵉ ⴳⵔ 18 ⴷ 120",
    "validation.weightRange": "ⴰⵜⵉⴳ ⵉⵍⴰⵇ ⴰⴷ ⵢⵉⵍⵉ ⴳⵔ 30 ⴷ 300 ⴽⴳ",
    "validation.heightRange": "ⵜⵉⵖⵣⵉ ⵉⵍⴰⵇ ⴰⴷ ⵜⵉⵍⵉ ⴳⵔ 100 ⴷ 250 ⵙⵎ",
  },
};

export function getTranslation(lang: Language, key: string, params?: Record<string, string | number>): string {
  let text = translations[lang]?.[key] || translations.en[key] || key;
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
  }
  
  return text;
}

export function isRTL(lang: Language): boolean {
  return lang === "ar";
}

export const languageNames: Record<Language, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  am: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
};

export const languageFlags: Record<Language, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  ar: "🇲🇦",
  am: "ⵣ",
};
