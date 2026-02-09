# 🏔️ MalangTour Premium - High-Fidelity Travel Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)
![Midtrans](https://img.shields.io/badge/Midtrans-003366?style=for-the-badge&logo=visa&logoColor=white)

**Redefining High-Quality Journeys through East Java's Most Majestic Landscapes.**

[Explore Features](#-core-features) • [Deployment](#-deployment) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

**MalangTour Premium** is a robust, end-to-end travel platform built for the modern era. It combines high-fidelity UI/UX with cutting-edge AI integration and real-time payment processing. Whether it's catching the Bromo sunrise or exploring hidden waterfalls, this platform handles everything from AI-driven planning to automated E-Ticketing.

---

## ✨ Core Features

### 🤖 1. AI-Powered Concierge
- **Gemini Chatbot**: Intelligent travel assistant providing real-time advice and hidden gem secrets.
- **Smart Itinerary Planner**: Generate personalized multi-day trip plans based on budget and mood using Google Gemini 1.5 Pro.

### 💳 2. Enterprise Payment System
- **Midtrans Integration**: Real-time payment processing supporting QRIS, GoPay, and Virtual Accounts.
- **Dynamic Pricing**: Automatic currency conversion and price calculation.
- **Loyalty Program**: Integrated point-based reward system (1% cashback per booking).

### 🛡️ 3. Advanced Admin Command Center
- **Live Analytics**: Real-time revenue charts and performance metrics.
- **Inventory Control**: Seamless management of tour packages and SEO-optimized metadata.
- **Moderation System**: Full control over user reviews and community feedback.
- **Voucher Engine**: Create and manage promo codes (Percentage or Flat discounts).

### 📱 4. Premium User Experience
- **E-Ticket Generator**: Automated, print-ready digital tickets with unique QR validation.
- **Membership Tiers**: Silver, Gold, and Platinum status based on travel history.
- **Interactive Hotspot Map**: Geographical visualization of destinations using Leaflet.js.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
- **Database**: [Prisma](https://www.prisma.io/) with SQLite/PostgreSQL
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Google Generative AI](https://aistudio.google.com/) (Gemini Pro/Flash)
- **Payment**: [Midtrans Snap SDK](https://midtrans.com/)
- **Notification**: [Resend API](https://resend.com/) & [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/youruser/malangtour-travels.git
   cd malangtour-travels
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file and populate:
   ```env
   DATABASE_URL="file:./dev.db"
   GEMINI_API_KEY="your_google_ai_key"
   MIDTRANS_SERVER_KEY="your_midtrans_key"
   RESEND_API_KEY="your_resend_key"
   ```

3. **Database Initialization**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Run Development**
   ```bash
   npm run dev
   ```

---

## 📑 Documentation

- [Deployment Guide](DEPLOY.md)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing](CONTRIBUTING.md)

---

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <p>Built with ❤️ by Malang Premium Team</p>
</div>