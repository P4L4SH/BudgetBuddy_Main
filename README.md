# BudgetBuddy Pro 💸

A full-stack budget tracking web app built with **React + Node.js**. Track your income and expenses, visualize spending with a real-time doughnut chart, filter transactions, toggle between light/dark themes — all in a clean, responsive dashboard.

🚀 **Live Demo:** [https://budgetbuddy-main.onrender.com](https://budgetbuddy-main.onrender.com)

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Technical Architecture](#-technical-architecture)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Author](#-author)

---

## ✨ Key Features

### 🎨 Frontend (React + Vite + Tailwind)

- **Interactive Dashboard** — Real-time calculations for Total Balance, Income, and Expenses with instant UI updates.
- **Visual Analytics** — Income vs Expense doughnut chart (green / red) powered by Chart.js + react-chartjs-2, fully theme-aware (tooltip & legend colors adapt to light/dark mode).
- **Add / Edit / Delete Transactions** — Inline form with date picker; edit any transaction by clicking the edit icon.
- **Filter Controls** — Toggle between **All**, **Income**, and **Expense** views to focus on what matters.
- **Light / Dark Theme Toggle** — Smooth CSS custom property transitions; preference persisted in `localStorage`.
- **Responsive Design** — Single-page dashboard layout adapts from side-by-side chart+form on desktop to a stacked layout on mobile. No sidebar, no clutter.
- **Empty State** — Clean fallback UI when no transactions exist, with a prompt to add your first one.
- **Custom Typography** — Chakra Petch (primary) + Montserrat (secondary) fonts via Google Fonts.
- **Monochrome Palette** — Sophisticated black, white, and gray color scheme with subtle overlay layers — no distracting accent colors.

### ⚙️ Backend (Node.js + Express)

- **RESTful API** — Full CRUD endpoints: `GET`, `POST`, `PUT`, and `DELETE` for transactions.
- **Smart Database Layer** — Automatically switches between **SQLite** (local development) and **PostgreSQL** (production on Render) based on the `DATABASE_URL` environment variable. No config files to edit.
- **Input Validation** — Validates required fields (`text`, `amount`, `type`, `date`) before processing requests.
- **Production-Ready** — Serves the built React frontend from `client/dist/` with SPA fallback routing.

### 🗄️ Database (Dual Mode)

| Mode       | Engine      | When                        |
| ---------- | ----------- | --------------------------- |
| Local Dev  | SQLite 🗄️  | `DATABASE_URL` is not set   |
| Production | PostgreSQL 🐘 | `DATABASE_URL` is set     |

- SQLite runs as an embedded native module (`better-sqlite3`) for zero-config local setup.
- PostgreSQL on Render provides a free, managed relational database with automatic backups.

---

## 🏗 Technical Architecture

The application follows a modern **Client-Server Architecture** with a clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│                   Client                         │
│  React 18 + Vite 5 + Tailwind CSS 3 + Chart.js  │
│  ┌───────────┐ ┌──────────┐ ┌─────────────────┐ │
│  │ Dashboard │ │  Form    │ │ Doughnut Chart  │ │
│  │ (state)   │ │ (add/edit)│ │ (Chart.js)      │ │
│  └─────┬─────┘ └────┬─────┘ └────────┬────────┘ │
│        │            │                │           │
│        └────────────┴────────────────┘           │
│                    │ Axios HTTP                   │
└────────────────────┼──────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              Express Server (port 5000)           │
│  ┌─────────────┐  ┌───────────────────────────┐  │
│  │  server.js  │  │      database.js           │  │
│  │ (routes)    │  │  ┌─────────┐ ┌──────────┐ │  │
│  │             │  │  │ SQLite  │ │PostgreSQL│ │  │
│  │ GET/POST/   │──┼──┤ (local) │ │ (Render) │ │  │
│  │ PUT/DELETE  │  │  └─────────┘ └──────────┘ │  │
│  └─────────────┘  └───────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

- **Client (Frontend):** React components in `client/src/components/` manage their own state, communicate with the backend via axios, and re-render reactively.
- **Server (Backend):** Express routes in `server/server.js` delegate to `database.js`, which abstracts away the database engine. The server also serves the production build as static files.

---

## 🛠 Technology Stack

| Component       | Technology                              | Description                                      |
| --------------- | --------------------------------------- | ------------------------------------------------ |
| **Frontend**    | React 18, JSX                           | Component-based UI library                       |
| **Build Tool**  | Vite 5                                  | Fast bundler with HMR                            |
| **Styling**     | Tailwind CSS 3 + CSS Custom Properties  | Utility-first CSS + theme variables              |
| **Charts**      | Chart.js 4 + react-chartjs-2            | Interactive doughnut chart                       |
| **HTTP Client** | Axios                                   | Promise-based HTTP requests                      |
| **Backend**     | Node.js + Express 4                     | Server-side runtime and web framework            |
| **Database**    | better-sqlite3 / pg                     | SQLite (local) / PostgreSQL (production)         |
| **Hosting**     | Render.com                              | Free cloud hosting with PostgreSQL               |

---

## 🚀 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later

### Steps

```bash
# Clone the repository
git clone https://github.com/P4L4SH/BudgetBuddy_Main.git

# Navigate to the project folder
cd BudgetBuddy_Main

# Install all dependencies
npm install
```

### Run Locally (Development Mode)

```bash
npm run dev
```

This starts both:
- **Express backend** on `http://localhost:5000`
- **Vite dev server** with HMR on `http://localhost:5173`

Open **http://localhost:5173** in your browser. The dev server proxies `/api` requests to the backend automatically.

### Run in Production Mode Locally

```bash
npm run build   # Builds React app into client/dist/
npm start       # Starts Express server (serves frontend + API)
```

Visit **http://localhost:5000**.

---

## 📁 Project Structure

```
BudgetBuddy_Main/
├── client/                          # React frontend
│   ├── index.html                   # Entry HTML with Google Fonts
│   └── src/
│       ├── main.jsx                 # React entry point
│       ├── index.css                # Tailwind + theme CSS variables
│       └── components/
│           ├── Dashboard.jsx        # Main stateful component
│           ├── SummaryCards.jsx     # Balance / Income / Expense cards
│           ├── TransactionForm.jsx  # Add / Edit form
│           ├── TransactionList.jsx  # Table with edit/delete
│           └── IncomeExpenseChart.jsx # Doughnut chart
├── server/                          # Express backend
│   ├── server.js                    # API routes + static file serving
│   └── database.js                  # Auto-switching DB layer
├── server/
│   └── tests/
│       └── api.test.js              # Backend API integration tests
├── client/src/
│   └── components/__tests__/
│       ├── SummaryCards.test.jsx    # SummaryCards component tests
│       └── TransactionList.test.jsx # TransactionList component tests
├── babel.config.js                  # Babel config for Jest
├── package.json                     # All deps (root)
├── vite.config.js                   # Vite config with /api proxy
├── tailwind.config.js               # Tailwind theme (colors, fonts)
└── postcss.config.js                # PostCSS plugins
```

---

## 🔌 API Documentation

All endpoints are prefixed with `/api` and return JSON.

| Method   | Endpoint                | Description               | Request Body                                     |
| -------- | ----------------------- | ------------------------- | ------------------------------------------------ |
| `GET`    | `/api/transactions`     | Fetch all transactions    | —                                                |
| `POST`   | `/api/transactions`     | Add a new transaction     | `{ "text": "...", "amount": 123, "type": "income" \| "expense", "date": "2026-05-21" }` |
| `PUT`    | `/api/transactions/:id` | Update an existing one    | `{ "text": "...", "amount": 123, "type": "income" \| "expense", "date": "2026-05-21" }` |
| `DELETE` | `/api/transactions/:id` | Delete a transaction      | —                                                |

### Example: Create a Transaction

```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"text":"Freelance work","amount":2500,"type":"income","date":"2026-05-21"}'
```

---

## 🧪 Testing

### Automated Tests (Jest)

Run all tests with:

```bash
npm test
```

Or run only backend or frontend tests:

```bash
npm run test:server    # API endpoint tests
npm run test:client    # React component tests
```

#### Backend Tests (16 tests)

| Test                                        | Expected Result                    |
| ------------------------------------------- | ---------------------------------- |
| `GET /api/transactions` — empty array       | Returns `[]` with status 200       |
| `GET /api/transactions` — with data         | Returns all transactions           |
| `POST /api/transactions` — create           | Creates and returns new transaction |
| `POST /api/transactions` — missing fields   | Returns 400 error                  |
| `POST /api/transactions` — null amount      | Returns 400 error                  |
| `PUT /api/transactions/:id` — update        | Updates and returns changed fields |
| `PUT /api/transactions/:id` — not found     | Returns 404 error                  |
| `DELETE /api/transactions/:id` — delete     | Removes transaction, status 200    |

#### Frontend Tests

| Test                                        | Expected Result                    |
| ------------------------------------------- | ---------------------------------- |
| **SummaryCards** shows balance, income, expense | All three values displayed    |
| **SummaryCards** negative balance in red     | Balance is red colored             |
| **TransactionList** empty state              | Shows "No transactions yet"        |
| **TransactionList** renders transactions     | Shows "Salary" and "Rent" rows     |
| **TransactionList** income shows + sign      | Amount displayed as "+$5000.00"    |
| **TransactionList** expense shows - sign     | Amount displayed as "-$1000.00"    |

### Manual Test Cases

| Test                                | Expected Result                                 |
| ----------------------------------- | ----------------------------------------------- |
| **Add Income** "Salary" ($5000)     | Balance shows $5000, Income card shows $5000    |
| **Refresh page**                    | Data persists (loaded from database)            |
| **Add Expense** "Rent" ($1000)      | Balance drops to $4000, chart shows red segment |
| **Filter by "Expense"**             | Only "Rent" appears in the list                 |
| **Edit** "Rent" → "Mortgage" ($1200)| Both name and amount update in list + summary   |
| **Delete** "Mortgage"               | Balance restores to $5000, chart updates        |
| **Toggle theme**                    | UI switches between dark and light seamlessly   |

---

## 👤 Author

**Palash Kumar Verma**

|               |                           |
| ------------- | ------------------------- |
| 🎂 Birthday   | February 9, 2004          |
| 🎓 Program    | Computer Science          |
| 🆔 Matriculation No. | 10243068          |
| 🐙 GitHub     | [@P4L4SH](https://github.com/P4L4SH) |

Built as a university project — a full-stack web application demonstrating modern React + Node.js development with production deployment on Render.
