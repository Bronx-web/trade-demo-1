
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MASONRY_ASSETS, getAssetUrl } from '../constants/images';

/**
 * Footer Component
 * 
 * Uses forwardRef so the IntersectionObserver in NextStepBar can track 
 * when the user reaches the bottom of the page.
 */
const Footer = forwardRef<HTMLElement>((props, ref) => {
  return (
    <footer ref={ref} className="bg-gray-900 text-white pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="inline-flex items-center justify-center bg-white rounded-lg w-[72px] h-[72px] mb-4 overflow-hidden">
              <img
                src={getAssetUrl(MASONRY_ASSETS.branding.logo)}
                alt="Top Notch Brick and Block"
                className="h-16 w-auto"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold oswald mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/booking" className="text-gray-400 hover:text-white transition-colors">Quote Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold oswald mb-4 uppercase tracking-wider">Misc</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Work With Me</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Top Notch Brick and Block. All Rights Reserved | Built to NZS 3604 Standards</p>

        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
