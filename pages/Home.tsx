
import React from 'react';
import { Link } from 'react-router-dom';
import { MASONRY_ASSETS, getAssetUrl } from '../constants/images';
import FaqAccordion from '../components/FaqAccordion';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetUrl(MASONRY_ASSETS.hero.main)}
            alt="Brick wall craftsmanship"
            className="w-full h-full object-cover brightness-[0.50]"
            onError={(e) => {
              // Safety fallback if local image fails
              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/11236546/pexels-photo-11236546.jpeg';
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold oswald leading-[1.1] mb-4">
            BUILT TO LAST <br />
            <span className="bg-[#F88913] inline-block px-3 py-1 mt-2">ONE BRICK AT A TIME</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-2xl text-gray-200">
            Delivering Precision Brick & Block For Residential & Commercial Builds.
          </p>
          {/* <p className="mt-4 text-base md:text-lg font-semibold text-[#F88913] italic">
            Building a better world, one brick at a time.
          </p> */}
          <div className="mt-[12.5rem] flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="inline-block bg-[#F88913] hover:bg-[#b03848] text-white px-8 py-4 text-center rounded-sm font-bold oswald tracking-wider transition-all transform hover:scale-[1.02] active:scale-95">
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
          <h2 className="text-3xl md:text-4xl font-bold oswald mb-6 text-gray-900 uppercase">Top Notch Brick and Block</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10">
            We are a team ofcraftsman with a serious obsession for clean lines, perfect bonds, and details that make architects jealous. 
            Whether you need a bulletproof structural build, a show-stopping outdoor fireplace, or a heritage repoint. I've got the hands and the eye to make it happen.
            No shortcuts. No mess left behind. Just proper brickwork that looks better in 20 years than the day it's finished.
          </p>
          
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-24 bg-soft-orange">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#F88913] font-bold tracking-widest uppercase text-sm mb-2">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-bold oswald text-gray-900 uppercase">How We Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Online Quote',
                description: 'Use our interactive tool to get an immediate ballpark estimate for your project.',
              },
              {
                step: '02',
                title: 'Site Visit',
                description: 'We visit your site to confirm access, ground conditions, and architectural details.',
              },
              {
                step: '03',
                title: 'Master Build',
                description: 'Execution of Brick and Block work to NZS 3604 standards with a clean, professional finish.',
              },
            ].map((item) => (
              <div key={item.step}>
                <span className="text-5xl font-bold oswald text-black/10">{item.step}</span>
                <h3 className="text-xl font-bold oswald mt-2 mb-3 uppercase">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[#F88913] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">Selected Work</p>
              <h2 className="text-4xl md:text-5xl font-bold oswald uppercase text-white leading-tight">
                Recent Builds
              </h2>
            </div>
            <Link to="/projects" className="shrink-0 group inline-flex items-center gap-3 text-white font-bold oswald tracking-wider uppercase text-sm">
              View Full Gallery
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 group-hover:border-[#F88913] group-hover:bg-[#F88913] transition-all">
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </Link>
          </div>

          {/* Single hero frame anchors the section */}
          {MASONRY_ASSETS.projects[0] && (
            <Link
              to="/projects"
              className="group relative block overflow-hidden rounded-lg h-80 md:h-[32rem]"
            >
              <img
                src={getAssetUrl(MASONRY_ASSETS.projects[0].path)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={MASONRY_ASSETS.projects[0].title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = MASONRY_ASSETS.projects[0].fallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="text-[#F88913] text-xs font-bold uppercase tracking-widest">{MASONRY_ASSETS.projects[0].category}</span>
                <h3 className="text-white oswald font-bold text-2xl md:text-3xl uppercase mt-1">{MASONRY_ASSETS.projects[0].title}</h3>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-[#F88913] font-bold tracking-widest uppercase text-sm mb-2">FAQs</h2>
            <h3 className="text-3xl md:text-4xl font-bold oswald text-gray-900 uppercase">Common Questions</h3>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </div>
  );
};

export default Home;
