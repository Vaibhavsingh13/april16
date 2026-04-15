// src/components/Reasons.jsx
// ─── 27 Reasons You Are Important ────────────────────────────────────────────
// Shows one reason at a time with animated card transitions.
// "Next Reason" button steps through all 27.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { reasons } from '../data/reasons'

// ── Card animation variants ──────────────────────────────────────────────────
const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.85,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.85,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Reasons() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [finished, setFinished] = useState(false)

  const goNext = () => {
    if (current < reasons.length - 1) {
      setDirection(1)
      setCurrent((c) => c + 1)
    } else {
      setFinished(true)
    }
  }

  const goPrev = () => {
    if (current > 0) {
      setDirection(-1)
      setCurrent((c) => c - 1)
      setFinished(false)
    }
  }

  const restart = () => {
    setDirection(-1)
    setCurrent(0)
    setFinished(false)
  }

  const reason = reasons[current]

  return (
    <section
      id="reasons"
      className="py-24 px-4 relative overflow-hidden"
      aria-labelledby="reasons-heading"
      style={{
        background: 'linear-gradient(160deg, #0d0a1a 0%, #1e0b2c 50%, #0d0a1a 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,121,249,0.07) 0%, transparent 70%)',
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
          One for every year
        </p>
        <h2 id="reasons-heading" className="font-serif text-4xl md:text-5xl font-bold gradient-text">
          27 Reasons You Are Important
        </h2>
        <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-blush-400 to-transparent" />
      </motion.div>

      {/* Card area */}
      <div className="relative max-w-xl mx-auto min-h-[340px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          {!finished ? (
            <motion.div
              key={current}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glow-card p-8 sm:p-12 text-center w-full"
              aria-live="polite"
            >
              {/* Reason number badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blush-400/15 text-blush-400 font-bold font-sans text-sm mb-6 ring-1 ring-blush-400/30">
                {current + 1}
              </div>

              {/* Emoji */}
              <div className="text-6xl mb-6 animate-float">{reason.emoji}</div>

              {/* Reason text */}
              <p className="font-serif text-xl sm:text-2xl text-white font-medium leading-relaxed">
                {reason.reason}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glow-card p-10 text-center w-full"
              aria-live="polite"
            >
              <div className="text-5xl mb-6">♾️</div>
              <h3 className="font-serif text-2xl font-bold gradient-text mb-3">
                And so many more…
              </h3>
              <p className="font-sans text-blush-100/70 text-sm leading-relaxed">
                These 27 are just the beginning of an ever-growing list.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div
        className="flex justify-center gap-1.5 mt-8 flex-wrap max-w-xs mx-auto"
        aria-label={`Reason ${current + 1} of ${reasons.length}`}
      >
        {reasons.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              setCurrent(i)
              setFinished(false)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-blush-400 scale-125'
                : i < current
                ? 'bg-blush-400/50'
                : 'bg-dark-600'
            }`}
            aria-label={`Go to reason ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-center gap-4 mt-10">
        {current > 0 && (
          <motion.button
            onClick={goPrev}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 py-2.5 rounded-full border border-blush-400/30 text-blush-300 font-sans text-sm hover:border-blush-400 hover:text-blush-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blush-400/50"
            aria-label="Previous reason"
          >
            ← Prev
          </motion.button>
        )}

        {!finished ? (
          <motion.button
            onClick={goNext}
            className="glow-btn !py-3 !px-8 !text-base"
            whileTap={{ scale: 0.95 }}
            aria-label={current < reasons.length - 1 ? 'Next reason' : 'Finish'}
          >
            {current < reasons.length - 1 ? 'Next Reason →' : 'And More… 💕'}
          </motion.button>
        ) : (
          <motion.button
            onClick={restart}
            className="glow-btn !py-3 !px-8 !text-base"
            whileTap={{ scale: 0.95 }}
            aria-label="Read again from the beginning"
          >
            Read Again 🔁
          </motion.button>
        )}
      </div>
    </section>
  )
}
