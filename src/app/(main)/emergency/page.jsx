import React from 'react';
import { Phone } from 'lucide-react';
import Quicktips from '@/components/Quicktips';
import MapSection from '@/components/emergencymap.jsx';
import EmergencyHospital from '@/components/EmergencyHospital.jsx';
import CabBooking from '@/components/CabBooking.jsx';

const Page = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-slate-100 gap-4 p-4">
      {/* Left Side: Map + Emergency Hospitals */}
      <div className="w-full lg:w-[70%] flex flex-col gap-4">
        {/* Map Section */}
        <div className="bg-white rounded-lg p-4 shadow">
          <MapSection />
        </div>

        {/* Emergency Hospital Section */}
        <div className="bg-[#3f8578] rounded-lg p-4 shadow text-white">
          <EmergencyHospital />
        </div>
      </div>

      {/* Right Side: Emergency Call + Tips */}
      <div className="w-full lg:w-[30%] flex flex-col gap-4">
        {/* Emergency Call Box */}
        <div className="flex flex-col items-center justify-center bg-[#3f8578] rounded-lg p-6 shadow text-white">
          <Phone size={30} />
          <div className="border-b border-white w-full my-2" />
          <h1 className="text-xl font-bold">Call Now</h1>
          <h2 className="text-sm text-center">Call now for immediate assistance</h2>
          <a
            href="tel:1234567890"
            className="bg-white text-black mt-3 text-xs font-semibold px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Call 123-456-7890
          </a>
        </div>

        <Quicktips />
        <CabBooking />
      </div>
    </div>
  );
};

export default Page;
