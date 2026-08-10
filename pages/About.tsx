
import React from 'react';
import { SITE } from '../constants';
import { MASONRY_ASSETS, getAssetUrl } from '../constants/images';
import LbpStrip from '../components/LbpStrip';
import BrandMarquee from '../components/BrandMarquee';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative h-64 bg-gray-900 flex items-center justify-center">
        <img 
          src={getAssetUrl(MASONRY_ASSETS.hero.about)} 
          className="absolute inset-0 w-full h-full object-cover opacity-40" 
          alt="Electrical tools"
        />
        <h1 className="relative text-3xl md:text-5xl font-bold oswald text-white uppercase tracking-widest text-center px-4">
          {SITE.seoHeading}
        </h1>
      </div>

      {/* Brands we work with */}
      <BrandMarquee />

      {/* Intro: experience */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center">
        <h2 className="text-3xl font-bold oswald mb-4">Committed To Getting It Right</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          {SITE.name} is fully committed to ensuring client satisfaction. Our team members and contractors are both
          punctual and highly knowledgeable, and we operate with integrity on every job — from a single powerpoint
          through to a full commercial fitout. Locally owned and operated in Hamilton since 2021.
        </p>
      </div>

      {/* Accreditation trust strip */}
      <LbpStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-accent-soft p-8 border-l-4 border-brick-orange rounded-r-lg">
              <h3 className="text-xl font-bold oswald mb-4 uppercase">Industry Compliance</h3>
              <p className="text-gray-800 font-semibold mb-2">Certified to AS/NZS 3000 — The NZ Wiring Rules</p>
              <p className="text-gray-600 text-sm">
                AS/NZS 3000 is the electrical installation standard every registered electrician in New Zealand works to.
                It covers how circuits are designed, protected, earthed and tested, and it is what a Certificate of
                Compliance is issued against when the job is signed off.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold oswald">WHY IT MATTERS:</h3>
              <ul className="space-y-3">
                {[
                  "Circuits correctly rated and protected for the load",
                  "RCD protection where the Wiring Rules require it",
                  "Earthing and bonding tested, not assumed",
                  "Switchboards labelled so the next person can work safely",
                  "Certificate of Compliance issued on completion"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <img
              src={getAssetUrl(MASONRY_ASSETS.misc.team)}
              className="w-full rounded-lg shadow-2xl"
              alt="The Electrical Potential team in front of the company van"
            />
            <div className="p-6 bg-gray-50 border border-gray-100 rounded-lg text-center italic text-gray-500">
              "Local spark, professional finish. Done right, efficiently, safely and to the highest standards."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
