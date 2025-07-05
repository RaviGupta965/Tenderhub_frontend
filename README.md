# 🏗️ B2B Tender Management Platform

A full-stack web application that allows businesses to create and apply for tenders. Designed for seamless tender lifecycle management, enabling companies to post procurement needs and vendors to respond efficiently.

---

## 📌 Key Features

- 🔐 JWT Authentication (Signup/Login)
- 🏢 Company Profile Management
- 📋 Tender Creation and Management
- 📄 Apply to Tenders Posted by Other Companies
- 🔍 Search Tenders and Companies
- 🖼️ File Uploads via Supabase Storage
- 🧾 View All Applications on Posted Tenders
- 🧑 Unified User Role (Can both create & apply to tenders)

---

## 🛠️ Tech Stack

### 🧩 Frontend

- Next.js (App Router, TypeScript)
- TailwindCSS
- React Hook Form + Zod (Form validation)
- Axios, Fetch API
---
### ⚙️ Backend

- Express.js (Node.js)
- PostgreSQL (via Knex.js)
- Supabase Storage (File uploads)
- JSON Web Tokens (JWT) for Authentication
- CORS, dotenv, bcrypt


## 🚀 Getting Started

### 1️⃣ Backend Setup

```bash
cd server
npm install
cp .env.example .env   
npx knex migrate:latest
npx knex seed:run
npm run dev

2️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev