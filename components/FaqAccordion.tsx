
import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How quickly can I get a quote?',
    answer: 'Use the online quote calculator for an instant ballpark estimate. For a firm price, we visit the site to confirm access, ground conditions, and architectural details before confirming a final quote.',
  },
  {
    question: 'Do you work on both residential and commercial projects?',
    answer: 'Yes. From full-house brick veneer to structural block walls and commercial builds, all work is carried out to NZS 3604 standards.',
  },
  {
    question: 'Are you a Licensed Building Practitioner?',
    answer: 'Yes, LBP verified. All detailing is signed off as code-compliant, covering cavity size, flashings, veneer ties, and control joints.',
  },
  {
    question: 'What areas do you service?',
    answer: "We cover Canterbury, including Rolleston and the Port Hills, for both new builds and heritage repoint work.",
  },
  {
    question: 'What happens after I submit a booking request?',
    answer: "We'll be in touch to confirm your site visit, then follow up with a detailed quote based on your project's specific requirements.",
  },
];

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
                className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-45 border-[#F88913] text-[#F88913]' : ''}`}
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
