# Nuzio AI — Complete Figma-to-MERN Architectural & UI/UX Audit

> **Document Version:** 1.0.0  
> **Source of Truth:** [Figma Community — Create Nuzio AI Screens](https://www.figma.com/make/QiQUACRSe3wTmemKFaA1fD/Create-Nuzio-AI-Screens--Community-?t=hPQ4FhDgnxPgoO3H-1)  
> **Design Philosophy:** Dark-first executive intelligence dashboard with subtle atmospheric purple undertones (`#7657FF`), precision typography (Inter), glassmorphic card containers (`#15161C`), and rich audio & AI briefing workflows.

---

## Table of Contents

1. [Complete Screen Inventory](#1-complete-screen-inventory)
2. [Screen-to-Screen Navigation Map](#2-screen-to-screen-navigation-map)
3. [User Journeys & State Machines](#3-user-journeys--state-machines)
4. [Interactive Elements Inventory](#4-interactive-elements-inventory)
5. [Button Behavior Matrix](#5-button-behavior-matrix)
6. [Form & Input Behavior](#6-form--input-behavior)
7. [Navigation Architecture (Mobile, Tablet, Desktop)](#7-navigation-architecture)
8. [Modal & Bottom Sheet Behavior](#8-modal--bottom-sheet-behavior)
9. [Selection & State Management (Pills, Chips, Toggles)](#9-selection--state-management)
10. [Audio Player Architecture & Persistent Streaming](#10-audio-player-architecture)
11. [Settings & Personalization Behavior](#11-settings--personalization-behavior)
12. [Billing, Plans & Subscription Behavior](#12-billing--plans--subscription-behavior)
13. [Responsive Layout Strategy (320px to 1920px)](#13-responsive-layout-strategy)
14. [Design System Tokens & Visual Language](#14-design-system-tokens)
15. [Component Architecture Hierarchy](#15-component-architecture-hierarchy)
16. [Assets & Iconography Requirements](#16-assets--iconography-requirements)
17. [Backend API Requirements](#17-backend-api-requirements)
18. [Database Schemas (Mongoose / MongoDB)](#18-database-schemas)
19. [AI & Gemini Prompt Engineering Architecture](#19-ai--gemini-prompt-engineering)
20. [Recommended Phased Implementation Order](#20-recommended-phased-implementation-order)

---

## 1. Complete Screen Inventory

| ID | Screen / View Name | Route Path | Access Level | Description & Core Visual Units |
| :--- | :--- | :--- | :--- | :--- |
| **SCR-01** | **Splash / Landing Page** | `/` | Public | Hero screen with animated Nuzio AI logo (100px), purple atmospheric radial glow, executive tagline, real-time schedule pill (`Curated every morning at 7:00 AM`), Primary CTA ("Get Started"), and secondary link ("Already have an account? Sign in"). |
| **SCR-02** | **Onboarding: Language Selection** | `/onboarding/language` | Public | Step 1 of onboarding. Language selection grid (English, Hindi, etc.) with native script labels, auto-detect location toggle, step progress indicator, Back & Continue buttons. |
| **SCR-03** | **Onboarding: Welcome & Identity** | `/onboarding/welcome` | Public | Step 2. Personalized introduction screen. User name text input, AI briefing premise explanation, avatar selection chip, Continue CTA. |
| **SCR-04** | **Onboarding: Profession / Industry** | `/onboarding/profession` | Public | Step 3. Industry focus selection cards (Tech & AI, Finance & Markets, Healthcare & Biotech, Venture Capital, Legal & Policy, Media & Creative). |
| **SCR-05** | **Onboarding: Topic Niches & Interests** | `/onboarding/interests` | Public | Step 4. Interactive chip matrix (Generative AI, Global Macro, Semiconductors, Quantum Computing, Climate Tech, Crypto & Web3, Biohacking, Electric Mobility). Max selection cap (7 niches) with selection counter. |
| **SCR-06** | **Onboarding: AI Narrator Voice** | `/onboarding/narrator` | Public | Step 5. Neural voice selection (Aria, Nova, Orion, Echo). Audio preview sample button (`Play voice sample`), voice characteristic tags (Crisp, Authoritative, Conversational, Dynamic). |
| **SCR-07** | **Onboarding: Daily Briefing Schedule** | `/onboarding/brief-time` | Public | Step 6. Schedule delivery time selector (6:00 AM, 7:00 AM, 8:00 AM, Custom Time Picker), timezone detection indicator, delivery frequency settings. |
| **SCR-08** | **Onboarding: Notification Preferences** | `/onboarding/notifications` | Public | Step 7. Push alert toggles: Morning Brief ready, Breaking Critical News alerts, Weekend In-Depth Executive Digest. Live interactive iOS/Android mock notification bubble preview. |
| **SCR-09** | **Onboarding: Ready / Summary** | `/onboarding/ready` | Public | Step 8. Personalized readiness overview card summarizing all 6 configured dimensions with glowing verified checkmarks. Primary CTA: "Create account & start listening". |
| **SCR-10** | **Authentication: Register** | `/register` | Public | Account creation screen. Preserves & links onboarding preference state. Form fields: Full Name, Email, Password, Password Confirmation. Inline validation, password visibility toggles, link to `/login`. |
| **SCR-11** | **Authentication: Login** | `/login` | Public | User authentication screen. Fields: Email, Password. Actions: "Sign In", "Forgot Password", "Create Account" link to `/register`. |
| **SCR-12** | **Daily Briefing (Home Dashboard)** | `/app/home` | Protected | Core executive intelligence experience. Header with dynamic greeting (`Good morning, {name}`), date, weather/market pulse, Master Daily Audio Briefing player bar (Play/Pause, Waveform progress, 1x/1.5x/2x speed, voice chip), Top 5 Curated AI Story Cards with category pills, executive bullet points, full audio stream trigger, pull-to-refresh. |
| **SCR-13** | **Story Detail Modal / Sheet** | `/app/story/:id` | Protected | Full expanded briefing for an individual story. Key takeaways bullet points, full AI synthesis narrative, original publisher attribution link, text-to-speech audio control, bookmark & share actions. |
| **SCR-14** | **Discover & Curated Feeds** | `/app/discover` | Protected | Discovery hub. Search bar with instant keyboard shortcut (`⌘K` / `Ctrl+K`), sticky category filter pills (All, AI & Tech, Markets, Geopolitics, Science, Crypto, Climate), Featured High-Impact Story card, Trending Briefings list, Search results grid with loading skeletons & empty states. |
| **SCR-15** | **Settings & Preferences** | `/app/settings` | Protected | Comprehensive personalization hub. Account Profile (name, email, avatar, tier badge), Daily Briefing Timing, Audio Narrator Voice Switcher, Topic & Niche Editor, Notification Channel Toggles, Appearance / Dark Mode, Data & Privacy options, Logout button. |
| **SCR-16** | **Billing, Plans & Subscriptions** | `/app/billing` | Protected | Monetization interface. Monthly/Annual billing switch (showing 20% discount tag), Plan Comparison Cards (Free Explorer vs. Pro Executive Briefing), Feature Checklist (Unlimited AI generation, Neural Voice Synthesis, Offline audio downloads, Breaking market alerts), Upgrade / Manage Subscription CTA. |
| **SCR-17** | **Persistent / Fullscreen Audio Player** | Global Overlay | App-wide | Floating persistent mini-player at bottom of `/app/*` and expandable modal/sheet: full timeline scrubber, elapsed/remaining time, rewind 15s, forward 30s, volume slider, playback speed selector (0.75x, 1x, 1.25x, 1.5x, 2x), transcript synchronized highlight. |
| **SCR-18** | **Design System & Component Showcase** | `/design-system` | Dev/Public | Interactive developer gallery demonstrating all design tokens, color swatches, typography scales, button states, input variants, modal triggers, and responsive layout primitives. |

---

## 2. Screen-to-Screen Navigation Map

```
                             NUZIO AI NAVIGATION GRAPH
                             
                                [ Landing Page ] (/)
                                      │
                 ┌────────────────────┴────────────────────┐
                 │                                         │
                 ▼                                         ▼
         [ Onboarding Flow ]                         [ Login Screen ] (/login)
                 │                                         │
        (1) Language (/language)                           │
                 │                                         │
        (2) Welcome (/welcome)                             │
                 │                                         │
        (3) Profession (/profession)                       │
                 │                                         │
        (4) Interests (/interests)                         │
                 │                                         │
        (5) Narrator (/narrator)                           │
                 │                                         │
        (6) Brief Time (/brief-time)                       │
                 │                                         │
        (7) Notifications (/notifications)                 │
                 │                                         │
        (8) Ready (/ready)                                 │
                 │                                         │
                 ▼                                         │
        [ Register Screen ] (/register) ◄──────────────────┤
                 │                                         │
                 └────────────────────┬────────────────────┘
                                      │ (Authenticated JWT)
                                      ▼
                         ┌─────────────────────────┐
                         │   PROTECTED APP SHELL   │
                         │        (/app/*)         │
                         └────────────┬────────────┘
                                      │
         ┌───────────────────┬────────┴───────────┬───────────────────┐
         │                   │                    │                   │
         ▼                   ▼                    ▼                   ▼
    [ Daily Brief ]     [ Discover ]         [ Settings ]        [ Billing ]
     (/app/home)       (/app/discover)     (/app/settings)     (/app/billing)
         │                   │                    │                   │
         ▼                   ▼                    │                   │
  [ Story Modal ]     [ Search / Filter ]         │                   │
  (/app/story/:id)     (Instant Filter)           │                   │
         │                   │                    │                   │
         └───────────────────┼────────────────────┴───────────────────┘
                             │
                             ▼
               [ Persistent Audio Player ] (Global Bar / Modal)
```

---

## 3. User Journeys & State Machines

### 3.1 First-Time User Journey (Onboarding to Daily Executive Briefing)
1. **Landing (`/`)**: User views value proposition, clicks "Get Started".
2. **Language Selection (`/onboarding/language`)**: Selects English or Hindi. Selection triggers immediate active pill highlight.
3. **Welcome (`/onboarding/welcome`)**: User inputs name. Validation ensures string length >= 2.
4. **Profession (`/onboarding/profession`)**: Selects executive niche (e.g. Technology). Card displays glowing violet border on selection.
5. **Interests (`/onboarding/interests`)**: Selects 3–7 topic chips. Counter reflects count (`4/7 selected`). Continue CTA becomes enabled when `>= 1` topic is chosen.
6. **Narrator (`/onboarding/narrator`)**: Plays voice sample. Selects "Aria" neural voice.
7. **Schedule (`/onboarding/brief-time`)**: Selects `7:00 AM`. Timezone is auto-detected.
8. **Notifications (`/onboarding/notifications`)**: Configures alerts. Interactive notification preview renders in real time.
9. **Ready (`/onboarding/ready`)**: Reviews complete 6-point personalization summary. Clicks "Create account & start listening".
10. **Register (`/register`)**: Enters email and password. Form automatically attaches the onboarding state payload.
11. **Home (`/app/home`)**: User lands directly on personalized Daily Briefing with name, schedule, topic feeds, and audio synthesis ready.

### 3.2 Returning Authenticated User Journey
1. **Login (`/login`)**: Enters credentials -> JWT issued -> stored in `localStorage` -> redirected to `/app/home`.
2. **Daily Briefing (`/app/home`)**: Views top stories, clicks "Play Daily Brief" -> global audio bar begins playback with synchronized waveform animation.
3. **Story Deep Dive (`/app/story/:id`)**: Clicks story card -> opens modal with AI bullet summaries, sources, and story-specific audio playback.
4. **Discover (`/app/discover`)**: Filters by "Semiconductors" -> browses real-time news summaries.
5. **Settings / Upgrade (`/app/settings`, `/app/billing`)**: Switches narrator voice or upgrades to Pro tier.

---

## 4. Interactive Elements Inventory

### 4.1 Global Interactive Elements
- **NuzioLogo (`size: small | medium | large | hero`)**: Click navigates to `/` (public) or `/app/home` (authenticated).
- **Navigation Items (Sidebar, TopBar, BottomNav)**:
  - Daily Brief (`/app/home`)
  - Discover (`/app/discover`)
  - Settings (`/app/settings`)
  - Billing / Pro (`/app/billing`)
- **Global Audio Floating Player**:
  - Play / Pause button
  - Skip forward 15s / Skip backward 15s
  - Playback speed button (`1x` -> `1.25x` -> `1.5x` -> `2x`)
  - Interactive timeline scrubber bar
  - Close / minimize trigger
- **Search Input (`⌘K`)**: Opens search focus with instant filter debounce (250ms).
- **Notification Bell**: Shows badge dot when new briefings or breaking alerts exist.

### 4.2 Onboarding Interactive Elements
- **Language Tiles**: Single-select cards with native typography.
- **Location Auto-Detect Toggle**: Toggles browser geolocation permission query.
- **Text Inputs (Name, Email, Password)**: Floating labels, left icon slots, right visibility toggles, clear buttons.
- **Profession Selection Cards**: Icon badge, title, description, checkmark halo on select.
- **Topic Chips**: Multi-select pills with toggle state, active purple glow, check icon.
- **Voice Player Trigger**: Inline audio button that plays preview audio clip without leaving screen.
- **Time Selector Chips / Custom Picker**: Time pills with active selection ring.
- **Switch / Toggle Primitives**: Smooth 200ms spring transition with high contrast thumb.

### 4.3 Home & Discover Interactive Elements
- **Play Hero Daily Brief CTA**: Gradient pill button with pulse wave indicator.
- **Category Filter Tabs**: Horizontal scrollable container with active tab underline / pill indicator.
- **News Story Cards**:
  - Card body click -> opens Story Detail modal.
  - Quick Play audio button -> plays single story audio synopsis.
  - Bookmark icon button -> toggles save state with toast notification.
  - Share icon button -> copies link to clipboard with toast notification.
- **Trending Topic Tags**: Click filters Discover feed to selected tag.
- **Pull-to-Refresh (Mobile)**: Triggers API re-fetch with spinner animation.

---

## 5. Button Behavior Matrix

| Button Component & Variant | Locations | Default State | Hover State | Active / Clicked | Disabled State | Loading State |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Button `variant="primary"`** | Landing CTA, Onboarding Continue, Register, Login, Upgrade Plan | Solid gradient (`#7657FF` -> `#8B6CFF`), white text, subtle purple glow | Brightness 110%, box-shadow glow increases 40% | Scale `0.98`, opacity 90% | Opacity 40%, cursor `not-allowed`, glow disabled | Spinner replaces right icon, text preserved, non-clickable |
| **Button `variant="secondary"`** | Back buttons, Preview Modal, Re-run onboarding | Dark surface (`#1C1D24`), 1px border `rgba(255,255,255,0.12)` | Border color `#7657FF`, surface `#242630` | Surface `#15161C`, scale `0.98` | Opacity 35%, non-clickable | Spinner replaces left icon |
| **Button `variant="ghost"`** | Navigation links, top bar actions, dismiss triggers | Transparent background, text `#92929D` | Text `#F5F5F7`, background `rgba(255,255,255,0.06)` | Background `rgba(255,255,255,0.1)` | Opacity 30% | Inline mini-spinner |
| **Button `variant="danger"`** | Sign Out, Delete account, Clear cache | Transparent / subtle red tint (`rgba(239,68,68,0.1)`) | Background `rgba(239,68,68,0.2)`, text `#F87171` | Background `rgba(239,68,68,0.3)` | Opacity 40% | Spinner in red accent |
| **IconButton** | Audio controls, Bookmark, Share, Close modal, Search clear | Circular or rounded square (`36px` / `44px`), ghost or surface style | Background `rgba(255,255,255,0.08)`, color `#F5F5F7` | Scale `0.92`, background `rgba(255,255,255,0.14)` | Opacity 30%, non-clickable | Rotating spinner |

---

## 6. Form & Input Behavior

### 6.1 Validation Rules
- **Name**: Required, minimum 2 characters, maximum 100 characters, whitespace trimmed.
- **Email**: Required, regex `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`, normalized to lowercase.
- **Password**: Required, minimum 6 characters (recommended 8+ for production).
- **Password Confirmation**: Must strictly match password.
- **Interests Count**: Minimum 1 required to proceed past step 4; maximum 7 selections allowed.

### 6.2 Visual Input States
- **Resting / Default**: Background `rgba(255,255,255,0.05)`, border `1px solid rgba(255,255,255,0.10)`, text `#F5F5F7`, placeholder `#64748B`.
- **Focused**: Border `1px solid #7657FF`, box shadow `0 0 0 3px rgba(118, 87, 255, 0.20)`, background `rgba(255,255,255,0.08)`.
- **Error**: Border `1px solid #EF4444`, box shadow `0 0 0 3px rgba(239, 68, 68, 0.20)`, helper text displayed below in `#F87171`.
- **Disabled**: Background `rgba(255,255,255,0.02)`, text `#64748B`, cursor `not-allowed`.
- **Password Toggle**: Clicking eye icon toggles input `type="text"` <-> `type="password"`.

---

## 7. Navigation Architecture

```
Mobile Viewports (320px - 767px):
┌──────────────────────────────────────────────┐
│  [ TopBar: Nuzio AI Logo + Notification ]    │
├──────────────────────────────────────────────┤
│                                              │
│               PAGE CONTENT                   │
│                                              │
├──────────────────────────────────────────────┤
│  [ Fixed Bottom Navigation: 4 Touch Tabs ]   │
│   (Home)      (Discover)  (Settings)  (Pro)  │
└──────────────────────────────────────────────┘

Tablet Viewports (768px - 1023px):
┌──────────────────────────────────────────────┐
│  [ TopBar: Logo | Search Bar | Avatar ]      │
├──────────────────────────────────────────────┤
│  [ 2-Column Content Grid: Max-Width 720px ]  │
├──────────────────────────────────────────────┤
│  [ Compact Bottom Floating Bar or Top Tabs ] │
└──────────────────────────────────────────────┘

Desktop Viewports (1024px - 1920px):
┌──────────────┬───────────────────────────────┐
│              │ [ TopBar: Search | Bell | Me] │
│  LEFT        ├───────────────────────────────┤
│  SIDEBAR     │                               │
│              │    MAIN CONTENT CONTAINER     │
│  • Home      │    (Centered, Max 1280px)     │
│  • Discover  │    (Multi-column Dashboard)   │
│  • Settings  │                               │
│  • Pro Plan  │                               │
│  ──────────  │                               │
│  [ User ]    │                               │
└──────────────┴───────────────────────────────┘
```

---

## 8. Modal & Bottom Sheet Behavior

1. **Backdrop**: Smooth dark overlay (`rgba(0, 0, 0, 0.75)`) with `backdrop-filter: blur(8px)`.
2. **Keyboard Controls**:
   - Pressing `Escape` closes any open modal or sheet.
   - Focus is trapped within modal while active; returns to trigger element upon close.
3. **Animations**:
   - **Desktop/Tablet Modal**: Scales in from `0.95` to `1.0` with fade (`opacity: 0 -> 1`) in 200ms ease-out.
   - **Mobile Bottom Sheet**: Slides up from viewport bottom (`translateY(100%) -> translateY(0)`) in 250ms cubic-bezier.
4. **Scrolling**: Outer body scroll is locked (`overflow: hidden`) while modal is open. Inner modal body has independent smooth scroll.

---

## 9. Selection & State Management

### 9.1 Chip & Pill State Machine
- **Unselected**: Surface `#15161C`, text `#92929D`, border `1px solid rgba(255,255,255,0.08)`.
- **Hover**: Surface `#1E202A`, text `#F5F5F7`, border `1px solid rgba(118,87,255,0.3)`.
- **Selected**: Gradient or solid `#7657FF`, text `#FFFFFF`, box shadow `0 0 16px rgba(118, 87, 255, 0.35)`, leading checkmark icon.

### 9.2 Toggle Switches
- Track dimensions: `44px` width, `24px` height, border radius `9999px`.
- Off state: Track `#27272A`, thumb `#A1A1AA` positioned left.
- On state: Track `#7657FF`, thumb `#FFFFFF` translated `20px` right with subtle glow.

---

## 10. Audio Player Architecture

```
                    AUDIO SERVICE & CONTEXT PIPELINE
                    
  ┌──────────────────────────────────────────────────────────────┐
  │                        AudioContext                          │
  │                                                              │
  │  • currentTrack: { id, title, narrator, url, duration, ... } │
  │  • isPlaying: boolean                                        │
  │  • playbackRate: 0.75 | 1.0 | 1.25 | 1.5 | 2.0               │
  │  • currentTime: number (seconds)                             │
  │  • duration: number (seconds)                                │
  │  • volume: number (0.0 to 1.0)                               │
  │  • playlist: Article[] / DailyBrief                          │
  └──────────────────────────────┬───────────────────────────────┘
                                 │
         ┌───────────────────────┴───────────────────────┐
         │                                               │
         ▼                                               ▼
┌──────────────────┐                           ┌───────────────────┐
│ Persistent Mini  │                           │ Fullscreen Modal  │
│ Audio Player Bar │                           │ Audio Player      │
│ (Bottom of app)  │                           │ (Waveform & Text) │
└──────────────────┘                           └───────────────────┘
```

- **Playback Continuity**: Switching between `/app/home`, `/app/discover`, `/app/settings`, and `/app/billing` does **NOT** interrupt audio playback.
- **Audio Synthesis Fallback**: When external audio generation is unavailable, clean synthesized Web Speech / mock audio playback streams smoothly.

---

## 11. Settings & Personalization Behavior

- **Profile Dimension**: Name, Avatar upload/selection, connected email display, active tier status.
- **Preferences Syncing**:
  - Changing Language updates `user.language` via `PATCH /api/users/me`.
  - Changing Narrator updates `user.narrator`.
  - Modifying Topics updates `user.interests`.
  - Changing Schedule updates `user.briefTime`.
  - Toggling Alerts updates `user.notificationsEnabled`.
- **Client Cache**: Changes update React Context immediately (optimistic UI) and synchronize to MongoDB in the background.

---

## 12. Billing, Plans & Subscription Behavior

| Dimension | Free Tier | Pro Executive Briefing |
| :--- | :--- | :--- |
| **Pricing** | $0 / month (Forever) | $9.99 / month or $79.99 / year (Save 20%) |
| **Daily AI Synthesis** | Top 3 daily summaries | Unlimited daily briefings & deep dives |
| **Audio Generation** | Standard voice synthesis | All 4 Neural AI voices (Aria, Nova, Orion, Echo) |
| **Delivery Time** | Standard 8:00 AM delivery | Customizable minute-level delivery schedule |
| **Niche Customization** | Up to 3 topic niches | Unlimited topic niches & custom search feeds |
| **Offline Downloads** | No | Yes (Audio caching for commuting) |
| **Breaking News Alerts** | Daily digest only | Instant high-impact breaking alerts |

*Service Abstraction*: Plan changes route through `billingService.updateSubscription(planId)` with mock authorization until payment gateway integration.

---

## 13. Responsive Layout Strategy

| Breakpoint Range | Device Class | Layout Adaptation & Layout Primitives |
| :--- | :--- | :--- |
| **320px – 430px** | Mobile Devices (iPhone SE, 14/15 Pro Max, Galaxy S) | Single column layout, full-width cards, fixed 56px bottom navigation bar, 44px minimum touch targets, touch-friendly sheets for modals, no horizontal overflow. |
| **768px – 834px** | Tablets & Foldables (iPad Mini, iPad Air) | Adaptive 2-column grid, compact header, constrained horizontal margins (24px), modal overlays replace bottom sheets. |
| **1024px – 1440px** | Desktop & Laptops | Left sidebar navigation (240px width), sticky top bar, 3-column story grid on Home/Discover, max-width content container (1280px). |
| **1920px+** | Ultra-Wide & 4K Displays | Bounded 1280px centered container with ambient atmospheric side glows, preventing stretched or distorted UI elements. |

---

## 14. Design System Tokens

### 14.1 Color Palette
```css
:root {
  /* Backgrounds & Canvas */
  --bg-canvas-primary: #08090b;       /* Darkest near-black base */
  --bg-canvas-secondary: #0d0d0d;     /* Deep slate black */
  --bg-surface-primary: #15161c;      /* Primary glass card surface */
  --bg-surface-secondary: #1c1d24;    /* Secondary elevated container */
  --bg-surface-hover: #22242e;        /* Interactive hover surface */

  /* Brand & Accent Purples */
  --color-primary: #7657ff;           /* Signature Nuzio Electric Purple */
  --color-primary-light: #8b6cff;     /* Lighter violet accent */
  --color-primary-glow: rgba(118, 87, 255, 0.25); /* Atmospheric radial glow */
  --color-primary-gradient: linear-gradient(135deg, #7657ff 0%, #8b6cff 100%);

  /* Functional & Status */
  --color-success: #3ddc97;           /* Verified / active green */
  --color-warning: #f59e0b;           /* Amber warning */
  --color-error: #ef4444;             /* Red error / alert */
  --color-info: #38bdf8;              /* Sky blue info */

  /* Typography Colors */
  --text-primary: #f5f5f7;            /* Bright white primary text */
  --text-secondary: #92929d;          /* Cool gray secondary text */
  --text-muted: #64748b;              /* Darker muted metadata */
  --text-on-primary: #ffffff;         /* Text on solid brand buttons */

  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-card: rgba(255, 255, 255, 0.10);
  --border-active: rgba(118, 87, 255, 0.45);
  --border-divider: rgba(255, 255, 255, 0.06);
}
```

### 14.2 Typography Scale (Inter Font Family)
- **Display**: `2.5rem` (40px) / Line-height `1.1` / Weight `800` / Letter-spacing `-0.03em`
- **H1**: `2.0rem` (32px) / Line-height `1.2` / Weight `700` / Letter-spacing `-0.025em`
- **H2**: `1.5rem` (24px) / Line-height `1.25` / Weight `700` / Letter-spacing `-0.02em`
- **H3**: `1.25rem` (20px) / Line-height `1.3` / Weight `600` / Letter-spacing `-0.015em`
- **Body Large**: `1.0625rem` (17px) / Line-height `1.5` / Weight `400`
- **Body Medium**: `0.9375rem` (15px) / Line-height `1.5` / Weight `400`
- **Body Small**: `0.8125rem` (13px) / Line-height `1.45` / Weight `400`
- **Caption / Overline**: `0.6875rem` (11px) / Line-height `1.4` / Weight `600` / Letter-spacing `0.05em` (Uppercase)

### 14.3 Spacing & Radius Scale
- **Spacing**: `space-1` (4px), `space-2` (8px), `space-3` (12px), `space-4` (16px), `space-5` (20px), `space-6` (24px), `space-8` (32px), `space-10` (40px), `space-12` (48px), `space-16` (64px)
- **Radius**: `radius-sm` (6px), `radius-md` (10px), `radius-lg` (16px), `radius-xl` (20px), `radius-pill` (9999px)

---

## 15. Component Architecture Hierarchy

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── Button.jsx            # Primary, Secondary, Ghost, Danger variants + loading states
│   │   ├── Card.jsx              # Surface container with optional glow & padding props
│   │   ├── Input.jsx             # Text, email, password input with validation feedback
│   │   ├── IconButton.jsx        # Rounded icon action buttons
│   │   ├── Chip.jsx              # Selectable pill tokens with check icon
│   │   ├── Badge.jsx             # Category & status indicator badges
│   │   ├── Avatar.jsx            # User & narrator avatar with status dots
│   │   ├── Toggle.jsx            # High contrast spring switches
│   │   ├── Modal.jsx             # Accessible overlay container
│   │   ├── BottomSheet.jsx       # Mobile slide-up sheet container
│   │   ├── ProgressIndicator.jsx # Step progress dots & bars
│   │   ├── LoadingSkeleton.jsx   # Card & list shimmer skeletons
│   │   ├── EmptyState.jsx        # Visually rich zero-data placeholder
│   │   ├── ErrorState.jsx        # Network & retry state container
│   │   └── NuzioLogo.jsx         # Signature logo in hero, large, medium, small sizes
│   ├── navigation/
│   │   ├── TopBar.jsx            # Header with search, bell, and avatar
│   │   ├── Sidebar.jsx           # Desktop left-hand navigation
│   │   ├── BottomNavigation.jsx  # Mobile 4-tab bottom navigation
│   │   └── AppNavigation.jsx     # Responsive coordinator
│   ├── news/
│   │   ├── NewsCard.jsx          # Individual news story summary card
│   │   ├── FeaturedNewsCard.jsx  # Hero breaking news briefing card
│   │   ├── CategoryTabs.jsx      # Scrollable category filter bar
│   │   └── StoryDetailModal.jsx  # Expanded full narrative view
│   ├── audio/
│   │   ├── AudioPlayer.jsx       # Persistent floating player bar
│   │   ├── FullscreenPlayer.jsx  # Expanded audio scrubber & transcript sheet
│   │   ├── AudioControls.jsx     # Play/pause/skip buttons
│   │   └── VoicePreviewCard.jsx  # Narrator voice sample player
│   ├── settings/
│   │   ├── SettingSection.jsx    # Categorized setting block
│   │   └── SettingRow.jsx        # Key-value row with toggle or navigation arrow
│   └── billing/
│       ├── PlanCard.jsx          # Free vs. Pro subscription pricing card
│       └── FeatureChecklist.jsx  # Comparison check list
├── context/
│   ├── AuthContext.jsx           # User credentials & JWT token state
│   ├── OnboardingContext.jsx     # 6-step personalization state
│   ├── AudioContext.jsx          # Global persistent audio player state
│   ├── NewsContext.jsx           # Daily briefing & discover feed state
│   └── AppContext.jsx            # Theme & layout state
├── pages/
│   ├── landing/LandingPage.jsx
│   ├── onboarding/
│   │   ├── LanguagePage.jsx
│   │   ├── WelcomePage.jsx
│   │   ├── ProfessionPage.jsx
│   │   ├── InterestsPage.jsx
│   │   ├── NarratorPage.jsx
│   │   ├── BriefTimePage.jsx
│   │   ├── NotificationPage.jsx
│   │   └── ReadyPage.jsx
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── home/HomePage.jsx
│   ├── discover/DiscoverPage.jsx
│   ├── settings/SettingsPage.jsx
│   ├── billing/BillingPage.jsx
│   └── DesignSystemPage.jsx
└── services/
    ├── api.js                    # Axios client with bearer interceptor
    ├── authService.js
    ├── userService.js
    ├── newsService.js
    ├── aiService.js
    └── audioService.js
```

---

## 16. Assets & Iconography Requirements

- **Icon Set**: Standardized on `lucide-react`:
  - Navigation: `Radio`, `Sparkles`, `Compass`, `Sliders`, `ShieldCheck`, `Home`, `Settings`, `CreditCard`
  - Audio: `Play`, `Pause`, `RotateCcw`, `RotateCw`, `Volume2`, `VolumeX`, `FastForward`
  - Story & News: `Clock`, `Globe`, `Briefcase`, `Layers`, `Bookmark`, `Share2`, `ExternalLink`, `Search`
  - Controls & UI: `Check`, `CheckCircle2`, `AlertCircle`, `X`, `ChevronRight`, `ChevronLeft`, `Eye`, `EyeOff`, `Bell`
- **Visual Assets**:
  - `NuzioLogo`: SVG vector asset with violet gradient sparkles icon.
  - Avatar Portraits: 4 High-resolution neural voice avatars (Aria, Nova, Orion, Echo).
  - Editorial Story Thumbnails: Curated tech, financial, and science demo imagery.

---

## 17. Backend API Requirements

### 17.1 Authentication & User API
- `POST /api/auth/register` — Creates user, hashes password with bcrypt, syncs onboarding preferences, returns JWT.
- `POST /api/auth/login` — Verifies email/password against bcrypt hash, issues JWT.
- `POST /api/auth/logout` — Handshake session termination.
- `GET /api/auth/me` — Returns current authenticated user record.
- `GET /api/users/me` — Fetches complete profile.
- `PATCH /api/users/me` — Updates `name`, `language`, `profession`, `interests`, `narrator`, `briefTime`, `notificationsEnabled`.

### 17.2 News & Briefing API
- `GET /api/briefs/daily` — Fetches today's customized executive briefing based on user preferences.
- `GET /api/news/discover` — Fetches discover feed with category filters and search keyword queries.
- `GET /api/news/:id` — Fetches individual story breakdown and full narrative.
- `POST /api/news/bookmark` — Toggles bookmark state for user.

### 17.3 AI & Audio API
- `POST /api/ai/synthesize-brief` — Synthesizes multi-source news articles into an executive daily briefing using Gemini API.
- `POST /api/audio/generate-speech` — Generates audio narration stream for briefing.

---

## 18. Database Schemas (MongoDB / Mongoose)

### 18.1 User Schema
```javascript
User {
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  avatar: { type: String, default: null },
  language: { type: String, default: 'en', enum: ['en', 'hi', 'es', 'fr', 'de', 'ja'] },
  profession: { type: String, default: null },
  interests: { type: [String], default: [] },
  narrator: {
    name: { type: String, default: 'Aria' },
    voiceId: { type: String, default: 'aria' }
  },
  briefTime: { type: String, default: '7:00 AM' },
  notificationsEnabled: { type: Boolean, default: true },
  plan: { type: String, enum: ['free', 'pro'], default: 'free' },
  savedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  timestamps: true
}
```

### 18.2 Article Schema
```javascript
Article {
  title: { type: String, required: true },
  summary: { type: String, required: true },
  bulletPoints: [String],
  content: String,
  category: { type: String, required: true, index: true },
  sourceName: { type: String, required: true },
  sourceUrl: String,
  imageUrl: String,
  readTimeMinutes: { type: Number, default: 2 },
  audioUrl: String,
  publishedAt: { type: Date, default: Date.now },
  tags: [String],
  timestamps: true
}
```

### 18.3 Briefing Schema
```javascript
Brief {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: String, required: true }, // e.g. "2026-09-17"
  headline: { type: String, required: true },
  audioDurationSeconds: { type: Number, default: 180 },
  audioUrl: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  keyTakeaways: [String],
  narrator: String,
  isListened: { type: Boolean, default: false },
  timestamps: true
}
```

---

## 19. AI & Gemini Prompt Engineering Architecture

- **Prompt Location**: `backend/src/prompts/`
  - `briefingPrompt.js`: System prompt instructing Gemini to act as an elite executive intelligence editor, summarizing complex global developments into concise, high-signal, fluff-free briefings with bulleted takeaways.
  - `summaryPrompt.js`: Single-article synthesis prompt for quick 30-second audio reads.
- **Security**: All calls to Gemini API execute strictly in backend services via `GEMINI_API_KEY` (never exposed to React client).

---

## 20. Recommended Phased Implementation Order

1. **Phase 1 — Project Architecture**: Monorepo scaffolding, npm workspaces, concurrently startup, backend Express server & Vite client foundation. *(Completed)*
2. **Phase 2 — Design System & Tokens**: Colors (`#7657FF`, `#15161C`, `#08090B`), Inter typography scale, spacing tokens, and base component library (`Button`, `Card`, `Input`, `Chip`, `Badge`, `Toggle`, `Modal`, `NuzioLogo`). *(Completed)*
3. **Phase 3 — Landing & 8-Step Onboarding**: Splash screen, Language, Welcome, Profession, Interests, Narrator, Brief Time, Notifications, and Ready summary pages with `OnboardingContext`. *(Completed)*
4. **Phase 4 — Authentication & MongoDB User Persistence**: Bcrypt password hashing, JWT authorization, Register/Login pages, Protected `/app/*` routes, and onboarding preference association. *(Completed)*
5. **Phase 5 — Daily Briefing (Home Dashboard)**: Executive morning briefing, dynamic greeting, master audio player component, curated AI story cards with category badges, and story detail modal. *(Next Step)*
6. **Phase 6 — Discover & News Curation**: Search bar (`⌘K`), category filter tabs, trending topic tags, search feed with loading skeletons, and bookmark actions.
7. **Phase 7 — Settings & Personalization**: Profile editor, voice switcher, delivery time picker, notification toggles, and live sync with `PATCH /api/users/me`.
8. **Phase 8 — Billing & Subscription Plans**: Monthly/Annual pricing switcher, Free vs. Pro comparison cards, feature checklist, and subscription state management.
9. **Phase 9 — News API & Provider Abstraction**: Provider architecture (`backend/src/services/newsService.js`) returning standardized article entities.
10. **Phase 10 — Gemini AI Synthesis Engine**: Backend service (`aiService.js`) generating structured briefing summaries from news feeds.
11. **Phase 11 — Global Audio Player Service**: `AudioContext` with continuous background playback, waveform visualizer, scrubber, and playback speed controls.
12. **Phase 12 — Responsive Audit & Visual QA**: Viewport testing across 320px, 375px, 390px, 430px, 768px, 1024px, 1440px, and 1920px.
13. **Phase 13 — Production Build & End-to-End Verification**: Full regression test suite, lint check, and production bundle validation.
