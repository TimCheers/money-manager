# Money Manager

A full-stack personal finance tracker: a React SPA on top of an Express/MongoDB API, with JWT auth, per-user data scoping, and automatic account balance tracking.

## Features

- **Auth** — registration (username, email, password, date of birth) with bcrypt-hashed passwords, JWT login, and JWT middleware protecting every route; a `role` field (`user`/`admin`) with an admin-only endpoint to view all users' transactions
- **Accounts** — named accounts with a running balance
- **Categories** — user-defined, typed as `Income` or `Expense`
- **Tags** — user-defined, with a color, many-to-many with transactions
- **Transactions** — full CRUD, each linked to an account, a category, and any number of tags; creating, editing, or deleting a transaction automatically adjusts the linked account's balance (income adds, expense subtracts, and edits/deletes correctly roll back the old amount first)
- **Ownership scoping** — every query is scoped to the authenticated user, so accounts/categories/tags/transactions are private per account
- **Frontend** — React + Vite SPA with client-side routing under a shared layout (Dashboard, Login, Register, Accounts, Categories, Tags), styled with Tailwind, dark theme throughout

## Tech stack

- **Backend**: Node.js, Express 5, MongoDB + Mongoose, JWT (`jsonwebtoken`), `bcrypt`
- **Frontend**: React 19, Vite, React Router 7, Tailwind CSS 4

## Project structure

```
backend/
  src/
    app.js
    config/db.js                 # Mongo connection
    models/                      # User, Account, Category, Tag, Transaction
    controllers/                 # request handlers per resource
    routes/                      # Express routers per resource
    middleware/auth.middleware.js  # JWT verification + admin guard
  index.js                       # entry point
frontend/
  src/
    pages/                       # Dashboard, Login, Register, Accounts, Categories, Tags
    components/                  # forms and list items per resource
    context/AuthContext.jsx
```

## Getting started

### Backend

```
cd backend
npm install
# create a .env with:
#   MONGO_URI=<your MongoDB connection string>
#   JWT_SECRET=<your secret>
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

The frontend expects the backend to be running on `http://localhost:3000`.
