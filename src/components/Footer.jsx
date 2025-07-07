import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const Foottags = [
    { label: "About Arogyam", target: "/about" },
    { label: "Contact us", target: "/contact" },
    { label: "Terms of Use", target: "/termsofUse" },
    { label: "Privacy Policy", target: "/privacy" },
  ];

  return (
    <footer className="bg-[#3f8578] py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

        {/* Top - Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-white font-semibold text-lg mb-4">
          {Foottags.map((tag, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <span className="hidden sm:inline h-5 border-l border-white/60 mx-2" />
              )}
              <Link
                href={tag.target}
                className="hover:underline hover:text-white/90 transition-all"
              >
                {tag.label}
              </Link>
            </React.Fragment>
          ))}
        </div>
         
         <div className="flex flex-wrap justify-center items-center mb-4 space-y-8"></div>

        {/* Bottom - Logo & Copyright */}
        <div className="text-medium text-white/90 mt-2 flex items-center justify-center gap-1">
          <span>© 2025</span>
          <img
            src="/logo.png"
            alt="Arogyam Logo"
            className="w-5 h-5 object-contain"
          />
          <span>@ Arogyam</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

