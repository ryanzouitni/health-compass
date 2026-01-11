# Type 2 Diabetes & Cardiovascular Risk Platform - Design Guidelines

## Design Approach: Healthcare-Focused Material Design

**Rationale**: Medical applications demand clarity, trust, and accessibility above all. Drawing from Material Design's robust information architecture combined with healthcare leaders like Mayo Clinic and NHS Digital.

**Core Principles**:
- Trust through clarity and professional presentation
- Information hierarchy that guides users through complex health data
- Cultural sensitivity with multi-language, RTL support
- Accessibility as a fundamental requirement, not an afterthought

---

## Typography System

**Font Stack**: Inter (Google Fonts) for all text
- **Headings**: 600-700 weight
  - H1: text-4xl md:text-5xl
  - H2: text-3xl md:text-4xl  
  - H3: text-xl md:text-2xl
- **Body**: 400 weight, text-base md:text-lg
- **Labels/Captions**: 500 weight, text-sm
- **Risk Indicators**: 700 weight, text-lg md:text-xl

---

## Layout System

**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 12
- Component padding: p-4 to p-6
- Section spacing: py-8 md:py-12
- Card gaps: gap-6
- Max container width: max-w-4xl (narrow focus for readability)

---

## Component Library

### Navigation
- Sticky header with language selector (4 flags: EN/FR/AR/AM)
- Logo left, minimal nav links center, language right
- Mobile: Hamburger menu with language selector in drawer

### Hero Section (Minimal)
- Single viewport section (h-screen), centered content
- **Image**: Warm, diverse family/community scene (healthcare context without clinical setting)
- Headline: "Understand Your Health Risk" with subtitle
- Primary CTA: "Start Assessment" (large, prominent)
- Trust badges below CTA: WHO + Morocco Ministry of Health logos (small, understated)

### Assessment Form (Multi-Step)
- Progress indicator: Stepped progress bar with 4-5 stages
- Cards for each question group with generous padding (p-6)
- Input types: Radio buttons, number inputs, checkboxes
- Clear labels with helper text
- "Back" and "Continue" navigation buttons

### Results Display
- **Risk Level Card**: Large card at top with icon, level (Low/Moderate/High), brief description
  - Visual indicator: Icon + bold text + supporting graphics (not just color)
- **Urgency Banner**: Prominent alert-style component with action instruction
- **Contributing Factors**: List with icons, each factor explained
- **Why It Matters**: Expandable accordion sections
- **Lifestyle Suggestions**: Grid of cards (2 columns on desktop)
- **Warning Signs**: Checklist with clear icons
- **When to See Doctor**: Timeline/flowchart visual
- **Resources**: Footer section with trusted source links

### Cards
- Rounded corners: rounded-lg
- Shadow: shadow-md
- Padding: p-6
- Borders for secondary cards: border-2

### Buttons
- Primary: Large, rounded-full, px-8 py-4
- Secondary: Outlined, rounded-full
- On images: Backdrop blur (backdrop-blur-md bg-white/90)

### Icons
**Heroicons** (via CDN) for all UI elements:
- Risk levels: ExclamationTriangleIcon, ShieldCheckIcon
- Factors: HeartIcon, ScaleIcon, ClockIcon
- Actions: ArrowRightIcon, ChevronDownIcon

---

## Page Structure

### Landing Page (5 sections)
1. **Hero**: Image-backed CTA
2. **How It Works**: 3-step process (Assess → Understand → Act)
3. **Why This Matters**: Statistics + simple explanation grid (2-col)
4. **Trusted Information**: Logo wall + accreditation details
5. **Footer**: Language resources, privacy, contact

### Assessment Page
- Progress bar fixed at top
- Single question group per screen
- Bottom navigation (Back/Continue)

### Results Page
- Risk summary card (full-width)
- 6 content sections (stacked, clear hierarchy)
- Print/Save options header
- Sticky CTA: "Consult a Doctor" button

---

## Accessibility & Cultural Considerations

- RTL layout switching for Arabic (dir="rtl" attribute)
- All text translatable without layout breaking
- High contrast ratios (WCAG AAA where possible)
- Risk levels use icons + text + patterns (never color alone)
- Focus indicators on all interactive elements
- Screen reader announcements for risk results

---

## Images

**Hero Image**: Warm, professional photo of diverse individuals/family in everyday setting (not clinical). Should convey wellness, care, and trust. Placement: Full-width background with overlay gradient for text legibility.

**Additional Images**: Small supportive icons/illustrations for lifestyle suggestions (walking, healthy food, sleep) - use simple line illustrations, not photos.