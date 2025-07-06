'use client';

import { useEffect, useState } from 'react';

export default function NearbyHospitalsHorizontal() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('/api/hospitals')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => {
          const aBeds = a.beds?.Emergency || 0;
          const bBeds = b.beds?.Emergency || 0;

          if (aBeds > 0 && bBeds === 0) return -1;
          if (aBeds === 0 && bBeds > 0) return 1;

          if (aBeds === 0 && bBeds === 0) {
            const aWait = parseInt((a.wait || '999').split(/[^\d]/)[0]);
            const bWait = parseInt((b.wait || '999').split(/[^\d]/)[0]);
            return aWait - bWait;
          }

          return 0;
        });

        setHospitals(sorted);
      })
      .catch((err) => console.error('Failed to fetch hospitals:', err));
  }, []);

  return (
    <div className="w-full mt-2">
      <h3 className="text-xl font-bold text-white mb-3 px-2 flex items-center gap-2">
        🏥 Nearby Hospitals
      </h3>

      <div className="flex space-x-2 max-w-[830px] overflow-x-auto pr-2 scrollbar-thin scrollbar-thumb-teal-400">
        {hospitals.length === 0 ? (
          <div className="text-white text-sm">No hospitals found nearby.</div>
        ) : (
          hospitals.map((h, i) => {
            const emergencyBeds = h.beds?.Emergency || 0;
            const showWait = emergencyBeds === 0 && h.wait;

            return (
              <div
                key={h.id || `${h.name}-${i}`}
                className="max-w-[280px] bg-white border border-teal-200 rounded-lg p-4 shadow-md shadow-teal-100 text-teal-900 flex-shrink-0"
              >
                <p className="text-base font-semibold">{h.name}</p>
                <p className="text-sm">{h.address}</p>
                <p className="text-sm mt-1">📍 {h.distance || '–'}</p>
                <p className="text-sm">🚗 {h.Time || '–'}</p>

                {showWait && (
                  <p className="text-xs text-black-700 mt-1">
                    ⏱️ Emergency Wait Time: {h.wait}
                  </p>
                )}

                {h.beds?.Emergency !== undefined && (
                  <div className="mt-3 grid grid-cols-2 gap-1 text-sm font-medium">
                    <span className="bg-teal-400 rounded px-1 py-1 text-center text-white col-span-2">
                      Emergency: <strong>{emergencyBeds}</strong>
                    </span>
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

