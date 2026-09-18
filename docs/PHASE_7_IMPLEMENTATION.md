# Phase 7: Settings & Preferences Implementation

## 1. Screens
- Settings Dashboard (`/app/settings`)

## 2. Sections
- **Profile / Account**: Avatar, Name, Email, Tier Badge, Pro Upgrade CTA.
- **Briefing Language**: English vs Hindi selector.
- **AI Narrator Voice**: Avatar tiles for Aria, Nova, Orion, Echo.
- **Daily Briefing Schedule**: Horizontal scrolling time chips (6:00 AM - 9:00 AM).
- **Profession Focus**: Chips for industry selection.
- **Selected Topic Niches**: Max 7 chips, reflects onboarding state.
- **Notification Channels**: Executive Push Alerts toggle.
- **Appearance**: Dark Mode / Light Mode toggle (Added per Audit).
- **Data & Privacy**: Data sharing / Telemetry toggle (Added per Audit).
- **Danger Zone**: Sign Out button.

## 3. Fields & Controls
- Name (`text` - mock only, avatar derives from it)
- Language (`button` pills)
- Narrator (`div` clickable tiles)
- Schedule (`button` chips)
- Profession (`Chip`)
- Interests (`Chip`)
- Notifications (`Toggle`)
- Appearance (`Toggle` or `Select`)
- Privacy (`Toggle`)

## 4. Interactions & Data Flow
- All changes update the local React state immediately (Optimistic UI).
- Clicking "Save Changes" invokes `updateProfile()` in `AuthContext`, patching the backend/mock DB.
- "Sign Out of Account" clears session and redirects to `/login`.

## 5. Responsive Behavior
- **Mobile (320px - 767px)**: Full width cards, vertical stacking, horizontal scrolling for time pills.
- **Tablet (768px - 1023px)**: Centered layout with constrained width.
- **Desktop (1024px+)**: Max-width container, proper alignment, sidebar navigation is preserved.

## 6. Exact Text
- "Settings & Personalization"
- "Configure your daily delivery schedule, neural voice narrator, and news filtering priorities."
- "Save Changes" / "Changes Saved"
- "PRO EXECUTIVE" / "FREE TIER"
- "Briefing Language"
- "AI Narrator Voice"
- "Daily Briefing Schedule"
- "Profession Focus"
- "Selected Topic Niches"
- "Notification Channels"
- "Appearance / Dark Mode" (New)
- "Data & Privacy Options" (New)
- "Sign Out of Account"
