# Nuzio AI — Personalized AI-Powered Daily News Briefings

A production-quality, responsive MERN web application engineered for personalized AI daily news audio & text briefings.

---

## 🏗️ Architecture Overview

The codebase is organized into isolated, maintainable frontend and backend packages:

```
nuzio-ai/
├── package.json               # Root workspace configuration
├── .gitignore                 # Root gitignore
├── README.md                  # System documentation
├── frontend/                  # Client-side React application
│   ├── package.json
│   ├── vite.config.js         # Vite build configuration & API proxy
│   ├── index.html             # HTML entry point with Google Fonts
│   ├── .env.example           # Frontend environment template
│   └── src/
│       ├── assets/            # Static assets and graphics
│       ├── components/        # Reusable UI components (HealthStatus, GlassCard, Navbar)
│       ├── layouts/           # Responsive layout templates (MainLayout)
│       ├── pages/             # View pages (HomePage architecture verification)
│       ├── routes/            # React Router v6 setup (AppRoutes.jsx)
│       ├── context/           # React Context API (AppContext.jsx)
│       ├── hooks/             # Custom React hooks (useHealthCheck.js)
│       ├── services/          # Axios HTTP client & API endpoints
│       ├── utils/             # Constants and helper functions
│       ├── theme/             # Centralized design tokens (tokens.js, tokens.css, muiTheme.js)
│       ├── data/              # Onboarding categories & metadata
│       ├── App.jsx            # App provider wrapper
│       ├── main.jsx           # React DOM root entry point
│       └── index.css          # Design token utilities, reset & responsive media queries
└── backend/                   # Server-side Express application
    ├── package.json
    ├── .env.example           # Backend environment template
    └── src/
        ├── config/            # DB (Mongoose) & Environment config
        ├── controllers/       # Route controllers (healthController.js)
        ├── middleware/        # Error handlers, 404, request logging
        ├── models/            # Mongoose schemas (User.js scaffold)
        ├── routes/            # Express router endpoints (/api/health)
        ├── services/          # Service layer scaffold
        ├── utils/             # Standardized responses & logger
        └── server.js          # Express app entry point
```

---

## 🎨 Design Tokens & Approximations

All visual styling is driven by centralized design tokens in `frontend/src/theme/tokens.js` and `frontend/src/theme/tokens.css`:

| Token | Value | Description |
| :--- | :--- | :--- |
| `background` | `#08090B` | Deep almost-black primary background |
| `surface` | `#111217` | Elevated surface / secondary background |
| `card` | `#15151B` | Card container background |
| `primary` | `#7657FF` | Violet / Purple accent |
| `primaryLight` | `#8B6CFF` | Violet highlight |
| `success` | `#3DDC97` | Mint / Green success indicator |
| `textPrimary` | `#F5F5F7` | Primary text |
| `textSecondary`| `#92929D` | Secondary muted text |
| `border` | `rgba(255,255,255,0.10)` | Subtle border |
| `purpleGlow` | `rgba(118,87,255,0.25)` | Atmospheric purple glow |

---

## 📱 Supported Responsive Viewports

- **Mobile**: `320px`, `360px`, `375px`, `390px`, `414px`, `430px` (Single column, touch-friendly, zero horizontal scroll)
- **Tablet**: `768px`, `834px` (Centered constrained layout, adaptive grid)
- **Desktop**: `1024px`, `1280px`, `1440px`, `1920px` (Multi-column content, max-width bounded container)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** >= v18.0.0
- **npm** >= 9.0.0
- **MongoDB** (Optional for Phase 1 - the backend features graceful fallback)

### 2. Installation

Install all dependencies for backend and frontend:

```bash
# In backend directory
cd backend
npm install

# In frontend directory
cd ../frontend
npm install
```

### 3. Environment Setup

Copy example environment files:

```bash
# Backend .env
cp backend/.env.example backend/.env

# Frontend .env
cp frontend/.env.example frontend/.env
```

### 4. Running the Application

#### Start Backend:
```bash
cd backend
npm run dev
```
*Backend server will start on `http://localhost:5000` (Health check at `http://localhost:5000/api/health`).*

#### Start Frontend:
```bash
cd frontend
npm run dev
```
*Frontend dev server will start on `http://localhost:5173`.*

---

## 🧪 Verification & Health Check

The frontend automatically communicates with the backend health check endpoint (`/api/health`) and displays real-time connectivity, uptime, runtime memory, and database status.
