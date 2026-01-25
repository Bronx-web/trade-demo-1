
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

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
            <h2 className="text-2xl font-bold oswald mb-4">HART <span className="text-[#CB4154]">STONE</span> LTD</h2>
            <p className="text-gray-400 max-w-md">
              A time served craftsman with a serious obsession for clean lines, perfect bonds, and details that make architects jealous. 25+ years of turning bricks into statements across Christchurch and Selwyn.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold oswald mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Me</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Recent Projects</Link></li>
              <li><Link to="/booking" className="text-gray-400 hover:text-white transition-colors">Quote Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold oswald mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 Hart Stone Ltd. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Built to NZS 3604 Standards</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
