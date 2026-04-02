# FinSmart API - Backend Server

[![Node.js](https://img.shields.io/badge/Node.js-ESM-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9.3.3-47A24D?logo=mongodb&logoColor=white)](https://mongoosejs.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=json-web-tokens&logoColor=white)](https://jwt.io)

RESTful API backend for the FinSmart Personal Finance Dashboard. Built with Express.js and MongoDB, featuring JWT authentication, transaction management, and budget tracking.

> **📌 Project Context:** This project was built as part of **AlmaBetter's AlmaX Program — Week 6 Assignment**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Middlewares](#middlewares)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

### Core API Features
Built for **AlmaX Week 6 Assignment**, FinSmart API includes:

- **User Authentication** - JWT-based auth with refresh token support
- **User Management** - Registration, login, profile management
- **Transaction CRUD** - Create, read, update, delete financial transactions
- **Budget Management** - Set and track monthly budgets per category
- **Protected Routes** - Middleware-based authentication guards
- **Input Validation** - Joi schema validation for all inputs
- **Error Handling** - Centralized error handling with custom error classes
- **CORS Support** - Configured for frontend origin
- **Cookie-based Auth** - Secure HTTP-only cookies for tokens
- **Request Logging** - Morgan HTTP logger for debugging
- **No-Cache Middleware** - Prevents cached responses on sensitive routes

### Security Features
- Password hashing with bcryptjs
- JWT access and refresh tokens
- HTTP-only cookies
- CORS origin restrictions
- Input sanitization and validation

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Runtime** | Node.js | ESM Modules |
| **Framework** | Express | 5.2.1 |
| **Database** | MongoDB | Latest |
| **ODM** | Mongoose | 9.3.3 |
| **Authentication** | JWT | 9.0.3 |
| **Password Hashing** | bcryptjs | 3.0.3 |
| **Validation** | Joi | 18.1.2 |
| **CORS** | cors | 2.8.6 |
| **Cookie Parser** | cookie-parser | 1.4.7 |
| **Logging** | morgan | 1.10.1 |
| **Environment** | dotenv | 17.3.1 |

### Development Tools
- **Nodemon** - Auto-restart during development
- **ES Modules** - Modern JavaScript module system

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                # MongoDB connection handler
│   │   └── env.js               # Environment variables loader
│   │
│   ├── controllers/
│   │   ├── userController.js    # User auth & profile logic
│   │   ├── transactionController.js  # Transaction CRUD operations
│   │   └── budgetController.js  # Budget management logic
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT authentication guard
│   │   ├── errorMiddleware.js   # Global error handler
│   │   ├── validateMiddleware.js # Joi validation wrapper
│   │   └── noCache.js           # Disable caching for sensitive routes
│   │
│   ├── models/
│   │   ├── User.js              # User schema with password hashing
│   │   ├── Transaction.js       # Transaction schema (debit/credit)
│   │   └── Budget.js            # Budget schema (category limits)
│   │
│   ├── routes/
│   │   ├── userRoutes.js        # Auth routes (/api/users)
│   │   ├── transactionRoutes.js # Transaction routes (/api/transactions)
│   │   └── budgetRoutes.js      # Budget routes (/api/budgets)
│   │
│   ├── utils/
│   │   ├── AppError.js          # Custom error class
│   │   ├── AuthValidation.js    # Auth Joi schemas
│   │   ├── BudgetValidation.js  # Budget Joi schemas
│   │   └── TransactionValidation.js # Transaction Joi schemas
│   │
│   ├── app.js                   # Express app configuration
│   └── index.js                 # Server entry point
│
├── .env                         # Environment variables (not in git)
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) or **yarn** (v1.22+)
- **MongoDB** - Local installation or MongoDB Atlas account
- **Git** (optional, for version control)

Verify your installation:

```bash
node --version
npm --version
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mdmunna84880/FinSmart
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### 4. Start the Server

**Development Mode:**

```bash
npm run dev
```

**Production Mode:**

```bash
npm run start
```

The API will be available at `http://localhost:3000`

---

## Configuration

### Environment Setup

The application uses `dotenv` to load environment variables from a `.env` file.

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | - | **Yes** |
| `JWT_SECRET` | Secret for access tokens | - | **Yes** |
| `JWT_EXPIRES_IN` | Access token expiry | `1d` | No |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | - | **Yes** |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` | No |
| `FRONTEND_URL` | Frontend origin for CORS | - | No |

### CORS Configuration

CORS is configured in `src/app.js` to allow requests from the frontend:

```js
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
```

For production, update the `FRONTEND_URL` environment variable.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon (auto-restart) |
| `npm run start` | Start production server |

---

## API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/users/register` | Register new user | No |
| `POST` | `/users/login` | Login user | No |
| `POST` | `/users/logout` | Logout user | Yes |
| `POST` | `/users/refresh-token` | Refresh access token | Yes (refresh token) |
| `GET` | `/users/profile` | Get user profile | Yes |
| `PUT` | `/users/profile` | Update user profile | Yes |
| `PUT` | `/users/password` | Change password | Yes |

### Transaction Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/transactions` | Get all transactions | Yes |
| `GET` | `/transactions/:id` | Get single transaction | Yes |
| `POST` | `/transactions` | Create new transaction | Yes |
| `PUT` | `/transactions/:id` | Update transaction | Yes |
| `DELETE` | `/transactions/:id` | Delete transaction | Yes |
| `GET` | `/transactions/summary` | Get transaction summary | Yes |

### Budget Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/budgets` | Get all budgets | Yes |
| `GET` | `/budgets/:id` | Get single budget | Yes |
| `POST` | `/budgets` | Create new budget | Yes |
| `PUT` | `/budgets/:id` | Update budget | Yes |
| `DELETE` | `/budgets/:id` | Delete budget | Yes |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Server status check |

---

## Authentication

### JWT Token Flow

1. User logs in with credentials
2. Server generates access token (short-lived) and refresh token (long-lived)
3. Tokens are stored in HTTP-only cookies
4. Access token is used for authenticated requests
5. When access token expires, use refresh token to get new access token

### Token Structure

```js
{
    id: "user-id",
    email: "user@example.com",
    iat: 1234567890,
    exp: 1234567890
}
```

### Using Protected Routes

Include the cookie in your requests:

```bash
curl -X GET http://localhost:3000/api/transactions \
  -H "Cookie: accessToken=your-token-here"
```

Or use the frontend which handles cookies automatically.

---

## Data Models

### User Model

```js
{
    name: String,
    email: { type: String, unique: true },
    password: String,
    avatar: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: Date,
    updatedAt: Date
}
```

### Transaction Model

```js
{
    user: { type: ObjectId, ref: 'User' },
    type: { type: String, enum: ['debit', 'credit'] },
    amount: Number,
    category: String,
    description: String,
    date: Date,
    createdAt: Date,
    updatedAt: Date
}
```

### Budget Model

```js
{
    user: { type: ObjectId, ref: 'User' },
    category: String,
    limit: Number,
    spent: { type: Number, default: 0 },
    month: Number,
    year: Number,
    createdAt: Date,
    updatedAt: Date
}
```

---

## Middlewares

### `authMiddleware.js`

Protects routes by verifying JWT tokens.

```js
import { protect } from './middlewares/authMiddleware.js';

app.get('/protected-route', protect, (req, res) => {
    // req.user is available here
});
```

### `validateMiddleware.js`

Wraps Joi validation for request bodies.

```js
import { validate } from './middlewares/validateMiddleware.js';
import { registerSchema } from './utils/AuthValidation.js';

app.post('/register', validate(registerSchema), userController.register);
```

### `errorMiddleware.js`

Global error handler that catches all errors.

```js
// Automatically applied in app.js
app.use(globalErrorHandler);
```

### `noCache.js`

Disables caching for sensitive routes to prevent 304 Not Modified responses.

```js
import { noCache } from './middlewares/noCache.js';

app.get('/users/profile', protect, noCache, userController.getProfile);
```

**Headers set by noCache:**
- `Cache-Control: no-cache, no-store, must-revalidate, private`
- `Expires: 0`
- `Pragma: no-cache`
- `Surrogate-Control: no-store`

---

## Error Handling

### Custom Error Class

All errors use the `AppError` class:

```js
import AppError from './utils/AppError.js';

throw new AppError('Resource not found', 404);
```

### Error Response Format

```json
{
    "status": "error",
    "statusCode": 404,
    "message": "Resource not found"
}
```

### Error Types

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server error |

---

## Environment Variables

### Development (.env)

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=dev-refresh-secret-key-change-in-production
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Production (.env.production)

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/finsmart
JWT_SECRET=super-secure-random-string-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=super-secure-refresh-random-string-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=https://finsmart.vercel.app
NODE_ENV=production
```

---

## Testing

### Manual Testing with Postman

Import the Postman collection:

```
FinSmart_Auth_API.postman_collection.json
```

### API Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Protected route access
- [ ] Token refresh
- [ ] Transaction CRUD
- [ ] Budget CRUD
- [ ] Invalid token handling
- [ ] Input validation errors

---

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Deploy to Render

1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm run start`
4. Add environment variables

### Deploy to Railway

1. Create new project from GitHub
2. Add MongoDB service
3. Configure environment variables
4. Deploy automatically on push

### Deployment Checklist

- [ ] Set strong JWT secrets
- [ ] Configure production MongoDB
- [ ] Update CORS origin
- [ ] Enable HTTPS
- [ ] Set up logging
- [ ] Configure rate limiting (optional)
- [ ] Add monitoring (optional)

---

## Security

### Best Practices Implemented

- **Password Hashing** - bcryptjs with salt rounds
- **JWT Tokens** - Short-lived access tokens
- **HTTP-only Cookies** - Prevents XSS token theft
- **Input Validation** - Joi schemas for all inputs
- **CORS Restrictions** - Limited to frontend origin
- **Error Messages** - Generic messages (no stack traces)
- **No-Cache Headers** - Prevents cached responses on sensitive data

### Recommended Additions

- Rate limiting (express-rate-limit)
- Request sanitization (express-validator)
- Helmet.js for security headers
- API key for admin routes
- MongoDB index optimization

---

## Database

### MongoDB Connection

Connection is handled in `src/config/db.js`:

```js
const connectDB = async () => {
    const connectionInstance = await mongoose.connect(`${env.MONGODB_URI}/finsmart`);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
};
```

### Using MongoDB Atlas

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
```

### Local MongoDB

```env
MONGODB_URI=mongodb://localhost:27017
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Use ES Modules syntax (`import`/`export`)
- Follow Express.js conventions
- Use async/await for async operations
- Handle errors with try/catch
- Use meaningful variable names
- Add comments for complex logic

---

## Known Issues

1. **Token Expiry** - Very short expiry may require frequent refresh
2. **CORS** - Strict origin may block legitimate requests in some setups
3. **Error Messages** - Could be more descriptive for client-side handling

---

## Future Enhancements

- [ ] Rate limiting for API endpoints
- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Transaction export (CSV/PDF)
- [ ] Budget alerts and notifications
- [ ] Analytics endpoints
- [ ] Admin dashboard API
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests

---

## License

This project is part of **AlmaBetter's AlmaX Program — Week 6 Assignment** and is intended for educational purposes.

Feel free to use the code for learning, but please don't copy it directly for your portfolio without understanding it first.

---

## Author

**Md Munna**
📧 Email: [mdmunna19434@gmail.com](mailto:mdmunna19434@gmail.com)
📱 Phone: +91 7050498963
📍 Location: Bihar, India

---

## Acknowledgments

- **AlmaBetter** — For the learning opportunity and structured curriculum
- **AlmaX Program** — For the Week 6 assignment that made this project possible
- **Express.js Team** — For the amazing web framework
- **MongoDB Team** — For the flexible NoSQL database
- **Mongoose Contributors** — For the elegant ODM

---

## API Quick Reference

### Register User

```bash
POST /api/users/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
}
```

### Login User

```bash
POST /api/users/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "securepassword123"
}
```

### Create Transaction

```bash
POST /api/transactions
Cookie: accessToken=your-token

{
    "type": "debit",
    "amount": 500,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2026-04-02"
}
```

### Get All Transactions

```bash
GET /api/transactions
Cookie: accessToken=your-token
```

### Create Budget

```bash
POST /api/budgets
Cookie: accessToken=your-token

{
    "category": "Food",
    "limit": 5000,
    "month": 4,
    "year": 2026
}
```

---

<div align="center">

**Built with ❤️ for AlmaBetter — AlmaX Week 6 Assignment**

Made in Bihar, India

</div>
