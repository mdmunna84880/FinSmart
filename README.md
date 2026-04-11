# FinSmart — AI-Powered Personal Finance Dashboard

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.2.2-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![AI](https://img.shields.io/badge/AI-Gemini_2.5_Flash-8E75B2?logo=google&logoColor=white)](https://aistudio.google.com)
[![License](https://img.shields.io/badge/License-Educational-orange)](#)

A full-stack personal finance management platform with an AI-powered financial assistant. Track income and expenses, set monthly budgets, visualize spending patterns, and ask natural-language questions about your finances — all backed by secure cookie-based authentication.

> **📌 Project Context:** Built for learning as part of **AlmaBetter's AlmaX Program Assignment**.

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mdmunna84880/FinSmart.git
cd FinSmart

# Start the backend (Terminal 1)
cd backend && npm install && npm run dev

# Start the frontend (Terminal 2)
cd frontend && npm install && npm run dev
```

Backend → `http://localhost:8000` &nbsp;|&nbsp; Frontend → `http://localhost:5173`

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [AI Chat Assistant](#ai-chat-assistant)
- [Design Decisions](#design-decisions)
- [Build & Deployment](#build--deployment)
- [Author](#author)

---

## Features

### Financial Management
| Feature | Description |
|---------|-------------|
| **Dashboard** | Net savings, income/expenses, 6-month cash flow chart, recent transactions, budget progress |
| **Transactions** | Full CRUD with search, pagination, and dynamic filters (year, month, category, type) |
| **Budgets** | Monthly spending limits with per-category caps, actual-vs-planned summaries |
| **Analytics** | Category spending donut chart, budget-vs-actual progress per category |
| **Profile & Security** | Password change form, budget configuration modal |

### AI Financial Assistant
| Feature | Description |
|---------|-------------|
| **Contextual Answers** | Gemini 2.5 Flash analyzes 12 months of real financial data |
| **Persistent Sessions** | Conversation history saved — pick up where you left off |
| **Optimistic UI** | Messages appear instantly before the server responds |
| **Markdown Rendering** | Bold text, lists, and code blocks rendered in brand styling |
| **Quick Prompts** | 8 predefined questions for first-time users |

### Platform
| Feature | Description |
|---------|-------------|
| **Secure Auth** | JWT via HTTP-only cookies — no localStorage exposure |
| **Responsive Design** | Mobile-first with collapsible sidebar, hamburger menu, overlay drawer |
| **Route Guards** | Protected/public routes with auto-redirect based on auth state |
| **Toast Notifications** | Success/error feedback on every operation |
| **Dual Validation** | React Hook Form + Joi schemas on both client and server |

---

## High-Level Architecture

FinSmart uses a modern, decoupled architecture:
- **Frontend App**: A React application providing a localized, seamless user experience.
- **Backend API**: An Express.js REST API that securely handles business logic and database operations.
- **Database**: MongoDB for storing user profiles, transaction records, budgets, and chat sessions.
- **AI Assistant**: Google Gemini for tailored financial insights.

---

## Tech Stack

### Frontend

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.4 |
| Build Tool | Vite | 8.0.1 |
| Routing | React Router | 7.13.2 |
| State Management | Redux Toolkit + React Redux | 2.8.2 / 9.2.0 |
| Styling | Tailwind CSS | 4.2.2 |
| Charts | Recharts | 3.8.0 |
| Forms | React Hook Form + @hookform/resolvers | 7.61.0 / 5.2.0 |
| Validation | Joi | 17.13.3 |
| HTTP Client | Axios | 1.10.0 |
| Markdown | react-markdown | 10.1.0 |
| Notifications | React Toastify | 11.0.5 |
| Icons | React Icons (Feather) | 5.6.0 |

### Backend

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js (ES modules) | v18+ |
| Framework | Express | 5.2.1 |
| Database | MongoDB via Mongoose | 9.x |
| Auth | JWT in HTTP-only cookies | jsonwebtoken 9.x |
| Validation | Joi | 18.x |
| Password Hashing | bcryptjs | 3.x (10 salt rounds) |
| AI | Google Gemini (`@google/generative-ai`) | 0.24.x |
| Logging | Morgan | 1.10.x |

---

## Project Structure

The repository is divided into two distinct applications:

- `backend/`: The Express API and database models
- `frontend/`: The React Single Page Application (SPA)

> Each sub-project (`backend/`, `frontend/`) has its own `README.md` with in-depth documentation.

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | v18+ | [Download](https://nodejs.org/) |
| **npm** | v9+ | Bundled with Node.js |
| **MongoDB** | Any | Local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| **Gemini API Key** | — | [Get yours free](https://aistudio.google.com/apikey) from Google AI Studio |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mdmunna84880/FinSmart.git
cd FinSmart
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your-long-random-secret-key-here
JWT_EXPIRY=7d
GEMINI_API_KEY=your-google-gemini-api-key
NODE_ENV=development
PORT=8000
CLIENT_URL=http://localhost:5173
```

### 3. Configure the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/` (optional — defaults are provided):

```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Start Both Servers

**Terminal 1 — Backend:**
```bash
cd backend && npm run dev
```
Server running at `http://localhost:8000`

**Terminal 2 — Frontend:**
```bash
cd frontend && npm run dev
```
App opens at `http://localhost:5173`

---

## Environment Variables

### Backend

| Variable | Required | Default | Description |
|----------|:--------:|---------|-------------|
| `MONGODB_URI` | **Yes** | — | MongoDB connection string (database name `finsmart` is appended by the app) |
| `JWT_SECRET` | **Yes** | — | Secret key for signing JWTs — use a long, random string |
| `GEMINI_API_KEY` | **Yes** | — | Google Gemini API key for the AI chat feature |
| `JWT_EXPIRY` | No | `7d` | JWT token expiry duration |
| `NODE_ENV` | No | `development` | Controls error verbosity and cookie `secure` flag |
| `PORT` | No | `8000` | HTTP server port |
| `CLIENT_URL` | No | `http://localhost:5173` | Frontend origin for CORS configuration |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000/api` | Backend API base URL |

---

## API Reference

Base URL: `http://localhost:8000/api`

### Authentication

FinSmart uses **cookie-based sessions** instead of storing JWT tokens in localStorage. This eliminates the risk of XSS-based token theft.

### Flow Overview

FinSmart employs a seamless login process where users receive a secure session cookie directly upon authentication. This ensures that subsequent API requests are automatically authorized without exposing sensitive tokens to browser environments.

### Security Measures### Security Measures

| Measure | Implementation |
|---------|---------------|
| **Token storage** | HTTP-only cookie — inaccessible to JavaScript |
| **CSRF protection** | `sameSite: "lax"` (dev) / `"none" + secure` (prod) |
| **CORS** | `credentials: true` — only the configured `CLIENT_URL` can send cookies |
| **Password hashing** | bcrypt with 10 salt rounds |
| **Input validation** | Joi schemas on every write endpoint |
| **Ownership enforcement** | Every query scoped to `req.user._id` |

---

## AI Chat Assistant

FinSmart's AI assistant is powered by **Google Gemini 2.5 Flash** and answers questions grounded in the user's actual financial data — not generic advice.

### How It Works

Whenever a user consults the AI assistant, FinSmart securely packages their recent financial transaction metrics (income, expenses, active budgets) into an anonymized request sent to the Gemini engine. As a result, the AI recognizes patterns and can generate precise, applicable advice on-the-fly.

### Financial Context Captured### Financial Context Captured

On the first message of a session, the backend aggregates:

| Data | Source |
|------|--------|
| Total income, expenses, net savings | Last 12 months of transactions |
| Monthly trends | Income/expense grouped by month |
| Top expense categories | Sorted by spending amount |
| Active budget configurations | Last 12 months of budget settings |
| Recent transactions | 20 most recent entries |

This snapshot is stored as `contextSnapshot` in the `ChatSession` document and sent to Gemini as part of the system prompt for every subsequent message in that session.

### Session Features

- **Auto-generated titles** — Parsed from the first message using pattern matching (no extra API call)
- **Persistent history** — All messages saved, accessible via the sidebar
- **Optimistic UI** — User messages appear instantly before the server responds
- **Markdown rendering** — Bold text, lists, and code blocks styled in brand colors
- **Quick prompts** — 8 predefined questions for users who don't know where to start

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Cookie-based auth** | HTTP-only cookies eliminate XSS token theft. Paired with CORS + sameSite, CSRF risk is mitigated for same-origin setups |
| **Layered backend** | Routes → Controllers → Services/Repositories → Models. Simple CRUD in controllers; complex queries delegated to services |
| **Upsert for budgets** | One endpoint (`POST /budgets`) handles both create and update via `findOneAndUpdate` with `upsert: true` |
| **Dynamic filters** | `GET /transactions/filters` runs a `$facet` aggregation — dropdowns reflect actual data, never stale options |
| **Optimistic chat UI** | Messages pushed to state immediately — users see instant feedback, AI response appends on fulfillment |
| **Dual Joi validation** | Client-side (RHF) for instant feedback, server-side for security — schemas mirror each other |
| **Compound indexes** | `(userId, date)`, `(userId, category)`, `(userId, type)` on transactions; unique `(userId, year, month)` on budgets |

---

## Build & Deployment

### Production Build

```bash
# Frontend
cd frontend && npm run build   # Output → dist/
npm run preview                # Preview locally

# Backend
cd backend && npm start        # Production mode (node)
```

### Deploy to Vercel (Frontend)

The project includes a `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

```bash
npx vercel
```

### Deploy Backend (Render / Railway / Fly.io)

1. Push code to GitHub
2. Connect repository to your hosting platform
3. Set root directory to `backend/`
4. Add environment variables in the dashboard
5. Deploy

### Full-Stack Checklist

- [ ] Deploy backend and note the production URL
- [ ] Set `CLIENT_URL` on backend to the frontend's production URL
- [ ] Set `VITE_API_URL` on frontend to the backend's production URL
- [ ] Set `GEMINI_API_KEY` on backend
- [ ] Point MongoDB Atlas to allow connections from backend IP
- [ ] Deploy frontend as a static SPA (Vercel, Netlify, Cloudflare Pages)
- [ ] Test registration, login, transaction CRUD, budget, and chat

---

## Author

<table>
  <tr>
    <td align="center">
      <strong>Md Munna</strong><br/>
      📧 <a href="mailto:mdmunna19434@gmail.com">mdmunna19434@gmail.com</a><br/>
      📍 Bihar, India
    </td>
  </tr>
</table>

---

<p align="center">
  <strong>Built for learning — AlmaBetter's AlmaX Program Assignment</strong><br/>
  <em>Made in Bihar, India</em>
</p>
