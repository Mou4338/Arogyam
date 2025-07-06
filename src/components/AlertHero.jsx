"use client";

import React from "react";

export default function AlertHero() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden shadow-md"
             style={{ backgroundImage: "url('/alerthealth.png')" }}>
      <div className="bg-black/10 bg-opacity-50 py-10 px-6 md:px-12 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Public Health Alerts</h1>
        <p className="text-md md:text-lg mb-6">
          Stay informed about critical health issues and advisories affecting your community.
        </p>

        {/* Alert Cards */}
        <div className="space-y-4">
          <div className="bg-red-500 text-white font-semibold px-4 py-2 rounded inline-block shadow-md">
            Urgent Dengue Outbreak Alert: Take immediate precautions in affected areas. Symptoms include high fever, severe headache, and joint pain.
          </div>

          <div className="bg-yellow-400 text-black font-medium px-4 py-2 rounded-full inline-block shadow-md">
            Cholera Advisory: Practice strict hygiene and consume only boiled or filtered water. Report suspected cases immediately.
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button onClick={() => window.location.href = '#outbreaknews'} className="btn-slide px-6 py-2 rounded-md text-white font-medium shadow">
            View All Alerts
          </button>
        </div>
      </div>
    </section>
  );
}