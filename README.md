# 🎂 Birthday Gift — A Beautiful Birthday Website

A heartfelt, animated, mobile-first birthday web app built with **Vite + React + Tailwind CSS + Framer Motion**.

Created as a personal gift — featuring a hero screen, journey timeline, memory gallery, 27 reasons, a typed letter, and a confetti finale.

---

## ✨ Features

| Section | Status | What it does |
|---|---|---|
| **Landing** | ✅ Active | Full-screen hero with animated heading, floating particles, glowing CTA, and background music support |
| **Timeline** | 🚧 Disabled | Scroll-animated vertical timeline of friendship milestones (commented out) |
| **Gallery** | 🚧 Disabled | Responsive photo grid with caption overlays and a keyboard-accessible lightbox (commented out) |
| **27 Reasons** | ✅ Active | One animated card at a time with progress dots and prev/next navigation |
| **Letter** | ✅ Active | Heartfelt letter revealed with a realistic typing animation |
| **Final** | ✅ Active | Confetti celebration screen with a replay button |

---

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/) — lightning-fast dev server & build
- [React 18](https://react.dev/) — component UI
- [Tailwind CSS 3](https://tailwindcss.com/) — utility-first styling
- [Framer Motion 11](https://www.framer.com/motion/) — animations
- [react-confetti](https://github.com/alampros/react-confetti) — confetti 🎉
- [Google Fonts](https://fonts.google.com/) — Playfair Display + Inter

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18 or higher — download from [nodejs.org](https://nodejs.org)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/april16.git
cd april16

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.  
Preview the build locally:

```bash
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

### One-time setup

1. Create a GitHub repository named `april16` (or whatever you prefer).
2. Push your code to the `main` branch.
3. In `vite.config.js`, update the `base` option to match your repo name:

```js
// vite.config.js
export default defineConfig({
  base: '/april16/',   // ← change to your repo name
  plugins: [react()],
})
```

4. Install the `gh-pages` package (already in devDependencies):

```bash
npm install
```

### Deploy

```bash
npm run deploy
```

This runs `vite build` and then pushes the `dist/` folder to the `gh-pages` branch.

Your site will be live at:  
`https://YOUR_USERNAME.github.io/april16/`

> **Note:** Allow 1–2 minutes for GitHub Pages to publish after the first deploy.  
> Go to **Settings → Pages** in your repository to verify the source branch is `gh-pages`.

---

## 🎨 Personalisation Guide

All personalisation is done in a **single file**: `src/data/config.js`.  
This file is gitignored so your private content is never committed.

### Setup

```bash
# Copy the template and fill in your content
cp src/data/config.example.js src/data/config.js
```

Then edit `src/data/config.js`:

```js
export const CONFIG = {
  birthdayDate: "April 16th, 2026",   // shown on the hero
  recipientName: "Your Best Friend",   // name in the heading
  recipientAge: 27,                    // used in "27 Reasons" etc.
  friendshipYears: "12+",              // hero subtext

  letterParagraphs: [                  // letter typing animation
    "To my favourite person...",
    "Add as many paragraphs as you like.",
    "— Always yours ✨",
  ],

  finalQuote: "Your closing quote.",
  finalClosing: "Happy Birthday, [name].",

  timelineEvents: [ ... ],             // (Timeline section — currently disabled)
  reasons: [ ... ],                    // one per year of life
}
```

### Add background music

Place an `.mp3` file at `public/music/birthday.mp3`.  
The audio will start playing after the user's first click (respects browser autoplay policy).

### Re-enable Timeline / Gallery

In `src/App.jsx`, uncomment the relevant imports and `<Timeline />` / `<Gallery />` JSX elements, and add their nav links back to `FloatingNav`.

---

## 📁 Project Structure

```
april16/
├── public/
│   ├── images/              ← Your photos go here
│   └── music/               ← birthday.mp3 goes here
├── src/
│   ├── components/
│   │   ├── Landing.jsx      ← Hero screen
│   │   ├── Timeline.jsx     ← Journey timeline (disabled)
│   │   ├── Gallery.jsx      ← Photo gallery + lightbox (disabled)
│   │   ├── Reasons.jsx      ← Reasons cards
│   │   ├── Letter.jsx       ← Typing letter animation
│   │   └── Final.jsx        ← Confetti finale
│   ├── data/
│   │   ├── config.example.js  ← Template — safe to commit
│   │   ├── config.js          ← Your private content (gitignored)
│   │   ├── memories.js        ← Re-exports timeline/gallery from config
│   │   └── reasons.js         ← Re-exports reasons from config
│   ├── App.jsx              ← Root component + floating nav
│   ├── main.jsx             ← React entry point
│   └── index.css            ← Tailwind + global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ♿ Accessibility

- All interactive elements are keyboard-navigable (`Tab`, `Enter`, `Space`)
- Lightbox supports `Escape`, `ArrowLeft`, `ArrowRight` keys
- All images have `alt` text
- ARIA labels on buttons and sections
- Confetti is `pointer-events: none` (non-blocking)

---

## 📄 License

Made with ❤️ — personal use only.
