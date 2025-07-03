import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const Foottags = [
    { label: "About Arogyam", target: "/about" },
    { label: "Feedback", target: "/feedback" },
    { label: "Contact us", target: "/contactus" },
    { label: "Terms of Use", target: "/termsofuse" },
    { label: "Privacy", target: "/privacy" },
  ];

  return (
    <footer className="bg-secondary border-t py-6">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4">
        <div className="flex space-x-6 mb-4 md:mb-0">
          {Foottags.map((tag, idx) => (
            <Link
              key={idx}
              href={tag.target}
              className="text-light font-body transition-colors duration-200"
            >
              {idx < Foottags.length  && (
                <span className="hidden sm:inline border-l border-white h-4 mx-2"></span>
              )}
              {tag.label}
            </Link>
          ))}
        </div>
        <div className="text-light text-sm font-body">
          © 2025 Arogyam.
        </div>
      </div>
    </footer>

  );
};

export default Footer;