# FinSmart — Personal Finance Dashboard

[![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.2-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764abc?logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![React Router](https://img.shields.io/badge/React_Router-7.13.2-ca4245?logo=react&logoColor=white)](https://reactrouter.com)

A modern, full-stack personal finance management platform built with React, Redux Toolkit, and Tailwind CSS. Track income and expenses, set monthly budgets, visualize spending patterns, and get AI-powered financial insights — all backed by a secure cookie-based authentication system.

> **📌 Project Context:** Built for learning as part of **AlmaBetter's AlmaX Program Assignment**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Pages Overview](#pages-overview)
- [Components Overview](#components-overview)
- [AI Chat Assistant](#ai-chat-assistant)
- [Environment Variables](#environment-variables)
- [Build & Deployment](#build--deployment)
- [Author](#author)

---

## Features

### Core Functionality
- **Dashboard Overview** — Net savings, total income/expenses, 6-month cash flow chart, recent transactions, budget progress, and a quick-access AI insight card
- **Transaction Management** — Full CRUD with search, pagination, and dynamic filters (year, month, category, type) fetched from the backend
- **Visual Analytics** — Donut chart for category spending breakdown and budget-vs-actual progress per category
- **Budget Tracking** — Set monthly spending limits and per-category caps, view actual spending compared to budget
- **AI Financial Chat** — Gemini-powered assistant that analyzes 12 months of real financial data for contextual, personalized answers
- **Profile & Security** — User profile, password change form with Joi validation, budget configuration modal
- **Responsive Design** — Mobile-first layout with collapsible sidebar, hamburger menu, and overlay drawer

### UI/UX Features
- **Toast notifications** on every CRUD operation (success/error)
- **Optimistic UI** in chat — messages appear instantly before the server responds
- **Debounced search** (300 ms) on transactions to reduce API calls
- **Markdown-rendered AI responses** with custom-styled bold text, lists, and code blocks
- **Smart pagination** with ellipsis for large page ranges
- **Color-coded progress bars** — green (< 80 %), amber (80–100 %), red (> 100 %)
- **Quick-question prompts** in chat for first-time users
- **Loading states** — full-screen spinner during auth check, inline loaders for mutations

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 19.2.4 |
| **Build Tool** | Vite | 8.0.1 |
| **Routing** | React Router | 7.13.2 |
| **State Management** | Redux Toolkit + React Redux | 2.8.2 / 9.2.0 |
| **Styling** | Tailwind CSS | 4.2.2 |
| **Charts** | Recharts | 3.8.0 |
| **Forms** | React Hook Form + @hookform/resolvers | 7.61.0 / 5.2.0 |
| **Validation** | Joi | 17.13.3 |
| **HTTP Client** | Axios | 1.10.0 |
| **Markdown** | react-markdown | 10.1.0 |
| **Notifications** | React Toastify | 11.0.5 |
| **Select Dropdowns** | React Select | 5.10.2 |
| **Icons** | React Icons (Feather) | 5.6.0 |
| **Modal** | react-modal | 3.16.3 |
| **Utilities** | clsx, tailwind-merge | Latest |

### Development Dependencies
- ESLint v9.39.4 — Code linting
- @vitejs/plugin-react v6.0.1 — React HMR
- @tailwindcss/vite — Tailwind CSS v4 plugin for Vite

---

## Project Structure

The frontend codebase is organized for modularity and ease of access:

- `src/components/` - Reusable UI widgets and layout structures
- `src/pages/` - Core application pages
- `src/store/` - Redux state management
- `src/utils/` - API configurations and formatting tools

---

## Prerequisites

- **Node.js** v18+
- **npm** v9+ (comes with Node.js)

---

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app opens at `http://localhost:5173`. It connects to the backend at `http://localhost:8000` by default (configurable via `VITE_API_URL`).

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build (optimized bundle) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint quality checks |

---

## Configuration

### Vite (`vite.config.js`)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src'   // Use @/ to import from src/
    }
  }
})
```

### Path Aliases (`jsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind Theme (`index.css`)

Custom brand palette from `brand-50` (#ecfdf5) to `brand-900` (#064e3b) with `brand-500` (#10b981) as primary. Font: **Inter** (Google Fonts). Custom animations: `chat-slide-in`, `chat-fade-in`, `slide-in-from-left`.

---

## Authentication

The frontend uses **cookie-based sessions** — no JWT is stored in localStorage. The backend sets HTTP-only cookies on login/register, and Axios sends them automatically via `withCredentials: true`.

**Flow:**
1. On mount, `App.jsx` dispatches `getUserProfile()` (`GET /users/me`) to check for an active session.
2. `isCheckingAuth` is `true` until the call resolves — a full-screen loader is shown.
3. If the call succeeds → `user` is set, protected routes become accessible.
4. If it fails → `user` stays `null`, unauthenticated users are redirected from protected routes to `/login`.

**Route Guards:**
- **`ProtectedRoute`** — Shows loader while checking auth. If no `user`, redirects to `/login`.
- **`PublicRoute`** — Shows loader while checking auth. If `user` exists, redirects to `/dashboard`.

**Logout:** Navbar dispatches `logoutUser()`, shows a success toast, navigates to `/login`.

---

## State Management

Five Redux Toolkit slices manage all state:

| Slice | Key State | Async Thunks |
|-------|-----------|-------------|
| **auth** | `user`, `isLoading`, `isCheckingAuth` | `registerUser`, `loginUser`, `logoutUser`, `getUserProfile` |
| **chat** | `isPanelOpen`, `sessions`, `activeSessionId`, `messages[]`, `isLoading` | `sendMessage` (optimistic UI), `fetchSessions`, `fetchSessionDetails`, `deleteSession` |
| **transactions** | `transactions[]`, `pagination`, `availableFilters{}` | `fetchTransactions`, `fetchAvailableFilters`, `addTransaction`, `updateTransaction`, `deleteTransaction` |
| **budget** | `summary`, `isLoading`, `isMutating` | `fetchBudgetSummary`, `setBudget` |
| **security** | `isLoading` | `changePassword` |

### Optimistic Chat

The `sendMessage` thunk pushes the user's message to the `messages` array **immediately** before the API call completes. On fulfillment, the AI response is appended. If a new `sessionId` is returned, a new session entry is prepended to the sessions list.

---

## Pages Overview

| Page | Route | Guard | Description |
|------|-------|-------|-------------|
| Landing | `/` | Public | Hero, features, security section |
| Login | `/login` | PublicRoute | Email + password form |
| Register | `/register` | PublicRoute | Name, email, password + confirm |
| Dashboard | `/dashboard` | ProtectedRoute | Financial overview, charts, budget progress |
| Transactions | `/transactions` | ProtectedRoute | Full CRUD table with filters + pagination |
| Analytics | `/analytics` | ProtectedRoute | Category spending donut + budget breakdown |
| Profile | `/profile` | ProtectedRoute | User info, budget config, password change |
| 404 | `*` | None | Not found page |

All protected routes are wrapped in `MainLayout` (sidebar + navbar + chat widget).

---

## Components Overview

### Layout

| Component | Description |
|-----------|-------------|
| `MainLayout` | Full-screen flex shell: sidebar, navbar, `<Outlet />`, `ChatWidget` |
| `Sidebar` | Collapsible nav (64 px ↔ 256 px), hidden on mobile |
| `Navbar` | Notification bell, user avatar initials, logout, mobile hamburger |

### Common

| Component | Description |
|-----------|-------------|
| `Button` | 6 variants (primary/secondary/outline/danger/ghost/ghostDanger), 3 sizes, `isLoading` spinner |
| `Input` | Auto-generated ID, left/right icons, error state, built-in password show/hide toggle |
| `Modal` | react-modal wrapper, backdrop blur, 90 vh max-height |
| `Loading` | Full-screen centered brand-colored spinner |
| `Logo` | Links to `/`, supports `isCollapsed` for sidebar |
| `ProtectedRoute` / `PublicRoute` | Auth guards with loading state |

---

## AI Chat Assistant

The chat feature is a **first-class citizen** in the UI — a floating action button (bottom-right) opens a slide-in panel.

### Components

| Component | Role |
|-----------|------|
| `ChatWidget` (index.jsx) | Floating button with ping animation, toggles panel open/closed |
| `ChatPanel` | Full-height panel: header, history toggle, data badge, messages, input bar |
| `ChatSidebar` | Session list with "New Chat" button, delete per session, active highlight |
| `ChatMessages` | Auto-scrolling list — user messages (right-aligned, green bg), AI messages (left, white bg, **markdown**) |
| `ChatInputBar` | Auto-resizing textarea (max 120 px), Enter to send, Shift+Enter for newline |
| `QuickQuestions` | 8 predefined prompt chips shown when the conversation is empty |
| `ChatDataBadge` | Info badge: "Powered by your last 12 months of financial data" |

### How It Works

1. User types a message (or clicks a quick question).
2. Redux thunk pushes the message to state immediately (optimistic UI).
3. Backend captures a 12-month financial snapshot on the first message of a session.
4. Gemini 2.5 Flash generates a response grounded in the user's real data.
5. AI reply is appended and rendered as markdown.
6. Session title is auto-generated from the first message.

### Dashboard Integration

The `GeminiInsightCard` on the dashboard dispatches `setChatPanelOpen(true)`, opening the chat panel directly from the dashboard.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000/api` | Backend API base URL |

Create a `.env` file in the `frontend/` root:

```env
VITE_API_URL=http://localhost:8000/api
```

Access in code via `import.meta.env.VITE_API_URL`.

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Output lands in `dist/` with optimized, hashed assets.

### Preview

```bash
npm run preview
```

### Vercel Deployment

The project includes a `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [{ "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }]
```

Deploy:

```bash
npx vercel
```

### Other Platforms

Works on any static host (Netlify, Cloudflare Pages, GitHub Pages) — just point it at the `dist/` folder. Ensure SPA routing is configured (all paths → `index.html`).

---

## Design Decisions

**Cookie-based auth over localStorage** — HTTP-only cookies are immune to XSS token theft. Axios sends them automatically with `withCredentials: true`. No manual token management on the frontend.

**Redux Toolkit for state** — Five focused slices keep concerns separated. The chat slice implements optimistic UI for instant message display, while transaction and budget slices handle loading/mutation states for inline loaders.

**React Hook Form + Joi** — Client-side validation mirrors the backend's Joi schemas, giving users instant feedback before a request is sent. Password fields get a built-in show/hide toggle.

**Dynamic filters** — The transaction filter dropdowns aren't hardcoded. They fetch available options from `GET /transactions/filters`, so the UI only shows options that actually exist in the user's data.

**react-markdown for AI responses** — Gemini responses may contain bold text, lists, and code. Custom-styled markdown components ensure they match the brand aesthetic (e.g., bold text in brand-green).

---

## Author

**Md Munna**
📧 mdmunna19434@gmail.com
📍 Bihar, India

---

<div align="center">

**Built for learning — AlmaBetter's AlmaX Program Assignment**

Made in Bihar, India

</div>
