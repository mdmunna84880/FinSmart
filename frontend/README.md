# FinsSmart - Personal Finance Dashboard

[![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.2-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-7.13.2-ca4245?logo=react&logoColor=white)](https://reactrouter.com)

A modern, responsive personal finance dashboard built with React and Tailwind CSS. Track your income, expenses, and make smarter financial decisions with visual insights.

> **📌 Project Context:** This project was built as part of **AlmaBetter's AlmaX Program — Week 5 Assignment**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Components Overview](#components-overview)
- [Pages Overview](#pages-overview)
- [Environment Variables](#environment-variables)
- [Build & Deployment](#build--deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

### Core Functionality
Built for **AlmaX Week 5 Assignment**, FinsSmart includes:

- **Dashboard Overview** - Real-time summary of income, expenses, and net savings
- **Transaction Management** - View, filter, and categorize financial transactions
- **Visual Analytics** - Interactive charts powered by Recharts
- **Budget Tracking** - Monitor spending against monthly category limits
- **Cash Flow Analysis** - 6-month income vs expense trends
- **Profile Management** - User details, linked accounts, and preferences
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Collapsible Sidebar** - Customizable navigation with collapse functionality

### UI/UX Features
- Toast notifications for user feedback
- Custom tooltips on charts
- Transaction type badges (debit/credit)
- Advanced filtering for transactions
- Mobile-friendly navigation drawer
- Clean, modern design with Tailwind CSS

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 19.2.4 |
| **Build Tool** | Vite | 8.0.1 |
| **Routing** | React Router | 7.13.2 |
| **Styling** | Tailwind CSS | 4.2.2 |
| **Charts** | Recharts | 3.8.0 |
| **Icons** | React Icons | 5.6.0 |
| **Notifications** | React Toastify | 11.0.5 |
| **Select Dropdowns** | React Select | 5.10.2 |
| **Utilities** | clsx, tailwind-merge | Latest |

### Development Dependencies
- ESLint (v9.39.4) - Code linting
- @vitejs/plugin-react (v6.0.1) - React HMR
- @recharts/devtools (v0.0.11) - Recharts debugging tools

---

## Project Structure

```
frontend/
├── public/
│   ├── favicon.svg              # App favicon
│   └── icons.svg                # SVG icon sprite
│
├── src/
│   ├── assets/                  # Static assets (images, fonts, etc.)
│   │
│   ├── components/
│   │   ├── common/              # Shared reusable components
│   │   │   └── Logo.jsx         # Brand logo component
│   │   │
│   │   └── layout/              # Layout components
│   │       ├── MainLayout.jsx   # Main app wrapper with sidebar
│   │       ├── Navbar.jsx       # Top navigation bar
│   │       ├── Sidebar.jsx      # Collapsible side navigation
│   │       └── navItems.js      # Navigation link configuration
│   │
│   ├── data/
│   │   └── mockData.js          # Mock data for development
│   │
│   ├── pages/                   # Route-level page components
│   │   ├── analytics/           # Analytics & insights page
│   │   ├── dashboard/           # Main dashboard page
│   │   │   ├── index.jsx        # Dashboard main component
│   │   │   ├── SummaryCard.jsx  # Metric card component
│   │   │   ├── BudgetProgress.jsx
│   │   │   ├── CashFlowChart.jsx
│   │   │   ├── CustomToolTip.jsx
│   │   │   └── RecentTransactions.jsx
│   │   │
│   │   ├── landing/             # Public landing page
│   │   │   ├── index.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── PublicNavbar.jsx
│   │   │   └── Security.jsx
│   │   │
│   │   ├── profile/             # User profile page
│   │   ├── transactions/        # Transactions list page
│   │   │   ├── index.jsx
│   │   │   ├── TransactionFilters.jsx
│   │   │   ├── TransactionTable.jsx
│   │   │   └── TypeBadge.jsx
│   │   │
│   │   └── not-found/           # 404 error page
│   │
│   ├── utils/                   # Utility functions
│   │   ├── cn.js                # Tailwind class merger (clsx + twMerge)
│   │   └── currencyFormater.js  # Currency formatting helper
│   │
│   ├── App.jsx                  # Root component with routes
│   ├── App.css                  # Component-specific styles
│   ├── index.css                # Global styles + Tailwind directives
│   └── main.jsx                 # Application entry point
│
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── jsconfig.json                # JavaScript config (path aliases)
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite build configuration
└── README.md                    # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) or **yarn** (v1.22+)
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
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Hot Module Replacement (HMR) |
| `npm run build` | Build for production (optimized bundle) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Configuration

### Vite Configuration (`vite.config.js`)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

**Key Settings:**
- **Path Alias**: `@` resolves to `src/` directory
- **Plugins**: React (with HMR) and Tailwind CSS v4
- **Build Target**: Modern browsers (ES modules)

### ESLint Configuration

The project uses ESLint v9 with the following plugins:
- `eslint-plugin-react-hooks` - Enforces Rules of Hooks
- `eslint-plugin-react-refresh` - Validates React Refresh usage

---

## Components Overview

### Layout Components

| Component | Path | Description |
|-----------|------|-------------|
| `MainLayout` | `components/layout/` | Wrapper with sidebar + navbar + content area |
| `Sidebar` | `components/layout/` | Collapsible navigation sidebar |
| `Navbar` | `components/layout/` | Top bar with notifications + user avatar |

### Common Components

| Component | Path | Description |
|-----------|------|-------------|
| `Logo` | `components/common/` | Brand logo with collapse state support |

### Dashboard Components

| Component | Path | Description |
|-----------|------|-------------|
| `SummaryCard` | `pages/dashboard/` | Metric display card with trend indicator |
| `BudgetProgress` | `pages/dashboard/` | Budget vs spending progress bar |
| `CashFlowChart` | `pages/dashboard/` | 6-month income/expense chart |
| `RecentTransactions` | `pages/dashboard/` | Latest transactions list |
| `CustomToolTip` | `pages/dashboard/` | Custom tooltip for Recharts |

### Transaction Components

| Component | Path | Description |
|-----------|------|-------------|
| `TransactionTable` | `pages/transactions/` | Sortable, filterable transaction table |
| `TransactionFilters` | `pages/transactions/` | Filter controls (date, category, type) |
| `TypeBadge` | `pages/transactions/` | Visual badge for debit/credit type |

---

## Pages Overview

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| Landing | `/` | `Landing` | Public homepage with features |
| Dashboard | `/dashboard` | `Dashboard` | Financial overview and metrics |
| Transactions | `/transactions` | `Transactions` | Full transaction history |
| Analytics | `/analytics` | `Analytics` | Charts and insights |
| Profile | `/profile` | `Profile` | User settings and account info |
| 404 | `*` | `NotFound` | Error page for undefined routes |

---

## Environment Variables

Currently, the application uses mock data from `src/data/mockData.js`. For production use, create a `.env` file:

```env
VITE_API_BASE_URL=https://api.finsmart.com
VITE_APP_TITLE=FinsSmart
```

Access environment variables in code:

```js
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## Build & Deployment

### Production Build

```bash
npm run build
```

Output: `dist/` directory with optimized assets.

### Preview Production Build

```bash
npm run preview
```

### Deployment Checklist

- [ ] Update API endpoints in environment variables
- [ ] Replace mock data with real API calls
- [ ] Enable authentication flow
- [ ] Configure proper error boundaries
- [ ] Add analytics tracking (optional)

### Hosting Platforms

FinsSmart can be deployed to any static hosting:

- **Vercel** - Automatic deployments from Git
- **Netlify** - Drag & drop or Git integration
- **GitHub Pages** - Free hosting for public repos
- **Cloudflare Pages** - Fast global CDN

---

## Code Quality

### ESLint Rules

Run linting:

```bash
npm run lint
```

The project enforces:
- React Hooks rules
- JSX best practices
- No unused imports
- Consistent code style

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Use functional components with hooks
- Follow ESLint rules
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic

---

## Known Issues

1. **Mobile Safari Sidebar** - Drawer animation may lag on older iOS devices
2. **Chart Responsiveness** - Very narrow screens (<320px) may have layout issues
3. **Date Filtering** - Currently displays all transactions; date range filter pending

---

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication (JWT/OAuth)
- [ ] Export transactions to CSV/PDF
- [ ] Dark mode theme
- [ ] Recurring transaction automation
- [ ] Savings goal tracking
- [ ] Multi-currency support
- [ ] Bank account integration (Plaid)

---

## License

This project is part of **AlmaBetter's AlmaX Program — Week 5 Assignment** and is intended for educational purposes.

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
- **AlmaX Program** — For the Week 5 assignment that made this project possible
- **React Team** — For the amazing framework
- **Tailwind Labs** — For the incredible CSS framework
- **Recharts Contributors** — For the beautiful chart library

---

<div align="center">

**Built with ❤️ for AlmaBetter — AlmaX Week 5 Assignment**

Made in Bihar, India

</div>
