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
    <footer className="bg-green-800 text-white p-4 ">
      <div className="flex flex-wrap justify-center ">
        {Foottags.map((nav, index) => (
          <React.Fragment key={index}>
            <Link href={nav.target} passHref className="hover:text-black rounded hover:bg-slate-200 hover:px-2 transition-colors duration-200">
                {nav.label}
            </Link>
            {index < Foottags.length - 1 && (
              <span className="border-l border-white h-6 mx-4"></span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="text-xs text-white">@2025 Arogyam</span>
      </div>
    </footer>
  );
};

export default Footer;