# 🏔️ MalangTour Premium - The Ultimate Travel Ecosystem

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_1.5_Pro-AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)
![Midtrans](https://img.shields.io/badge/Midtrans-Secure_Payment-003366?style=for-the-badge&logo=visa&logoColor=white)

**A high-fidelity, production-ready travel platform redefining premium journeys in East Java.**

[View Features](#-core-features) • [Installation](#-quick-start) • [Deployment](DEPLOY.md) • [Documentation](#-enterprise-standards)

</div>

---

## 📖 Overview

**MalangTour Premium** is an end-to-end digital solution for travel agencies. It seamlessly integrates advanced AI consultation, real-time Indonesian payment gateways, and a sophisticated administration engine. Built with performance and scalability in mind using Next.js 15, it offers a "native-app" feel through PWA technology.

---

## ✨ Core Features

### 🤖 1. Intelligent AI Concierge
- **Multi-Model Fallback**: Uses Gemini 1.5 Pro, Flash, and Latest versions to ensure 99.9% uptime.
- **Rate-Limited Concierge**: Enterprise-grade protection against API abuse (5 req/min).
- **Mood-Based Planning**: Generates complete multi-day itineraries based on user preferences and budget.

### 💳 2. Financial & Growth Engine
- **Midtrans Snap SDK**: Secure checkout with QRIS, GoPay, and Virtual Accounts.
- **Webhook Security**: Cryptographic signature verification for all payment notifications.
- **Growth Loop (Referral)**: Built-in referral system awarding 500 points to referrers and 100 bonus points to new travelers.
- **Loyalty Rewards**: Automatic 1% cashback points on every successful booking.

### 🛡️ 3. Admin Super-App (Command Center)
- **Live Business Analytics**: Real-time revenue trends and popular tour performance cards.
- **Dynamic Inventory**: Full CRUD for tour packages with automatic SEO metadata generation.
- **Review Moderation**: Complete control over customer feedback to maintain brand reputation.
- **Promotion Engine**: Advanced voucher system (Percentage/Flat discounts) with expiry controls.

### 📱 4. High-Fidelity UX (User Experience)
- **PWA Enabled**: Installable on Android & iOS with offline-ready manifest.
- **Smart E-Tickets**: Print-ready digital tickets featuring unique QR validation.
- **Member Tiers**: Gamified Silver, Gold, and Platinum status based on points.
- **Hotspot Map**: Interactive geographical exploration using Leaflet.js.

---

## 🛠️ Tech Stack

- **Core**: Next.js 15+ (App Router), React 19, TypeScript
- **Database**: Prisma ORM (PostgreSQL/SQLite)
- **Styling**: Tailwind CSS 4, Framer Motion (Immersive Animations)
- **Integrations**: Midtrans (Payments), Google Generative AI (LLM), Resend (Emails)
- **Mapping**: Leaflet.js

---

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/youruser/malangtour-travels.git
   cd malangtour-travels
   npm install
   ```

2. **Environment Variables**
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # AI & Cloud
   GEMINI_API_KEY="AIza..."
   MIDTRANS_SERVER_KEY="SB-Mid-..."
   RESEND_API_KEY="re_..."
   
   # App Config
   AUTH_SECRET="your-random-secret"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Deploy Database**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Run Dev**
   ```bash
   npm run dev
   ```

---

## 📑 Enterprise Standards

| Document | Purpose |
| --- | --- |
| [🚀 Deployment](DEPLOY.md) | Step-by-step production setup (Vercel, DB, Webhooks). |
| [🛡️ Security](SECURITY.md) | Vulnerability reporting and data protection policy. |
| [🤝 Code of Conduct](CODE_OF_CONDUCT.md) | Community standards and engagement rules. |
| [⚖️ License](LICENSE) | MIT Licensed - Free for commercial and personal use. |

<div align="center">
  <p>Crafted for Premium Travel Agencies</p>
  <p><b>Malang Premium Tours © 2026</b></p>
</div>
