// src/data/config.example.js
// ─── Configuration template ───────────────────────────────────────────────────
// Copy this file to config.js and fill in your real content.
// config.js is gitignored — this example file is safe to commit.

export const CONFIG = {
  // ── Landing screen ───────────────────────────────────────────────────────────
  birthdayDate: "April 16th, 2026",        // Displayed date on the hero
  recipientName: "Your Best Friend",        // Name shown in the heading
  recipientAge: 27,                         // Used in subtext/messages
  friendshipYears: "12+",                   // Shown in the hero subtext

  // ── Letter paragraphs (shown one by one with a typing effect) ───────────────
  letterParagraphs: [
    "To my favourite person in the world,",
    "Write your letter here...",
    "Add as many paragraphs as you like.",
    "— Always yours ✨",
  ],

  // ── Final screen ─────────────────────────────────────────────────────────────
  finalQuote: "Your closing quote here.",
  finalClosing: "Happy Birthday, [name].",

  // ── Timeline events ──────────────────────────────────────────────────────────
  // image: set to "/images/filename.jpg" for photos placed in /public/images/
  timelineEvents: [
    {
      id: 1,
      year: "YYYY",
      title: "Event Title",
      description: "A short description of this memory.",
      image: null,
    },
    // Add more events...
  ],

  // ── Reasons (one per year of life) ───────────────────────────────────────────
  reasons: [
    { id: 1, emoji: "💫", reason: "Your first reason here." },
    { id: 2, emoji: "🌻", reason: "Your second reason here." },
    // Add one per year of life...
  ],
}
