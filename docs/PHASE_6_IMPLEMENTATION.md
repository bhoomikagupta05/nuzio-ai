# Phase 6: Discover & News Feeds Implementation

## 1. Discover Routes
- `/app/discover`

## 2. Screens
- **Discover & Explore Dashboard**

## 3. Sections
- Page Header (Title, Subtitle, Search, Trending Topics)
- Category Filter Tabs
- Featured Story Hero (only on 'all' without search)
- Results Grid / List
- Story Detail Modal

## 4. Components
- `AppLayout.jsx`
- `CategoryTabs.jsx`
- `FeaturedNewsCard.jsx`
- `NewsCard.jsx`
- `StoryDetailModal.jsx`
- `Card.jsx`, `Button.jsx`, `Chip.jsx`

## 5. Exact Figma Text
- "Discover & Explore"
- "Real-time synthesized intelligence across emerging technologies, venture capital, and macroeconomic policy."
- "Trending:"
- "Search news by keyword, company, topic (e.g. OpenAI, TSMC, RBI)..."
- "No briefings found"
- "No verified intelligence stories match your search for "{query}". Try selecting a different topic tag or clearing your search."
- "Clear Search & Filters"

## 6. Navigation
- Accessible via BottomNav / Sidebar icon (Compass)
- Clicking a card opens `StoryDetailModal`

## 7. Filters & Categories
- Categories: All Briefings, AI & Technology, Financial Markets, Indian Business, Global Geopolitics, Science & Health, Crypto & Web3, Climate & Energy.
- Search: Client-side string matching on title, summary, categoryLabel, source.
- Trending Tags: Clickable tags that auto-populate the search field.

## 8. Story Interactions
- Read more / Card click -> Opens `StoryDetailModal`
- Bookmark button -> Toggles bookmark state (Saved locally in state)
- Play button (if present) -> Interacts with Global AudioContext

## 9. Responsive Behavior
- 320px - 767px (Mobile): 1-column grid, horizontal scroll tabs, bottom navigation.
- 768px - 1023px (Tablet): 2-column story grid.
- 1024px+ (Desktop): 3-column story grid, left sidebar navigation.

## 10. Loading / Empty / Error States
- **Loading**: Will implement `LoadingSkeleton.jsx` arrays simulating a network request.
- **Empty**: Implemented a centered card with a Search icon, exact Figma text, and a "Clear Search" CTA.
- **Error**: Will implement a robust dark-themed Error component with a "Retry" button.

## 11. Mock Service Integration
- Will create `frontend/src/services/newsService.js`.
- Decouples UI from direct `mockData.js` imports.
