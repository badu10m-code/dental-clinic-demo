import React from 'react';

export const Marquee: React.FC = () => {
  const treatments = [
    'Root Canals',
    'Dental Implants',
    'Invisible Aligners',
    "Kids' Dentistry",
    'Teeth Whitening',
    'Gum Care',
    'Crowns & Bridges',
    'Wisdom Teeth',
  ];

  return (
    <div className="border-y border-[#1c2b26]/10 overflow-hidden py-4 bg-[#fffdf9]">
      <div className="marquee-track">
        {[...treatments, ...treatments, ...treatments].map((item, index) => (
          <span
            key={index}
            className="font-serif text-lg text-[#0e5c4a] flex items-center gap-8 whitespace-nowrap"
          >
            {item}
            <span className="text-[#c79a45] text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
