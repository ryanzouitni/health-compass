# Health Risk Assessment Platform

## Overview

A multilingual health risk assessment web application focused on Type 2 Diabetes and Cardiovascular disease risk evaluation. The platform provides personalized risk assessments with lifestyle recommendations, targeting users in Morocco with support for English, French, Arabic, and Amazigh (Tifinagh) languages.

The application follows a stateless assessment model where users complete a health questionnaire, receive calculated risk results, and get actionable health guidance - all without requiring user accounts or persistent data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state, React Context for UI state (language, theme)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with custom plugins for Replit integration

**Key Design Decisions**:
- Material Design principles adapted for healthcare with emphasis on trust, clarity, and accessibility
- RTL support built-in for Arabic language
- Custom font loading for Arabic (Noto Sans Arabic) and Amazigh (Noto Sans Tifinagh)
- Dark/light theme support with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Validation**: Zod schemas shared between client and server

**Key Design Decisions**:
- Stateless API design - assessments are calculated server-side but not persisted
- In-memory storage interface allows future database integration without code changes
- Risk calculation algorithm based on WHO and CDC guidelines for diabetes/cardiovascular risk
- Comprehensive symptom tracking with 30+ predefined symptoms plus free-text custom symptom input
- **Pediatric cases (infant/child)**: Return `isPediatricUnsupported` early with safe message; only DKA red flag detection (fruity breath, lethargy, vomiting)
- **Results split**: Urgency factors (symptom-based, primary) vs Risk factors (long-term prevention, secondary)
- **No PHI logging**: All server/client logging sanitized to avoid exposing health data
- **Facility filtering**: Urgent cases show only hospitals/emergency; moderate/low show all types
- **Free-text keyword detection removed**: Unsafe for multilingual use; relies on explicit symptom checkboxes only

### Symptom Tracking System
The platform includes an expanded symptom tracking system organized by category:
- **Common Symptoms (all ages)**: thirst, urination, weight change, fatigue, frequent hunger, dry mouth
- **Additional Adult Symptoms**: numbness/tingling, dizziness, itchy skin, muscle cramps, headaches, sweating, skin changes (acanthosis nigricans), blurred vision, slow wound healing
- **Heart-Related Symptoms**: chest pain, shortness of breath, irregular heartbeat, swollen feet/ankles
- **Pediatric Symptoms**: bedwetting, lethargy, fruity breath (DKA sign), vomiting, irritability, poor feeding, wet diaper changes, growth concerns
- **Custom Symptoms**: Free-text input for any symptoms not covered by predefined options

Custom symptoms are factored into the risk evaluation:
- Add +1 to both diabetes and cardiovascular risk scores
- Create a "Additional Reported Symptoms" contributing factor displayed in results
- Trigger "see a doctor soon" urgency recommendation

### API Response Structure
The `/api/assess` endpoint returns a structured JSON response with clear separation:
```json
{
  "success": true,
  "urgency": { "level", "factors[]", "recommendedActionKey" },
  "longTermRisk": { "level", "diabetesRisk", "cardiovascularRisk", "score", "factors[]", "bmi", "bmiCategory" },
  "lifestyleSuggestions": [...],
  "warningSigns": [...],
  "carePathway": { ... },
  "facilityRecommendations": [...],
  "meta": { "isPediatricUnsupported", "disclaimerKey", "locationProvided", "facilityNoteKey" }
}
```
- `urgency` = acute/symptom-driven assessment (primary display)
- `longTermRisk` = chronic risk factors for prevention (secondary display)
- Pediatric cases (infant/child) return `meta.isPediatricUnsupported: true` with no long-term scoring

### Security
- **Helmet** security headers enabled (CSP disabled for dev compatibility)
- **Rate limiting**: 60 requests per 15 minutes per IP on `/api/assess`
- **No PHI logging**: Server logs only method/path/status/duration, never request bodies

### Data Flow
1. User completes multi-step assessment form on frontend
2. Form data validated against shared Zod schema
3. POST to `/api/assess` with assessment data
4. Server calculates risk scores and generates personalized recommendations
5. Structured response returned with urgency and longTermRisk separated
6. Full response stored in sessionStorage (not just result object)

### Internationalization (i18n)
- Client-side translation system with 4 supported languages: English, French, Arabic, Amazigh
- Translation keys stored in `client/src/lib/translations.ts`
- RTL layout automatically applied for Arabic
- Language preference persisted in localStorage

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route components (Landing, Assessment, Results)
    lib/          # Utilities, contexts, translations
    hooks/        # Custom React hooks
server/           # Express backend
  routes.ts       # API endpoint definitions
  storage.ts      # Storage interface (currently in-memory)
shared/           # Shared TypeScript types and Zod schemas
  schema.ts       # Assessment form schema and result types
```

## External Dependencies

### Database
- **Drizzle ORM** configured with PostgreSQL dialect
- Schema defined in `shared/schema.ts`
- Database URL expected via `DATABASE_URL` environment variable
- Currently using in-memory storage; database can be provisioned when needed

### UI Component Library
- **shadcn/ui** with Radix UI primitives
- New York style variant with neutral base colors
- CSS variables for theming support

### Third-Party Services
- No external API integrations currently
- Design references WHO and Morocco Ministry of Health guidelines (content only, no API)

### Key NPM Packages
- `@tanstack/react-query` - Server state management
- `react-hook-form` with `@hookform/resolvers` - Form handling
- `zod` - Schema validation
- `drizzle-orm` / `drizzle-kit` - Database ORM and migrations
- `wouter` - Client-side routing
- `date-fns` - Date utilities
- `lucide-react` - Icon library