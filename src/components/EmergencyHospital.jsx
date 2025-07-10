'use client';

import React, { useEffect, useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useForm } from 'react-hook-form';
import EmergencyDialog from '@/components/EmergencyDialog';

const origin = [85.8412, 20.2965];
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function NearbyHospitalsHorizontal({ addEmergencyBooking }) {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxDistance, setMaxDistance] = useState(20);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    fetch('/api/hospitals')
      .then((res) => res.json())
      .then(async (data) => {
        const emergencyOnly = data.filter((h) => h.beds?.Emergency !== undefined);

        const hospitalsWithDistance = await Promise.all(
          emergencyOnly.map(async (h) => {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${h.lng},${h.lat}?overview=false&access_token=${mapboxToken}`;
            try {
              const res = await fetch(url);
              const result = await res.json();
              const distance = result.routes?.[0]?.distance
                ? result.routes[0].distance / 1000
                : null;
              return { ...h, distance };
            } catch (err) {
              console.error('Distance fetch error:', err);
              return { ...h, distance: null };
            }
          })
        );

        const sorted = hospitalsWithDistance
          .map((h) => {
            const emergencyCount = h.beds?.Emergency || 0;
            const waitRaw = h.wait?.Emergency || '';
            const waitMinutes = parseInt(waitRaw.match(/\d+/)?.[0] || '999', 10);
            return {
              ...h,
              beds: { Emergency: emergencyCount },
              wait: emergencyCount === 0 ? waitRaw || 'N/A' : null,
              waitMinutes: emergencyCount === 0 ? waitMinutes : 0,
            };
          })
          .sort((a, b) => {
            if ((b.beds?.Emergency > 0 ? 1 : 0) - (a.beds?.Emergency > 0 ? 1 : 0)) {
              return (b.beds?.Emergency > 0 ? 1 : 0) - (a.beds?.Emergency > 0 ? 1 : 0);
            }
            if ((a.distance ?? Infinity) !== (b.distance ?? Infinity)) {
              return (a.distance ?? Infinity) - (b.distance ?? Infinity);
            }
            return a.waitMinutes - b.waitMinutes;
          });

        setHospitals(sorted);
        setFilteredHospitals(sorted);
      })
      .catch((err) => console.error('Failed to fetch hospitals:', err));
  }, []);

  const applyFilters = () => {
    const result = hospitals.filter(
      (h) =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        h.distance !== null &&
        h.distance <= maxDistance
    );
    setFilteredHospitals(result);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setMaxDistance(20);
    setFilteredHospitals(hospitals);
  };

  const openDialog = (hospital) => {
    setSelectedHospital(hospital);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedHospital(null);
    reset();
  };

  const onSubmit = async (data) => {
    if (!selectedHospital) return;
    const bookingData = {
      name: selectedHospital.name,
      address: selectedHospital.address,
      distance: typeof selectedHospital.distance === 'number'
        ? selectedHospital.distance.toFixed(1)
        : 'N/A',
      bedType: 'Emergency',
      time: data.approxTime,
      issue: data.issueDescription,
      wait: selectedHospital.wait || 'No Waiting Time',
      phone: selectedHospital.phone,
      email: selectedHospital.email,
      website: selectedHospital.website,
      timestamp: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "emergencyBookings"), bookingData);
      alert(`Emergency bed booked at ${selectedHospital.name} for approx ${data.approxTime}`);
      closeDialog();
    } catch (error) {
      console.error("Error booking emergency:", error);
      alert("Failed to book emergency. Try again.");
    }
  };

  return (
    <div className="w-full bg-[#3f8578] rounded-lg p-4 shadow mt-2 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-white mb-3 px-2 flex items-center gap-2">
        Nearby Hospitals
      </h3>

      <div className="flex items-center gap-2 mb-3 px-2">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-white rounded-md border border-teal-300"
        />
        <button
          onClick={applyFilters}
          className="bg-white text-teal-600 font-semibold px-3 py-2 rounded-md hover:bg-black hover:text-white shadow-md"
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3 px-2">
        <div className="p-2 bg-white rounded-md border border-teal-300 w-full">
          <label className="text-black text-sm block mb-1">
            Max Distance: {maxDistance} km
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <button
          onClick={applyFilters}
          className="bg-white text-teal-600 font-semibold px-4 py-2 rounded-md hover:bg-black hover:text-white shadow-md"
        >
          Filter
        </button>
      </div>

      <button
        onClick={resetFilters}
        className="w-full mb-4 bg-red-100 text-red-600 font-semibold py-2 rounded-md hover:bg-black hover:text-white shadow-md"
      >
        Reset
      </button>

      <div className="space-y-4 max-h-[300px] overflow-y-auto px-2 pr-1 scrollbar-thin scrollbar-thumb-teal-400 pb-2">
        {filteredHospitals.length === 0 ? (
          <div className="text-white text-sm">No hospitals found nearby.</div>
        ) : (
          filteredHospitals.map((h, i) => {
            const emergencyBeds = h.beds?.Emergency || 0;
            const showWait = emergencyBeds === 0 && h.wait;

            return (
              <div
                key={`${h.name}-${i}`}
                onClick={() => openDialog(h)}
                className="bg-white border border-teal-200 rounded-xl p-4 shadow-md shadow-teal-100 text-teal-900 cursor-pointer hover:bg-teal-50 transition"
              >
                <p className="text-xl font-bold">{h.name}</p>
                <p className="text-semibold text-medium mt-1 mb-2">Address: {h.address}</p>
                <p className="text-sm mt-1">
                  Distance: {typeof h.distance === 'number' ? `${h.distance.toFixed(1)} km` : '–'}
                </p>
                {showWait && (
                  <p className="text-sm mt-1">⏱️ Emergency Wait Time: {h.wait}</p>
                )}
                <div className="mb-2 mt-3 text-medium font-medium">
                  <span className="bg-teal-400 rounded px-2 py-1 text-center text-white block">
                    Emergency: <strong>{emergencyBeds}</strong>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <EmergencyDialog
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
        selectedHospital={selectedHospital}
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}
