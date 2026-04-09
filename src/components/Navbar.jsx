import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: '01. About', href: '#about' },
  { label: '02. Skills', href: '#skills' },
  { label: '03. Projects', href: '#projects' },
  { label: '04. Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['about', 'skills', 'projects', 'contact']
      const current = sections.find(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      setActive(current ? `#${current}` : '')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#060608]/90 backdrop-blur-xl border-b border-white/5'
            : 'py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
            style={{ cursor: 'none' }}
          >
            <span
              className="text-xl font-display font-bold tracking-widest"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <span style={{ color: '#f97316' }}>M</span>
              <span style={{ color: '#f1f0ee' }}>L</span>
            </span>
            <span
              className="text-xs tracking-[0.25em] uppercase transition-colors"
              style={{
                color: '#6b6b80',
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
              }}
            >
              Portfolio
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className={`nav-link ${active === href ? 'active' : ''}`}
                style={{ cursor: 'none', background: 'none', border: 'none', padding: 0 }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#contact')}
              className="btn-orange text-xs px-5 py-2.5 rounded-lg"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ cursor: 'none', background: 'none', border: 'none' }}
          >
            <motion.span
              className="block w-6 h-px"
              style={{ background: '#f97316' }}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
            />
            <motion.span
              className="block w-4 h-px"
              style={{ background: '#f97316', transformOrigin: 'left' }}
              animate={{ scaleX: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-6 h-px"
              style={{ background: '#f97316' }}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[8999] md:hidden flex flex-col items-center justify-center"
            style={{ background: 'rgba(6, 6, 8, 0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {NAV_ITEMS.map(({ label, href }, i) => (
              <motion.button
                key={href}
                onClick={() => handleNav(href)}
                className="text-3xl font-display font-bold py-4 text-white/80 hover:text-orange-500 transition-colors"
                style={{ cursor: 'none', background: 'none', border: 'none', fontFamily: 'Syne, sans-serif' }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
