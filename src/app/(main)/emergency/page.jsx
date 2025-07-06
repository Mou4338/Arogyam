import React from 'react';
import { Phone } from 'lucide-react';
import Quicktips from '@/components/Quicktips';
import MapSection from '@/components/emergencymap.jsx';
import EmergencyHospital from '@/components/EmergencyHospital.jsx';

const Page = () => {
  return (
    <div className="flex bg-slate-100 flex-row gap-4 p-4">
      {/* Left: Map + Emergency Hospitals */}
      <div className="flex flex-col gap-4 basis-[70%]">
        {/* Map Section - white background */}
        <div className="bg-white rounded-lg p-4">
          <MapSection />
        </div>

        {/* Emergency Hospital Footer - teal background */}
        <div className="bg-[#3f8578] rounded-lg p-4">
          <EmergencyHospital />
        </div>
      </div>

      {/* Right: Emergency call + tips */}
      <div className="flex flex-col gap-4 basis-[30%]">
        <div className="flex flex-col items-center justify-center bg-[#3f8578] rounded-lg p-4">
          <Phone className="text-white" size={25} />
          <span className="border-b border-white w-25 my-2" />
          <h1 className="text-xl font-bold text-white">Call Now</h1>
          <h2 className="text-sm text-white">Call now for Immediate assistance</h2>
          <a
            href="tel:1234567890"
            className="bg-white text-black mt-2 text-xs font-semibold px-4 py-2 rounded bg-gray-200 transition-colors"
          >
            Call 123-456-7890
          </a>
        </div>

        <Quicktips />
      </div>
    </div>
  );
};

export default Page;
