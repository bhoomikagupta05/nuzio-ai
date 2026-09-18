# Phase 10: Gemini AI Synthesis Engine

## 1. Overview
The Gemini AI Engine is responsible for generating customized, personalized Executive Morning Briefings and individual story summaries based on normalized news data. It abstracts the `@google/genai` SDK on the backend and exposes structured REST endpoints to the frontend.

## 2. Architecture
- **Service Layer**: `backend/src/services/ai/geminiService.js` instantiates the `GoogleGenAI` client using `GEMINI_API_KEY`.
- **Prompt Engineering**: `promptTemplates.js` contains versioned, deterministic prompts that instruct Gemini to only use supplied source material and extract facts without hallucination.
- **Validation**: `aiSchemas.js` manually validates the returned JSON structure to prevent the frontend from crashing on malformed LLM outputs.
- **Caching**: `backend/src/models/Briefing.js` caches a generated briefing per user per day in MongoDB, drastically reducing API costs and latency.
- **Fallback Mechanism**: If the `GEMINI_API_KEY` is missing or the API rate limits, `aiController.js` catches the error and returns a predefined "Fallback Briefing" pulled directly from the mock `Article` database collection.

## 3. Endpoints
- `POST /api/ai/briefing`: Authenticated endpoint. Checks MongoDB for a cached briefing. If none exists, fetches normalized news, calls Gemini, caches the result, and returns it.
- `POST /api/ai/summarize`: Authenticated endpoint. Takes a `storyId`, fetches the content, and asks Gemini to generate a summary and key takeaways.

## 4. Frontend Integration
- **HomePage (`/app/home`)**:
  - Unmounted `mockData.js`.
  - Added a `useEffect` hook to fetch `aiService.getDailyBriefing()`.
  - Implemented an `isLoading` state (rendering "AI is synthesizing...").
  - Dynamically renders the returned `headline`, `overview`, and `topStories`.

## 5. Security
- `GEMINI_API_KEY` is exclusively handled on the backend via `config/env.js`.
- The frontend never connects directly to Gemini.
- All AI routes are protected by the `verifyToken` JWT middleware.

## 6. Testing Performed
- **No-Key Fallback**: Left `GEMINI_API_KEY` empty to ensure the graceful fallback mock logic executes without server crashes.
- **Schema Compliance**: Verified the UI correctly destructures `storyId`, `title`, and `summary` from the backend payload.
- **Responsive Design**: Verified that dynamically mapped content fits the existing `NewsCard` UI structure without overflow on mobile devices.
