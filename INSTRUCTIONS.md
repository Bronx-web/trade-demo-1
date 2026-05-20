
# Project Memory: Hart Stone Ltd System

## 🎯 Project Goal
Professional, high-end masonry booking system for NZ/AU.

## 🛡️ Core Branding
- **Color:** Brick Red (#CB4154)
- **Typography:** Oswald (Heads) / Inter (Body)
- **Tone:** Professional, time-served, premium.

## 🖼️ Image Handling (CRITICAL - Please Read)
If images are missing in the preview:

1.  **LOCAL VS. EXTERNAL:**
    *   If your `path` in `constants/images.ts` starts with `http://` or `https://`, it will load from the internet.
    *   If your `path` starts with `images/`, it expects a file in your project.
2.  **FOR LOCAL IMAGES (`images/your-file.jpg`):**
    *   **FOLDER:** Your `images` folder MUST be located at the same level as `index.html`.
    *   **PATH FORMAT:** Use `images/your-file.jpg` (NO leading slash).
    *   **CASE SENSITIVITY:** Filenames are case-sensitive. `my-work-2.JPG` is NOT `my-work-2.jpg`.
    *   **DASHES VS SPACES:** Use dashes (`-`) not spaces in filenames.
    *   **`getAssetUrl`:** Always wrap image paths in `getAssetUrl(path)` as it handles the correct path resolution.
3.  **FALLBACKS:** If a local image fails, the `onError` handler in the components will automatically swap it for a high-quality online alternative.

## 📝 Quote Calculator Logic
*   **"Calculate" Button:** Appears between "Project Details" and "Quote Summary". It's enabled when "Area Size (m²)" is greater than 0.
*   **Calculation Animation:** Tapping "Calculate" shows a 2-second spinning animation.
*   **Quote Summary Display:** The "Quote Summary" box is initially hidden and only appears after the "Calculate" animation is complete. Changing any input in "Project Details" after calculation will hide the summary, requiring a recalculation.
*   **"Send Job Request" Button:** The sticky button at the bottom appears only after a quote has been calculated and the user scrolls past the visible "Quote Summary" section.

## 🌏 Regional Settings
- **Region:** NZ / AU
- **Currency:** NZD ($)
- **Spelling:** Labour, Colour, Organise.
