
import React from 'react';

const CREDENTIALS = [
  {
    title: 'LBP Licensed',
    detail: 'Licensed Building Practitioner. All work signed off as code-compliant.',
  },
  {
    title: 'Built to NZS 3604',
    detail: 'Cavity size, flashings, veneer ties and control joints done to standard.',
  },
  {
    title: 'Master Practitioner',
    detail: '25 years of residential and commercial brick & blockwork.',
  },
];

/**
 * LbpStrip
 *
 * Trust strip shown directly after the hero on Home and About.
 * Pairs the retaining wall showcase photo with LBP / NZS 3604 credentials.
 */
const LbpStrip: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="-mx-6 sm:-mx-8 md:mx-0">
            <img
              src="/images/lbp-logo.webp"
              alt="Licensed Building Practitioners. Building confidence"
              className="w-full md:max-w-sm md:mx-auto"
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
