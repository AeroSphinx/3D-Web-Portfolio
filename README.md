<div align="center">

<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=f97316&height=200&section=header&text=3D%20Web%20Portfolio&fontSize=48&fontColor=ffffff&fontAlignY=38&desc=Mark%20Lawrence%20Rodil%20%E2%80%94%20Full%20Stack%20Developer&descAlignY=58&descSize=18" width="100%"/>

<br/>

<!-- Badges -->
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-r167-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF0082?style=for-the-badge&logo=framer&logoColor=white)

<br/>

![License](https://img.shields.io/badge/License-MIT-f97316?style=flat-square)
![Status](https://img.shields.io/badge/Status-Live-22c55e?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-f97316?style=flat-square)

</div>

---

## ✦ Overview

A visually immersive, interactive **3D portfolio website** built for showcasing full-stack development skills, projects, and personal brand. Features a real-time WebGL 3D scene, scroll-triggered animations, a custom cursor, and a functional contact form — all wrapped in a dark + orange aesthetic.

> **Live Demo:** (https://3d-web-portfolio-nu.vercel.app)

---

## ✦ Preview

<div align="center">

| Section | Description |
|---------|-------------|
| 🌐 **Hero** | Full-screen 3D scene with orbiting rings, particle orb & floating geometry |
| 👤 **About** | Personal bio, animated stats, and highlight cards |
| ⚙️ **Skills** | Rotating 3D skills globe + categorized tech tag cloud |
| 🗂️ **Projects** | 6 interactive 3D tilt cards with live GitHub/demo links |
| 📬 **Contact** | EmailJS-powered form + social links |

</div>

---

## ✦ Tech Stack

<div align="center">

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 + Vite 5 |
| **3D Engine** | Three.js + React Three Fiber + Drei |
| **Animation** | Framer Motion + GSAP |
| **Styling** | Tailwind CSS 3 + Custom CSS Variables |
| **Routing** | React Router v6 |
| **Email** | EmailJS (`@emailjs/browser`) |
| **Icons** | Lucide React |
| **Fonts** | Syne (display) · DM Sans (body) · DM Mono (code) |

</div>

---

## ✦ Features

- 🎮 **Interactive 3D Hero Scene** — orbiting rings, distorted icosahedron core, particle cloud, floating wireframe debris
- 🌍 **3D Skills Globe** — Fibonacci-distributed skill labels on a rotating sphere
- 🃏 **3D Tilt Project Cards** — mouse-tracking perspective tilt on hover
- ✨ **Custom Cursor** — dot + lagging ring cursor with hover state expansion
- ⏳ **Animated Loading Screen** — letter-by-letter reveal with progress bar
- 📜 **Scroll Animations** — Framer Motion `useInView` staggered reveals per section
- 🎨 **Orange Theme System** — single CSS variable `--orange` controls the entire palette
- 📱 **Responsive** — mobile menu, touch-safe 3D fallbacks, fluid typography
- 🔒 **Secure** — EmailJS keys stored in `.env`, never committed to git

---

## ✦ Project Structure

```
portfolio/
├── public/
│   └── tab-icon.svg
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx    # Animated percentage loader
│   │   ├── CustomCursor.jsx     # Dot + ring cursor
│   │   ├── Navbar.jsx           # Scroll-spy nav + mobile menu
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx             # Full-screen 3D landing
│   │   ├── About.jsx            # Bio + stats
│   │   ├── Skills.jsx           # 3D globe + tag cloud
│   │   ├── Projects.jsx         # Tilt card grid
│   │   └── Contact.jsx          # EmailJS form + socials
│   ├── three/
│   │   ├── HeroScene.jsx        # R3F Hero 3D scene
│   │   └── SkillsScene.jsx      # R3F Skills globe
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # CSS variables, global styles
├── .env                         # 🔒 NOT committed — EmailJS keys
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ✦ Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AeroSphinx/3D-Web-Portfolio.git

# 2. Navigate into the project
cd 3D-Web-Portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✦ EmailJS Setup (Contact Form)

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an Email Service (Gmail, Outlook, etc.)
3. Create a Template using these variables: `{{name}}` `{{email}}` `{{subject}}` `{{message}}`
4. Create a `.env` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

5. In `src/sections/Contact.jsx`, replace the simulated send with:

```js
import emailjs from '@emailjs/browser'

await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  form,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
```

---

## ✦ Customization

| File | What to update |
|------|---------------|
| `src/sections/Hero.jsx` | Name, role, tagline, social links |
| `src/sections/About.jsx` | Bio, stats, highlight cards |
| `src/sections/Skills.jsx` | `SKILL_GROUPS` array |
| `src/sections/Projects.jsx` | `PROJECTS` array |
| `src/sections/Contact.jsx` | Email, location, social links |
| `src/index.css` → `:root` | `--orange: #f97316` to re-theme everything |

---

## ✦ Deployment

### Vercel *(Recommended)*
```bash
npm install -g vercel
vercel
```
Add your `.env` variables under **Project Settings → Environment Variables** in the Vercel dashboard.

### Netlify
```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

### GitHub Pages
```js
// vite.config.js — add this:
base: '/3D-Web-Portfolio/'
```
```bash
npm run build
# Push dist/ to the gh-pages branch
```

---

## ✦ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server at `localhost:5173` |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |

---

## ✦ License

This project is open source under the [MIT License](LICENSE).  
Feel free to use it as a base for your own portfolio — a credit or star ⭐ is always appreciated!

---

<div align="center">

**Made with 🔶 and lots of ☕ by [Mark Lawrence Rodil](https://github.com/AeroSphinx)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=f97316&height=100&section=footer" width="100%"/>

</div>
