import React, { useState } from 'react';
import { FAQS } from '../constants';

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-gray-200">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-6 text-left"
            >
              <span className="oswald font-bold text-lg md:text-xl text-gray-900 uppercase">{faq.question}</span>
              <span
                className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-45 border-[#CB4154] text-[#CB4154]' : ''}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="text-gray-600 leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
