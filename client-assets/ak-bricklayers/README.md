# AK Bricklayers — client asset pack

Reusable assets + config for the AK Bricklayers re-skin of trade-demo-1.
Source site: https://www.akbricklayers.co.nz/ (Wix)

Branch: `client/ak-bricklayers` · Demo tag: `ak-bricklayers-demo-v1`
Live (Netlify branch-deploy): site-preview-v1 → `client/ak-bricklayers` branch.

## Images (in ./images/)

| File | Use | Source |
|---|---|---|
| ak-logo.png | navbar + footer logo | Wix 345630_a9ccba22… |
| ak-lbp.png | marquee — Licensed Building Practitioner | Wix 345630_3ac5e1e3… |
| ak-masterbrick.jpg | marquee — Master Brick & Blocklayers | Wix 345630_04ed6f6e… |
| ak-bcito.jpg | marquee — BCITO | Wix 345630_0f0e05a4… |
| ak-amotai.png | marquee — Amotai | Wix 345630_e7f58eaa… |
| about-hero.png | About page hero (branded work vans) | client-supplied; was AVIF, decoded to PNG 1170×640 |

## Config used (constants.ts)

- name: AK Bricklayers · brandParts: ['AK','BRICK','LAYERS']
- city: Hamilton · regionLabel: the Waikato Region
- heroLine1: BRICK & BLOCK WAIKATO · heroLine2: BUILT TO LAST
- seoHeading: Licensed Brick & Block Layers Waikato
- phone: 021 127 5022 · email: akbricklayers@outlook.com
- address: Hamilton, Waikato
- areas: Hamilton, Cambridge, Te Awamutu, Morrinsville, Ngaruawahia, Huntly, Raglan, Matamata

## Still template (swap when real content lands)

- Gallery / project photos (AK site had no usable large photos)
- Quote calculator rates (AK listed no prices — template defaults)
- Google Maps embed (generic Hamilton pin)
- LEAD_ENDPOINT empty → lead form falls back to phone/email
