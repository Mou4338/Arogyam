'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ;

export default function MapSection() {
const mapRef = useRef(null); // ✅ No type annotation in .jsx

useEffect(() => {
if (!mapRef.current || !mapboxgl.accessToken) return;
const map = new mapboxgl.Map({
  container: mapRef.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [85.8245, 20.2961], // Bhubaneswar
  zoom: 12,
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

fetch('/api/hospitals')
  .then((res) => res.json())
  .then((hospitals) => {
    hospitals.forEach((hospital) => {
      if (!hospital.lat || !hospital.lng) return;

      const popupHTML = `
        <div class="text-sm leading-snug text-gray-800 font-normal">
          <strong class="text-base text-[#132d2e]">${hospital.name}</strong><br/>
          <span>${hospital.address}</span><br/>
          📍 <span class="font-medium text-gray-600">${hospital.distance}</span><br/>
          🚗 <span class="font-medium text-gray-600">${hospital.Time}</span><br/>
          ⏳ <span class="font-semibold text-yellow-600">${hospital.wait}</span>
        </div>
      `;

      new mapboxgl.Marker({ color: '#64bcae' })
        .setLngLat([hospital.lng, hospital.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
        .addTo(map);
    });
  })
  .catch((err) => {
    console.error('Error fetching hospital data:', err);
  });

return () => {
  map.remove();
};
}, []);

return (
<div className="bg-white p-4 rounded shadow">
<h3 className="text-lg font-semibold text-[#132d2e]">🗺️ Map View</h3>
<div ref={mapRef} className="h-[400px] w-full mt-3 rounded-xl border" />
</div>
);
}