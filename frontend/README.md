# FormSahay Portal - Frontend Client

This is the frontend client for the **FormSahay Portal**, built using React, Vite, and TailwindCSS.

---

## 🛠️ Tech Stack & Features

- **React + Vite**: High-performance development server and bundle optimization.
- **TailwindCSS**: Premium utility-first styling with custom animation extensions.
- **Framer Motion**: Smooth page transitions, hover interactions, and micro-animations.
- **Lucide React**: Clean, modern iconography.
- **React Router (V7)**: Client-side routing for seamless page navigation.
- **React Hot Toast**: Beautiful notification and toast messages.

---

## 🚀 Getting Started

### Installation
Ensure you are in the `frontend` directory and install dependencies:
```bash
npm install
```

### Running Locally
To launch the Vite development server:
```bash
npm run dev
```
The application will run locally at [http://localhost:5173](http://localhost:5173).

### Building for Production
To generate the static production build:
```bash
npm run build
```
This compiles the code into optimized chunks inside the `dist/` directory.

### Previewing the Production Build
To preview the production build locally:
```bash
npm run preview
```

---

## ⚙️ Environment Configuration

Create a `.env` file in this directory to specify the backend API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

In production, update `VITE_API_URL` to point to your deployed backend API URL (e.g. `https://api.formsahay.com/api`).

---

## ☁️ Vercel Deployment Configuration

This directory is ready for instant deployment on Vercel:
- **Build Command**: `vite build` (via `npm run build`)
- **Output Directory**: `dist`
- **Routing**: Supported via the `vercel.json` rewrite rule to redirect all routes to `index.html`, preventing 404 errors during page refreshes on sub-routes.
