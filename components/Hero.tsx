
import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  showButton?: boolean;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, image, showButton = false }) => {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full">
        <h1 className="text-5xl md:text-8xl font-oswald font-bold text-white mb-6 uppercase tracking-tighter leading-none animate-in slide-in-from-left duration-700">
          {title.split(' ').map((word, i) => (
            <span key={i} className={word === 'STONE' || word === 'HART' ? 'text-[#CB4154]' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-slate-200 font-light mb-10 max-w-2xl animate-in slide-in-from-left delay-150 duration-700">
            {subtitle}
          </p>
        )}
        {showButton && (
          <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-left delay-300 duration-700">
            <Link 
              to="/projects" 
              className="px-10 py-4 bg-[#CB4154] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all"
            >
              View My Work
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-4 border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all"
            >
              Get a Quote
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
