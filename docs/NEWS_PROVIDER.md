# News Provider Integration

The Nuzio AI platform relies on **NewsAPI.ai** (Event Registry Article API) to fetch real-time global news.

## Architecture
The frontend **never** communicates with the news provider directly. All requests flow through the backend normalization layer to protect API keys and ensure a consistent data schema.

`Frontend -> Backend (newsController) -> Memory Cache -> NewsApiAiProvider -> NewsAPI.ai`

## API Configuration
- **Provider:** [NewsAPI.ai](https://newsapi.ai/)
- **Endpoint:** `https://eventregistry.org/api/v1/article/getArticles`
- **Environment Variable:** `NEWSAPI_AI_KEY`
  - *Must be stored securely in `backend/.env`*

## Caching Strategy
To prevent React StrictMode double-renders and excessive user reloads from draining the API quota, a **15-Minute Memory Cache (TTL)** is implemented in `backend/src/services/news/index.js`.
- If a request for the same category or search query occurs within 15 minutes, the backend serves the cached articles instantly.
- In the event of an API failure, the controller automatically falls back to fetching recently cached articles from the MongoDB `Article` collection.

## Normalized Article Schema
The raw response from NewsAPI.ai is normalized into the internal Nuzio `Article` schema:
```json
{
  "id": "12345",
  "title": "Article Title",
  "summary": "Article excerpt...",
  "content": "Full body...",
  "category": "technology",
  "source": {
    "name": "Publisher Name",
    "url": "https://...",
    "publishedAt": "2026-09-18T12:00:00Z"
  },
  "imageUrl": "https://...",
  "readTime": "2 min read",
  "audioDuration": "1:45",
  "isFeatured": false,
  "tags": ["TECHNOLOGY"]
}
```

## Error Handling
If the NewsAPI.ai request fails, it is logged with the prefix `[NEWSAPI_AI] ERROR:` and throws an exception back to the controller, which subsequently triggers the database fallback mechanism. 

## Deduplication
Articles are deduplicated upon insertion into MongoDB via `Article.findOneAndUpdate` using the `source.url` as the unique index criteria.
