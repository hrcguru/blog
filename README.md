# Knowledge & Wisdom Hub — Next.js + MongoDB (API Routes)

A modern, SEO-friendly portfolio & knowledge hub built with **Next.js App Router**, **MongoDB**, **Tailwind CSS**, and **Framer Motion**.
It includes API routes for posts and contact form, dark/light theme, and sample seed data.

## ⚙️ Prerequisites
- Node.js 18+
- A MongoDB Atlas connection string

## 🚀 Quick Start
1. Unzip the folder.
2. Open a terminal in the project root.
3. Copy `.env.example` to `.env.local` and fill your connection details:
   ```bash
   cp .env.example .env.local
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. (Optional) Seed sample posts:
   - Start the dev server in one terminal: `npm run dev`
   - In another terminal, run:
     ```bash
     curl -X POST http://localhost:3000/api/seed
     ```
6. Run the app:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

> For production, set `NEXT_PUBLIC_BASE_URL` in `.env.local` to your deployed URL (e.g., https://your-site.vercel.app)

## 📁 Project Structure
```
app/                # App Router pages and API routes
  api/
    posts/route.js  # GET (list), POST (create) posts
    contact/route.js# POST contact submissions
    seed/route.js   # POST to seed sample data
  layout.js         # Root layout with fonts and theme
  page.js           # Home page with category sections
  about/page.js
  contact/page.js
  category/[slug]/page.js
components/         # UI components
lib/
  mongodb.js        # MongoDB connection helper
public/             # (optional assets)
tailwind.config.mjs
postcss.config.mjs
next.config.mjs
package.json
```

## 🧩 Notes
- The site fetches posts via **API routes** to keep the architecture clean and microservice-ready.
- Replace the alert in `BlogCard` with a dedicated dynamic route for full blog posts if you want full CMS behavior.
- You can deploy easily on **Vercel**. MongoDB Atlas free tier works great for this project.

## 🖌️ Styling & Animations
- **Tailwind CSS** powers modern, responsive UI with a custom color system.
- **next/font** loads **Inter** and **Playfair Display**.
- **Framer Motion** adds subtle entrance/hover animations.

Enjoy!
