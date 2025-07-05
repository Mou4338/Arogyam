import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const Foottags = [
    { label: "About Arogyam", target: "/about" },
    { label: "Contact us", target: "/contact" },
    { label: "Terms of Use", target: "/termsofuse" },
    { label: "Privacy", target: "/privacy" },
  ];

  return (
    <footer className="bg-secondary  py-6">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4">
        <div className="flex  mb-4 md:mb-0">
          {Foottags.map((tag, idx) => (
            <Link
              key={idx}
              href={tag.target}
              className="text-black hover:text-white font-body transition-colors duration-200 pl-2"
            >
              {idx < Foottags.length  && (
                <span className="hidden sm:inline border-l border-black h-4 mx-4 "></span>
              )}
              {tag.label}
            </Link>
          ))}
        </div>
        <div className="flex text-light text-sm font-body">
          © 2025
          <img src="/logo.png" alt="Arogyam Logo" className="w-5" />
           Arogyam.
        </div>
      </div>
    </footer>

  );
};

export default Footer;