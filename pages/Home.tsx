
import React from 'react';
import { Link } from 'react-router-dom';
import { MASONRY_ASSETS, getAssetUrl } from '../constants/images';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getAssetUrl(MASONRY_ASSETS.hero.main)} 
            alt="Brick wall craftsmanship" 
            className="w-full h-full object-cover brightness-[0.35]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold oswald leading-[1.1] mb-4">
            BUILT TO LAST <br />
            <span className="bg-[#CB4154] inline-block px-3 py-1 mt-2">FROM THE HART</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-2xl text-gray-200">
            25+ Years Turning Bricks into Statements. Precision masonry for high-end residential and commercial builds across Canterbury.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="inline-block bg-[#CB4154] hover:bg-[#b03848] text-white px-8 py-4 text-center rounded-sm font-bold oswald tracking-wider transition-all transform hover:scale-[1.02] active:scale-95">
              GET AN INSTANT QUOTE
            </Link>
            <Link to="/projects" className="inline-block bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 text-center rounded-sm font-bold oswald tracking-wider transition-all transform hover:scale-[1.02] active:scale-95">
              VIEW RECENT WORK
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold oswald mb-6 text-gray-900 uppercase">Master Craftsmanship</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10">
            A time-served craftsman with a serious obsession for clean lines, perfect bonds, and details that make architects jealous. 
            Whether you need a bulletproof structural build, a show-stopping outdoor fireplace, or a heritage repoint—I've got the hands and the eye to make it happen.
            No shortcuts. No mess left behind. Just proper brickwork that looks better in 20 years than the day it's finished.
          </p>
          <Link to="/about" className="text-[#CB4154] font-bold text-lg hover:underline inline-flex items-center gap-2">
            Find Out More <span>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Featured Work Grid */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {MASONRY_ASSETS.projects.slice(0, 4).map((project) => (
               <div key={project.id} className="group relative overflow-hidden h-[300px] md:h-96 cursor-pointer">
                 <img 
                   src={getAssetUrl(project.path)} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   alt={project.title}
                 />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white oswald font-bold text-lg border-2 border-white px-6 py-2 uppercase tracking-widest">VIEW PROJECT</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
