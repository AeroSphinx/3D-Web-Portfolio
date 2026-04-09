import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Facebook, Mail, Send, MapPin, ArrowUpRight } from 'lucide-react'
import emailjs from '@emailjs/browser'
import.meta.env.VITE_EMAILJS_SERVICE_ID

const SOCIALS = [
  { icon: Github,   label: 'GitHub',   handle: 'Mark Lawrence Rodil',   href: 'https://github.com/AeroSphinx' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'Mark Lawrence Rodil',    href: 'https://www.linkedin.com/in/mark-lawrence-rodil-1252212aa/' },
  { icon: Facebook, label: 'Facebook', handle: '@marklawrencerodil',    href: 'https://www.facebook.com/marklawrence.rodil.3/' },
  { icon: Mail,     label: 'Email',    handle: 'marklawrencerodil@gmail.com', href: 'marklawrencerodil@gmail.com' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Contact() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // ── EmailJS integration ──────────────────────────────────────────────────
    // To activate real email sending:
    // 1. npm install emailjs-com
    // 2. import emailjs from 'emailjs-com'
    // 3. Replace the timeout below with:
    //    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
    // ─────────────────────────────────────────────────────────────────────────

    // Simulated delay for demo
    await emailjs.send(
     'service_u8rap4q',   // ← Service ID
     'template_atfl254',  // ← Template ID
     form,
     'MxscBE4CYtMY-ZboN'    // ← Public Key
  )
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: '#08080d' }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="section-label justify-center mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Contact
          </motion.div>
          <motion.h2
            className="font-display mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
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
            Let's build something{' '}
            <span style={{ color: '#f97316' }}>great together</span>
          </motion.h2>
          <motion.p
            className="text-base max-w-md mx-auto"
            style={{ color: '#6b6b80', fontFamily: 'DM Sans, sans-serif' }}
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            Whether it's a new project, a collaboration, or just a coffee chat —
            my inbox is always open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* ── Left: contact info ──────────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {/* Location */}
            <div className="card-glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-1">
                <MapPin size={15} style={{ color: '#f97316' }} />
                <span
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
                >
                  Location
                </span>
              </div>
              <p
                className="font-display font-semibold"
                style={{ color: '#f1f0ee', fontFamily: 'Syne, sans-serif' }}
              >
                Muntinlupa, Philippines
              </p>
              <p className="text-xs mt-1" style={{ color: '#6b6b80' }}>
                Open to remote worldwide
              </p>
            </div>

            {/* Social links */}
            <div className="card-glass rounded-2xl p-6 flex flex-col gap-4">
              <span
                className="text-xs tracking-[0.15em] uppercase"
                style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
              >
                Find me on
              </span>
              {SOCIALS.map(({ icon: Icon, label, handle, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  style={{ textDecoration: 'none', cursor: 'none' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: 'rgba(249,115,22,0.08)',
                      border: '1px solid rgba(249,115,22,0.15)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(249,115,22,0.18)'
                      e.currentTarget.style.borderColor = 'rgba(249,115,22,0.5)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(249,115,22,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(249,115,22,0.15)'
                    }}
                  >
                    <Icon size={15} style={{ color: '#f97316' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs"
                      style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-medium truncate transition-colors"
                      style={{ color: '#f1f0ee', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {handle}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={13}
                    style={{ color: '#6b6b80', flexShrink: 0 }}
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: contact form ──────────────────────────────────────────── */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className="card-glass rounded-2xl p-8">
              {status === 'sent' ? (
                <SentState />
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Row: name + email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <FormField
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry / Collaboration"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />

                  {/* Message textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs tracking-[0.12em] uppercase"
                      style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project, timeline, and budget…"
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="input-dark rounded-xl px-4 py-3 text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-orange rounded-xl py-3.5 text-sm flex items-center justify-center gap-2 mt-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <span
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p
                    className="text-xs text-center"
                    style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
                  >
                    Typical response time: within 24 hours
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Reusable form field ──────────────────────────────────────────────────────
function FormField({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs tracking-[0.12em] uppercase"
        style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input-dark rounded-xl px-4 py-3 text-sm"
      />
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────────────────
function SentState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 gap-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated checkmark */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(249,115,22,0.1)',
          border: '1px solid rgba(249,115,22,0.3)',
          boxShadow: '0 0 40px rgba(249,115,22,0.2)',
        }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        >
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.svg>
      </div>

      <div>
        <h3
          className="font-display font-bold text-xl mb-2"
          style={{ color: '#f1f0ee', fontFamily: 'Syne, sans-serif' }}
        >
          Message sent!
        </h3>
        <p style={{ color: '#6b6b80', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }}>
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
      </div>
    </motion.div>
  )
}
