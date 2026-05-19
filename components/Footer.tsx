
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-oswald font-bold mb-6 tracking-wider">
            HART <span className="text-[#CB4154]">STONE</span> LTD
          </h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            Master bricklayers serving Christchurch and the Canterbury region for over 25 years. 
            Committed to quality, longevity, and structural excellence.
          </p>
          <div className="flex space-x-4">
            {/* Social icons could go here */}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-[#CB4154]">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Me</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">Our Projects</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Get a Quote</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-[#CB4154]">Service Areas</h4>
          <ul className="space-y-4 text-slate-400">
            <li>Christchurch City</li>
            <li>Selwyn District (Rolleston, Lincoln)</li>
            <li>Waimakariri (Rangiora, Kaiapoi)</li>
            <li>Banks Peninsula</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Hart Stone Ltd. All Rights Reserved. Built to NZS 3604 Standards.</p>
      </div>
    </footer>
  );
};

export default Footer;
