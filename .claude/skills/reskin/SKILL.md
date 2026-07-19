---
name: reskin
description: Use when re-skinning the trade-demo-1 template for a new client or warm-lead preview - when the user provides a business name, trade, suburbs, phone, or photos and wants a customised site preview, or says "reskin", "new client preview", "swap out the template".
---

# Reskin: New Client Preview

## Overview

trade-demo-1 is a re-skinnable trade-site template (React 19 + Vite + Tailwind, BrowserRouter). Baseline commit `ae025f4` on `template-base`. A re-skin touches ONLY the four places below - no component edits.

Workflow: user supplies client details gathered from marketing → agent fills config → user reviews preview and does taste tweaks.

## Step 0: Branch

Never re-skin on `template-base`. Branch per client:

```
git checkout template-base && git checkout -b client/<business-slug>
```

## Step 1: Collect Details

Ask only for what's missing. Minimum viable set:

| Field | Used for | Fallback if missing |
|---|---|---|
| Business name | SITE.name, wordmark, schema | required |
| Trade + service list | hero lines, rates, service dropdown | keep brick/block set |
| City + suburbs served | regionLabel, CONTACT_INFO.areas, SEO heading | required |
| Phone | click-to-call everywhere | placeholder 021-XXX-XXXX |
| Email | contact + lead alerts | placeholder |
| Photos / logo | images/ + images.ts | keep template stock |
| Google Maps embed URL | service-area map | keep template map, flag it |
| m² / job rates | quote calculator | keep template rates, flag it |

## Step 2: Edit the Four Places

1. **`constants.ts`** - everything in `SITE` (name, `brandParts` 3-part wordmark - middle part renders brand-red, `heroLine1/2`, `seoHeading`, `regionLabel`, `mapEmbedUrl`, `city`, `domain`, `description`), plus `CONTACT_INFO`, `BRICK_RATES`, `FAQS`.
2. **`constants/images.ts`** - point paths at new files dropped in `images/` (case-sensitive, leading slash). BrandMarquee logos live in `components/BrandMarquee.tsx` `BRANDS` array + `images/`.
3. **`index.html`** - static head: `<title>`, meta description, OG tags, LocalBusiness JSON-LD. Find-replace old business name/city.
4. **`apps-script/lead-handler.gs`** - `NOTIFY_EMAIL` (only when actually deploying lead capture; see `apps-script/SETUP.md`). `LEAD_ENDPOINT` in constants.ts stays empty until the client's Apps Script is deployed.

## Step 3: Verify

```
npx tsc --noEmit && npm run build
npm run dev
```

Check in browser: hero lines, wordmark split, phone tap targets, quote calc rates, map location, mobile layout (LBP strip full-bleed, marquee loops).

## Step 4: Commit

Commit on the client branch with message `Reskin: <Business Name> preview`. Do not push without being asked. Do not merge to template-base - template improvements get cherry-picked back instead.

## Known Leftovers (flag to user each time)

- About hero, veneer/paving service pics, project #4 still hotlink external URLs - swap when client photos exist.
- Placeholder phone `021-XXX-XXXX` ships unless replaced.
- Apps Script deploy prompts for a Drive permission (file uploads) - re-authorise or uploads fail.

## Common Mistakes

- Editing wordmark in Navbar/Footer directly - it reads `SITE.brandParts`; edit constants.
- Adding a sheet column for a new lead field - handler writes FIXED column order; edit `COLUMNS` + `rowFor()` in lead-handler.gs and redeploy a new version.
- Forgetting `index.html` - React pages update but tab title/schema still say old client.
