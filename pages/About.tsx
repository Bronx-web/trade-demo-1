
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative h-64 bg-gray-900 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          alt="Masonry tools" 
        />
        <h1 className="relative text-5xl font-bold oswald text-white uppercase tracking-widest">About Me</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold oswald mb-4">With a Wealth of Experience...</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Operating with successful business models, I bring proven crafting strategies for longevity. 
                With a love for the arts, I have the eye for detail. A proficiency in new builds with heavy deadlines 
                to small builds with high detail—I have the perfect balance of design & ingenuity.
              </p>
            </div>
            
            <div className="bg-soft-red p-8 border-l-4 border-brick-orange rounded-r-lg">
              <h3 className="text-xl font-bold oswald mb-4 uppercase">Industry Compliance</h3>
              <p className="text-gray-800 font-semibold mb-2">Built to NZS 3604 - The NZ Timber-Framed Buildings Standard</p>
              <p className="text-gray-600 text-sm">
                NZS 3604 is the core building standard for residential houses in New Zealand. It sets the minimum requirements 
                for foundations, bracing, timber framing, and how brick veneer must be tied back to the structural frame.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold oswald">WHY IT MATTERS:</h3>
              <ul className="space-y-3">
                {[
                  "Correct cavity size and flashings for moisture management",
                  "Stainless-steel veneer ties at correct spacing and depth",
                  "Proper control joints and movement gaps to prevent cracking",
                  "Foundations designed for wind and earthquake zones",
                  "All detailing signed off as code-compliant"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#CB4154] font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1621905231727-44023c382617?auto=format&fit=crop&q=80&w=800" 
              className="w-full rounded-lg shadow-2xl" 
              alt="Professional bricklayer working" 
            />
            <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg text-center italic text-gray-500">
              "Your brickwork won't just look perfect on day one—it will still be perfect (and fully compliant) for many years to come."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
