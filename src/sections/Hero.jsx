import React, { Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '../three/HeroScene'
import { Github, Linkedin, ArrowDown } from 'lucide-react'

const WORDS = ['Developer.', 'Engineer.', 'Creator.', 'Builder.']

function AnimatedRole() {
  const [index, setIndex] = React.useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="text-orange-500 inline-block"
      style={{ color: '#f97316', minWidth: '11ch' }}
    >
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'inline-block' }}
      >
        {WORDS[index]}
      </motion.span>
    </span>
  )
}

const stagger = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 3.0 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden hero-gradient"
      style={{ background: '#060608' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* 3D Canvas — right side */}
      <div className="absolute right-0 top-0 w-full md:w-[55%] h-full pointer-events-none">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Gradient fade — left edge of canvas */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-none hidden md:block"
        style={{ background: 'linear-gradient(90deg, #060608 30%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <motion.div
          className="max-w-xl"
          variants={stagger.container}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div className="section-label mb-6" variants={stagger.item}>
            Available for work
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display mb-4 leading-none"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              color: '#f1f0ee',
              letterSpacing: '-0.02em',
            }}
            variants={stagger.item}
          >
            Hi, I'm{' '}
            <span
              className="orange-glow"
              style={{ color: '#f97316' }}
            >
              Mark Lawrence Rodil
            </span>
          </motion.h1>

          {/* Animated role */}
          <motion.h2
            className="font-display mb-6 leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              color: '#f1f0ee',
              letterSpacing: '-0.02em',
            }}
            variants={stagger.item}
          >
            Full Stack <AnimatedRole />
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base leading-relaxed mb-10"
            style={{
              color: '#6b6b80',
              maxWidth: '44ch',
              fontFamily: 'DM Sans, sans-serif',
            }}
            variants={stagger.item}
          >
            I design and build immersive digital experiences — from scalable backend
            systems to interactive 3D front-ends. Currently crafting the future,
            one commit at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            variants={stagger.item}
          >
            <button
              className="btn-orange text-sm px-7 py-3.5 rounded-xl"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </button>
            <button
              className="btn-outline-orange text-sm px-7 py-3.5 rounded-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div className="flex items-center gap-5" variants={stagger.item}>
            {[
              { icon: Github, href: 'https://github.com/AeroSphinx', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/mark-lawrence-rodil-1252212aa/', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 text-xs transition-colors"
                style={{ color: '#6b6b80', cursor: 'none', textDecoration: 'none', fontFamily: 'DM Mono, monospace' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f97316' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6b6b80' }}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
            <div className="flex-1 h-px max-w-[3rem]" style={{ background: 'rgba(249,115,22,0.2)' }} />
            <span
              className="text-xs"
              style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
            >
              marklawrencerodil@gmail.com
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        onClick={scrollToAbout}
        style={{ cursor: 'none', background: 'none', border: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.8 }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} style={{ color: '#f97316' }} />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #060608, transparent)' }}
      />
    </section>
  )
}
