// src/components/Gallery.jsx
// ─── Memory Gallery ───────────────────────────────────────────────────────────
// Responsive Masonry-style grid with caption overlay on hover/focus.
// Click any photo to open a lightbox modal.

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryPhotos } from '../data/memories'

// ── Lightbox modal ────────────────────────────────────────────────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(13,10,26,0.92)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.caption}`}
    >
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full max-h-[75vh] object-contain rounded-2xl"
        />

        {/* Caption */}
        <p className="mt-4 text-center font-serif text-lg text-blush-200 italic">
          {photo.caption}
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-dark-700/80 text-white hover:bg-blush-500 transition-colors"
          aria-label="Close lightbox"
        >
          ✕
        </button>

        {/* Prev / Next */}
        <button
          onClick={onPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-dark-700/80 text-white hover:bg-blush-500 transition-colors"
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-dark-700/80 text-white hover:bg-blush-500 transition-colors"
          aria-label="Next photo"
        >
          ›
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Gallery thumbnail ─────────────────────────────────────────────────────────
function GalleryItem({ photo, index, onClick }) {
  return (
    <motion.div
      className="gallery-item relative overflow-hidden rounded-2xl cursor-pointer aspect-square focus:outline-none focus:ring-4 focus:ring-blush-400/50"
      tabIndex={0}
      role="button"
      aria-label={`Open photo: ${photo.alt}`}
      onClick={() => onClick(index)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(index)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Photo */}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />

      {/* Caption overlay */}
      <div className="gallery-caption p-4">
        <p className="text-white font-sans text-sm font-medium">{photo.caption}</p>
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isOpen = lightboxIndex !== null

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i - 1 + galleryPhotos.length) % galleryPhotos.length),
    []
  )
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i + 1) % galleryPhotos.length),
    []
  )

  return (
    <section
      id="gallery"
      className="py-24 px-4 relative overflow-hidden"
      aria-labelledby="gallery-heading"
      style={{ background: '#0d0a1a' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(244,114,182,0.06) 0%, transparent 70%)',
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
          Captured moments
        </p>
        <h2 id="gallery-heading" className="font-serif text-4xl md:text-5xl font-bold gradient-text">
          Memory Gallery
        </h2>
        <div className="mt-4 mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-blush-400 to-transparent" />
        <p className="mt-4 text-blush-100/60 font-sans text-sm">
          Click any photo to open it ✨
        </p>
      </motion.div>

      {/* Responsive grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {galleryPhotos.map((photo, index) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            index={index}
            onClick={openLightbox}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <Lightbox
            photo={galleryPhotos[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
