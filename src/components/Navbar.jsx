"use client";

import React, { useState,useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getAuth,onAuthStateChanged  } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { User } from "lucide-react";

const Navbar = () => {

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const Navtags = [
    { label: "Home", target: "/" },
    { label: "Hospital Bed", target: "/hospitals" },
    { label: "Emergency", target: "/emergency" },
    { label: "Chatbot", target: "/chatbot" },
    { label: "Reminders", target: "/reminders" },
    { label: "Alerts", target: "/alerts" },
    { label: "Doctors", target: "/doctors" },
  ];

  return (
    <nav className="px-6 py-3 flex items-center justify-between bg-[#3f8578] shadow-md">
      <div className="flex items-center">
        <img src="/logo.png" alt="Arogyam Logo" className="w-10" />
        <h1 className="text-xl font-bold text-white ">Arogyam</h1>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        {Navtags.map((nav, index) => (
          <Link
            key={index}
            href={nav.target}
            className="hover:bg-slate-200 hover:text-black rounded px-2 font-heading text-white transition-colors duration-100"
          >
            {nav.label}
          </Link>
        ))}
        {user && (<Link href='/profile' className="p-2 ">
          <User className="text-black rounded-full hover:cursor-pointer " />
        </Link>)}

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
            {user && (
              <Link
                href="/profile"
                className="flex items-center gap-2 text-black font-medium hover:bg-[#3f8578] hover:text-white p-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
