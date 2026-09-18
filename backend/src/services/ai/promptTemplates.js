/**
 * Gemini Prompt Templates
 * Versioned prompt definitions for deterministic AI synthesis.
 */

export const PROMPT_VERSION = 'v1';

export const getMorningBriefPrompt = (userPreferences, newsData) => {
  return `
You are an elite executive intelligence analyst synthesizing a daily morning brief.
Your goal is to extract the most critical insights from the provided news stories and tailor them to the user's preferences.

USER PREFERENCES:
- Profession: ${userPreferences.profession || 'Not specified'}
- Interests: ${userPreferences.interests?.join(', ') || 'General Market News'}

SOURCE MATERIAL:
${JSON.stringify(newsData, null, 2)}

INSTRUCTIONS:
1. Use ONLY the provided source material. Do NOT invent facts, data, or sources.
2. Select the top 5 most important stories from the source material that align with the user's interests.
3. Generate a compelling "headline" for the overall day's synthesis.
4. Generate a 2-3 sentence "overview" of the macroeconomic/tech landscape for the day based on the sources.
5. For each selected story, provide a concise "summary" and a 1-sentence "keyTakeaway". Preserve the original "storyId", "category", "source", "sourceUrl", and "imageUrl" exactly as provided in the source material.
6. Extract 3 high-level "keyInsights" that synthesize trends across multiple stories.

OUTPUT FORMAT:
Return a valid JSON object EXACTLY matching this schema (no markdown formatting, no code blocks):
{
  "headline": "...",
  "overview": "...",
  "topStories": [
    {
      "storyId": "...",
      "title": "...",
      "summary": "...",
      "keyTakeaway": "...",
      "category": "...",
      "source": "...",
      "sourceUrl": "...",
      "imageUrl": "..."
    }
  ],
  "keyInsights": ["...", "...", "..."]
}
`;
};

export const getStorySummaryPrompt = (story) => {
  return `
You are a senior analyst tasked with summarizing a news article for an executive.

SOURCE MATERIAL:
Title: ${story.title}
Source: ${story.source}
Content: ${story.content || story.summary}

INSTRUCTIONS:
1. Use ONLY the provided source material.
2. Write a concise, factual summary (3-4 sentences).
3. Extract exactly 2 bullet points representing the key takeaways.

OUTPUT FORMAT:
Return a valid JSON object EXACTLY matching this schema (no markdown formatting, no code blocks):
{
  "summary": "...",
  "keyTakeaways": ["...", "..."]
}
`;
};
