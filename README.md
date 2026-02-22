# Crypto Trade Signal Platform — Frontend

## Overview

A minimal, professional React frontend for the Crypto Trade Signal platform. It integrates with the backend REST API to provide JWT authentication, role-based access control, and full trade signal management through a clean SaaS-style dashboard interface.

Users and admins can register, log in, create and manage trade signals, and interact with a role-aware UI that adapts based on their access level.

---

## Tech Stack

- React (Vite)
- TypeScript
- Axios
- React Router
- Context API (Auth State Management)
- Custom CSS (no UI libraries)

---

## Project Structure

```
src/
├── api/
│   ├── api.ts
│   ├── signalApi.ts
│   └── types.ts
│
├── context/
│   └── AuthContext.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
│
├── components/
│   ├── SignalForm.tsx
│   └── SignalList.tsx
│
├── styles.css
├── App.tsx
└── main.tsx
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/prajjwal-17/crypto-trade-frontend.git
cd crypto-trade-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## Environment Requirements

Ensure the backend is running at:

```
http://localhost:5000
```

The backend must support:

- JWT authentication
- Role-based access control
- Trade signal CRUD operations
- Redis caching (optional)

---

## Authentication Flow

1. User submits credentials via `/login`
2. Backend returns a signed JWT token
3. Token is stored in memory via React state (not localStorage)
4. Axios attaches the token to all subsequent requests via an interceptor
5. `401` responses automatically trigger logout and redirect
6. User role (`USER` / `ADMIN`) is decoded from the JWT payload for UI rendering

---

## Role-Based Access Control

| Role  | Capabilities                                      |
|-------|---------------------------------------------------|
| USER  | Create signals, view own signals                  |
| ADMIN | Create signals, view all signals, manage all signals |

Role-based visibility is enforced at two levels:

- **Frontend** — UI elements (buttons, views) are conditionally rendered based on role
- **Backend** — Authorization middleware independently enforces access on every request

---

## UI Architecture

**Auth Layout**

A split-screen design with the platform description on the left and a login or register card on the right. Includes show/hide password toggle and seamless navigation between auth screens.

**Dashboard Layout**

A two-column layout with a sidebar displaying the user's role and logout option, and a main content area rendering signal cards. Supports pagination and follows a clean, modern SaaS dashboard structure.

---

## API Integration

Base URL:

```
http://localhost:5000/api/v1
```

**Auth**

```
POST /auth/register
POST /auth/login
```

**Signals**

```
GET    /signals/mine       # Fetch own signals (USER)
GET    /signals            # Fetch all signals (ADMIN only)
POST   /signals            # Create a new signal
PUT    /signals/:id        # Update signal status
DELETE /signals/:id        # Delete a signal
```

All API responses follow the structure:

```json
{
  "success": true,
  "data": {}
}
```

---

## Type Safety

The project enforces strict TypeScript configuration throughout:

- `verbatimModuleSyntax` enabled
- Type-only imports enforced where applicable
- Signal and API response types defined centrally in `types.ts`
- Direction values strictly typed as `"LONG" | "SHORT"` enum

---

## Features Implemented

- JWT authentication with automatic 401 handling
- Role-based UI rendering
- Signal creation with frontend validation
- Signal status update (OPEN to CLOSED)
- Signal deletion with confirmation dialog
- Pagination
- Clean split-screen auth layout
- Professional minimal dashboard styling

---

## Future Improvements

- React Query integration for server state management
- Optimistic UI updates
- Token refresh flow
- Dark mode toggle
- Chart integration for price visualization

---

## License

MIT
