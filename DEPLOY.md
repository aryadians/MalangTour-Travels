# Deployment Guide for Malang Travel 🚀

This application is built with **Next.js 14** and is optimized for deployment on Vercel or Netlify.

## 1. Prerequisites
- GitHub Account
- Vercel Account (recommended for Next.js)

## 2. Deploy to Vercel (Recommended)
1.  Push your code to a GitHub repository.
2.  Go to [Vercel Dashboard](https://vercel.com/new).
3.  Import your repository.
4.  **Framework Preset**: Next.js.
5.  **Build Command**: `npm run build` (default).
6.  **Output Directory**: `.next` (default).
7.  **Environment Variables**:
    *   No complex DB variables needed for this demo version!
    *   (Optional) If you used Image Optimization with external domains, add them to `next.config.js`.

8.  Click **Deploy**.

## 3. Deploy to Netlify
1.  Go to [Netlify](https://app.netlify.com/start).
2.  Connect GitHub and select repo.
3.  **Build Command**: `npm run build`.
4.  **Publish Directory**: `.next`.
5.  Install the **Next.js Runtime** plugin if prompted.

## 4. Local Production Build
To test the production build locally:
```bash
npm run build
npm start
```

## Performance Logic
The app uses **Client-Side Data Mocking** via `TravelContext`. This ensures:
-   ⚡ Ultra-fast page loads (no DB latency).
-   🛡️ Zero deployment crashes due to missing database connections.
-   📱 Smooth animations and transitions.

## Future Backend Integration
To switch to a real database:
1.  Set up a PostgreSQL/SQLite database.
2.  Rename `context/TravelContext.tsx` to use `fetch('/api/destinations')`.
3.  Uncomment Prisma logic in `lib/prisma.ts`.
