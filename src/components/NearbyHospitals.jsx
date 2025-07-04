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
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold text-[#132d2e] mb-3">🏥 Nearby Hospitals</h3>
      <ul className="space-y-4">
        {hospitals.map((h, i) => (
          <li key={h.id || `${h.name}-${i}`} className="border-b pb-3">
            <p className="font-semibold text-sm text-[#132d2e]">{h.name}</p>
            <p className="text-xs text-gray-600">{h.address}</p>
            <p className="text-xs text-gray-500">{h.distance || '–'} • Wait Time: {h.wait || '–'}</p>
            {h.beds && (
              <div className="mt-1 text-xs text-gray-700 grid grid-cols-3 gap-0">
                <span>General: <strong>{h.beds.general}</strong></span>
                <span>ICU: <strong>{h.beds.icu}</strong></span>
                <span>Emergency: <strong>{h.beds.emergency}</strong></span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}



