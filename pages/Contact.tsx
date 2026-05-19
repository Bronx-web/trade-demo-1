
import React from 'react';
import QuoteCalculator from '../components/QuoteCalculator';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white mb-6 uppercase tracking-tighter">
          GET A <span className="text-[#CB4154]">QUOTE</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light">
          Laser-straight brickwork with no surprises on the invoice. 
          Use our tool below for a high-accuracy estimate.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-24 relative z-20">
        <QuoteCalculator />
      </div>

      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-oswald font-bold text-slate-900 mb-8 uppercase">Service Area</h2>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  'Christchurch City', 'Selwyn District', 'Rolleston', 'Rangiora', 
                  'Kaiapoi', 'Lincoln', 'Waimakariri', 'Brighton'
                ].map(area => (
                  <div key={area} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded hover:border-[#CB4154] transition-colors">
                    <svg className="w-5 h-5 text-[#CB4154]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="font-semibold text-slate-700">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 italic">
                * We are happy to discuss projects outside these areas depending on scope.
              </p>
            </div>
            <div className="h-[400px] bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200">
              {/* Simulated Map */}
              <div className="w-full h-full relative">
                 <img src="https://picsum.photos/seed/map/800/600" alt="Service Map" className="w-full h-full object-cover opacity-60 grayscale" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-2xl border-t-4 border-[#CB4154] text-center max-w-xs">
                        <h4 className="font-oswald font-bold text-xl mb-2">HART STONE LTD</h4>
                        <p className="text-slate-500 text-sm">Serving the greater Canterbury region from our Christchurch base.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
