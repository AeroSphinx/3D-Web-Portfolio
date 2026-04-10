import React, { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'NexaCloud Platform',
    category: 'SaaS / Full Stack',
    desc: 'A real-time cloud infrastructure management dashboard with AI-driven cost optimization, live metrics, and multi-cloud support.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'WebSockets'],
    color: '#f97316',
    accent: 'rgba(249,115,22,0.12)',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Verse — AI Writing Tool',
    category: 'AI / Product',
    desc: 'An AI-powered creative writing assistant with context-aware suggestions, real-time collaboration, and GPT-4 integration.',
    tech: ['Next.js', 'TypeScript', 'OpenAI', 'Supabase'],
    color: '#fb923c',
    accent: 'rgba(251,146,60,0.1)',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    id: 3,
    title: 'OrbitMesh 3D',
    category: '3D / WebGL',
    desc: 'An interactive 3D network topology visualizer for DevOps teams. Built with Three.js, supporting 10k+ live nodes.',
    tech: ['Three.js', 'React', 'GraphQL', 'Redis'],
    color: '#ea580c',
    accent: 'rgba(234,88,12,0.1)',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Pulse Analytics',
    category: 'Dashboard / Data',
    desc: 'Real-time analytics dashboard with customizable widgets, cohort analysis, and automated reporting pipelines.',
    tech: ['Vue.js', 'Python', 'FastAPI', 'TimescaleDB'],
    color: '#f97316',
    accent: 'rgba(249,115,22,0.1)',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'StoreKit Commerce',
    category: 'E-commerce / Mobile',
    desc: 'A headless e-commerce platform with micro-animations, AR product previews, and one-tap checkout.',
    tech: ['React Native', 'Node.js', 'Stripe', 'MongoDB'],
    color: '#fb923c',
    accent: 'rgba(251,146,60,0.1)',
    link: '#',
    github: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'HorizonOS UI Kit',
    category: 'Design System',
    desc: 'An open-source React component library with dark-mode support, 60+ components, and full accessibility compliance.',
    tech: ['React', 'Storybook', 'Radix UI', 'Tailwind'],
    color: '#ea580c',
    accent: 'rgba(234,88,12,0.1)',
    link: '#',
    github: '#',
    featured: false,
  },
]

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ project, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set(e.clientX - cx)
    y.set(e.clientY - cy)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="project-card"
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Card top bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
          }}
        />

        <div className="p-6">
          {/* Category */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs tracking-[0.15em] uppercase"
              style={{ color: project.color, fontFamily: 'DM Mono, monospace' }}
            >
              {project.category}
            </span>
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#6b6b80', cursor: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = project.color}
                onMouseLeave={e => e.currentTarget.style.color = '#6b6b80'}
              >
                <Github size={15} />
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#6b6b80', cursor: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = project.color}
                onMouseLeave={e => e.currentTarget.style.color = '#6b6b80'}
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Decorative visual area */}
          <div
            className="w-full h-36 rounded-lg mb-5 relative overflow-hidden flex items-center justify-center"
            style={{ background: project.accent }}
          >
            <ProjectVisual project={project} />
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold mb-2"
            style={{
              color: '#f1f0ee',
              fontFamily: 'Syne, sans-serif',
              fontSize: '1.1rem',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: '#6b6b80', fontFamily: 'DM Sans, sans-serif' }}
          >
            {project.desc}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <span key={t} className="skill-tag" style={{ fontSize: '0.68rem' }}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// SVG decorative project thumbnails
function ProjectVisual({ project }) {
  const id = project.id
  const c = project.color

  if (id === 1) return (
    <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
      {[20, 50, 80, 110, 140, 170].map((x, i) => (
        <rect key={x} x={x} y={30 + i % 3 * 10} width="18" height={40 - i % 3 * 10} fill={c} opacity={0.6 - i * 0.05} rx="2"/>
      ))}
      <line x1="10" y1="80" x2="190" y2="80" stroke={c} strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3"/>
      {[30, 60, 90, 120, 150, 180].map((x, i) => (
        <circle key={x} cx={x} cy={50 + Math.sin(i) * 15} r="3" fill={c} opacity="0.7"/>
      ))}
    </svg>
  )

  if (id === 2) return (
    <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
      {[15, 30, 50, 70, 85].map((y, i) => (
        <rect key={y} x="20" y={y} width={80 + Math.random() * 80} height="6" fill={c} opacity={0.2 + i * 0.1} rx="3"/>
      ))}
      <circle cx="165" cy="40" r="20" fill="none" stroke={c} strokeWidth="1" opacity="0.4"/>
      <path d="M155 40 Q165 25 175 40" stroke={c} strokeWidth="1.5" fill="none" opacity="0.8"/>
    </svg>
  )

  return (
    <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
      {Array.from({ length: 6 }, (_, i) => (
        <circle key={i}
          cx={30 + (i % 3) * 60}
          cy={30 + Math.floor(i / 3) * 40}
          r="12" fill="none" stroke={c}
          strokeWidth="1" opacity={0.4 + i * 0.08}
        />
      ))}
      <line x1="42" y1="30" x2="88" y2="30" stroke={c} strokeWidth="0.8" opacity="0.3"/>
      <line x1="42" y1="70" x2="88" y2="70" stroke={c} strokeWidth="0.8" opacity="0.3"/>
      <line x1="30" y1="42" x2="90" y2="58" stroke={c} strokeWidth="0.8" opacity="0.3"/>
    </svg>
  )
}

export default function Projects() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: '#060608' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(249,115,22,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              className="section-label mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Work
            </motion.div>
            <motion.h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                color: '#f1f0ee',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Selected{' '}
              <span style={{ color: '#f97316' }}>Projects</span>
            </motion.h2>
          </div>

          <motion.a
            href="https://github.com/AeroSphinx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-orange text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 self-start md:self-auto"
            style={{ textDecoration: 'none', cursor: 'none' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Github size={14} />
            View All on GitHub
            <ArrowUpRight size={13} />
          </motion.a>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
