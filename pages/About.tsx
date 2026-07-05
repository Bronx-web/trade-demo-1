
import React from 'react';
import { MASONRY_ASSETS, getAssetUrl } from '../constants/images';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative h-64 bg-gray-900 flex items-center justify-center">
        <img 
          src={getAssetUrl(MASONRY_ASSETS.hero.about)} 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          alt="Masonry tools" 
        />
        <h1 className="relative text-5xl font-bold oswald text-white uppercase tracking-widest">Our Standard</h1>
      </div>

      <div className="relative flex justify-center">
        <div className="absolute -top-12 w-28 h-28 rounded-full bg-black/90 backdrop-blur-md shadow-xl ring-1 ring-white/10 flex items-center justify-center">
          <img
            src={getAssetUrl(MASONRY_ASSETS.branding.lbp)}
            alt="LBP Licensed Building Practitioner"
            className="h-24 w-24 object-contain"
          />
        </div>
      </div>
      <div className="h-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold oswald mb-4">Licensed • Verified • Built Right • On Time</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                As a (verified) Licensed Building Practitioner, I bring proven crafting strategies for longevity.
                With a love for the arts, I have the eye for detail. A proficiency in new builds with heavy deadlines
                to small builds with high detail. I have the perfect balance of design & ingenuity.
              </p>
            </div>

            <div className="bg-soft-red p-8 border-l-4 border-brick-orange rounded-r-lg text-left">
              <h3 className="text-xl font-bold oswald mb-4 uppercase">Industry Compliance</h3>
              <p className="text-gray-800 font-semibold mb-2">Built to NZS 3604 - The NZ Timber-Framed Buildings Standard</p>
              <p className="text-gray-600 text-sm">
                NZS 3604 is the core building standard for residential houses in New Zealand. It sets the minimum requirements
                for foundations, bracing, timber framing, and how brick veneer must be tied back to the structural frame.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold oswald">WHY IT MATTERS:</h3>
              <ul className="space-y-3 text-left">
                {[
                  "Correct cavity size and flashings for moisture management",
                  "Stainless-steel veneer ties at correct spacing and depth",
                  "Proper control joints and movement gaps to prevent cracking",
                  "Foundations designed for wind and earthquake zones",
                  "All detailing signed off as code-compliant"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#F88913] font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <img 
              src={getAssetUrl(MASONRY_ASSETS.misc.worker)} 
              className="w-full rounded-lg shadow-2xl" 
              alt="Professional bricklayer working" 
            />
            <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg text-center italic text-gray-500">
              "Your brickwork won't just look perfect on day one. It's built to be fully compliant for many years to come."
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <section className="bg-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#F88913] font-bold tracking-widest uppercase text-sm mb-2">The Crew</p>
            <h2 className="text-3xl md:text-4xl font-bold oswald text-white uppercase">Our Team</h2>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src={getAssetUrl(MASONRY_ASSETS.misc.team)}
              alt="Top Notch Brick and Block team on site"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
