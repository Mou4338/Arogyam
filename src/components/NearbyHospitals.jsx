'use client';

import { useEffect, useState } from 'react';

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('/api/hospitals')
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((err) => console.error('Failed to fetch hospitals:', err));
  }, []);

  return (
    <div className="bg-teal-600 p-5 rounded-xl shadow-xl w-full max-w-sm">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        🏥 Nearby Hospitals
      </h3>

      {/* Scrollable hospital list */}
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
        {hospitals.length === 0 ? (
          <p className="text-white text-sm">No hospitals found nearby.</p>
        ) : (
          hospitals.map((h, i) => {
            const unavailableBeds = h.beds
              ? Object.entries(h.beds)
                  .filter(([_, count]) => count === 0)
                  .map(([type]) => type)
              : [];

            return (
              <div
                key={h.id || `${h.name}-${i}`}
                className="bg-white border border-teal-200 rounded-lg p-4 shadow-md shadow-teal-100 text-teal-900"
              >
                <p className="text-base font-semibold">{h.name}</p>
                <p className="text-sm">{h.address}</p>
                <p className="text-sm mt-1">📍 Distance: {h.distance || '–'}</p>
                <p className="text-sm mt-1">🚗 Time: {h.Time || '–'}</p>
                {/* Show wait time for unavailable beds */}
                {unavailableBeds.length > 0 && h.wait && (
                  <div className="text-xs mt-1 space-y-0">
                    {unavailableBeds.map((type) => (
                      <p className="text-xs" key={type}>
                        ⏱️ {type}: Wait Time: {h.wait || '–'}
                      </p>
                    ))}
                  </div>
                )}

                {/* Bed Grid */}
                {h.beds && (
                  <div className="mt-3 grid grid-cols-2 gap-1 text-sm font-medium">
                    {Object.entries(h.beds).map(([type, count]) => (
                      <span
                        key={type}
                        className="bg-teal-400 rounded px-1 py-1 text-center text-white"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}:{' '}
                        <strong>{count}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

