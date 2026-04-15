// src/components/Timeline.jsx
// ─── Journey Timeline ────────────────────────────────────────────────────────
// Vertical alternating timeline. Each event reveals on scroll using Framer Motion
// whileInView — works without an IntersectionObserver polyfill in modern browsers.

import { motion } from 'framer-motion'
import { timelineEvents } from '../data/memories'

// ── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ── Single event card ────────────────────────────────────────────────────────
function TimelineCard({ event, index }) {
  const isLeft = index % 2 === 0
  const cardVariant = isLeft ? fadeLeft : fadeRight

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 mb-16">
      {/* ── Left side (empty on right-side events for md+) ── */}
      <div className={`hidden md:flex items-center ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12 order-2'}`}>
        {isLeft && (
          <motion.div
            className="glow-card p-6 max-w-sm w-full"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <CardContent event={event} />
          </motion.div>
        )}
        {!isLeft && (
          <motion.div
            className="glow-card p-6 max-w-sm w-full"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <CardContent event={event} />
          </motion.div>
        )}
      </div>

      {/* ── Center dot (desktop) ── */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
        <motion.div
          className="w-5 h-5 rounded-full border-2 border-blush-400 bg-dark-900"
          style={{ boxShadow: '0 0 12px rgba(244,114,182,0.8)' }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'backOut' }}
        />
      </div>

      {/* ── Mobile card (always full-width) ── */}
      <motion.div
        className="md:hidden glow-card p-5 mx-4"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <CardContent event={event} />
      </motion.div>
    </div>
  )
}

// ── Card inner content ───────────────────────────────────────────────────────
function CardContent({ event }) {
  return (
    <>
      {/* Year badge */}
      <span className="inline-block text-xs font-sans font-semibold tracking-[0.2em] uppercase text-blush-400 bg-blush-400/10 px-3 py-1 rounded-full mb-3">
        {event.year}
      </span>

      {/* Title */}
      <h3 className="font-serif text-xl font-bold text-white mb-2">{event.title}</h3>

      {/* Description */}
      <p className="font-sans text-sm text-blush-100/70 leading-relaxed">{event.description}</p>

      {/* Optional image */}
      {event.image && (
        <img
          src={event.image}
          alt={`Memory from ${event.year}: ${event.title}`}
          className="mt-4 w-full h-40 object-cover rounded-xl opacity-80"
          loading="lazy"
        />
      )}
    </>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-24 px-4 overflow-hidden"
      aria-labelledby="timeline-heading"
      style={{
        background: 'linear-gradient(180deg, #0d0a1a 0%, #1a0a2e 50%, #0d0a1a 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,121,249,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Section header */}
      <motion.div
        className="text-center mb-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <p className="text-blush-400 text-xs font-sans tracking-[0.3em] uppercase mb-3">
          Our Story
        </p>
        <h2 id="timeline-heading" className="font-serif text-4xl md:text-5xl font-bold gradient-text">
          The Journey
        </h2>
        <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-blush-400 to-transparent" />
      </motion.div>

      {/* Vertical line (desktop) */}
      <div className="hidden md:block absolute left-1/2 top-48 bottom-24 w-px"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(244,114,182,0.3) 20%, rgba(244,114,182,0.3) 80%, transparent)',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Timeline events */}
      <div className="relative max-w-5xl mx-auto">
        {timelineEvents.map((event, index) => (
          <TimelineCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </section>
  )
}
