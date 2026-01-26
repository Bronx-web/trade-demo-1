
/**
 * MASONRY_ASSETS
 * 
 * Central management for all visuals. 
 * 
 * 🛠 THE DEFINITIVE IMAGE FIX:
 * 1. Your 'images' folder must be at the SAME LEVEL as 'index.html'.
 * 2. This code uses RELATIVE paths (NO leading slash) for internal logic.
 * 3. File names are CASE SENSITIVE. 'my-work-2.jpg' is not 'My-Work-2.jpg'.
 */

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=2000';
const FALLBACK_PROJECT = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800';

export const MASONRY_ASSETS = {
  branding: {
    logo: 'images/logo.png', 
  },
  hero: {
    main: 'https://www.bronxweb.nz/mock-ups-2/hero-home.png', 
    about: 'https://images.pexels.com/photos/11236546/pexels-photo-11236546.jpeg',
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
      path: 'images/mywork-1.jpg', 
      fallback: 'https://www.bronxweb.nz/mock-ups-2/my-work-1.png' 
    },
    { 
      id: 2, 
      title: 'Heritage Restoration', 
      category: 'Commercial', 
      path: 'images/my-work-2.jpg', 
      fallback: 'https://www.bronxweb.nz/mock-ups-2/pro-temp-img-1.png' 
    },
    { 
      id: 3, 
      title: 'Outdoor Living Area', 
      category: 'Landscape', 
      path: 'images/my-work-3.jpg', 
      fallback: 'https://www.bronxweb.nz/mock-ups-2/pro-temp-img-2.png' 
    },
    { 
      id: 4, 
      title: 'Precision Blockwork', 
      category: 'Structural', 
      path: 'images/project-4.jpg', 
      fallback: 'https://www.bronxweb.nz/mock-ups-2/image4.jpeg' 
    },
    { 
      id: 5, 
      title: 'Feature Brick Wall', 
      category: 'Interior', 
      path: 'images/project-5.jpg', 
      fallback: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 6, 
      title: 'Retaining Solution', 
      category: 'Infrastructure', 
      path: 'images/project-6.jpg', 
      fallback: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800' 
    },
  ],
  misc: {
    worker: 'https://www.bronxweb.nz/mock-ups-2/hart-pic.png',
    placeholder: FALLBACK_PROJECT
  }
};

/**
 * getAssetUrl
 * 
 * Safely resolves an image path. 
 * Standardizes output to relative paths (no leading slash) which is most compatible
 * with preview environments serving from local directories.
 */
export const getAssetUrl = (path: string, fallback?: string) => {
  if (!path) return fallback || MASONRY_ASSETS.misc.placeholder;
  
  const cleanPath = path.trim();
  
  // Return early if it's already a full web URL
  if (cleanPath.startsWith('http')) return cleanPath;
  
  // Strip leading slash to ensure a relative path from the root index.html
  return cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
};
