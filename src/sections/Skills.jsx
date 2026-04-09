import React, { useRef, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillsScene from '../three/SkillsScene'

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    color: '#f97316',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Vue.js'],
  },
  {
    category: 'Backend',
    color: '#fb923c',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'GraphQL', 'REST APIs', 'WebSockets'],
  },
  {
    category: 'Database',
    color: '#ea580c',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase', 'Firebase'],
  },
  {
    category: 'DevOps & Tools',
    color: '#f97316',
    skills: ['Docker', 'AWS', 'Vercel', 'Git', 'CI/CD', 'Linux', 'Nginx'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Skills() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: '#08080d' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Right glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="section-label mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          Tech Stack
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — skill groups */}
          <div>
            <motion.h2
              className="font-display mb-10"
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
              Tools I build{' '}
              <span style={{ color: '#f97316' }}>with</span>
            </motion.h2>

            <div className="flex flex-col gap-8">
              {SKILL_GROUPS.map(({ category, skills, color }, gi) => (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  custom={gi + 2}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                    />
                    <span
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
                    >
                      {category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        className="skill-tag"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: gi * 0.1 + si * 0.04, duration: 0.4 }}
                        whileHover={{ scale: 1.06, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — 3D skills globe */}
          <motion.div
            className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {/* Glow ring behind canvas */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)',
              }}
            />
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin"
                  />
                </div>
              }
            >
              <SkillsScene />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
