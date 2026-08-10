
import React from 'react';

const CREDENTIALS = [
  {
    title: 'Master Electricians',
    detail: 'Members of Master Electricians, plus SEANZ and Trade Partners NZ.',
  },
  {
    title: 'Certified to AS/NZS 3000',
    detail: 'Every job carried out to the Wiring Rules and certified on completion.',
  },
  {
    title: '5.0 from 23 Google reviews',
    detail: 'Locally owned and operated in Hamilton since 2021.',
  },
];

/**
 * LbpStrip
 *
 * Trust strip shown directly after the hero on Home and About.
 * Pairs the accreditation logo with the client's registration credentials.
 */
const LbpStrip: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="-mx-6 sm:-mx-8 md:mx-0">
            {/* TODO: swap for a Master Electricians / SEANZ badge once the client
                confirms we can use their association marks. Their own logo stands
                in for now. */}
            <img
              src="/images/ep-logo.png"
              alt="Electrical Potential Ltd"
              className="w-full max-w-[220px] md:max-w-xs mx-auto"
            />
          </div>
          <ul className="space-y-3">
            {CREDENTIALS.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#CB4154] text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                <div>
                  <h3 className="text-sm font-bold oswald uppercase tracking-wide text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LbpStrip;
