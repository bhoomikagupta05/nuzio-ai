# News Integration Documentation

## Provider Architecture
Nuzio AI uses **NewsAPI** (`newsapi.org`) as the primary external data provider to fetch real-time global and domestic stories. The system implements a robust caching and normalization architecture to ensure high availability and prevent rate-limiting on the free NewsAPI tier.

### 1. Provider Adapter (`NewsAPIProvider.js`)
- Abstracts the NewsAPI SDK/Axios calls.
- Fetches top headlines for specified categories (`/top-headlines`).
- Fetches search results based on user queries (`/everything`).
- Limits the number of external API requests dynamically.

### 2. Normalization Wrapper (`services/news/index.js`)
- Maps the diverse JSON fields provided by NewsAPI (e.g., `urlToImage`, `description`) into Nuzio's standardized `Article` MongoDB schema.
- Re-tags categories correctly for Nuzio's internal filtering system.

### 3. MongoDB Caching Layer
- After normalization, articles are **upserted** into MongoDB Atlas.
- This creates a stable database of historical and current news that the AI Synthesis Engine (Gemini) can process without worrying about external provider downtime or rate limits.

## Environment Variables
The News Provider requires the following variable in `backend/.env`:
- `NEWS_API_KEY`: A valid API key from NewsAPI.org.

*(Note: Do not commit `.env` to source control. Use `.env.example` as a template).*

## Endpoints
The following endpoints utilize the News Provider:
- **`GET /api/news/daily`**: Fetches the top business and technology stories. Falls back to cached data if the API fails or rate limits.
- **`GET /api/news/discover?category=X&search=Y`**: Fetches real-time search queries or specific category news.

## Error Handling
- If `NEWS_API_KEY` is missing or invalid, the provider fails gracefully, logs a warning, and the system falls back to fetching the most recent cached articles from MongoDB.
- Network timeouts or API limits do not crash the server; they are caught by the normalization wrapper and trigger the fallback strategy.

## Production Considerations
- **Rate Limits**: The free tier of NewsAPI limits requests (e.g., 100/day). In a production environment, you should consider upgrading to a paid plan or implementing an aggressive Redis-based caching layer before hitting MongoDB.
- **Provider Swapping**: Because the system uses a `NewsAPIProvider.js` abstraction, you can easily swap NewsAPI for GNews or Currents API by rewriting just the provider file without touching the controllers or AI engine.
