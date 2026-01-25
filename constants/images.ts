
/**
 * MASONRY_ASSETS
 * 
 * This is the central directory for your website's visuals.
 * 
 * WHY IMAGES MIGHT NOT BE SHOWING:
 * 1. Missing Leading Slash: Always start local paths with '/' (e.g., '/images/hero.jpg').
 * 2. Case Sensitivity: 'Hero.jpg' is different from 'hero.jpg'.
 * 3. Spaces in Filenames: Avoid them. Use dashes (e.g., 'hero-main.jpg').
 * 4. Folder Location: Your files MUST be inside a folder named 'images' inside your 'public' folder.
 */

export const MASONRY_ASSETS = {
  branding: {
    logo: '/images/logo.png', 
  },
  hero: {
    // Standardized local path. Make sure your file in public/images/ is named exactly this.
    main: 'images/hero-home.jpg', 
    about: 'images/hero-home.jpg',
  },
  services: {
    retaining: 'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?auto=format&fit=crop&q=80&w=800',
    veneer: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
    paving: 'https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800',
  },
  projects: [
    { id: 1, title: 'Modern Gray Veneer', category: 'Residential', path: '/images/project-1.jpg' },
    { id: 2, title: 'Heritage Restoration', category: 'Commercial', path: '/images/project-2.jpg' },
    { id: 3, title: 'Outdoor Living Area', category: 'Landscape', path: '/images/project-3.jpg' },
    { id: 4, title: 'Precision Blockwork', category: 'Structural', path: '/images/project-4.jpg' },
    { id: 5, title: 'Feature Brick Wall', category: 'Interior', path: '/images/project-5.jpg' },
    { id: 6, title: 'Retaining Solution', category: 'Infrastructure', path: '/images/project-6.jpg' },
  ],
  misc: {
    placeholder: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    worker: 'images/hart-pic.jpg'
  }
};

/**
 * Helper to ensure we always have an image.
 * This function checks if a path is local or remote and applies fallbacks.
 */
export const getAssetUrl = (path: string) => {
  // If no path provided, use placeholder
  if (!path) return MASONRY_ASSETS.misc.placeholder;

  // If it's a remote URL, return it as is
  if (path.startsWith('http')) return path;

  // If it's a local path, ensure it starts with /images/
  // This helps prevent broken links if the user forgets the leading slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // NOTE: In a real environment, we'd check if the file exists, 
  // but in the browser we can only return the path and let the <img> handle the error.
  return cleanPath;
};
