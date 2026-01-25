
# Project Memory: Hart Stone Ltd System

## 🎯 Project Goal
A professional, premium-tier booking and quoting ecosystem designed specifically for NZ/AU tradesmen. The primary objective is to capture high-quality leads and showcase precision masonry work while maintaining a "high-end" brand image.

## 🛡️ Core Function & Strategy
- **Filter "Tire Kickers":** Use a detailed quote calculator to set price expectations early.
- **Build Trust:** Display compliance with building standards (like NZS 3604) and detailed quality policies.
- **Professionalism:** Replace informal "text-for-a-quote" workflows with a structured system that makes the tradesman look like a top-tier firm.
- **Booking Layout Order:** The Booking page layout must always follow this order: Project Details > Estimation Summary > Calendly Form.
- **Field Requirements:** 'Project Details' must include a 'Special Instructions' field for site-specific details (access codes, pets, etc.).

## 🖼️ Asset Management & Troubleshooting
Images are centralized in `constants/images.ts`. If your pictures aren't showing, follow these steps:

1. **Folder Structure:** Ensure you have a folder named `public` at the very root of your project. Inside `public`, create a folder named `images`.
2. **Naming Convention:** 
   - DO NOT use spaces (e.g., use `hero-main.jpg` instead of `hero main.jpg`).
   - Use lowercase for extensions (e.g., `.jpg` instead of `.JPG`).
   - Be exact: `Project-1.jpg` is NOT the same as `project-1.jpg`.
3. **The Path:** In `constants/images.ts`, local paths MUST start with a slash and the folder name: `'/images/your-photo.jpg'`.
4. **Local Testing:**
   - Drop images into: `/public/images/`
   - Reference them as: `'/images/filename.jpg'` in the code.

## 🌏 Regional Rules (AU/NZ)
- **Linguistics:** Use AU/NZ English (e.g., "Labour" not "Labor", "Organise" not "Organize", "Colour" not "Color").
- **Units:** Metric system only (mm, m, m², m³).
- **Dates:** Format as DD/MM/YYYY.
- **Currency:** NZD/AUD (using `$` or `NZD`).
- **Standard Reference:** Focus on NZS 3604 (New Zealand Timber-Framed Buildings) for masonry tie-ins and structural compliance.

## 💻 Developer Note & Preferences
- **Experience Level:** Comfortable with HTML, CSS, and basic JavaScript. Currently learning React.
- **Coding Style:**
    - Keep it simple: Avoid deeply nested abstractions.
    - Favor readability: Use descriptive variable names.
- **UI/UX:** Maintain the "Brick Red" (#CB4154) and "Oswald" font branding.

## 🛠️ Tech Stack Reference
- **Frontend:** React (v19)
- **Styling:** Tailwind CSS
- **Routing:** React Router (HashRouter)
