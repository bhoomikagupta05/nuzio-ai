# Phase 8: Billing & Subscription Plans Implementation

## 1. Routes
- Subscription Dashboard (`/app/billing`)

## 2. Screens
- **Billing Page**

## 3. Sections & Controls
- **Header**: "Executive Intelligence Tiers" badge.
- **Title**: "Upgrade your daily briefing."
- **Subtitle**: "Unlock unlimited AI news synthesis, all 4 neural voice narrators, minute-level schedules, and offline listening."
- **Billing Period Toggle**: Monthly vs. Annual toggle with "Save 20%" discount badge.
- **Pricing Cards Grid**: Two-column layout mapping `SUBSCRIPTION_PLANS`.
- **Trust Banner**: "Enterprise Security Standard" note with ShieldCheck icon.

## 4. Components Used
- `AppLayout.jsx`
- `Card.jsx` (with `glow` prop for the Pro tier)
- `Button.jsx`
- `Badge.jsx`

## 5. Plan Data (`frontend/src/data/mockData.js`)
- Separated business logic from presentation.
- `Free Explorer` ($0 forever)
- `Pro Executive Briefing` ($9.99/mo or $79.99/yr)
- Highlighted `isPopular` boolean triggers the purple glow and `MOST POPULAR` tag.

## 6. Interactions
- **Toggle Cycle**: Switching to Annual updates the pricing display on the cards dynamically.
- **Current Plan State**: Derived from `AuthContext` (`user.plan`). Disabled CTA button displays "Current Plan".
- **Upgrade CTA**: Clicking "Upgrade to Pro Executive" triggers a fake async transaction (`handleUpgrade`), updating the local React state and displaying an alert.

## 7. Responsive Behavior
- **Mobile (320px - 767px)**: Cards stack vertically.
- **Tablet (768px - 1023px)**: Adaptive width.
- **Desktop (1024px+)**: Two-column side-by-side card layout with maximum width boundaries.

## 8. Exact Figma Text
- "Upgrade your daily briefing."
- "Unlock unlimited AI news synthesis..."
- "Save 20%"
- "Free Explorer"
- "Pro Executive Briefing"
- "MOST POPULAR"
- "Included Features"
- "Enterprise Security Standard"
- "End-to-end encrypted briefing delivery, zero telemetry sharing, and SOC2-compliant model execution."
