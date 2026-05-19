
import React from 'react';
import Hero from '../components/Hero';
import { PROJECTS } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero 
        title="HART STONE LTD" 
        subtitle="Precision masonry serving Christchurch and the Canterbury region. Built to the highest NZ standards."
        image="https://images.unsplash.com/photo-1590059132213-f91ca9097f98?auto=format&fit=crop&q=80&w=2000"
        showButton={true}
      />

      {/* PROCESS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#CB4154] font-bold uppercase tracking-widest text-sm mb-2 block">Our Process</span>
            <h2 className="text-4xl font-oswald font-bold text-slate-900 uppercase">How we work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Online Quote", desc: "Use our interactive tool to get an immediate ballpark estimate for your project." },
              { step: "02", title: "Site Visit", desc: "We visit your site to confirm access, ground conditions, and architectural details." },
              { step: "03", title: "Master Build", desc: "Execution of the masonry work to NZS 3604 standards with a clean, professional finish." }
            ].map((item) => (
              <div key={item.step} className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#CB4154] transition-all">
                <span className="text-5xl font-oswald font-bold text-slate-200 group-hover:text-[#CB4154] transition-colors mb-6 block">{item.step}</span>
                <h3 className="text-xl font-oswald font-bold mb-4 uppercase">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-5xl font-oswald font-bold mb-8 uppercase leading-none">Canterbury <br/><span className="text-[#CB4154]">Craftsmanship</span></h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              From contemporary brick veneers in Rolleston to structural block walls in the Port Hills, we provide the expertise required for New Zealand's unique conditions.
            </p>
            <Link to="/projects" className="inline-block px-10 py-4 bg-[#CB4154] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">View Gallery</Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <div className="space-y-4">
                <img src="https://picsum.photos/seed/mason1/400/500" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Work" />
                <img src="https://picsum.photos/seed/mason2/400/300" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Work" />
             </div>
             <div className="space-y-4 pt-12">
                <img src="https://picsum.photos/seed/mason3/400/300" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Work" />
                <img src="https://picsum.photos/seed/mason4/400/500" className="rounded-xl grayscale hover:grayscale-0 transition-all" alt="Work" />
             </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-oswald font-bold mb-6 uppercase tracking-tight text-slate-900">Start your estimate online</h2>
          <p className="text-lg text-slate-500 mb-12 italic">"A job well built is a job that lasts generations."</p>
          <Link to="/contact" className="px-16 py-6 bg-slate-900 text-white font-oswald font-bold text-2xl uppercase tracking-widest hover:bg-[#CB4154] transition-all shadow-2xl">
            Launch Calculator
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
