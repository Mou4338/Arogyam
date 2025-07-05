"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Navtags = [
    { label: "Home", target: "/" },
    { label: "Hospitals", target: "/hospitals" },
    { label: "Emergency", target: "/emergency" },
    { label: "Chatbot", target: "/chatbot" },
    { label: "Reminders", target: "/reminders" },
    { label: "Alerts", target: "/alerts" },
    { label: "Doctors", target: "/doctors" },
  ];

  return (
    <nav className="px-6 py-3 flex items-center justify-between bg-[#3f8578] shadow-md">
      <div className="flex items-center">
        <img src="/arogyam.png" alt="Arogyam Logo" className="w-24" />
      </div>

      <div className="hidden md:flex items-center space-x-6">
        {Navtags.map((nav, index) => (
          <Link
            key={index}
            href={nav.target}
            className="hover:bg-slate-200 rounded px-2 font-heading text-black transition-colors duration-100"
          >
            {nav.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:block relative">
        <input
          type="search"
          placeholder="Search health services.."
          className="border border-gray-600 bg-white text-black rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="md:hidden ">
        <button onClick={() => setIsOpen(!isOpen)} className="hover:cursor-pointer">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden px-6 py-4">
          <div className="flex flex-col space-y-4">
            {Navtags.map((nav, index) => (
              <Link
                key={index}
                href={nav.target}
                className="text-black font-medium hover:bg-[#3f8578] hover:text-white p-2 rounded "
                onClick={() => setIsOpen(false)}
              >
                {nav.label}
              </Link>
            ))}
            <input
              type="search"
              placeholder="Search health services.."
              className="mt-2 border border-gray-600 bg-white text-black rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
