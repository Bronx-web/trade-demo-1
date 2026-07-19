
import { QuoteRates } from './types';

/**
 * PER-CLIENT CONFIG
 *
 * This file is the single place to edit when re-skinning the template
 * for a new client. Everything below feeds the rest of the site.
 */

// Business identity — shown in nav, footer, schema and page titles.
export const SITE = {
  name: 'Hart Stone Ltd',
  tagline: 'Brick & Block',
  // Canonical domain for the live site — no trailing slash, non-www.
  domain: 'https://site-preview-v1.netlify.app',
  description: 'Licensed brick and block layers serving the greater Canterbury region. Instant online quotes, quality masonry built to NZS 3604.',
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
  email: 'info@hartstoneltd.co.nz',
  phone: '021-XXX-XXXX',
  address: 'Christchurch, NZ',
  areas: ['Christchurch City', 'Selwyn District', 'Waimakariri', 'Rolleston', 'Rangiora', 'Kaiapoi', 'Lincoln', 'Brighton']
};

// tel: href version of the phone number (digits and + only).
export const PHONE_HREF = `tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, '')}`;
