# 🚀 Deployment Guide

This guide covers the steps to deploy **MalangTour Premium** to production environments.

## 🏁 Prerequisites

- **Google AI Studio Key**: For the AI Chatbot and Planner.
- **Midtrans Account**: For payment processing (Production keys required for real money).
- **Resend Account**: For automated E-Ticket emails.
- **Vercel Account**: Recommended hosting provider.

## 📦 Step 1: Prepare Database

If you are moving from SQLite to production, use **PostgreSQL** (e.g., Vercel Postgres, Supabase, or Railway).

1. Change the provider in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update your `DATABASE_URL` in environment variables.

## 🌐 Step 2: Deploy to Vercel

1. **Push your code** to a GitHub repository.
2. **Import to Vercel**: Connect your repo.
3. **Environment Variables**: Add all keys from your `.env` to Vercel Dashboard.
   - `GEMINI_API_KEY`
   - `MIDTRANS_SERVER_KEY`
   - `MIDTRANS_CLIENT_KEY`
   - `RESEND_API_KEY`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_APP_URL` (e.g., `https://malangtour.vercel.app`)
4. **Build Settings**: Next.js defaults are correct.
5. **Post-Deployment**: Run `npx prisma db push` to sync your schema.

## 💳 Step 3: Midtrans Configuration

1. Log in to [Midtrans Dashboard](https://dashboard.midtrans.com/).
2. Set the **Payment Notification URL** to:
   `https://your-domain.com/api/payment/webhook` (If implemented)
3. Ensure the environment matches (Sandbox vs Production).

## 📧 Step 4: Email Verification

1. In **Resend**, verify your domain.
2. Update the `from` address in `lib/services/mail.ts` to match your verified domain.

---

## 🛠️ Common Troubleshooting

- **AI 404 Errors**: Ensure your API key has "Generative Language API" enabled in Google Cloud.
- **Prisma Client**: If you see "Module not found", run `npx prisma generate` during the build step.
- **Turbopack Issues**: If the build fails on Vercel, try disabling Turbopack by removing the `--turbo` flag from `package.json`.