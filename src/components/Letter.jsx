// src/components/Letter.jsx
// ─── Heartfelt Letter Section ─────────────────────────────────────────────────
// Animated typing effect that reveals the letter paragraph by paragraph
// when the section scrolls into view.

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONFIG } from '../data/config'

// ── Letter paragraphs ─────────────────────────────────────────────────────────
// Edit the letter in src/data/config.js (gitignored)
const LETTER_PARAGRAPHS = CONFIG.letterParagraphs

// ── Typing text hook ──────────────────────────────────────────────────────────
// Starts typing when `active` flips to true. Uses `done` state as the guard
// instead of a ref so Strict Mode double-invocation works correctly.
function useTypingEffect(text, speed = 18, active = false) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active || done) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [active, done, text, speed])

  // Pin to the full text once done — paragraph never resets
  return { displayed: done ? text : displayed, done }
}

// ── Single paragraph with typing effect ──────────────────────────────────────
function AnimatedParagraph({ text, index, isActive, onDone }) {
  const { displayed, done } = useTypingEffect(text, 18, isActive)

  // onDone is a stable useCallback ref from the parent — safe to omit from deps
  useEffect(() => {
    if (done) onDone()
  }, [done]) // eslint-disable-line react-hooks/exhaustive-deps

  const isGreeting  = index === 0
  const isSignOff   = text.startsWith('—')
  const isLast      = index >= LETTER_PARAGRAPHS.length - 3

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`font-sans leading-relaxed text-blush-100/90 ${
        isGreeting
          ? 'text-blush-300 font-semibold mb-4 text-lg'
          : isSignOff
          ? 'text-blush-400 font-serif italic text-right mt-6 text-base'
          : isLast
          ? 'text-blush-200 font-serif italic text-lg mt-4'
          : 'text-sm sm:text-base mb-3'
      }`}
    >
      {displayed}
      {isActive && !done && <span className="typing-cursor" aria-hidden="true" />}
    </motion.p>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Letter() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' })
  const [activeParagraph, setActiveParagraph] = useState(-1) // -1 = not started
  const [visibleParagraphs, setVisibleParagraphs] = useState([])

  // Start the first paragraph once the section scrolls into view
  // Small delay gives the scroll animation time to settle before typing begins
  useEffect(() => {
    if (isInView && activeParagraph === -1) {
      const t = setTimeout(() => {
        setActiveParagraph(0)
        setVisibleParagraphs([0])
      }, 600)
      return () => clearTimeout(t)
    }
  }, [isInView, activeParagraph])

  // When a paragraph finishes, reveal the next one
  const handleParagraphDone = useCallback((index) => {
    const next = index + 1
    if (next < LETTER_PARAGRAPHS.length) {
      setActiveParagraph(next)
      setVisibleParagraphs((prev) => [...prev, next])
    }
  }, [])

  // Auto-advance instantly through spacer entries (empty strings)
  useEffect(() => {
    if (activeParagraph >= 0 && LETTER_PARAGRAPHS[activeParagraph] === '') {
      handleParagraphDone(activeParagraph)
    }
  }, [activeParagraph, handleParagraphDone])

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
      aria-labelledby="letter-heading"
      style={{ background: '#14101f' }}
    >
      {/* Soft glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(244,114,182,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-blush-400 text-xs font-sans tracking-[0.3em] uppercase mb-3">
          Written with love
        </p>
        <h2 id="letter-heading" className="font-serif text-4xl md:text-5xl font-bold gradient-text">
          A Letter for You
        </h2>
        <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-blush-400 to-transparent" />
      </motion.div>

      {/* Letter card */}
      <div className="max-w-2xl mx-auto">
        <motion.article
          className="letter-paper rounded-3xl p-8 sm:p-12 relative"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          aria-label="Birthday letter"
        >
          {/* Decorative corner roses */}
          <span className="absolute top-5 left-6 text-blush-400/30 text-2xl select-none" aria-hidden="true">🌸</span>
          <span className="absolute top-5 right-6 text-blush-400/30 text-2xl select-none" aria-hidden="true">🌸</span>
          <span className="absolute bottom-5 left-6 text-blush-400/20 text-xl select-none" aria-hidden="true">✨</span>
          <span className="absolute bottom-5 right-6 text-blush-400/20 text-xl select-none" aria-hidden="true">✨</span>

          {/* Date */}
          <p className="text-blush-400/60 text-xs font-sans tracking-widest text-right mb-8">
            April 16th, 2026
          </p>

          {/* Paragraphs */}
          <div className="space-y-1">
            {LETTER_PARAGRAPHS.map((text, index) =>
              visibleParagraphs.includes(index) ? (
                text === '' ? (
                  <div key={index} className="h-4" />
                ) : (
                  <AnimatedParagraph
                    key={index}
                    text={text}
                    index={index}
                    isActive={activeParagraph === index}
                    isFirst={index === 0}
                    onDone={() => handleParagraphDone(index)}
                  />
                )
              ) : null
            )}
          </div>
        </motion.article>
      </div>
    </section>
  )
}
