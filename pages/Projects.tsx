
import React from 'react';
import Hero from '../components/Hero';
import { PROJECTS } from '../constants';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Hero 
        title="OUR PROJECTS" 
        subtitle="A showcase of clean lines, perfect bonds, and masonry that makes a statement."
        image="https://picsum.photos/seed/project-hero/1920/1080"
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-oswald font-bold text-slate-900 mb-4 uppercase tracking-tighter">Recent Showcase</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            From architectural new builds to heritage restorations. We take pride in every joint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS.map((project) => (
            <div key={project.id} className="bg-white group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-[#CB4154] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-oswald font-bold mb-4 uppercase tracking-wide">{project.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Canterbury, NZ</span>
                  <Link to="/contact" className="text-[#CB4154] font-bold hover:underline uppercase text-xs tracking-widest">
                    Request similar work
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-slate-900 p-12 md:p-20 rounded-2xl text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#CB4154]" />
          <h2 className="text-3xl md:text-5xl font-oswald font-bold mb-8 uppercase tracking-tight">Need a bespoke solution?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-3xl mx-auto">
            Whether it's a unique outdoor fireplace or custom stone feature wall, I'm ready to bring your design to life.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-12 py-5 bg-[#CB4154] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all"
          >
            Request a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
