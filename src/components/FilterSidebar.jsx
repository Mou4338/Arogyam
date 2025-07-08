'use client';

import React from 'react';

export default function FilterSidebar({ waitTime, setWaitTime, distance, setDistance }) {
  return (
    <div className="bg-teal-50 border border-teal-500 shadow-xl rounded-2xl p-6 space-y-8">
      <h3 className="text-xl font-bold text-teal-800 tracking-wide flex items-center gap-2">
        🧭 Filter Results
      </h3>

      {/* Wait Time Filter */}
      <div>
        <label className="block text-sm font-semibold text-teal-700 mb-2">
          Avg Wait Time (mins): <span className="text-teal-900 font-bold">{waitTime} min</span>
        </label>
        <input
          type="range"
          min="0"
          max="60"
          value={waitTime}
          onChange={(e) => setWaitTime(Number(e.target.value))}
          className="w-full accent-teal-600"
        />
        <p className="text-xs text-teal-600 mt-1">
          From 0 to 1 hour
        </p>
      </div>

      {/* Distance Filter */}
      <div>
        <label className="block text-sm font-semibold text-teal-700 mb-2">
          Max Distance: <span className="text-teal-900 font-bold">{distance} km</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full accent-teal-600"
        />
        <p className="text-xs text-teal-600 mt-1">
          Select up to 5 km
        </p>
      </div>
    </div>
  );
}



