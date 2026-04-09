import React from 'react'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const SOCIAL = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:alex@example.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer
      className="border-t py-10"
      style={{ borderColor: 'rgba(249,115,22,0.1)', background: '#060608' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <span
          className="text-lg font-display font-bold tracking-widest"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          <span style={{ color: '#f97316' }}>A</span>
          <span style={{ color: '#f1f0ee' }}>R</span>
        </span>

        {/* Social */}
        <div className="flex items-center gap-5">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-colors"
              style={{ color: '#6b6b80', cursor: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b6b80'}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-xs"
          style={{ color: '#6b6b80', fontFamily: 'DM Mono, monospace' }}
        >
          © {new Date().getFullYear()} Alex Rivera — Built with React & Three.js
        </p>
      </div>
    </footer>
  )
}
