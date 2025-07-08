'use client';

import { useEffect, useState } from 'react';

export default function CabBookingWidget() {
  const [loading, setLoading] = useState(false);
  const [userLoc, setUserLoc] = useState({ lat: null, lng: null });

  const hospitalLoc = {
    lat: 20.2952, // ESI Hospital example
    lng: 85.8406,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
        });
      },
      (err) => {
        console.warn('Could not fetch location:', err);
      }
    );
  }, []);

  const buildUberLink = () => {
    return `https://m.uber.com/ul/?action=setPickup&client_id=YOUR_CLIENT_ID&pickup[latitude]=${userLoc.lat}&pickup[longitude]=${userLoc.lng}&dropoff[latitude]=${hospitalLoc.lat}&dropoff[longitude]=${hospitalLoc.lng}&dropoff[nickname]=Hospital`;
  };

  const buildOlaLink = () => {
    return `https://book.olacabs.com/?pickup_lat=${userLoc.lat}&pickup_lng=${userLoc.lng}&drop_lat=${hospitalLoc.lat}&drop_lng=${hospitalLoc.lng}&category=auto`;
  };

  const isReady = userLoc.lat && userLoc.lng;

  return (
    <div className="bg-teal-50 border border-teal-500 shadow-xl rounded-2xl p-6 space-y-8">
      <h4 className="text-lg font-bold text-[#225b5c] mb-2">Need a Ride?</h4>
      <p className="text-sm mb-3 text-gray-600">Book an Ola or Uber to reach the hospital quickly.</p>

      {!isReady && (
        <div className="text-sm text-yellow-600 mb-3">
          Getting your location... Please allow permission.
        </div>
      )}

      <div className="space-y-2">
        <a
          href={isReady ? buildUberLink() : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center w-full px-4 py-2 rounded font-semibold transition duration-200 ${
            isReady
              ? 'bg-[#3f8578] text-white hover:bg-[#326e64] cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Book via Uber
        </a>

        <a
          href={isReady ? buildOlaLink() : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center w-full px-4 py-2 rounded font-semibold transition duration-200 ${
            isReady
              ? 'bg-[#3f8578] text-white hover:bg-[#326e64] cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Book via Ola
        </a>
      </div>
    </div>
  );
}
