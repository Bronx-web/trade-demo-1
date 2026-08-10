
/**
 * PER-CLIENT CONFIG
 *
 * This file is the single place to edit when re-skinning the template
 * for a new client. Everything below feeds the rest of the site.
 */

// Business identity — shown in nav, footer, schema and page titles.
// THE per-client swap file: change everything here + constants/images.ts, done.
export const SITE = {
  name: 'Electrical Potential',
  // Wordmark in navbar/footer: middle part renders in the brand accent colour.
  brandParts: ['ELECTRICAL', 'POTENTIAL', 'LTD'] as [string, string, string],
  tagline: 'Local spark, Professional finish',
  city: 'Hamilton',
  // Booking page: "Serving ..." heading
  regionLabel: 'Hamilton & the Waikato',
  // Home hero: line 1 plain, line 2 in the accent box
  heroLine1: 'ELECTRICIANS HAMILTON & WAIKATO',
  heroLine2: 'LOCAL SPARK, PROFESSIONAL FINISH',
  // About hero H1 — keep trade + location keywords for SEO
  seoHeading: 'Registered Electricians Hamilton & Waikato',
  // Google Maps embed for the service-area section (Share → Embed a map → src URL)
  // TODO: Hamilton-centred embed. Replace with a Chartwell/Hamilton pin from
  // Google Maps → Share → Embed a map before sending to the client.
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d51458.90405988676!2d175.2280!3d-37.7870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snz!4v1766292956812!5m2!1sen!2snz',
  // Canonical domain for the live site — no trailing slash, non-www.
  domain: 'https://electrical-potential--site-preview-v1.netlify.app',
  description: 'Registered electricians serving Hamilton and the Waikato. Residential, commercial and networking. Master Electricians, 5.0 stars from 23 Google reviews.',
};

/**
 * Google Apps Script Web App URL for lead capture.
 * Deploy apps-script/lead-handler.gs (see apps-script/SETUP.md), then paste
 * the /exec URL here. Leave empty to disable the lead form (falls back to
 * phone/email contact details).
 */
export const LEAD_ENDPOINT = '';

/**
 * NOTE: no rate table here on purpose.
 *
 * The masonry template quoted from area × rate. Electrical work cannot be priced
 * that way without seeing the job, so the booking page runs a triage form
 * (components/TriageForm.tsx) that qualifies the job instead of pricing it. If a
 * future client genuinely does quote by the square metre, restore a QuoteRates
 * table here and wire it back into the booking page.
 */

export const CONTACT_INFO = {
  // TODO: email not published on their site or Google listing — confirm with Lachlan.
  email: 'info@electricalpotential.co.nz',
  phone: '027 576 5422',
  address: '37 Comries Road, Chartwell, Hamilton 3210',
  areas: ['Hamilton', 'Chartwell', 'Rototuna', 'Flagstaff', 'Cambridge', 'Te Awamutu', 'Ngaruawahia', 'Morrinsville']
};

// tel: href version of the phone number (digits and + only).
export const PHONE_HREF = `tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, '')}`;

// PER-CLIENT: homepage FAQ content (rendered by components/FaqAccordion.tsx).
export const FAQS: { question: string; answer: string }[] = [
  {
    question: 'Do you charge a callout fee?',
    answer: 'Get in touch and we will be upfront about callout and hourly rates before we book anything in. No surprises on the invoice.',
  },
  {
    question: 'Are you registered electricians?',
    answer: 'Yes. We are Master Electricians members and registered with SEANZ and Trade Partners NZ. All work is carried out to AS/NZS 3000 and certified on completion.',
  },
  {
    question: 'What kind of electrical work do you take on?',
    answer: 'Residential, commercial and industrial, plus data and fibre networking. Everything from new powerpoints, lights and switchboard upgrades to full new-build wiring, oven and hob installs, faults and maintenance.',
  },
  {
    question: 'What areas do you cover?',
    answer: 'Hamilton and the wider Waikato, including Chartwell, Rototuna, Flagstaff, Cambridge, Te Awamutu, Ngaruawahia and Morrinsville.',
  },
  {
    question: 'What happens after I send a job request?',
    answer: 'We will be in touch to confirm the details, book a time that suits, and give you a clear price before any work starts.',
  },
];
