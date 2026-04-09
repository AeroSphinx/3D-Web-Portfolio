# Alex Rivera — 3D Portfolio

A visually immersive, full-screen 3D portfolio website built with **React + Vite**, **Three.js / React Three Fiber**, **Framer Motion**, and **Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Tech Stack

| Layer        | Technology                              |
|-------------|------------------------------------------|
| Framework    | React 18 + Vite 5                       |
| 3D Engine    | Three.js + React Three Fiber + Drei     |
| Animation    | Framer Motion + GSAP                    |
| Styling      | Tailwind CSS 3 + Custom CSS Variables   |
| Routing      | React Router v6                         |
| Email        | EmailJS (see setup below)               |
| Icons        | Lucide React                            |

---

## 📂 Project Structure

```
src/
├── components/       # Shared UI components
│   ├── LoadingScreen.jsx
│   ├── CustomCursor.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── sections/         # Page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   └── Contact.jsx
├── three/            # Three.js / R3F scenes
│   ├── HeroScene.jsx
│   └── SkillsScene.jsx
├── hooks/            # Custom React hooks
│   └── useScrollAnimation.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✉️ Setting Up EmailJS (Contact Form)

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service (Gmail, Outlook, etc.)
3. Create an Email Template with variables: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
4. Copy your **Service ID**, **Template ID**, and **Public Key**
5. In `src/sections/Contact.jsx`, replace the simulated delay:

```js
// Install the package
npm install emailjs-com

// Import at the top of Contact.jsx
import emailjs from 'emailjs-com'

// Replace the simulated delay in handleSubmit:
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  form,
  'YOUR_PUBLIC_KEY'
)
```

---

## 🎨 Customization

### Personal Info
Edit the following files with your real info:

| File | What to update |
|------|---------------|
| `src/sections/Hero.jsx` | Name, role, tagline, social links |
| `src/sections/About.jsx` | Bio, stats, highlights |
| `src/sections/Skills.jsx` | Skill groups and tags |
| `src/sections/Projects.jsx` | Project data array |
| `src/sections/Contact.jsx` | Email, location, social links |
| `src/components/Footer.jsx` | Social links, copyright name |
| `src/components/Navbar.jsx` | Your name initials |
| `index.html` | Page title, meta description |

### Colors
The orange theme is controlled via CSS variables in `src/index.css`:

```css
:root {
  --orange: #f97316;        /* Primary orange */
  --orange-glow: #ff6b00;   /* Glow effects */
  --dark-bg: #060608;       /* Main background */
}
```

Change `--orange` to any color to re-theme the entire site.

---

## ⚡ Performance Tips

- The 3D canvas uses `dpr={[1, 1.5]}` to limit pixel ratio on high-DPI screens
- Stars and particle counts are tuned for 60fps on mid-range hardware
- All sections are lazy-loaded with `Suspense` fallbacks
- Use `npm run build` for production — Vite tree-shakes Three.js modules efficiently

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the `dist/` folder to netlify.com/drop
```

### GitHub Pages
Add `base: '/your-repo-name/'` to `vite.config.js`, then:
```bash
npm run build
# Push `dist/` to the `gh-pages` branch
```

---

## 📝 License

MIT — free to use for personal and commercial projects.
