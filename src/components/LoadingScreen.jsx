import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // 'loading' | 'done'

  useEffect(() => {
    // Simulate loading progress
    const steps = [
      { target: 30, delay: 0, duration: 400 },
      { target: 60, delay: 500, duration: 500 },
      { target: 85, delay: 1200, duration: 400 },
      { target: 100, delay: 2000, duration: 300 },
    ]

    steps.forEach(({ target, delay, duration }) => {
      setTimeout(() => {
        const start = Date.now()
        const startVal = progress
        const tick = () => {
          const elapsed = Date.now() - start
          const t = Math.min(elapsed / duration, 1)
          const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
          setProgress(Math.round(startVal + (target - startVal) * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }, delay)
    })

    setTimeout(() => setPhase('done'), 2400)
  }, [])

  const letters = 'MARK.DEV'.split('')

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#060608' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Orange radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)'
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Animated logo letters */}
            <div className="flex gap-1 items-center">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  className="text-4xl font-display font-bold tracking-widest"
                  style={{
                    color: char === '.' ? '#f97316' : '#f1f0ee',
                    fontFamily: 'Syne, sans-serif',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Role text */}
            <motion.p
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Full Stack Developer
            </motion.p>

            {/* Progress bar container */}
            <motion.div
              className="w-64 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Bar track */}
              <div className="relative h-px bg-white/5 overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #f97316, #fb923c)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                {/* Sweep shimmer */}
                <div className="loading-bar absolute inset-y-0 w-20" />
              </div>

              {/* Percentage */}
              <div className="flex justify-between items-center">
                <span
                  className="text-xs"
                  style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
                >
                  Initializing
                </span>
                <motion.span
                  className="text-xs"
                  style={{ color: '#f97316', fontFamily: 'DM Mono, monospace' }}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>

            {/* Decorative rotating ring */}
            <motion.div
              className="w-16 h-16 rounded-full border border-orange-500/20"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              style={{ borderTopColor: '#f97316' }}
            />
          </div>

          {/* Corner decorations */}
          {[
            'top-6 left-6', 'top-6 right-6',
            'bottom-6 left-6', 'bottom-6 right-6'
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-6 h-6`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d={i < 2 ? 'M0 12 L0 0 L12 0' : 'M0 12 L0 24 L12 24'}
                  stroke="#f97316"
                  strokeWidth="1"
                  opacity="0.4"
                  transform={i % 2 !== 0 ? 'scale(-1,1) translate(-24,0)' : ''}
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
