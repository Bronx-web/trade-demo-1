
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
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CREDENTIALS.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent text-accent-ink flex items-center justify-center text-[10px] font-bold">
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
    </section>
  );
};

export default LbpStrip;
