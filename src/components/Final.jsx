// src/components/Final.jsx
// ─── Final Screen ─────────────────────────────────────────────────────────────
// Confetti celebration + closing message + optional replay button.

import { useState, useEffect, useCallback } from 'react'
import ReactConfetti from 'react-confetti'
import { motion } from 'framer-motion'
import { CONFIG } from '../data/config'

// ── Hook: get window size for confetti ───────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

// ── Confetti colours to match the palette ─────────────────────────────────────
const CONFETTI_COLORS = [
  '#f472b6', // blush-400
  '#e879f9', // fuchsia
  '#fb7185', // rose-400
  '#f9a8d4', // blush-200
  '#c084fc', // purple-400
  '#818cf8', // indigo-400
  '#ffffff',
]

// ── Main component ────────────────────────────────────────────────────────────
export default function Final({ onReplay }) {
  const { width, height } = useWindowSize()
  const [runConfetti, setRunConfetti] = useState(false)
  const [piecesCount, setPiecesCount] = useState(250)

  // Start confetti when component mounts / scrolls into view
  useEffect(() => {
    const timer = setTimeout(() => setRunConfetti(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Gradually reduce confetti to zero for a natural fade
  useEffect(() => {
    if (!runConfetti) return
    const timer = setTimeout(() => setPiecesCount(0), 5000)
    return () => clearTimeout(timer)
  }, [runConfetti])

  const handleReplay = useCallback(() => {
    // Restart confetti
    setPiecesCount(250)
    setRunConfetti(false)
    setTimeout(() => setRunConfetti(true), 100)
    // Scroll to top and trigger App-level replay if provided
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (onReplay) onReplay()
  }, [onReplay])

  // ── Stagger animation variants ─────────────────────────────────────────────
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
      aria-labelledby="final-heading"
      style={{
        background: 'linear-gradient(160deg, #0d0a1a 0%, #1e0b2c 40%, #2d1050 70%, #1a0a2e 100%)',
      }}
    >
      {/* Confetti 🎉 */}
      {runConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={piecesCount}
          colors={CONFETTI_COLORS}
          recycle={false}
          gravity={0.2}
          wind={0.01}
          tweenDuration={8000}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 40, pointerEvents: 'none' }}
        />
      )}

      {/* Background glow blobs */}
      <div
        className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,121,249,0.18) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,114,182,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Floating heart */}
        <motion.div
          variants={item}
          className="text-7xl mb-8 animate-float inline-block"
          aria-hidden="true"
        >
          ❤️
        </motion.div>

        {/* Main message */}
        <motion.h2
          variants={item}
          id="final-heading"
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
        >
          <span className="shimmer-text">Thank you for being</span>
          <br />
          <span className="text-white">in my life</span>
          <span className="ml-2">❤️</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="text-blush-200/80 font-sans text-lg sm:text-xl font-light mb-4"
        >
          {CONFIG.finalClosing}
        </motion.p>

        <motion.p
          variants={item}
          className="text-blush-300/60 font-serif italic text-base sm:text-lg mb-12"
        >
          "{CONFIG.finalQuote}"
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={item}
          className="mx-auto w-24 h-0.5 mb-12 bg-gradient-to-r from-transparent via-blush-400 to-transparent"
        />

        {/* Replay button */}
        <motion.button
          variants={item}
          onClick={handleReplay}
          className="px-8 py-4 rounded-full border border-blush-400/40 text-blush-300 font-sans text-base hover:border-blush-400 hover:text-white hover:bg-blush-400/10 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blush-400/30"
          aria-label="Replay the birthday experience from the beginning"
        >
          🔁 Replay from the beginning
        </motion.button>

        {/* Small note */}
        <motion.p
          variants={item}
          className="mt-8 text-blush-400/40 text-xs font-sans tracking-wider"
        >
          Made with love · All the feels · Just for you ✨
        </motion.p>
      </motion.div>
    </section>
  )
}
