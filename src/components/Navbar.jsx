import React from 'react';
import Link from 'next/link';

const Navbar = () => {
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
        <nav className="bg-slate-100 mx-4 ">
            <div className="flex items-center justify-between p-2">
                <img src='./arogyam.png' className='w-23' />
                <div className="flex space-x-6 p-2">
                    {Navtags.map((nav, index) => (
                        <Link key={index} href={nav.target} passHref className="text-black hover:text-blue-500 transition-colors duration-200">
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
            </div>
        </nav>
    );
};

export default Navbar;