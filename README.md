# FARMDIRECT – AI-Powered Direct Farmer-to-Buyer Platform

> **SIH26033**: Eliminating Intermediary Commissions to Increase Farmer Earnings and Lower Consumer Prices.

---

## 🌾 Project Overview

**FarmDirect** is a modern full-stack web application designed to connect Indian farmers directly with buyers (supermarkets, hotel networks, wholesalers, and direct consumers). By removing middleman layers, FarmDirect ensures farmers receive up to 22% higher farmgate prices while buyers purchase fresh produce at 15% lower costs.

The platform includes AI-driven price prediction, demand forecasting, smart buyer matching, live GPS delivery route tracking, multilingual support (English, Tamil, Hindi), digital simulated checkout, and role-based access control (Farmer, Buyer, Admin).

---

## ✨ Key Features

1. **Direct Agricultural Marketplace**: Real-time crop listings with price per kg, distance calculation, quality grade tags (Grade A+, Grade A, Grade B), and search/category filters.
2. **AI Price Prediction Model**: Machine-learning pricing engine estimating optimal selling price, current mandi market rates, price trends, and expected range.
3. **Demand Forecasting Engine**: Seasonal demand index score (High/Medium/Low) with line/bar charts recommending optimal harvest quantities.
4. **Smart Buyer Matching Algorithm**: Matches farmer crop listings with nearby bulk buyers based on crop requirement, quantity, location proximity, and price preference with percentage match scores (e.g., **96% Match**).
5. **Live GPS Delivery Tracking**: Interactive map route visualizer displaying shipment progress from farm origin to buyer destination with driver details and ETA.
6. **Role-Based Portals**:
   - **Farmer Dashboard**: Product listing, earnings analytics, crop price trends, recent orders, and profile management.
   - **Buyer Dashboard**: Marketplace browsing, cart, simulated checkout (UPI, Card, COD), order history, wishlist, and nearby farmer discovery.
   - **Admin Console**: User approval/suspension, transaction reports, platform revenue analytics, and crop category share.
7. **Multilingual Support**: Real-time language switcher for **English**, **Tamil (தமிழ்)**, and **Hindi (हिंदी)**.
8. **Instant Demo Role Switcher**: Quick header dropdown allowing instant switching between Farmer, Buyer, and Admin personas.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS v4, Lucide Icons, Recharts, React Router v6.
- **Backend**: Python 3.13, FastAPI, SQLAlchemy, Pydantic, Passlib, Python-Jose (JWT).
- **AI / ML Service**: Python machine learning algorithms for price prediction regression and demand matrix scoring.
- **Database**: SQLite (`farmdirect.db`, zero-config out-of-the-box execution) + support for MySQL via `DATABASE_URL`.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+) & pip

---

### 1. Running Backend (FastAPI Server)

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Seed realistic database with Tamil Nadu agricultural data
python seed_data.py

# Start FastAPI Uvicorn Server
uvicorn main:app --reload --port 8000
```

The backend server will run at `http://localhost:8000`. You can access interactive API documentation at `http://localhost:8000/docs`.

---

### 2. Running Frontend (Vite React App)

```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite Development Server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables

Create `.env` inside `backend/` directory if connecting to a MySQL database:

```env
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/farmdirect
SECRET_KEY=farmdirect_secret_key_sih2026_secure_key
ALGORITHM=HS256
```

If `DATABASE_URL` is omitted, the application automatically uses SQLite (`farmdirect.db`).

---

## 🌐 API Structure Overview

### Authentication
- `POST /api/auth/register` - User registration (Farmer / Buyer / Admin)
- `POST /api/auth/login` - JWT Login

### Products & Marketplace
- `GET /api/products` - Filterable marketplace listings
- `POST /api/products` - Create crop listing
- `GET /api/products/:id` - Fetch crop & farmer details
- `GET /api/categories` - Fetch crop categories

### AI Services
- `POST /api/ai/price-prediction` - Predict farmgate price & trend chart
- `POST /api/ai/demand-forecast` - Demand index & recommended quantity
- `POST /api/ai/buyer-matching` - Calculate smart buyer match percentage matrix

### Orders & Tracking
- `POST /api/orders` - Place direct order
- `GET /api/orders` - Order history list
- `GET /api/orders/:id` - Detailed order & delivery tracking info

---

## 👥 Demo Accounts (Pre-configured)

| Role | Email | Password |
|---|---|---|
| **Farmer Role** | `farmer@farmdirect.com` | `password123` |
| **Buyer Role** | `buyer@farmdirect.com` | `password123` |
| **Admin Role** | `admin@farmdirect.com` | `admin123` |

*Tip: Use the **Active Demo Role** dropdown in the top navigation bar for instant role switching!*

---

## 📜 License
Developed for Smart India Hackathon (SIH26033) — FarmDirect AI Platform.
