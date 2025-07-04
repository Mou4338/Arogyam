import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const Navtags = [
    { label: "Home", target: "/" },
    { label: "Hospitals", target: "/HospitalBed" },
    { label: "Emergency", target: "/emergency" },
    { label: "Chatbot", target: "/chatbot" },
    { label: "Reminders", target: "/reminders" },
    { label: "Alerts", target: "/alerts" },
    { label: "Doctors", target: "/doctors" },
  ];

  return (
    <nav className=" px-6 py-2 flex items-center justify-between">
      <img src='/arogyam.png' className='w-23' />
      <div className="flex items-center space-x-6">
        {Navtags.map((nav, index) => (
          <Link
            key={index}
            href={nav.target}
            className=" hover:bg-slate-200 rounded px-2  font-heading text-black transition-colors duration-100"
          >
            {nav.label}
          </Link>
        ))}
      </div>


      <div className="relative">
        <input
          type="search"
          placeholder="Search health services.."
          className="border border-gray-600 bg-white text-black rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    
        </nav >
    );
};

export default Navbar;