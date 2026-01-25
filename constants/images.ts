
/**
 * MASONRY_ASSETS
 * 
 * Central management for all visuals. 
 * 
 * ⚠️ CRITICAL RULES FOR IMAGES:
 * 1. LOCATION: Files MUST be in the folder: /public/images/
 * 2. NAMING: Match exactly (e.g. 'hero-home.jpg'). No spaces in filenames.
 * 3. REFERENCE: Use '/images/filename.jpg' below.
 */

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=2000';
const FALLBACK_PROJECT = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800';

export const MASONRY_ASSETS = {
  branding: {
    logo: '/images/logo.png', 
  },
  hero: {
    // FIXED: Removed trailing space and ensured leading slash
    main: '/images/hero-home.jpg', 
    about: '/images/hero-home.jpg',
  },
  services: {
    retaining: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800',
    veneer: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
    paving: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800',
  },
  projects: [
    { id: 1, title: 'Modern Gray Veneer', category: 'Residential', path: '/images/project-1.jpg', fallback: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Heritage Restoration', category: 'Commercial', path: '/images/project-2.jpg', fallback: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Outdoor Living Area', category: 'Landscape', path: '/images/project-3.jpg', fallback: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Precision Blockwork', category: 'Structural', path: '/images/project-4.jpg', fallback: 'https://images.unsplash.com/photo-1635311029107-df087d00f898?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Feature Brick Wall', category: 'Interior', path: '/images/project-5.jpg', fallback: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Retaining Solution', category: 'Infrastructure', path: '/images/project-6.jpg', fallback: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800' },
  ],
  misc: {
    worker: '/images/hart-pic.jpg',
    placeholder: FALLBACK_PROJECT
  }
};

/**
 * getAssetUrl
 * 
 * Safely resolves an image path. 
 * Now includes a .trim() to prevent accidental space issues.
 */
export const getAssetUrl = (path: string, fallback?: string) => {
  if (!path) return fallback || MASONRY_ASSETS.misc.placeholder;

  // Trim to remove accidental spaces at start or end
  const cleanPath = path.trim();

  // If it's already a full URL, use it.
  if (cleanPath.startsWith('http')) return cleanPath;

  // Ensure local paths start with / to be relative to site root
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
};
