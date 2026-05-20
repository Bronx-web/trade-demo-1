
/**
 * MASONRY_ASSETS
 * 
 * Central management for all visuals. 
 * 
 * 🛠 THE DEFINITIVE IMAGE FIX:
 * 1. Your 'images' folder MUST be at the SAME LEVEL as 'index.html'.
 * 2. This code uses RELATIVE paths (NO leading slash) for *local* files.
 * 3. File names are CASE SENSITIVE. 'my-work-2.jpg' is not 'My-Work-2.jpg'.
 * 4. If you want to use a local image, ensure its `path` property starts with 'images/'.
 *    If it starts with 'http', it will load from the web.
 */

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=2000';
const FALLBACK_PROJECT = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800';

export const MASONRY_ASSETS = {
  branding: {
    logo: '/images/logo.png', 
  },
  hero: {
    main: 'https://raw.githubusercontent.com/Bronx-web/trade-demo-1/refs/heads/main/images/hero-home.jpg', // Local asset
    about: 'https://images.pexels.com/photos/11236546/pexels-photo-11236546.jpeg', // Currently external
  },
  services: {
    retaining: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800',
    veneer: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
    paving: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800',
  },
  projects: [
    { 
      id: 1, 
      title: 'Modern Gray Veneer', 
      category: 'Residential', 
      path: 'https://raw.githubusercontent.com/Bronx-web/trade-demo-1/refs/heads/main/images/my-work-2.jpg', // Local asset
      fallback: 'https://www.bronxweb.nz/mock-ups-2/my-work-1.png' 
    },
    { 
      id: 2, 
      title: 'Heritage Restoration', 
      category: 'Commercial', 
      path: 'https://raw.githubusercontent.com/Bronx-web/trade-demo-1/refs/heads/main/images/my-work-1.jpg', // Local asset
      fallback: 'https://www.bronxweb.nz/mock-ups-2/pro-temp-img-1.png' 
    },
    { 
      id: 3, 
      title: 'Outdoor Living Area', 
      category: 'Landscape', 
      path: 'https://raw.githubusercontent.com/Bronx-web/trade-demo-1/refs/heads/main/images/hero-home.jpg', // Local asset
      fallback: 'https://www.bronxweb.nz/mock-ups-2/pro-temp-img-2.png' 
    },
    { 
      id: 4, 
      title: 'Precision Blockwork', 
      category: 'Structural', 
      path: 'https://storage.googleapis.com/msgsndr/2vk1dsBdhIOl6FH3lwEn/media/68951fc4cf860d04dc203631.jpeg', // Currently external
      fallback: 'https://www.bronxweb.nz/mock-ups-2/image4.jpeg' 
    },
    { 
      id: 5, 
      title: 'Feature Brick Wall', 
      category: 'Interior', 
      path: 'https://raw.githubusercontent.com/Bronx-web/trade-demo-1/refs/heads/main/images/my-work-3.jpg', // Local asset
      fallback: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 6, 
      title: 'Retaining Solution', 
      category: 'Infrastructure', 
      path: 'https://www.bowersbrothers.co.nz/wp-content/uploads/2025/04/Brentwood-Estate-Taupo.jpg', // Currently external
      fallback: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800' 
    },
  ],
  misc: {
    worker: 'https://raw.githubusercontent.com/Bronx-web/trade-demo-1/refs/heads/main/images/hart-pic.jpg', // Local asset
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
