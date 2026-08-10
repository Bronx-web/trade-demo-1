
/**
 * MASONRY_ASSETS — site imagery (name kept from the template; it is the generic
 * asset map, not masonry-specific).
 *
 * ⚠️ ALL PROJECT PHOTOS BELOW ARE STOCK PLACEHOLDERS.
 * Electrical Potential publishes no work photos — their Gallery page 404s — so
 * nothing here shows their actual jobs. Swap every `path` for real photos before
 * this is presented as their site.
 *
 * Client files go in `public/images/` (NOT root `images/`): Vite only publishes
 * `public/`, so root-images render in `npm run dev` and 404 on the live deploy.
 * Local paths are written with a leading slash; `getAssetUrl` normalises either way.
 * File names are CASE SENSITIVE. A `path` starting with 'http' loads from the web.
 */

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=2000';
const FALLBACK_ABOUT = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600';
const FALLBACK_PROJECT = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800';

export const MASONRY_ASSETS = {
  branding: {
    logo: '/images/ep-logo.png',
  },
  hero: {
    main: FALLBACK_HERO,
    about: FALLBACK_ABOUT,
  },
  services: {
    residential: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    commercial: 'https://images.unsplash.com/photo-1565608087341-404b25492fee?auto=format&fit=crop&q=80&w=800',
    networking: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
  },
  projects: [
    {
      id: 1,
      title: 'Switchboard Upgrade',
      category: 'Residential',
      path: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 2,
      title: 'New Build Wiring',
      category: 'Residential',
      path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 3,
      title: 'Commercial Fitout',
      category: 'Commercial',
      path: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 4,
      title: 'Data & Fibre Cabling',
      category: 'Networking',
      path: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 5,
      title: 'LED Lighting Install',
      category: 'Residential',
      path: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?auto=format&fit=crop&q=80&w=800',
      fallback: FALLBACK_PROJECT
    },
    {
      id: 6,
      title: 'Solar — On/Off Grid',
      category: 'Renewable',
      path: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
      fallback: FALLBACK_PROJECT
    },
  ],
  misc: {
    worker: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1200',
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
