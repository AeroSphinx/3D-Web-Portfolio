import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Cpu, Globe, Zap } from 'lucide-react'

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '15+', label: 'Happy Clients' },
  { value: '99%', label: 'Coffee-Powered' },
]

const HIGHLIGHTS = [
  { icon: Code2, label: 'Clean Code', desc: 'Readable, maintainable, scalable.' },
  { icon: Cpu, label: 'Performance First', desc: 'Optimized for speed and efficiency.' },
  { icon: Globe, label: 'Global Thinking', desc: 'Accessible, responsive, cross-platform.' },
  { icon: Zap, label: 'Fast Delivery', desc: 'Agile mindset, rapid iteration.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: '#060608' }}
    >
      {/* Subtle side glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.div
          className="section-label mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          About Me
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.h2
              className="font-display mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                color: '#f1f0ee',
                letterSpacing: '-0.02em',
              }}
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              Turning ideas into{' '}
              <span style={{ color: '#f97316' }}>digital reality</span>
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed mb-5"
              style={{ color: '#9090a0', fontFamily: 'DM Sans, sans-serif' }}
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              I'm a full-stack developer and creative engineer based in the Philippines.
              My passion lies at the intersection of engineering precision and visual
              storytelling — I love building experiences that people actually enjoy using.
            </motion.p>

            <motion.p
              className="text-base leading-relaxed mb-8"
              style={{ color: '#9090a0', fontFamily: 'DM Sans, sans-serif' }}
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              When I'm not pushing code, you'll find me exploring 3D graphics,
              contributing to open-source, or reading about the latest developments in AI. 
              I believe great software is built by curious people who never stop learning.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="card-glass rounded-xl p-4 text-center"
                >
                  <p
                    className="font-display font-bold text-2xl mb-1"
                    style={{ color: '#f97316', fontFamily: 'Syne, sans-serif' }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                className="card-glass rounded-2xl p-6 group"
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                whileHover={{
                  borderColor: 'rgba(249,115,22,0.35)',
                  boxShadow: '0 0 30px rgba(249,115,22,0.08)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}
                >
                  <Icon size={18} style={{ color: '#f97316' }} />
                </div>
                <h3
                  className="font-display font-semibold mb-1 text-sm"
                  style={{ color: '#f1f0ee', fontFamily: 'Syne, sans-serif' }}
                >
                  {label}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: '#6b6b80', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
