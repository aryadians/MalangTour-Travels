# Changelog

All notable changes to the **MalangTour Premium** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-10

### Added
- **AI Core**:
  - Integrated Google Gemini 1.5 Pro & Flash for travel consultation.
  - Implemented multi-model fallback logic to ensure AI stability.
  - Added AI Rate Limiting (5 req/min) for security and cost control.
- **Financial System**:
  - Full Midtrans Snap integration for real-time payments (QRIS, VA, CC).
  - Secure Webhook endpoint with cryptographic signature verification.
  - Automated E-Ticket generator with unique QR Code validation.
- **Gamification & Growth**:
  - Loyalty Points system (1% reward on every booking).
  - Active Referral system awarding 500 points to referrers and 100 to new users.
  - Membership Tiers (Silver, Gold, Platinum) based on travel history.
- **Admin Command Center**:
  - Real-time revenue analytics and trends chart.
  - CSV/Excel report export for financial tracking.
  - Review moderation system to manage customer feedback.
  - Advanced Voucher/Promo code engine.
- **UX & Visuals**:
  - Interactive Hotspot Map using Leaflet.js for geographical exploration.
  - Progressive Web App (PWA) support for mobile installation.
  - Dynamic SEO metadata for all destination pages.
  - Travel Journal (Blog) section for travel guides and tips.
- **Documentation**:
  - Professional README with enterprise-grade badges.
  - Comprehensive Deployment, Security, and Code of Conduct guides.

### Changed
- Refactored `TravelContext` into a modular provider-context-types structure for better Turbopack compatibility.
- Updated UI components to utilize Tailwind CSS 4 features and Framer Motion 12.
- Enhanced Destination detail pages with interactive star ratings and real user reviews.

### Fixed
- Resolved AI "404 Not Found" errors by implementing dynamic model selection.
- Fixed hydration issues in the Global Layout by removing visibility hacks.
- Corrected points awarding logic during payment verification.

---
**Malang Premium Tours Team**
