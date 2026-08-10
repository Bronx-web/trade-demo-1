
import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../constants';
import { MASONRY_ASSETS, getAssetUrl } from '../constants/images';
import FaqAccordion from '../components/FaqAccordion';
import LbpStrip from '../components/LbpStrip';
import BrandMarquee from '../components/BrandMarquee';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={getAssetUrl(MASONRY_ASSETS.hero.main)} 
            alt="Electrical work in progress"
            className="w-full h-full object-cover brightness-[0.50]"
            onError={(e) => {
              // Safety fallback if local image fails
              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/11236546/pexels-photo-11236546.jpeg';
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 text-white w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold oswald leading-[1.1] mb-4">
            {SITE.heroLine1} <br />
            <span className="bg-[#CB4154] inline-block px-3 py-1 mt-2">{SITE.heroLine2}</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-2xl text-gray-200">
            Residential, commercial and industrial electrical across {SITE.regionLabel}.
          </p>
          <div className="mt-[12.5rem] flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="inline-block bg-[#CB4154] hover:bg-[#b03848] text-white px-8 py-4 text-center rounded-sm font-bold oswald tracking-wider transition-all transform hover:scale-[1.02] active:scale-95">
              REQUEST A JOB
            </Link>
            <Link to="/projects" className="inline-block bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 text-center rounded-sm font-bold oswald tracking-wider transition-all transform hover:scale-[1.02] active:scale-95">
              VIEW RECENT WORK
            </Link>
          </div>
        </div>
      </section>

      {/* Brands we work with */}
      <BrandMarquee />

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold oswald mb-6 text-gray-900 uppercase">Locally Owned &amp; Operated</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10">
            {SITE.name} is proud to be your locally owned and operated electrical company, serving Hamilton and the wider Waikato since 2021.
            Whether it is a new powerpoint, a switchboard upgrade, a full new-build fitout, or data and fibre through the whole office,
            our team is punctual, registered and knowledgeable. We get the job done right, efficiently, safely and to the highest standards.
          </p>

        </div>
      </section>

      {/* Accreditation trust strip */}
      <LbpStrip />

      {/* How We Work */}
      <section className="py-16 md:py-24 bg-soft-red">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#CB4154] font-bold tracking-widest uppercase text-sm mb-2">Our Process</p>
            <h2 className="text-3xl md:text-4xl font-bold oswald text-gray-900 uppercase">How We Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Tell Us The Job',
                description: 'Send through what you need online, or call us direct if the power is out and it cannot wait.',
              },
              {
                step: '02',
                title: 'Clear Price',
                description: 'We confirm the details, book a time that suits, and give you a clear price before any work starts.',
              },
              {
                step: '03',
                title: 'Done Properly',
                description: 'Certified to AS/NZS 3000, tidied up after, and signed off on completion.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <span className="text-5xl font-bold oswald text-black/10">{item.step}</span>
                <h3 className="text-xl font-bold oswald mt-2 mb-3 uppercase">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {MASONRY_ASSETS.projects.slice(0, 3).map((project) => (
               <div key={project.id} className="group relative overflow-hidden h-[300px] md:h-96 cursor-pointer bg-gray-200">
                 <img
                   src={getAssetUrl(project.path)}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   alt={project.title}
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = project.fallback;
                   }}
                 />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to="/projects" className="text-white oswald font-bold text-lg border-2 border-white px-6 py-2 uppercase tracking-widest inline-block">
                      VIEW PROJECT
                  </Link>
                 </div>
               </div>
             ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects" className="inline-block bg-[#CB4154] hover:bg-[#b03848] text-white px-8 py-4 rounded-sm font-bold oswald tracking-wider transition-all transform hover:scale-[1.02] active:scale-95">
              VIEW FULL GALLERY
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-[#CB4154] font-bold tracking-widest uppercase text-sm mb-2">FAQs</h2>
            <h3 className="text-3xl md:text-4xl font-bold oswald text-gray-900 uppercase">Common Questions</h3>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </div>
  );
};

export default Home;
