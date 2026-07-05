# Capstone Project

An industry-standard, multi-service platform for querying hierarchical Indian location data (States, Districts, Sub-Districts, and Villages). The project is built using a microservices-based architecture featuring a secure **Backend API Gateway**, a **PostgreSQL Data Service**, and an interactive **React Admin Dashboard**.

---

## 🏗️ System Architecture

The platform consists of three main services working in unison:

```mermaid
graph TD
    Client[Web Browser / API Client] -->|HTTP Requests| Backend[Backend Express Gateway :5000]
    Client -->|HTTP Requests| DataService[PostgreSQL Data Service :5001]
    
    subgraph Frontend Client
        ReactAdmin[React Admin Dashboard]
    end
    
    ReactAdmin -->|Manages Admins & Keys| Backend
    
    subgraph Backend Gateway
        ExpressGW[Express.js / Node.js]
        ExpressGW -->|Stores Auth, Logs & API Keys| MongoDB[(MongoDB)]
    end
    
    subgraph Location Data Service
        PrismaService[Express.js + Prisma ORM]
        PrismaService -->|Queries Census Data| PostgresDB[(PostgreSQL)]
    end
```

---

## 🗃️ Data Flow Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant React as Admin Dashboard
    participant Backend as Backend Gateway (5000)
    participant MongoDB as MongoDB
    
    Admin->>React: Enter Admin Credentials
    React->>Backend: POST /auth/login
    Backend->>MongoDB: Query Admin Account
    MongoDB-->>Backend: Account Data
    Backend-->>React: JWT Access Token
    
    Admin->>React: View Dashboard Analytics
    React->>Backend: GET /api/analytics/stats (Bearer Token)
    Backend->>MongoDB: Fetch system request logs
    MongoDB-->>Backend: Logs & Metrics
    Backend-->>React: Statistics JSON
```

---

## 📁 Project Structure

```text
villageAPI-platform/
├── backend/                  # Gateway API (Auth, Rate Limiting, API Keys)
│   ├── src/
│   │   ├── config/           # Database & Env configurations
│   │   ├── controllers/      # Route controllers (Auth, Locations)
│   │   ├── middleware/       # JWT Auth, Logger, Rate Limiter
│   │   ├── models/           # Mongoose schemas (User, ApiKey)
│   │   ├── routes/           # Routes declarations
│   │   └── server.js         # Entry point (port 5000)
│   └── .env                  # Backend Configuration
├── data-service/             # Location query microservice (Prisma + PostgreSQL)
│   ├── prisma/               # Prisma Database Schema & Migrations
│   ├── src/
│   │   ├── config/           # Prisma Client helper
│   │   ├── seed.js           # XLSX census data importer script
│   │   └── server.js         # Entry point (port 5001)
│   └── .env                  # Data-Service Configuration
└── frontend/                 # Admin Dashboard frontend
    ├── src/
    │   ├── components/       # Reusable components (Sidebar, Topbar)
    │   ├── layouts/          # Dashboard Layout wrapper
    │   ├── pages/            # Admin pages (Dashboard, Users, ApiKeys)
    │   └── main.jsx          # Entry point
```

---

## ⚙️ Environment Configuration

Before running the project, configure the environment variables for both backend and data-service.

### Backend Configurations (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/village-api-project
JWT_SECRET=SECRET_KEY
```

### Data Service Configurations (`data-service/.env`)
Create a `.env` file in the `data-service/` directory:
```env
PORT=5001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/india_locations?schema=public"
```

---

## 🚀 Setup & Installation Guide

Follow these steps to run the complete location platform on your local machine:

### Prerequisites
*   Node.js (v18 or higher recommended)
*   MongoDB instance running locally or on atlas
*   PostgreSQL database instance running

---

### Step 1: Set Up and Run the Data Service
1. Navigate to the `data-service` folder:
   ```bash
   cd data-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Apply Prisma migrations to set up PostgreSQL schemas:
   ```bash
   npx prisma migrate deploy
   ```
4. Seed the database with the official census data:
   ```bash
   npm run seed
   ```
5. Start the data-service API:
   ```bash
   npm run dev
   ```
   *The data service will be active at `http://localhost:5001`.*

---

### Step 2: Set Up and Run the Backend Gateway
1. Open a new terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the sample location data to MongoDB:
   ```bash
   npm run seed
   ```
4. Start the backend gateway:
   ```bash
   npm run dev
   ```
   *The gateway API will be active at `http://localhost:5000`.*

---

### Step 3: Set Up and Run the React Admin Dashboard
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend dashboard will run at `http://localhost:5173`.*

---

## 📡 API Endpoints

### 🔒 Gateway API (Port `5000`)
*   `POST /auth/register` - Register a new user
*   `POST /auth/login` - Authenticate and receive a JWT token
*   `GET /api/locations/state` - Fetch states hierarchy (Requires Bearer token)
*   `GET /api/locations/search?q=<term>` - Search states, districts, and villages (Requires Bearer token)
*   `GET /api/analytics/stats` - Fetch admin statistics

### 🗺️ Data Service API (Port `5001`)
*   `GET /states` - List all seeded states (Himachal Pradesh, Punjab, Haryana, Rajasthan)
*   `GET /states/:stateId/districts` - Get districts of a specific state
*   `GET /districts/:districtId/subdistricts` - Get sub-districts of a specific district
*   `GET /subdistricts/:subDistrictId/villages` - Get villages of a sub-district
*   `GET /villages/search?q=<name>` - Full hierarchical search for a village by name
