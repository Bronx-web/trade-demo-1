
import React from 'react';

/**
 * PER-CLIENT: brands the tradie works with. Drop SVG/PNG logos into
 * images/brands/ and list them here.
 */
const BRANDS = [
  { name: 'Midland Brick South Island', src: '/images/mb-brick-logo.png' },
  { name: 'PGH Bricks & Pavers', src: '/images/Png-bricks-logo.png' },
  { name: 'Austral Bricks', src: '/images/austural-bricks-logo.png' },
];

/**
 * BrandMarquee
 *
 * Infinite looping logo strip. The track renders the logo set twice and the
 * marquee-scroll keyframes (index.css) slide it -50%, so the loop is seamless.
 */
const BrandMarquee: React.FC = () => {
  return (
    <section className="bg-white py-6 overflow-hidden" aria-label="Brands we work with">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {BRANDS.map((brand) => (
              <img
                key={`${copy}-${brand.name}`}
                src={brand.src}
                alt={copy === 0 ? `${brand.name} logo` : ''}
                className="h-8 md:h-10 w-auto mx-10 md:mx-16 opacity-80"
                loading="lazy"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
