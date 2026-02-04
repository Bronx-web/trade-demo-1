
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
    logo: 'images/logo.png', 
  },
  hero: {
    main: 'https://www.bronxweb.nz/mock-ups-2/hero-home.png', // Currently external
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
      path: 'https://www.bowersbrothers.co.nz/wp-content/uploads/2025/03/IMG_0077-1024x768.jpeg', // Currently external
      fallback: 'https://www.bronxweb.nz/mock-ups-2/my-work-1.png' 
    },
    { 
      id: 2, 
      title: 'Heritage Restoration', 
      category: 'Commercial', 
      path: 'https://otc.kiwi.nz/wp-content/uploads/2020/09/AI_0028.jpg',
      fallback: 'https://www.bronxweb.nz/mock-ups-2/pro-temp-img-1.png' 
    },
    { 
      id: 3, 
      title: 'Outdoor Living Area', 
      category: 'Landscape', 
      path: 'https://verheulstone.co.nz/wp-content/uploads/2020/11/received_487983301706145-450x450-1.jpeg', // Currently external
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
      path: 'https://www.bronxweb.nz/mock-ups-2/image4.jpeg', // Currently external
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
    worker: 'https://www.bronxweb.nz/mock-ups-2/hart-pic.png', // Currently external
    placeholder: FALLBACK_PROJECT
  }
};

/**
 * getAssetUrl
 * 
 * Safely resolves an image path. 
 * Prioritizes full URLs, then converts any absolute-style paths (/images/...)
 * into relative ones (images/...) for maximum compatibility with preview environments
 * that serve local directories directly from the root.
 */
export const getAssetUrl = (path: string, fallback?: string) => {
  if (!path) return fallback || MASONRY_ASSETS.misc.placeholder;
  
  const cleanPath = path.trim();
  
  // If it's already a full web URL (http:// or https://), use it directly.
  if (cleanPath.startsWith('http')) return cleanPath;
  
  // For local paths, ensure it's relative. Strip any leading slash.
  // This helps browsers find 'images/my-image.jpg' correctly when the 'images' folder
  // is alongside 'index.html' in preview environments.
  return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
};
