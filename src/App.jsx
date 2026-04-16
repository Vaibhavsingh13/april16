// src/App.jsx
// ─── App Root ─────────────────────────────────────────────────────────────────
// Single-page scroll layout. Landing screen is shown first; clicking
// "Begin" reveals the rest of the page with a smooth transition.

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Landing from './components/Landing'
import Timeline from './components/Timeline'
import Gallery  from './components/Gallery'
import Reasons  from './components/Reasons'
import Letter   from './components/Letter'
import Final    from './components/Final'

// ── Floating Nav (shows after hero is dismissed) ──────────────────────────────
function FloatingNav() {
  const links = [
    // { href: '#timeline', label: 'Journey' },
    // { href: '#gallery',  label: 'Gallery' },
    { href: '#reasons',  label: 'Reasons' },
    { href: '#letter',   label: 'Letter' },
    { href: '#final',    label: 'Final' },
  ]

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-30 hidden sm:flex"
      aria-label="Section navigation"
    >
      <ul
        className="flex items-center gap-1 px-4 py-2 rounded-full"
        style={{
          background: 'rgba(20, 16, 31, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(244, 114, 182, 0.15)',
          boxShadow: '0 4px 30px rgba(13,10,26,0.5)',
        }}
      >
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="px-3 py-1.5 rounded-full text-xs font-sans text-blush-300/70 hover:text-blush-300 hover:bg-blush-400/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blush-400/40"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [started, setStarted] = useState(false)

  const handleBegin = useCallback(() => {
    setStarted(true)
    // Small delay then scroll past the hero area
    setTimeout(() => {
      document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }, [])

  const handleReplay = useCallback(() => {
    setStarted(false)
  }, [])

  return (
    <div className="min-h-screen bg-dark-900">
      {/* ── Landing hero overlay ── */}
      <AnimatePresence>
        {!started && (
          <div className="fixed inset-0 z-50">
            <Landing onBegin={handleBegin} />
          </div>
        )}
      </AnimatePresence>

      {/* ── Main content (hidden behind landing until started) ── */}
      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeIn' }}
          >
            {/* Floating nav */}
            <FloatingNav />

            {/* Sections */}
            <main id="main-content">
              <section id="timeline-anchor" />
              {/* <Timeline /> */}
              {/* <Gallery /> */}
              <Reasons />
              <Letter />
              <Final onReplay={handleReplay} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
