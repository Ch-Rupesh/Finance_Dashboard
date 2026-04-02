# 💰 Finance Dashboard

A modern, professional, recruiter-ready Finance Dashboard built with **React + Vite** and **Vanilla CSS**. It features live charts, a full transaction manager, role-based UI, and automatic persistence via `localStorage`.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone or open the project directory
cd "Finance Dashboard"

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Summary Cards** | Total Balance, Income, Expenses, Savings Rate with % change |
| **Line Chart** | 6-month balance trend with animated tooltip |
| **Donut Chart** | Spending breakdown by category |
| **Transaction Table** | Search, filter by category & type, sort by date/amount, paginate |
| **Role-Based UI** | Viewer (read-only) / Admin (add, edit, delete transactions) |
| **Add/Edit Modal** | Form with validation, accessible, keyboard-operable |
| **Insights Panel** | Smart financial observations and comparisons |
| **Dark Mode** | Toggle dark/light theme |
| **Persistence** | Transactions saved to `localStorage` |
| **Responsive Layout** | Desktop, tablet, and mobile breakpoints |

---

## 🏗️ Architecture Overview

```
src/
├── context/
│   └── FinanceContext.jsx     # Global state (React Context + localStorage)
├── data/
│   └── mockData.js            # Transactions, chart data, category constants
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Top bar with dark-mode toggle & role switcher
│   │   ├── Sidebar.jsx        # Responsive sidebar navigation
│   │   └── RoleSwitcher.jsx   # Viewer / Admin role dropdown
│   └── dashboard/
│       ├── SummaryCard.jsx    # Animated stat card with gradient & change badge
│       ├── ChartsSection.jsx  # Recharts line + donut charts
│       ├── InsightsPanel.jsx  # Financial insight cards
│       ├── TransactionTable.jsx # Full table with filter/sort/pagination
│       └── TransactionModal.jsx # Add/edit modal (Admin only)
├── pages/
│   └── Dashboard.jsx          # Page orchestrator for all sections
├── App.jsx                    # Root component, wraps layout in provider
├── main.jsx                   # Vite entry point
└── index.css                  # Full design system: variables, components, responsive
```

### State Management

All global state lives in `FinanceContext.jsx` and is provided to the entire component tree via `React.createContext`. Key state slices:

- `transactions` — array of transaction objects, synced to `localStorage`
- `role` — `"Viewer"` | `"Admin"`, controls what UI is visible
- `filters` — `{ search, category, type }` for the transaction table
- `modalState` — `{ isOpen, mode, transaction }` for the add/edit modal
- `darkMode`, `activeSection`, `sidebarOpen` — UI state

---

## 🔐 Role-Based UI

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard & charts | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Search and filter | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

Switch roles instantly using the **Role** dropdown in the top-right navbar. Changes take effect immediately—no page reload needed.

---

## 📸 Screenshots

> _Add screenshots here after running the application._

- `screenshots/dashboard.png` — Overview with summary cards and charts
- `screenshots/transactions.png` — Transaction table with filters
- `screenshots/insights.png` — Insights panel
- `screenshots/admin-modal.png` — Add/Edit transaction modal
- `screenshots/mobile.png` — Mobile responsive view

---

## 🛠️ Tech Stack

- **React 18** with hooks
- **Vite** — blazing-fast dev server and build tool
- **Recharts** — composable chart library
- **Lucide React** — clean, consistent icon set
- **Vanilla CSS** — custom design system with CSS variables

---

## 📄 License

MIT
