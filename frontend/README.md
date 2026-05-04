# Department Task Manager with RBAC

A full-stack Task Management application with Role-Based Access Control (RBAC), built with React, Node.js, Express, and MongoDB.

---

# Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), React Router, Axios, Recharts, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Auth | JWT (JSON Web Token) |
| Styling | Plain CSS with inline styles (no CSS framework) |

---

# Project Structure

```
Task Manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   ├── userController.js
│   │   └── seedController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── userRoutes.js
│   │   └── seedRoutes.js
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── CustomBarChart.jsx
    │   │   ├── CustomLegend.jsx
    │   │   ├── CustomPieChart.jsx
    │   │   ├── CustomTooltip.jsx
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── RecentTasks.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── UserSwitcher.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Tasks.jsx
    │   │   ├── CreateTask.jsx
    │   │   ├── Users.jsx
    │   │   ├── Login.jsx
    │   │   └── Forbidden.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

---

# Setup Instructions

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

> **How to get MONGO_URI:**
> 1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
> 2. Create a free cluster
> 3. Click **Connect** → **Drivers** → Copy the connection string
> 4. Replace `<password>` with your DB user password
> 5. Add `/taskmanagerv2` before the `?` in the URI

Start the backend server:

```bash
npm run dev
```

You should see:
```
 Server running on port 5001
 MongoDB Connected: your-cluster.mongodb.net
```

---

### 3. Seed the Database

Once the backend is running, seed the database with the required users and tasks:

```bash
# Using curl
curl -X POST http://localhost:5001/api/seed

# Or using Postman/Thunder Client:
POST → http://localhost:5001/api/seed
```

This creates all 6 users and 3 tasks from the assignment spec. You should see:

```json
{
  "message": " Seed data created successfully!",
  "users": [
    { "name": "Alice", "role": "org_admin", "department": "engineering", "password": "123456" },
    { "name": "Bob", "role": "dept_head", "department": "engineering", "password": "123456" },
    { "name": "Charlie", "role": "member", "department": "engineering", "password": "123456" },
    { "name": "Diana", "role": "dept_head", "department": "design", "password": "123456" },
    { "name": "Eve", "role": "member", "department": "design", "password": "123456" },
    { "name": "Frank", "role": "member", "department": "engineering", "password": "123456" }
  ]
}
```

---

### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at: **http://localhost:3000**

---

### 5. Both Servers Must Be Running

| Terminal | Command | URL |
|----------|---------|-----|
| Terminal 1 | `cd backend && npm run dev` | http://localhost:5001 |
| Terminal 2 | `cd frontend && npm run dev` | http://localhost:3000 |

---

## Seed Users & Credentials

All users have the password: **`123456`**

| Name | Role | Department |
|------|------|-----------|
| Alice | Org Admin | Engineering |
| Bob | Dept Head | Engineering |
| Charlie | Member | Engineering |
| Diana | Dept Head | Design |
| Eve | Member | Design |
| Frank | Member | Engineering |

---

## Role Permissions

| Action | Org Admin | Dept Head | Member |
|--------|-----------|-----------|--------|
| View all tasks | ✅ | ❌ | ❌ |
| View dept tasks | ✅ | ✅ | ❌ |
| View own tasks | ✅ | ✅ | ✅ |
| Create task | ❌ | ✅ | ❌ |
| Assign task | ❌ | ✅ | ❌ |
| Update task status | ❌ | ✅ | ✅ (own only) |
| Delete task | ✅ | ✅ (dept only) | ❌ |
| View all users | ❌ | ✅ (dept only) | ❌ |
| Change user role | ❌ | ✅ (dept only) | ❌ |
| Change user dept | ❌ | ✅ (dept only) | ❌ |

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/auth/me` | Private | Get current user info |

### Tasks
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/tasks/dashboard` | Private | Get dashboard stats and charts |
| GET | `/api/tasks` | Private | Get tasks (filtered by role) |
| POST | `/api/tasks` | Dept Head only | Create a new task |
| PATCH | `/api/tasks/:id/status` | Assigned member or higher | Update task status |
| DELETE | `/api/tasks/:id` | Org Admin or Dept Head | Delete a task |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Dept Head + Org Admin | Get users (filtered by dept) |
| PATCH | `/api/users/:id/role` | Dept Head | Update a user's role |
| PATCH | `/api/users/:id/department` | Dept Head | Update a user's department |

### Seed
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/seed` | Public | Seed the database with initial data |

---

## Authorization Examples

All protected routes return `403 Forbidden` with a meaningful message when access is denied:

```json
{
  "message": "Access denied. Your role 'member' is not authorized for this action."
}
```

```json
{
  "message": "You can only assign tasks to members in your department."
}
```

```json
{
  "message": "Access denied. You are not authorized to update this task's status."
}
```

---

## Assumptions Made

1. **Mock Login via Switcher** — Authentication uses a user-switcher dropdown on the login page and navbar. All users share the same password (`123456`) since this is a mock/demo environment, not a real-world auth system.

2. **JWT-based Auth** — Even though login is mocked, real JWT tokens are issued by the backend and attached to every API request. All authorization is enforced server-side, not just client-side.

3. **Department as Enum** — Departments are limited to `engineering` and `design` as per the seed data. This is enforced at the database model level.

4. **Dept Head Cannot Manage Org Admin** — A Dept Head can change roles and departments for users in their department, but the system does not prevent them from seeing or modifying `org_admin` users if they're in the same department. In a production system, this would be restricted further.

5. **Org Admin Cannot Create Tasks** — Per the permission matrix in the assignment, only Dept Heads can create tasks. Org Admins have a higher-level view and management role, not a task creation role.

6. **Re-seeding Clears Data** — Calling `POST /api/seed` will delete all existing users and tasks before re-creating seed data. This is intentional for development purposes.

7. **Task Department = Creator's Department** — When a Dept Head creates a task, the department is automatically set to their own department. They cannot create tasks for other departments.

8. **Dashboard Charts** — The pie chart shows task distribution by status (Todo / In Progress / Completed). The bar chart shows task count per department. Both are filtered based on the logged-in user's role.

---

## Known Limitations & Shortcuts

1. **No Password Hashing on Seed** — The seed endpoint creates users with plain-text passwords that are then hashed by the Mongoose pre-save hook. This is fine for development but the seed endpoint should be removed or protected in production.

2. **Seed Endpoint is Public** — The `/api/seed` route has no authentication. In production, this should be removed entirely or protected with an admin key.

3. **No Pagination** — Task and user lists are returned without pagination. For large datasets, this would need to be added.

4. **No Email Validation** — The registration endpoint does basic uniqueness checking but no email format validation via a library like `express-validator`.

5. **No Refresh Token** — JWT tokens expire after 7 days with no refresh mechanism. Users will be logged out after expiry.

6. **Mobile Sidebar** — On mobile, the sidebar is accessible via a hamburger menu. The sidebar does not persist state between page refreshes on mobile (always starts closed).

7. **No File Uploads or Attachments** — Tasks support title, description, status, and assignment only. No file attachments are implemented.

8. **Single Org Admin** — The system supports multiple org admins but the seed data only includes one (Alice). The role logic works correctly for multiple org admins.

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5001` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `yoursecretkey123` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `NODE_ENV` | Environment mode | `development` |

---

## Dependencies

### Backend
```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "bcryptjs": "^2.x",
  "jsonwebtoken": "^9.x",
  "dotenv": "^16.x",
  "cors": "^2.x",
  "nodemon": "^3.x (dev)"
}
```

### Frontend
```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "recharts": "^2.x",
  "moment": "^2.x",
  "react-toastify": "^10.x",
  "react-icons": "^5.x"
}
```

---

## Features Overview

- **Mock User Switcher** — Switch between any of the 6 seed users instantly from the login page or navbar
- **Role-Based Dashboard** — Stats cards, pie chart (status distribution), bar chart (dept breakdown), recent tasks table
- **Filtered Task List** — Automatically filtered based on user role
- **Task Status Updates** — Members can update status of their own tasks; Dept Heads can update any dept task
- **Task Creation** — Dept Heads can create and assign tasks to members in their department
- **User Management** — Dept Heads can change roles and departments for users in their dept
- **403 Error Handling** — Clear error messages shown via toast notifications on unauthorized actions
- **Forbidden Page** — Dedicated 403 page for unauthorized route access
- **Mobile Responsive** — Hamburger menu for mobile sidebar navigation

---

*Built as a take-home assignment for Zakti Digital.*