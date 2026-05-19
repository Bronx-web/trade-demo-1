
import React from 'react';
import Hero from '../components/Hero';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero 
        title="ABOUT ME" 
        subtitle="Craftsmanship forged in precision. Driven by the standards that keep New Zealand homes standing."
        image="https://picsum.photos/seed/about-hero/1920/1080"
      />

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-4xl font-oswald font-bold text-slate-900 mb-8 uppercase">A Legacy of Quality</h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            With over 25 years in the masonry industry, I bring a unique blend of structural expertise and aesthetic design. My background in operating successful franchise models means I understand not just the brickwork, but the importance of project management, deadlines, and cost-efficiency.
          </p>
          
          <img 
            src="https://picsum.photos/seed/pro-mason/1200/600" 
            alt="Hart Stone Pro" 
            className="w-full h-auto rounded-xl shadow-lg mb-16"
          />

          <h2 className="text-3xl font-oswald font-bold text-slate-900 mb-8 border-l-8 border-[#CB4154] pl-6">
            BUILT TO NZS 3604 STANDARDS
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            NZS 3604 is the core building standard that virtually every residential house in New Zealand is constructed to. It is the baseline for foundations, bracing, and durability.
          </p>
          
          <div className="bg-slate-50 p-10 rounded-xl border border-slate-200 mb-12">
            <h3 className="text-xl font-bold mb-6 text-slate-800">What Code-Compliance Means for You:</h3>
            <ul className="space-y-4">
              {[
                'Correct cavity sizing and flashing to prevent moisture ingress.',
                'Stainless-steel veneer ties at precise intervals for seismic resilience.',
                'Engineered control joints to manage material expansion/contraction.',
                'Details signed off for council inspections - zero risk, zero rework.',
                'Foundations designed specifically for your wind and earthquake zone.'
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <svg className="w-6 h-6 text-[#CB4154] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-lg text-slate-600 italic">
            In short: your brickwork won't just look perfect on day one - it will remain compliant and structural for 50+ years, even after everything the New Zealand weather and tectonic shifts throw its way.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
