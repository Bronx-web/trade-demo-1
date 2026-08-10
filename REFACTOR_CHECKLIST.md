# Refactor Checklist

Tick these off as work happens in the Claude Code session. Keep entries short.

## Setup
- [x] Files loaded into hart-template folder
- [x] Stack confirmed (React + Vite + TS, Tailwind)
- [x] Git repo initialized locally, connected to GitHub
- [x] .gitignore in place before first commit

## Structure
- [x] Folder layout defined (see PROJECT_STRUCTURE.md)
- [x] Components/sections split into separate files (components/, pages/)
- [ ] Naming convention applied consistently across files (not audited yet)

## Code cleanup
- [ ] Duplicate logic identified and merged (not audited yet)
- [x] Dead code / unused assets removed (unused GEMINI_API_KEY + env injection stripped, stale zip removed)
- [ ] Inline styles or scattered CSS consolidated (not audited yet)

## Supabase prep
- [x] Quote calculator form fields mapped to future table schema (SUPABASE_PREP.md)
- [x] Contact/booking form fields mapped to future table schema (SUPABASE_PREP.md)
- [x] Comments added at data entry points noting "Supabase connects here" — old QuoteCalculator.tsx/Contact.tsx were superseded upstream by pages/Booking.tsx during a rebase sync; comments now live there: `handleCalculateClick` (quotes insert point: serviceType, area, complexity, includeMaterials, specialInstructions, estimate) and the "Send Job Request" button (optional lead-tracking event — actual booking confirmation happens in Calendly's iframe, external to this codebase)
- [x] Notes captured in SUPABASE_PREP.md

## Fixes found during review
- [x] Nav says "About", footer said "My Story" (label had changed again upstream since the last check) — aligned to "About"

## Tooling fixes found during review
- [x] tsconfig.json: esModuleInterop true, moduleResolution "bundler" (pre-7.0 syntax was going to break); merged with upstream's fuller config (ES2022 target, types:node, path alias) during rebase
- [x] @types/node installed (fixes path/__dirname/mode errors in vite.config.ts)
- [x] @vitejs/plugin-react merged to v5 during rebase to match upstream's vite^6.2.0 (confirmed peer-compatible; earlier v4 pin no longer needed)
- [x] Rebased local tooling fixes onto origin/main after divergence (upstream had moved on: NextStepBar, image asset migration, pages/Booking.tsx replacing QuoteCalculator.tsx/Contact.tsx). Also worked around a colon-in-filename (`migrated_prompt_history/...json`) that's invalid on Windows/NTFS — excluded via history rewrite of the local rebase copy only, not pushed upstream

## Final check
- [x] Site still builds and runs after refactor (npm run build passes, tsc --noEmit clean)
- [ ] Visual output unchanged (no design regressions) — not visually verified yet
- [ ] All commits are atomic and clearly labeled (pending commit of current changes)
