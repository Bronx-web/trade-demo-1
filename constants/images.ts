
/**
 * MASONRY_ASSETS
 * 
 * Centralized template for all visual assets.
 * To use local files: 
 * 1. Create a folder named 'images' in your public directory.
 * 2. Drop your files in (e.g. hero-main.jpg).
 * 3. Update the paths below to '/images/hero-main.jpg'.
 */

export const MASONRY_ASSETS = {
  branding: {
    logo: '/images/logo.png', // Placeholder for your future logo
  },
  hero: {
    main: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=2000',
    about: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000',
  },
  services: {
    retaining: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800',
    veneer: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
    paving: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800',
  },
  projects: [
    { id: 1, title: 'Modern Gray Veneer', category: 'Residential', path: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Heritage Restoration', category: 'Commercial', path: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Outdoor Living Area', category: 'Landscape', path: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Precision Blockwork', category: 'Structural', path: 'https://images.unsplash.com/photo-1635311029107-df087d00f898?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Feature Brick Wall', category: 'Interior', path: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Retaining Solution', category: 'Infrastructure', path: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800' },
  ],
  misc: {
    placeholder: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    worker: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800'
  }
};

/**
 * Helper to ensure we always have an image.
 * If the provided path is just a placeholder string or empty, it returns the global placeholder.
 */
export const getAssetUrl = (path: string) => {
  if (!path || path.includes('logo.png')) { // Example: return placeholder if logo isn't actually there yet
    return MASONRY_ASSETS.misc.placeholder;
  }
  return path;
};
