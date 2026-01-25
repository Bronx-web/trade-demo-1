
# Project Memory: Hart Stone Ltd System

## 🎯 Project Goal
A professional, premium-tier booking and quoting ecosystem designed specifically for NZ/AU tradesmen. The primary objective is to capture high-quality leads and showcase precision masonry work while maintaining a "high-end" brand image.

## 🛡️ Core Function & Strategy
- **Filter "Tire Kickers":** Use a detailed quote calculator to set price expectations early.
- **Build Trust:** Display compliance with building standards (like NZS 3604).
- **Professionalism:** High-end aesthetic with the "Brick Red" (#CB4154) branding.

## 🖼️ Asset Management & Troubleshooting (READ THIS FIRST)
Images are managed via `constants/images.ts`. If they are not appearing:

1. **THE WRONG FOLDER:** Many developers accidentally put images in `src/images/`. This will NOT work with the current setup.
   - ✅ **CORRECT:** `/public/images/` (at the root level of your project).
   - ❌ **INCORRECT:** `/src/images/`
2. **THE SPACE TRAP:** Ensure there are no spaces in your filenames or at the end of the strings in `constants/images.ts`.
   - ✅ **CORRECT:** `'hero.jpg'`
   - ❌ **INCORRECT:** `'hero.jpg '` (Space at end) or `'hero main.jpg'` (Space in middle).
3. **CASE SENSITIVITY:** `Project-1.jpg` is NOT the same as `project-1.jpg`. Linux servers (where most sites are hosted) are case-sensitive.

## 🌏 Regional Rules (AU/NZ)
- **Linguistics:** Use AU/NZ English (e.g., "Labour" not "Labor").
- **Units:** Metric system only (mm, m, m², m³).
- **Currency:** NZD/AUD.

## 💻 Tech Stack Reference
- **Frontend:** React (v19)
- **Styling:** Tailwind CSS
- **Routing:** React Router (HashRouter)
