# FinSmart API — Backend

A clean, no-nonsense REST API that powers the FinSmart personal finance dashboard. It handles user authentication, transaction tracking, and budget management — all backed by MongoDB and Express.js.

> **Built for AlmaBetter's AlmaX Program — Week 6 Project**

---

## What This Does

At its core, this backend gives the frontend everything it needs to run a personal finance app:

- **Sign up, log in, log out** — JWT tokens delivered via HTTP-only cookies. No localStorage token nonsense.
- **Track transactions** — Record income and expenses with categories, dates, and descriptions. Filter them by year, month, category, type, or free-text search.
- **Set budgets** — Define monthly spending limits overall and per category. Get a summary that compares what you planned to spend against what you actually spent.
- **Dynamic filter dropdowns** — The API surfaces which years, months, categories, and types actually exist in your data so the frontend doesn't show empty options.

---

## How It's Built

| Layer | What's Used |
|-------|-------------|
| Runtime | Node.js (ES modules) |
| Framework | Express 5 |
| Database | MongoDB via Mongoose 9 |
| Auth | JWT in HTTP-only cookies |
| Validation | Joi schemas |
| Password Hashing | bcryptjs |
| Logging | Morgan (dev mode) |

### Architecture

The code follows a lightweight layered pattern:

```
Routes → Controllers → Services/Repositories → Models
```

- **Routes** define endpoints and wire up validation + auth middleware.
- **Controllers** handle request/response logic and business flow.
- **Services** (`transactionQueryService.js`) build reusable query logic.
- **Repositories** (`transactionsRepository.js`) handle raw data access and aggregation pipelines.
- **Models** define schemas, indexes, and instance methods (password hashing, token generation).

It's not over-engineered — controllers talk directly to models for simple CRUD, and delegate to services/repositories when queries get more involved.

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── env.js             # Centralized env config
│   │
│   ├── controllers/
│   │   ├── userController.js      # Auth & profile logic
│   │   ├── transactionController.js  # Transaction CRUD + filters
│   │   └── budgetController.js    # Budget settings & summaries
│   │
│   ├── services/
│   │   └── transactionQueryService.js  # Builds MongoDB query filters
│   │
│   ├── repositories/
│   │   └── transactionsRepository.js   # Dynamic filter aggregations
│   │
│   ├── models/
│   │   ├── User.js              # User schema + JWT methods
│   │   ├── Transaction.js       # Income/expense records
│   │   └── Budget.js            # Monthly budget limits
│   │
│   ├── routes/
│   │   ├── userRoutes.js        # /api/users/*
│   │   ├── transactionRoutes.js # /api/transactions/*
│   │   └── budgetRoutes.js      # /api/budgets/*
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT verification from cookie
│   │   ├── validateMiddleware.js # Joi validation wrapper
│   │   ├── errorMiddleware.js   # Global error handler
│   │   └── noCache.js           # Disables browser caching
│   │
│   ├── utils/
│   │   ├── AppError.js          # Custom error class
│   │   ├── AuthValidation.js    # Joi schemas for auth
│   │   ├── BudgetValidation.js  # Joi schemas for budgets
│   │   └── TransactionValidation.js # Joi schemas for transactions
│   │
│   ├── app.js                   # Express app setup
│   └── index.js                 # Server entry point
│
├── .env                     # Environment variables (create your own)
├── package.json
└── README.md
```

---

## Getting It Running

### Prerequisites

- **Node.js** v18+
- **MongoDB** — either a local instance or MongoDB Atlas
- **npm** (comes with Node.js)

### Setup

```bash
# Install dependencies
npm install

# Create a .env file with these values:
# PORT=8000
# MONGODB_URI=mongodb://localhost:27017
# JWT_SECRET=something-long-and-random
# JWT_EXPIRY=7d
# NODE_ENV=development

# Start the dev server (auto-restarts on file changes)
npm run dev
```

Server will be up at `http://localhost:8000`.

---

## API Endpoints

Base URL: `http://localhost:8000/api`

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/users/register` | Create a new account | No |
| POST | `/users/login` | Log in | No |
| POST | `/users/logout` | Log out (clears cookie) | Yes |
| GET | `/users/me` | Get your profile | Yes |
| PUT | `/users/change-password` | Update password | Yes |

### Transactions

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/transactions/filters` | Get available filter options (years, months, categories, types) | Yes |
| GET | `/transactions` | List transactions (paginated, filterable) | Yes |
| GET | `/transactions/:id` | Get a single transaction | Yes |
| POST | `/transactions` | Add a transaction | Yes |
| PUT | `/transactions/:id` | Update a transaction | Yes |
| DELETE | `/transactions/:id` | Delete a transaction | Yes |

**Query parameters for listing transactions:**
- `page` — page number (default: 1)
- `limit` — items per page (default: 20)
- `year` — filter by year
- `month` — filter by month (1-12)
- `category` — filter by category
- `type` — filter by "Income" or "Expense"
- `search` — free-text search across description, category, and type

### Budgets

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/budgets` | Set or update a budget (upsert) | Yes |
| GET | `/budgets` | Get budget for a specific month/year | Yes |
| GET | `/budgets/summary` | Get full budget summary with actual spending | Yes |

**Query parameters for budget endpoints:**
- `year` — defaults to current year
- `month` — defaults to current month (1-12)

The `/summary` endpoint is the interesting one — it aggregates your transactions for the month and tells you total income, total expenses, net savings, and how each category's spending compares to your set limit.

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Returns "Server is running" |

---

## Authentication

Tokens are stored in HTTP-only cookies — the frontend doesn't need to manually attach them to requests. Here's the flow:

1. **Register or login** → server sets a `token` cookie with a JWT.
2. **Protected routes** → the `verifyJWT` middleware reads the token from the cookie (or `Authorization: Bearer` header as a fallback), decodes it, and attaches the user to `req.user`.
3. **Logout** → server clears the cookie.

The JWT contains the user's `_id` and `email`. Token expiry is controlled by `JWT_EXPIRY` in the `.env` file.

### Example: Login

```bash
curl -X POST http://localhost:8000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

The `-c cookies.txt` flag saves the cookie for subsequent requests.

---

## Data Models

### User

```js
{
  name: String,          // required
  email: String,         // required, unique, lowercase, indexed
  password: String,      // required, hashed before save
  createdAt: Date,       // auto
  updatedAt: Date        // auto
}
```

### Transaction

```js
{
  userId: ObjectId,      // ref: User, required, indexed
  amount: Number,        // required
  type: String,          // "Income" | "Expense", required, indexed
  category: String,      // required, indexed
  date: Date,            // required, indexed, defaults to now
  desc: String,          // optional description
  createdAt: Date,       // auto
  updatedAt: Date        // auto
}
```

Compound indexes on `(userId, date)`, `(userId, category)`, and `(userId, type)` keep common queries fast.

### Budget

```js
{
  userId: ObjectId,      // ref: User, required
  year: Number,          // required
  month: Number,         // required (1-12)
  monthlyBudget: Number, // required, default: 0
  savingsTarget: Number, // default: 0
  categoryLimits: [{     // per-category spending caps
    category: String,
    limit: Number
  }],
  createdAt: Date,       // auto
  updatedAt: Date        // auto
}
```

A unique compound index on `(userId, year, month)` ensures one budget per user per month. Setting a budget for the same month again updates it in place.

---

## Validation & Error Handling

Every incoming request body is validated against a Joi schema before it reaches the controller. If validation fails, you get a 400 with a clear message about what went wrong.

Errors flow through a global error handler that:

- In **development**: returns the full error object and stack trace.
- In **production**: returns only a clean message — no internals leaked.

Unknown route paths get caught by a 404 handler at the bottom of the middleware stack.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Port to listen on. Defaults to `8000`. |
| `MONGODB_URI` | **Yes** | MongoDB connection string (without database name — the app appends `/finsmart`). |
| `JWT_SECRET` | **Yes** | Secret key for signing JWTs. Make it long and random. |
| `JWT_EXPIRY` | No | Token expiry duration. Defaults to `7d`. |
| `NODE_ENV` | No | `development` or `production`. Controls error verbosity. |

---

## Design Decisions Worth Noting

**Cookie-based auth over localStorage** — HTTP-only cookies are immune to XSS token theft. The tradeoff is CSRF, but since this is paired with a same-origin frontend (via CORS `credentials: true` and `sameSite: strict`), the risk is mitigated.

**Services and repositories** — Not every controller needs them. Simple CRUD (like user profile) lives directly in the controller. But transaction filtering uses a `buildTransactionMatch()` service to construct query filters, and a repository to run `$facet` aggregations for dynamic dropdowns. This keeps the controller readable.

**Upsert for budgets** — Instead of separate "create" and "update" endpoints, `setBudget` uses `findOneAndUpdate` with `upsert: true`. One endpoint, one less thing to think about.

**Dynamic filters** — The `/transactions/filters` endpoint doesn't return hardcoded options. It runs an aggregation on your actual data, so if you only have transactions from 2025 and 2026, the dropdown only shows those years. No stale options.

**Indexed queries** — Compound indexes on the most common query patterns (`userId + date`, `userId + category`, `userId + type`) keep the API responsive even as transaction counts grow.

---

## Available Scripts

```bash
npm run dev     # Development with auto-restart (nodemon)
npm run start   # Production mode (plain node)
```

---

## Author

**Md Munna**
📧 mdmunna19434@gmail.com
📍 Bihar, India

---

<div align="center">
Part of AlmaBetter's AlmaX Program
</div>
