'use client';

import { useEffect, useState } from 'react';

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('/api/hospitals')
      .then(res => res.json())
      .then(data => setHospitals(data))
      .catch(err => console.error('Failed to fetch hospitals:', err));
  }, []);

  return (
    <div className="bg-teal-600 p-5 rounded-xl shadow-xl w-full max-w-sm">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        🏥 Nearby Hospitals
      </h3>

      {/* Scrollable hospital list */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {hospitals.length === 0 ? (
          <p className="text-white text-sm">No hospitals found nearby.</p>
        ) : (
          hospitals.map((h, i) => (
            <div
              key={h.id || `${h.name}-${i}`}
              className="bg-white border border-teal-200 rounded-lg p-4 shadow-md shadow-teal-100 text-teal-900"
            >
              <p className="text-base font-semibold">{h.name}</p>
              <p className="text-sm">{h.address}</p>
              <p className="text-sm mt-1">
                📍 Distance: {h.distance || '–'}
              </p>
              <p className="text-sm mt-1">
                ⏱️ Wait Time: {h.wait || '–'}
              </p>


              {h.beds && (
                <div className="mt-3 grid grid-cols-2 gap-1 text-xs">
                  <span className="bg-teal-400 rounded px-1 py-1 text-center">
                    General: <strong>{h.beds.general}</strong>
                  </span>
                  <span className="bg-teal-400 rounded px-1 py-1 text-center">
                    ICU: <strong>{h.beds.icu}</strong>
                  </span>
                  <span className="bg-teal-400 rounded px-1 py-1 text-center">
                    Maternity: <strong>{h.beds.maternity}</strong>
                  </span>
                  <span className="bg-teal-400 rounded px-1 py-1 text-center">
                    Emergency: <strong>{h.beds.emergency}</strong>
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}




