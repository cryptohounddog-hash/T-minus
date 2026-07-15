# T-Minus Dashboard — Changelog

This file is the source of truth for the version-control header that gets
stamped into the top of `dist/index.html` on every build. Add a new section
at the top for each shipped change; `scripts/inject-version-header.mjs`
reads the topmost section and embeds it in the build output.

## v1.4 — 2026-07-15
Status: READY FOR BROWSER / WORDPRESS TESTING
Changes in this version:
  1. Clock widget's hour/minute hands and the top 12-o'clock dot now
     also follow the widget's own accent color, instead of staying on
     the two fixed global theme colors.

## v1.3 — 2026-07-15
Status: READY FOR BROWSER / WORDPRESS TESTING
Changes in this version:
  1. Removed a leftover rocket emoji that was overlaid on top of the
     Mission Mode sidebar photo. This was a stray remnant from an
     earlier transcription of the bundle, before it had been removed
     in the user's own v2.3 fix — restored to match that removal.

## v1.2 — 2026-07-15
Status: READY FOR BROWSER / WORDPRESS TESTING
Changes in this version:
  1. Clock widget's digital time text color and glow now also follow
     the widget's own accent color (the ring fix in v1.1 only covered
     the circular face, not the digital readout below it).

## v1.1 — 2026-07-15
Status: READY FOR BROWSER / WORDPRESS TESTING
Changes in this version:
  1. Clock widget's ring glow, border, and center dot now follow the
     widget's own accent color instead of being locked to the global
     theme accent.

## v1.0 — 2026-07-15
Status: READY FOR BROWSER / WORDPRESS TESTING
Changes in this version:
  1. Full rebuild of the dashboard on Vite/React/Zustand, replacing the
     hand-rolled minified bundle.
  2. Added the ability to edit every widget: dates (including birthdate
     and other countdowns), titles, colors, and all fields via a unified
     Add/Edit modal.
  3. Added editable checklist items (add/rename/remove/reorder) for
     Today's Missions and other checklist widgets.
  4. Added custom theme creation, applying, renaming, and deleting,
     separate from full template switching.
  5. Restored the original decorative visual layer (nebula, horizon,
     planet, embedded background images) and fixed the WordPress
     admin-bar overlap.
  6. Fixed the corrupted birthday widget background image.
