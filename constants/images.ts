
/**
 * MASONRY_ASSETS — site imagery (name kept from the template; it is the generic
 * asset map, not masonry-specific).
 *
 * Project photos are the CLIENT'S OWN, taken from electricalpotential.co.nz/lighting
 * and their About page, downloaded into public/images/ rather than hotlinked from
 * static.wixstatic.com. Titles below are written from what each photo actually
 * shows — check any new photo before titling it.
 *
 * Client files go in `public/images/` (NOT root `images/`): Vite only publishes
 * `public/`, so root-images render in `npm run dev` and 404 on the live deploy.
 * Local paths are written with a leading slash; `getAssetUrl` normalises either way.
 * File names are CASE SENSITIVE. A `path` starting with 'http' loads from the web.
 * The Unsplash FALLBACK_* URLs are last-resort only — they are not this client's work.
 */

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=2000';
const FALLBACK_ABOUT = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600';
const FALLBACK_PROJECT = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800';

export const MASONRY_ASSETS = {
  branding: {
    logo: '/images/ep-logo.png',
  },
  hero: {
    main: '/images/work-10.jpg',
    about: '/images/work-2.jpg',
  },
  services: {
    residential: '/images/work-2.jpg',
    commercial: '/images/work-7.jpg',
    networking: '/images/work-3.jpg',
  },
  projects: [
    {
      id: 1,
      title: 'Kitchen Under-Cabinet Lighting',
      category: 'Residential',
      path: '/images/work-2.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 2,
      title: 'Switchboard Upgrade',
      category: 'Residential',
      path: '/images/work-6.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 3,
      title: 'Feature LED Strip Lighting',
      category: 'Residential',
      path: '/images/work-10.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 4,
      title: 'New Build Distribution Board',
      category: 'New Build',
      path: '/images/work-7.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 5,
      title: 'Meter Box & Sub-Board Install',
      category: 'Residential',
      path: '/images/work-1.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 6,
      title: 'Pendant Lighting',
      category: 'Residential',
      path: '/images/work-4.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 7,
      title: 'Main Earth Upgrade',
      category: 'Maintenance',
      path: '/images/work-5.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 8,
      title: 'Labelled Switchboard & Meter',
      category: 'Residential',
      path: '/images/work-8.jpg',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 9,
      title: 'LED Strip Run',
      category: 'Residential',
      path: '/images/work-3.jpg',
      fallback: FALLBACK_PROJECT
    },
  ],
  misc: {
    worker: '/images/work-3.jpg',
    team: '/images/about-team.jpg',
    placeholder: FALLBACK_PROJECT
  }
};

/**
 * getAssetUrl
 * 
 * Safely resolves an image path. 
 * Prioritizes full URLs, then standardizes local paths to start with a leading slash '/'
 * so they are resolved relative to the origin root. This is standard for SPA deployment on Netlify.
 */
export const getAssetUrl = (path: string, fallback?: string) => {
  if (!path) return fallback || MASONRY_ASSETS.misc.placeholder;
  
  const cleanPath = path.trim();
  
  // If it's already a full web URL (http:// or https://), use it directly.
  if (cleanPath.startsWith('http')) return cleanPath;
  
  // Ensure local paths start with a slash so they find the asset starting from the root URL.
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
};
