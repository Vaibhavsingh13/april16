// src/components/Landing.jsx
// ─── Landing / Hero Screen ──────────────────────────────────────────────────
// Full-screen hero with animated heading, subtext, and a glowing CTA button.
// Music only starts after the first user interaction (browser autoplay policy).

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../data/config'

// ── Floating particle component ─────────────────────────────────────────────
function Particle({ x, y, size, duration, delay }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(244,114,182,0.6), transparent)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0],
        y: [0, -60, -120],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
        ease: 'easeInOut',
      }}
    />
  )
}

// ── Sparkle that floats across the hero ─────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 8 + 4,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 5,
}))

// ── Main component ───────────────────────────────────────────────────────────
export default function Landing({ onBegin }) {
  const audioRef = useRef(null)
  const [musicStarted, setMusicStarted] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Attempt to play background music after first click
  const handleBegin = () => {
    if (!clicked) {
      setClicked(true)

      // Try to play audio (only works after user gesture)
      if (audioRef.current && !musicStarted) {
        audioRef.current.volume = 0.3
        audioRef.current
          .play()
          .then(() => setMusicStarted(true))
          .catch(() => {
            // Autoplay blocked — silently ignore
          })
      }

      // Delay before calling parent callback to allow exit animation
      setTimeout(() => onBegin(), 900)
    }
  }

  // ── Animation variants ──────────────────────────────────────────────────
  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.35, delayChildren: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.section
          className="relative min-h-screen flex flex-col items-center justify-center hero-gradient overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label="Birthday landing screen"
        >
          {/* Ambient background glow blobs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(232,121,249,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Floating particles */}
          {PARTICLES.map((p) => (
            <Particle key={p.id} {...p} />
          ))}

          {/* ── Content ── */}
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            {/* Small date label */}
            <motion.p
              variants={itemVariants}
              className="text-blush-300 text-sm font-sans tracking-[0.3em] uppercase mb-6 opacity-80"
            >
              {CONFIG.birthdayDate}
            </motion.p>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              <span className="shimmer-text">Happy {CONFIG.recipientAge}th Birthday,</span>
              <br />
              <span className="text-white">{CONFIG.recipientName} 🎂</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-blush-200 font-sans text-lg sm:text-xl md:text-2xl font-light mb-12 opacity-90"
            >
              {CONFIG.friendshipYears} years of friendship.&nbsp; A lifetime to go.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              onClick={handleBegin}
              className="glow-btn animate-float"
              aria-label="Click to begin the birthday experience"
            >
              ✨ Click to Begin
            </motion.button>

            {/* Music note hint */}
            {/* <motion.p
              variants={itemVariants}
              className="mt-6 text-blush-400/60 text-xs font-sans tracking-wide"
            >
              🎵 Sound on for the full experience
            </motion.p> */}
          </div>

          {/* Scroll indicator at bottom */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
          >
            <span className="text-blush-300 text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              className="w-0.5 h-8 bg-blush-300 rounded-full"
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Hidden audio element — replace src with your music file */}
          {/* Place your .mp3 in /public/music/birthday.mp3 */}
          <audio ref={audioRef} loop preload="none">
            <source src="/music/birthday.mp3" type="audio/mpeg" />
          </audio>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
