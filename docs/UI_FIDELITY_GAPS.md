# Nuzio AI — UI Fidelity & Gap Analysis

> **Comparison Baseline:** [Figma Design Reference](https://www.figma.com/make/QiQUACRSe3wTmemKFaA1fD/Create-Nuzio-AI-Screens--Community-?t=hPQ4FhDgnxPgoO3H-1) & [`docs/FIGMA_AUDIT.md`](file:///c:/Users/shiva/.gemini/antigravity-ide/scratch/nuzio-ai/docs/FIGMA_AUDIT.md)

This document audits every screen and component in the current codebase against the Figma design specification, identifying all exact text, visual, layout, and state gaps, along with the precise corrections required.

---

## 1. Screen-by-Screen Gap Analysis & Required Corrections

### 1.1 Splash / Landing Page (`/`)
- **Current Implementation:** Basic landing container with hero logo and "Get Started" / "Sign in" CTA.
- **Figma Requirement:**
  - Executive hero header with 100px Nuzio logo and purple glow.
  - Tagline: `"Personalized AI-powered daily news briefing for modern professionals."`
  - Real-time schedule pill: `<Radio size={14} /> Curated every morning at 7:00 AM`.
  - Primary CTA: `"Get Started"` with `<ArrowRight />`.
  - Secondary text: `"Takes less than 60 seconds to personalize"`.
  - Secondary navigation: `"Already have an account? Sign in"`.
  - Bottom metadata: `"Audio & Text Executive Briefings • India & Global"`.
- **Exact Change Required:** Update styling to deep black (`#08090B`), ensure 100px logo hero box with centered radial glow, verify button sizing and typography tokens.

---

### 1.2 Onboarding Screens (`/onboarding/*`)

#### Step 1: Language (`/onboarding/language`)
- **Current Implementation:** Selectable cards for English and Hindi with location toggle.
- **Figma Requirement:**
  - Step overline: `"Step 1"`.
  - Title: `"Choose your\nlanguage"`.
  - Subtitle: `"Select the primary language for your daily synthesized news briefings."`.
  - Option 1: `"English"` (badge `"Default"`) — Sub: `"Personalized daily audio & text briefing"`.
  - Option 2: `"हिन्दी"` (badge `"Hindi"`) — Sub: `"हिंदी में आपका दैनिक ब्रीफ और समाचार विश्लेषण"`.
  - Location box: `<MapPin />` with toggle `"Enable Local Intelligence"` and sub `"Surface verified city & regional business updates"`.
  - CTA: `"Continue"`.
- **Exact Change Required:** Refine card backgrounds to `#15161C` with `rgba(255,255,255,0.10)` borders and active purple selection rings (`#7657FF`).

#### Step 2: Welcome / Proposition (`/onboarding/welcome`)
- **Current Implementation:** Welcome card with value propositions and Google CTA.
- **Figma Requirement:**
  - Badge: `<Sparkles /> AI Audio & Executive Briefings`.
  - Title: `"Good morning.\nNews on go."`.
  - Subtitle: `"Personalized audio news for Indian professionals — curated every morning from hundreds of verified global and local sources."`.
  - Value cards with verified icons:
    - `"5-Minute Audio Synthesis: Crystal clear neural voices tailored to your commute."`
    - `"Zero Clickbait: Distilled high-signal insights across markets, tech, and policy."`
    - `"Fact-Checked Precision: Multi-source verification algorithm."`
  - CTA: `"Set up your briefing"`.
- **Exact Change Required:** Standardize card padding and alignment.

#### Step 3: Profession Focus (`/onboarding/profession`)
- **Current Implementation:** Chip matrix of professions.
- **Figma Requirement:**
  - Step overline: `"Step 2"`.
  - Title: `"What's your\nprofession?"`.
  - Subtitle: `"We'll tune every brief to what actually moves your day."`.
  - Exact professions: `Technology`, `Finance & Banking`, `Consulting`, `Healthcare & Biotech`, `Venture Capital`, `Legal & Policy`, `Marketing & Media`, `Real Estate`, `Education`, `Research / Science`.
  - Interactive selection chips with checkmarks and purple glow on select.
- **Exact Change Required:** Ensure clean 2-column mobile and 3-column tablet/desktop grid.

#### Step 4: Niches & Interests (`/onboarding/interests`)
- **Current Implementation:** 12 interest chips with 7 selection cap.
- **Figma Requirement:**
  - Step overline: `"Step 3"`.
  - Badge: `"{count}/7 Selected"`.
  - Title: `"What moves\nyour world?"`.
  - Subtitle: `"Pick up to 7 niches to focus your personal AI news filter."`.
  - Exact topics: `AI & Technology`, `Financial Markets`, `Indian Business`, `Global Politics`, `Startups`, `Science`, `Geopolitics`, `Health & Medicine`, `Climate & Energy`, `Culture & Arts`, `Legal & Policy`, `Education`.
- **Exact Change Required:** Ensure counter badge dynamically shifts to purple when 7/7 selected.

#### Step 5: Narrator Voice (`/onboarding/narrator`)
- **Current Implementation:** 3 voice cards with play sample button.
- **Figma Requirement:**
  - Step overline: `"Step 4"`.
  - Title: `"Pick a\nnarrator voice."`.
  - Subtitle: `"Tap to hear a 10-second sample of your daily AI narrator."`.
  - Voice 1: `"Aria"` (Female, `"Warm / Professional"`) — Sample: `"Good morning. Global markets opened higher today as semiconductor..."`.
  - Voice 2: `"Kai"` (Male, `"Calm / Conversational"`) — Sample: `"Here is your daily brief. Tech venture investments in India rose 18%..."`.
  - Voice 3: `"Meera"` (Female, `"Bright / Energetic"`) — Sample: `"Top story for your morning: New regulatory guidelines for AI deployment..."`.
  - Voice 4: `"Orion"` (Male, `"Authoritative / Deep"`) — Sample: `"Executive summary: Central banks signal interest rate holds across major economies..."`.
  - Play button with animated audio bars during preview.
- **Exact Change Required:** Add 4th voice (`Orion`) matching audit, style animated equalizer bars.

#### Step 6: Schedule (`/onboarding/brief-time`)
- **Current Implementation:** Time slots with AM/PM toggle.
- **Figma Requirement:**
  - Step overline: `"Step 5"`.
  - Title: `"When do you\nwant your brief?"`.
  - Subtitle: `"Your personalized audio brief will be generated fresh at this time."`.
  - Active time display card with clock icon.
  - AM / PM segmented buttons.
  - Slots: `6:00`, `6:30`, `7:00`, `7:30`, `8:00`, `8:30`, `9:00`, `9:30`.
- **Exact Change Required:** Refine time typography with tabular numbers.

#### Step 7: Notifications (`/onboarding/notifications`)
- **Current Implementation:** Mock push alert with 3 toggles.
- **Figma Requirement:**
  - Step overline: `"Step 6"`.
  - Title: `"Stay in\nthe loop."`.
  - Subtitle: `"Turn on notifications so you never miss your morning executive brief."`.
  - Push mockup: `"NUZIO AI • 7:00 AM"` / `"Your morning brief is ready"` / `"5 min audio • {profession} briefing on {topic}"`.
  - Toggles: `"Daily brief ready"`, `"Breaking alerts"`, `"Weekly intelligence digest"`.
  - Actions: `"Allow notifications"`, `"Not now"`.
- **Exact Change Required:** Ensure mockup card visually mimics an executive push notification.

#### Step 8: Ready Summary (`/onboarding/ready`)
- **Current Implementation:** Summary list with 6 preferences.
- **Figma Requirement:**
  - Icon halo with checkmark.
  - Title: `"You're ready,\n{name}."`.
  - Subtitle: `"Your first brief will be ready tomorrow at {briefTime}."`.
  - Summary rows for Language, Profession, Selected Niches, AI Narrator, Schedule, and Notifications with green checkmarks.
  - CTA: `"Create account & start listening"`.
- **Exact Change Required:** Ensure smooth transition to `/register` with state passed.

---

### 1.3 Authentication Screens

#### Register Page (`/register`)
- **Current Implementation:** Form with Name, Email, Password, Confirm Password.
- **Figma Requirement:**
  - Title: `"Create your account."`.
  - Subtitle: `"Your personalized executive briefing will be ready every morning."`.
  - Personalization linked badge when coming from onboarding (`"✦ Personalization linked"`).
  - Form fields: Full Name, Email Address, Password, Confirm Password.
  - CTA: `"Create Account & Start Briefing"`.
  - Footer: `"Already have an account? Sign in"`.
- **Exact Change Required:** Maintain validation rules and design token alignment.

#### Login Page (`/login`)
- **Current Implementation:** Form with Email and Password.
- **Figma Requirement:**
  - Title: `"Welcome back."`.
  - Subtitle: `"Sign in to continue to your daily brief."`.
  - Form fields: Email Address, Password (with toggle), `"Forgot password?"`.
  - CTA: `"Sign In"`.
  - Footer: `"Don't have an account? Create account"`.
- **Exact Change Required:** Maintain token rehydration and redirect behavior.

---

### 1.4 Daily Briefing Dashboard / Home (`/app/home`)
- **Current Implementation:** Placeholder card.
- **Figma Requirement:**
  - **Header Area**:
    - Live status badge: `<Radio className="pulse" /> AI Audio Intelligence Active`.
    - Greeting: `"Good morning, {name}"`.
    - Date & Pulse: Current formatted date (e.g. `Thursday, September 17, 2026`) with market pulse indicator (`Markets: Bullish +0.8% • AI Pulse: Active`).
  - **Master Audio Briefing Card**:
    - Title: `"Your Daily Briefing"` (5 min total duration).
    - Narrator voice chip: `<Volume2 /> Narrated by {narrator}`.
    - Play / Pause master button with gradient glow.
    - Waveform scrubber with elapsed/total time (`1:24 / 5:00`).
    - Speed selector chip (`1x`, `1.25x`, `1.5x`, `2x`).
  - **Curated Top Stories (5 AI Executive Cards)**:
    - Story 1 (AI & Tech): *"OpenAI & Anthropic Announce Next-Gen Autonomous Reasoning Models for Enterprise"*
    - Story 2 (Markets & VC): *"Global Semiconductor Stocks Surge Following Record 3nm Foundry Commitments"*
    - Story 3 (Indian Business): *"India's Digital Infrastructure Capex Crosses $35B in Renewable Energy Push"*
    - Story 4 (Geopolitics & Trade): *"G7 Reaches Historic Accord on Cross-Border AI Safety and Data Sovereign Frameworks"*
    - Story 5 (Science & Health): *"CRISPR-Based Precision Therapeutics Receive Breakthrough FDA Fast-Track Designation"*
    - Each card includes: Category Badge, Source Publisher (`Reuters`, `Bloomberg`, `TechCrunch`), Read Time (`2 min read`), 3 High-Impact Bullet Points, Audio snippet play button, Bookmark button, Share button.
  - **Story Detail Modal (`/app/story/:id`)**:
    - Opens full expanded briefing on card click with detailed narrative, bullet takeaways, publisher link, and audio speech synthesis.
- **Exact Change Required:** Replace `HomePlaceholder.jsx` with full production `HomePage.jsx` containing the complete Daily Briefing experience.

---

### 1.5 Discover Hub (`/app/discover`)
- **Current Implementation:** Wildcard mapping to placeholder.
- **Figma Requirement:**
  - Page Header: `"Discover & Explore"` / `"Real-time curated news across global and local frontiers."`.
  - Search Bar: Quick keyboard shortcut (`⌘K` / `Ctrl+K`), instant search with clear button.
  - Sticky Category Tabs: `All`, `AI & Tech`, `Markets`, `Indian Business`, `Geopolitics`, `Science`, `Crypto & Web3`, `Climate Tech`.
  - Featured Story Hero Card: High-priority breaking story with full background image, gradient overlay, and audio trigger.
  - Trending Topic Pills: `#GenerativeAI`, `#Semiconductors`, `#FederalReserve`, `#StartupsIndia`, `#Quantum`.
  - Search Results & Filter Grid: Responsive card grid with shimmer loading states and empty state ("No stories found for '{query}'").
- **Exact Change Required:** Create `DiscoverPage.jsx` with category filter state, search filter debounce, bookmark support, and modal triggers.

---

### 1.6 Settings & Personalization (`/app/settings`)
- **Current Implementation:** Wildcard mapping to placeholder.
- **Figma Requirement:**
  - Header: `"Settings & Preferences"` / `"Manage your briefing frequency, voice narrator, and account."`.
  - Profile Section: Avatar, Full Name, Email, Plan Tier Badge (`Free` or `Pro`).
  - Personalization Section:
    - Language switcher (`English` / `हिन्दी`).
    - Profession editor (`Technology`, `Finance`, etc.).
    - Topic Niches editor with interactive chip selection.
    - AI Narrator voice selector (`Aria`, `Kai`, `Meera`, `Orion`).
    - Delivery schedule time picker (`7:00 AM`).
  - Notifications Section:
    - Daily brief ready toggle.
    - Breaking alerts toggle.
    - Weekly digest toggle.
  - Account & Security:
    - Change password dialog trigger.
    - Upgrade subscription CTA.
    - Sign Out button (red danger variant).
- **Exact Change Required:** Create `SettingsPage.jsx` connected to `useAuth()` and `PATCH /api/users/me`.

---

### 1.7 Billing & Subscription Plans (`/app/billing`)
- **Current Implementation:** Wildcard mapping to placeholder.
- **Figma Requirement:**
  - Header: `"Executive Intelligence Plans"` / `"Unlock unlimited AI briefings, all neural narrator voices, and offline audio."`.
  - Period Toggle: Monthly vs. Annual (`"Annual (Save 20%)"` badge).
  - Free Explorer Card: `$0 / month` — 3 Daily summaries, 1 voice, standard schedule.
  - Pro Executive Briefing Card (Highlighted Purple Glow): `$9.99 / mo` (or `$79.99 / yr`) — Unlimited briefings, all 4 neural voices, custom delivery time, offline downloads, instant breaking alerts.
  - Feature Comparison Checklist with green verified checkmarks.
  - Plan Actions: `"Current Plan"` (disabled) vs `"Upgrade to Pro Executive"`.
- **Exact Change Required:** Create `BillingPage.jsx` with plan toggle state and service abstraction.

---

### 1.8 Persistent Global Audio Player
- **Current Implementation:** None.
- **Figma Requirement:**
  - Floating player bar affixed to bottom of `/app/*` screens above bottom nav.
  - Controls: Play/Pause, Rewind 15s, Forward 30s, Progress timeline scrubber, Current/Total time, Speed multiplier (`0.75x`, `1x`, `1.25x`, `1.5x`, `2x`), Volume mute toggle, and expand to fullscreen modal button.
  - Expandable Fullscreen Audio Sheet showing story title, narrator avatar, animated waveform, and transcript text.
- **Exact Change Required:** Create `AudioContext.jsx`, `AudioPlayer.jsx`, and `FullscreenAudioModal.jsx` integrated into `AppLayout.jsx`.

---

## 2. Implementation Action Plan

| Phase | Target Components | Actions |
| :--- | :--- | :--- |
| **Step 1** | `frontend/src/data/mockData.js` | Expand mock data with exact Figma story articles, categories, trending tags, narrator audio metadata, and plan definitions. |
| **Step 2** | `frontend/src/context/AudioContext.jsx` | Implement global audio player context with persistent state across route navigation. |
| **Step 3** | `frontend/src/components/audio/` | Create `AudioPlayer.jsx`, `FullscreenAudioModal.jsx`, `AudioControls.jsx`. |
| **Step 4** | `frontend/src/pages/home/HomePage.jsx` | Build complete Daily Briefing screen with audio player bar, 5 curated story cards, and story detail modal. |
| **Step 5** | `frontend/src/pages/discover/DiscoverPage.jsx` | Build Discover screen with `⌘K` search, category tabs, featured story, and trending pills. |
| **Step 6** | `frontend/src/pages/settings/SettingsPage.jsx` | Build Settings screen with live profile editing and preference syncing. |
| **Step 7** | `frontend/src/pages/billing/BillingPage.jsx` | Build Billing & Plans screen with pricing switch and feature matrix. |
| **Step 8** | `frontend/src/routes/AppRoutes.jsx` | Wire all new routes (`/app/home`, `/app/discover`, `/app/settings`, `/app/billing`). |
| **Step 9** | `frontend/src/index.css` | Add complete styling rules, waveforms, responsive breakpoints, and interaction states. |
| **Step 10** | Validation & QA | Run `npm run build:frontend`, test responsive layouts, and verify zero console errors. |
