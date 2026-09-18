# MongoDB Atlas Integration & Persistence

## 1. Connection Architecture
- **URI Mapping**: The backend connects to MongoDB via the `MONGODB_URI` environment variable, ensuring credentials are never checked into version control.
- **Graceful Degradation**: Defined in `backend/src/config/db.js`, the application traps `mongoose.connection.on('error')` and sets `isConnected = false`. This guarantees the server does not crash if the database goes down.

## 2. Models
### `User.js`
A comprehensive schema storing authentication, preferences, and subscriptions.
- **Auth**: `email` (unique index), `password` (hashed).
- **Profile**: `name`, `avatar`.
- **Onboarding/Settings**: `language`, `profession`, `interests` (Array), `narrator`, `briefTime`, `notificationsEnabled`.
- **Subscription**: `plan` (`enum: ['free', 'pro']`).
- **Bookmarks**: `savedArticles` (Array of Strings).

## 3. Authentication Persistence
- `POST /api/auth/register`: Validates inputs, checks for duplicate emails, hashes the password via `bcrypt`, and persists the User document. Returns a JWT.
- `POST /api/auth/login`: Verifies the hashed password and returns a JWT.
- `GET /api/auth/me`: Decodes the JWT and retrieves the User via `User.findById()`. Password is removed via `toSanitized()`.

## 4. Preference Persistence
- **Onboarding**: Preferences collected during the 8-step flow are merged and sent in the final `POST /api/auth/register` payload.
- **Settings Dashboard**: Calls `PATCH /api/users/me`. `userController.updateProfile` rigorously validates allowed fields (`language`, `interests`, `narrator`, etc.) and performs a `$set` update on the user document.

## 5. Bookmark Persistence
- Bookmarks are stored on the `User` document under `savedArticles` rather than requiring a dedicated collection. This is efficient since users typically bookmark a manageable number of articles.
- `POST /api/users/me/bookmarks`: `toggleBookmark` method in `userController` checks if `articleId` exists in `savedArticles`. It `splices` if present (removes), or `pushes` if absent (adds).

## 6. Subscription State
- Managed via the `plan` field on the `User` model.
- Defaults to `free`. Can be upgraded to `pro` via the `PATCH /api/users/me` mock payment flow on the Billing screen.

## 7. Security & Indexing
- The `email` field in the User schema is marked `unique: true`, creating an automatic MongoDB unique index.
- The `password` field is `select: false` by default, preventing accidental leakage.
- Passwords are encrypted via `bcrypt` (10 rounds).
- The `.gitignore` at the root explicitly blocks `.env`, while `.env.example` serves as a safe template.

## 8. Verification Results
- Database configuration is production-ready.
- No plaintext credentials exposed.
- All Figma UI flows (Auth, Settings, Bookmarks) successfully map to standard REST endpoints which persist permanently to MongoDB Atlas.
