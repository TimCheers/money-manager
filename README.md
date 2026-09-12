# Money Manager

A full-stack personal finance tracker: a React SPA on top of an Express/MongoDB API, with JWT-based auth and per-user data scoping.

## Features

- **Auth** — registration with bcrypt-hashed passwords, JWT login, and JWT middleware protecting every route
- **Accounts, categories, transactions** — full CRUD, with transactions linked to both an account and a category (via Mongoose `populate`)
- **Ownership scoping** — every query is scoped to the authenticated user, so accounts/categories/transactions are private per account
- **Frontend** — React + Vite SPA with client-side routing (Login, Register, Dashboard), an auth context, and a transaction list fed by the backend

## Tech stack

- **Backend**: Node.js, Express 5, MongoDB + Mongoose, JWT (`jsonwebtoken`), `bcrypt`
- **Frontend**: React 19, Vite, React Router

## Project structure

```
backend/
  src/
    app.js
    config/db.js              # Mongo connection
    models/                   # User, Account, Category, Transaction
    controllers/               # request handlers per resource
    routes/                    # Express routers per resource
    middleware/auth.middleware.js
  index.js                     # entry point
frontend/
  src/
    pages/                     # Login, Register, Dashboard
    components/TransactionItem.jsx
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
