
import { QuoteRates } from './types';

/**
 * PER-CLIENT CONFIG
 *
 * This file is the single place to edit when re-skinning the template
 * for a new client. Everything below feeds the rest of the site.
 */

// Business identity — shown in nav, footer, schema and page titles.
// THE per-client swap file: change everything here + constants/images.ts, done.
export const SITE = {
  name: 'AK Bricklayers',
  // Wordmark in navbar/footer: middle part renders in the brand accent colour.
  brandParts: ['AK', 'BRICK', 'LAYERS'] as [string, string, string],
  tagline: 'Brick & Block',
  city: 'Hamilton',
  // Booking page: "Serving ..." heading
  regionLabel: 'the Waikato Region',
  // Home hero: line 1 plain, line 2 in the red box
  heroLine1: 'BRICK & BLOCK WAIKATO',
  heroLine2: 'BUILT TO LAST',
  // About hero H1 — keep trade + location keywords for SEO
  seoHeading: 'Licensed Brick & Block Layers Waikato',
  // Google Maps embed for the service-area section (Share → Embed a map → src URL)
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d101707.9!2d175.19!3d-37.787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snz!4v1766292956812!5m2!1sen!2snz',
  // Canonical domain for the live site — no trailing slash, non-www.
  domain: 'https://site-preview-v1.netlify.app',
  description: 'Licensed brick and block layers serving the Waikato region. All aspects of brick & block — new builds, block foundations, feature walls, retaining walls, fencing and repairs.',
};

/**
 * Google Apps Script Web App URL for lead capture.
 * Deploy apps-script/lead-handler.gs (see apps-script/SETUP.md), then paste
 * the /exec URL here. Leave empty to disable the lead form (falls back to
 * phone/email contact details).
 */
export const LEAD_ENDPOINT = '';

export const BRICK_RATES: QuoteRates = {
  labour: {
    brick: 90,
    block: 100,
    veneer: 95,
    retaining: 120
  },
  materials: {
    brick: 80,
    block: 90,
    veneer: 85,
    retaining: 110
  },
  taxRate: 0.15
};

export const CONTACT_INFO = {
  email: 'akbricklayers@outlook.com',
  phone: '021 127 5022',
  address: 'Hamilton, Waikato',
  areas: ['Hamilton', 'Cambridge', 'Te Awamutu', 'Morrinsville', 'Ngaruawahia', 'Huntly', 'Raglan', 'Matamata']
};

// tel: href version of the phone number (digits and + only).
export const PHONE_HREF = `tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, '')}`;

// PER-CLIENT: homepage FAQ content (rendered by components/FaqAccordion.tsx).
export const FAQS: { question: string; answer: string }[] = [
  {
    question: 'How quickly can I get a quote?',
    answer: 'Use the online quote calculator for an instant ballpark estimate. For a firm price, we visit the site to confirm access, ground conditions, and architectural details before confirming a final quote.',
  },
  {
    question: 'Do you work on both residential and commercial projects?',
    answer: 'Yes. From full-house brick veneer to structural block walls and commercial builds, all work is carried out to NZS 3604 standards.',
  },
  {
    question: 'Are you a Licensed Building Practitioner?',
    answer: 'Yes, LBP verified. All detailing is signed off as code-compliant, covering cavity size, flashings, veneer ties, and control joints.',
  },
  {
    question: 'What areas do you service?',
    answer: 'We cover the Waikato region, including Hamilton, Cambridge and Te Awamutu, for both new builds and repair work.',
  },
  {
    question: 'What happens after I submit a booking request?',
    answer: "We'll be in touch to confirm your site visit, then follow up with a detailed quote based on your project's specific requirements.",
  },
];
