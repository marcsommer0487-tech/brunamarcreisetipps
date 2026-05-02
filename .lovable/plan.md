## Goal

Get your wedding website rendering in the Lovable preview right now so we can edit it live, section by section.

## Step 1 — Load the site as-is

- Copy `wedding-website.html` into `public/wedding.html` (preserves all your fonts, CSS, JS, language switcher, and countdown exactly as designed).
- Replace the placeholder `src/routes/index.tsx` so visiting `/` renders the wedding site full-screen via an iframe pointing to `/wedding.html`.
- Update the root `<head>` metadata (title, description, og tags) to "Hochzeit · Wedding · Casamento — 18.10.2026 · Belo Horizonte".

This gives us an instant working preview with zero visual changes — same trilingual nav, hero, countdown, palette (green/gold/ivory), and Cormorant + Great Vibes + Lato typography.

## Step 2 — Iterate live

Once it's on screen, you tell me what to change and I edit directly. Typical next moves (your call):

- **Polish**: tighten spacing, refine animations, improve mobile nav, add scroll reveals.
- **Content**: swap text, add real venue/photos, fix translations.
- **Refactor to React**: convert sections (Hero, Countdown, Story, RSVP, Travel, Gifts) into proper components with TanStack routes — only when we want features the static HTML can't easily do (e.g. RSVP form saving to Lovable Cloud, photo gallery from a database, guestbook).

We do refactors only when needed — no point rebuilding sections you're happy with.

## Technical notes

- Static HTML in `public/` is served as-is by Vite/TanStack Start, so all inline styles, Google Fonts, and vanilla JS keep working untouched.
- Iframe approach avoids React hydration conflicts with your inline `<script>` blocks and lets us keep your file as the source of truth until we choose to convert pieces.
- When we convert a section to React, we'll move its styles into `src/styles.css` (or component-scoped) and recreate the JS behavior with hooks.
