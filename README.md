<div align="center">

# 🔐 Secure User Authentication

### Full Stack Development

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

A full-stack MERN application implementing registration, login, hashed password storage, JWT-based session handling, and a protected route that only returns data to an authenticated user.

</div>

---

## 📋 Table of Contents

* [Tech Stack](#tech-stack)
* [Features](#features)
* [Project Structure](#project-structure)
* [Setup Instructions](#setup-instructions)
* [API Endpoints](#api-endpoints)
* [HTTP Status Codes](#http-status-codes)
* [Security Notes](#security-notes)
* [Screenshots](#screenshots)
* [Deployment](#deployment)

---

## <a id="tech-stack"></a>🛠️ Tech Stack

|Layer|Technology|
|-|-|
|**Frontend**|React.js · Vite · React Router · Axios|
|**Backend**|Node.js · Express.js · JWT · bcryptjs · express-validator|
|**Database**|MongoDB (Mongoose)|

## <a id="features"></a>✨ Features

* ✅ User registration with server-side validation
* 🔑 Login with JWT session tokens
* 🔒 Passwords hashed with bcrypt — never stored or returned in plain text
* 🛡️ Protected route that only responds with valid, unexpired JWTs
* ⚠️ Consistent error handling with proper HTTP status codes

## <a id="project-structure"></a>📁 Project Structure

```
Secure-User-Authentication
├── backend/
│   ├── config/db.js
│   ├── models/User.js
│   ├── middleware/auth.js
│   ├── middleware/errorHandler.js
│   ├── controllers/authController.js
│   ├── routes/authRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── components/ProtectedRoute.jsx
    │   ├── pages/Login.jsx
    │   ├── pages/Register.jsx
    │   ├── pages/Dashboard.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env.example
```

## <a id="setup-instructions"></a>🚀 Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set `MONGO_URI` (MongoDB Atlas or local) and a strong `JWT_SECRET`
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## <a id="api-endpoints"></a>🔌 API Endpoints

|Method|Endpoint|Access|Description|
|-|-|-|-|
|POST|`/api/auth/register`|🌐 Public|Register a new user|
|POST|`/api/auth/login`|🌐 Public|Log in and receive a JWT|
|GET|`/api/auth/profile`|🔒 Protected|Returns the logged-in user's data (requires `Authorization: Bearer <token>`)|

### Register — Request

```json
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

### Register — Response (201 Created)

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "665f1...", "name": "Jane Doe", "email": "jane@example.com" }
}
```

### Login — Request

```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "secret123"
}
```

### Example Authenticated Request (Protected Endpoint)

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "_id": "665f1...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2026-09-18T10:12:00.000Z"
  }
}
```

**Without a token (401 Unauthorized):**

```json
{ "success": false, "message": "Not authorized, no token provided" }
```

## <a id="http-status-codes"></a>📊 HTTP Status Codes Used

|Code|Meaning|
|-|-|
|200|✅ Successful login / profile fetch|
|201|✅ Successful registration|
|400|⚠️ Validation error (missing/invalid fields)|
|401|🚫 Invalid credentials / missing or invalid token|
|404|🔍 Route not found|
|409|♻️ Email already registered|
|500|💥 Server error|

## <a id="security-notes"></a>🔒 Security Notes

* Passwords are hashed with **bcrypt** (10 salt rounds) before being saved — the raw password is never stored or logged.
* The `password` field uses Mongoose's `select: false` so it is never returned in API responses by default.
* JWTs are signed with a server-side secret and expire after 1 day (configurable via `JWT_EXPIRES_IN`).
* All input is validated server-side with `express-validator` before it touches the database.

## <a id="screenshots"></a>📸 Screenshots

<div align="center">

<h3>Registration Page</h3>
<img src="screenshots/register.png" alt="Registration form" width="700"/>

<br/><br/>

<h3>Login Page</h3>
<img src="screenshots/login.png" alt="Login form" width="700"/>

<br/><br/>

<h3>Protected Dashboard</h3>
<img src="screenshots/dashboard.png" alt="Protected dashboard showing JWT-authenticated profile data" width="700"/>

</div>

## <a id="deployment"></a> ☁️ Deployment

1. Push this repo to GitHub as **`Secure-User-Authentication`** (public).
2. Deploy `backend/` to **Render** (Node service) with the environment variables from `.env.example`.
3. Deploy `frontend/` to **Vercel**, setting `VITE_API_URL` to your live Render backend URL.

---

<div align="center">

## 🤝 Connect & Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sithumini-anuhansi-5b32a8334)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:anuhansisithumini@gmail.com)

</div>
