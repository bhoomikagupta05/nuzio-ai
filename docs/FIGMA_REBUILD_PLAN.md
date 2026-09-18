# Figma Rebuild Plan

## Core Requirement
The Figma design is the absolute visual source of truth. The application must be rebuilt screen-by-screen to exactly match the Figma design in layout, typography, colors, padding, margins, copy, and responsive behavior. No generic interpretations or placeholders are allowed.

## Screen Mapping

### 1. Splash / Landing Page
- **Route**: `/`
- **Figma Layout**: Centered hero layout, 100vh.
- **Exact Visible Text**: 
  - "Personalized AI-powered daily news briefing for modern professionals."
  - "Curated every morning at 7:00 AM" (pill)
  - "Get Started" (button)
  - "Takes less than 60 seconds to personalize"
  - "Already have an account? Sign in"
  - "Audio & Text Executive Briefings • India & Global"
- **Components**: Hero container, Nuzio Logo (100px), Badge/Pill, CTA Button, Link text.
- **Colors/Gradients**: Background `#08090B`, primary button `#7657FF` to `#8B6CFF`, radial glow.
- **Typography**: Inter (Display, Body Large, Caption).
- **Responsive Behavior**: Stacked centrally on mobile, scaled padding on desktop.

### 2. Onboarding: Language Selection
- **Route**: `/onboarding/language`
- **Figma Layout**: 2-column or stacked card layout with top navigation/progress.
- **Exact Visible Text**:
  - "Step 1"
  - "Choose your language"
  - "Select the primary language for your daily synthesized news briefings."
  - "English" ("Default" badge), "Personalized daily audio & text briefing"
  - "हिन्दी" ("Hindi" badge), "हिंदी में आपका दैनिक ब्रीफ और समाचार विश्लेषण"
  - "Enable Local Intelligence", "Surface verified city & regional business updates"
  - "Continue"
- **Components**: ProgressIndicator, SelectionCards, Toggle/Switch, Button.
- **Colors/Gradients**: Cards `#15161C`, active ring `#7657FF`, border `rgba(255,255,255,0.10)`.

### 3. Onboarding: Welcome & Identity
- **Route**: `/onboarding/welcome`
- **Figma Layout**: Stacked card layout with avatar selection and input field.
- **Exact Visible Text**:
  - "AI Audio & Executive Briefings" (badge)
  - "Good morning. News on go."
  - "Personalized audio news for Indian professionals — curated every morning from hundreds of verified global and local sources."
  - "5-Minute Audio Synthesis: Crystal clear neural voices tailored to your commute."
  - "Zero Clickbait: Distilled high-signal insights across markets, tech, and policy."
  - "Fact-Checked Precision: Multi-source verification algorithm."
  - "Set up your briefing"
- **Components**: Proposition cards, CTA.
- **Colors/Gradients**: Surface `#15161C`, primary `#7657FF`.

### 4. Onboarding: Profession / Industry
- **Route**: `/onboarding/profession`
- **Figma Layout**: Chip matrix / grid.
- **Exact Visible Text**:
  - "Step 2"
  - "What's your profession?"
  - "We'll tune every brief to what actually moves your day."
  - Exact professions: Technology, Finance & Banking, Consulting, Healthcare & Biotech, Venture Capital, Legal & Policy, Marketing & Media, Real Estate, Education, Research / Science.
- **Components**: Chip matrix, Continue button.

### 5. Onboarding: Topic Niches & Interests
- **Route**: `/onboarding/interests`
- **Figma Layout**: Chip matrix.
- **Exact Visible Text**:
  - "Step 3"
  - "{count}/7 Selected"
  - "What moves your world?"
  - "Pick up to 7 niches to focus your personal AI news filter."
  - Exact topics: AI & Technology, Financial Markets, Indian Business, Global Politics, Startups, Science, Geopolitics, Health & Medicine, Climate & Energy, Culture & Arts, Legal & Policy, Education.
- **Components**: Chip matrix, count badge.

### 6. Onboarding: AI Narrator Voice
- **Route**: `/onboarding/narrator`
- **Figma Layout**: Stacked voice cards with play buttons.
- **Exact Visible Text**:
  - "Step 4"
  - "Pick a narrator voice."
  - "Tap to hear a 10-second sample of your daily AI narrator."
  - Voice profiles (Aria, Kai, Meera, Orion) with characteristics (e.g., "Warm / Professional").
  - "Play voice sample"
- **Components**: VoicePreviewCard, AudioBars.

### 7. Onboarding: Daily Briefing Schedule
- **Route**: `/onboarding/brief-time`
- **Figma Layout**: Time slot picker / Segmented control.
- **Exact Visible Text**:
  - "Step 5"
  - "When do you want your brief?"
  - "Your personalized audio brief will be generated fresh at this time."
  - Slots: 6:00, 6:30, 7:00, 7:30, 8:00, 8:30, 9:00, 9:30.
- **Components**: Time Selection Pills, AM/PM toggle.

### 8. Onboarding: Notification Preferences
- **Route**: `/onboarding/notifications`
- **Figma Layout**: Settings toggles and a mockup notification preview.
- **Exact Visible Text**:
  - "Step 6"
  - "Stay in the loop."
  - "Turn on notifications so you never miss your morning executive brief."
  - Toggles: "Daily brief ready", "Breaking alerts", "Weekly intelligence digest".
  - Actions: "Allow notifications", "Not now".
- **Components**: MockNotification, Toggle, Buttons.

### 9. Onboarding: Ready / Summary
- **Route**: `/onboarding/ready`
- **Figma Layout**: Summary list card.
- **Exact Visible Text**:
  - "You're ready, {name}."
  - "Your first brief will be ready tomorrow at {briefTime}."
  - Summary rows (Language, Profession, Niches, Narrator, Schedule, Notifications).
  - "Create account & start listening"
- **Components**: SummaryList, Icons, Primary CTA.

### 10. Authentication: Register
- **Route**: `/register`
- **Figma Layout**: Centered authentication card layout.
- **Exact Visible Text**:
  - "Create your account."
  - "Your personalized executive briefing will be ready every morning."
  - "✦ Personalization linked" (if from onboarding).
  - Labels: Full Name, Email Address, Password, Confirm Password.
  - CTA: "Create Account & Start Briefing".
  - Footer: "Already have an account? Sign in".
- **Components**: TextInput, PasswordToggle, CTA, Link.

### 11. Authentication: Login
- **Route**: `/login`
- **Figma Layout**: Centered authentication card layout.
- **Exact Visible Text**:
  - "Welcome back."
  - "Sign in to continue to your daily brief."
  - "Forgot password?"
  - "Sign In"
  - "Don't have an account? Create account"
- **Components**: TextInput, PasswordToggle, CTA, Link.

### 12. Daily Briefing (Home)
- **Route**: `/app/home`
- **Figma Layout**: Sidebar (Desktop) / Bottom Nav (Mobile). Header with live pulse, Master Audio Card, Curated Story List.
- **Exact Visible Text**:
  - "Good morning, {name}"
  - "AI Audio Intelligence Active"
  - Date (e.g., Thursday, September 17, 2026)
  - "Markets: Bullish +0.8% • AI Pulse: Active"
  - "Your Daily Briefing"
  - "Narrated by {narrator}"
  - Speed selector ("1x", "1.25x", "1.5x", "2x")
  - Read Time ("2 min read")
  - Source publishers (Reuters, Bloomberg, etc.)
  - Bulleted takeaways.
- **Components**: AppLayout, TopBar, Sidebar, BottomNavigation, MasterAudioCard, NewsCard.

### 13. Discover
- **Route**: `/app/discover`
- **Figma Layout**: Search header, Sticky tabs, Hero card, Story grid.
- **Exact Visible Text**:
  - "Discover & Explore"
  - "Real-time curated news across global and local frontiers."
  - "Search..." ("⌘K" shortcut hint)
  - Category tabs: All, AI & Tech, Markets, Indian Business, Geopolitics, Science, Crypto & Web3, Climate Tech.
  - Trending Tags: #GenerativeAI, #Semiconductors, etc.
- **Components**: SearchInput, CategoryTabs, TrendingChips, FeaturedNewsCard, NewsGrid.

### 14. Settings & Preferences
- **Route**: `/app/settings`
- **Figma Layout**: Sectioned settings list.
- **Exact Visible Text**:
  - "Settings & Preferences"
  - "Manage your briefing frequency, voice narrator, and account."
  - Profile card, Plan Tier Badge (Free / Pro).
  - Toggles for Language, Profession, Topic Niches, AI Narrator, Delivery schedule, Notifications.
  - "Sign Out"
- **Components**: ProfileCard, SettingSection, SettingRow, Toggle.

### 15. Billing & Subscription Plans
- **Route**: `/app/billing`
- **Figma Layout**: Side-by-side (desktop) or stacked (mobile) pricing cards.
- **Exact Visible Text**:
  - "Executive Intelligence Plans"
  - "Unlock unlimited AI briefings, all neural narrator voices, and offline audio."
  - "Annual (Save 20%)"
  - "Free Explorer" ($0 / month)
  - "Pro Executive Briefing" ($9.99 / mo)
  - Feature lists with verified checkmarks.
  - "Upgrade to Pro Executive"
- **Components**: PlanCard, FeatureChecklist, BillingToggle.

### 16. Persistent Audio Player & Modal
- **Route**: Global Overlay
- **Figma Layout**: Floating bottom bar above navigation; slide-up full screen modal.
- **Components**: AudioPlayer, FullscreenAudioModal, Waveform, TimelineScrubber, SpeedControl.

## Implementation Rules
1. Start by recreating the core Design System (`index.css` or theme variables).
2. Rebuild components exactingly according to Figma spacing, typography, and color tokens.
3. Replace existing screens completely if they diverge fundamentally.
4. Constantly compare rendered output to the Figma reference during implementation.
