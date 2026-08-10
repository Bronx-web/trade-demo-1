
import React from 'react';

/**
 * PER-CLIENT: brands the tradie works with. Drop SVG/PNG logos into
 * images/brands/ and list them here.
 */
/**
 * `scale` evens out the row by eye. Each source file bakes in a different amount
 * of surrounding whitespace, so constraining them all to one box still renders
 * the actual marks at different sizes — Trade Partners and SEANZ sit small
 * inside their canvas, Master Electricians fills its own. Nudge these values
 * when swapping logos for a new client rather than adding per-logo classes.
 */
const BRANDS = [
  { name: 'Master Electricians', src: '/images/master-electricians.jpg', scale: 1 },
  { name: 'SEANZ — Sustainable Energy Association New Zealand', src: '/images/seanz-logo.jpg', scale: 1.5 },
  { name: 'Trade Partners NZ', src: '/images/trade-partners.jpg', scale: 1.7 },
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
              /**
               * Fixed-size box per logo with object-contain, rather than sizing
               * the images themselves. The source files have different aspect
               * ratios and built-in whitespace, so a shared `h-8` renders them at
               * visibly different sizes; constraining a uniform box and letting
               * each logo fit inside keeps the row even.
               */
              <div
                key={`${copy}-${brand.name}`}
                className="flex items-center justify-center h-12 md:h-14 w-36 md:w-44 mx-6 md:mx-10 flex-shrink-0"
              >
                <img
                  src={brand.src}
                  alt={copy === 0 ? `${brand.name} logo` : ''}
                  className="max-h-full max-w-full w-auto h-auto object-contain opacity-80"
                  style={{ transform: `scale(${brand.scale})` }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
