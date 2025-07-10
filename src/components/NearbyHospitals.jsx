'use client';

import { useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import HospitalDialog from '@/components/HospitalDialog';

export default function NearbyHospitals({ addBooking }) {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxDistance, setMaxDistance] = useState(20);
  const [selectedBedType, setSelectedBedType] = useState('');

  const origin = [85.8412, 20.2965];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchAndCalculateDistances = async () => {
      try {
        const res = await fetch('/api/hospitals');
        const data = await res.json();

        const updatedHospitals = await Promise.all(
          data.map(async (hospital) => {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${hospital.lng},${hospital.lat}?overview=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
            const res = await fetch(url);
            const routeData = await res.json();
            const distance = routeData.routes?.[0]?.distance
              ? routeData.routes[0].distance / 1000
              : null;

            return { ...hospital, distance };
          })
        );

        const sortedHospitals = updatedHospitals
          .filter(h => h.distance !== null)
          .sort((a, b) => a.distance - b.distance);

        setHospitals(sortedHospitals);
        setFilteredHospitals(sortedHospitals);
      } catch (err) {
        console.error('Failed to fetch or calculate distances:', err);
      }
    };

    fetchAndCalculateDistances();
  }, []);

  const applyFilters = () => {
    let result = hospitals.filter((h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    result = result.filter((h) => h.distance !== null && h.distance <= maxDistance);
    result.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
    setFilteredHospitals(result);
  };

  const applyBedTypeFilter = () => {
    let result = hospitals.filter((h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    result = result.filter((h) => h.distance !== null && h.distance <= maxDistance);

    if (selectedBedType) {
      const available = result.filter((h) => h.beds?.[selectedBedType] > 0);
      const unavailable = result
        .filter((h) => h.beds?.[selectedBedType] === 0)
        .sort((a, b) => {
          const distA = a.distance ?? Infinity;
          const distB = b.distance ?? Infinity;
          if (distA !== distB) return distA - distB;

          const waitA = parseInt(a.wait?.[selectedBedType]?.match(/\d+/)?.[0] || '999');
          const waitB = parseInt(b.wait?.[selectedBedType]?.match(/\d+/)?.[0] || '999');
          return waitA - waitB;
        });
      result = [...available.sort((a, b) => a.distance - b.distance), ...unavailable];
    }

    setFilteredHospitals(result);
  };

  const openModal = (hospital) => {
    setSelectedHospital(hospital);
    setIsOpen(true);
    reset();
  };

  const closeModal = () => {
    setSelectedHospital(null);
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    if (!selectedHospital) return;

    const bookingDetails = {
      ...data,
      name: selectedHospital.name,
      address: selectedHospital.address,
      distance: selectedHospital.distance,
      wait: selectedHospital.wait,
      bedTypeCount: selectedHospital.beds,
      phone: selectedHospital.phone,
      email: selectedHospital.email,
      website: selectedHospital.website,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'bookings'), bookingDetails);
      addBooking(bookingDetails);
      alert(`✅ Booking confirmed for ${data.bedType} bed at ${selectedHospital.name} on ${data.date} at ${data.time}.`);
      setIsOpen(false);
      reset();
    } catch (error) {
      alert('Error saving booking. Please try again.');
      console.error(error);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setMaxDistance(20);
    setSelectedBedType('');
    setFilteredHospitals(hospitals);
  };

  const bedTypes = Array.from(
    new Set(
      hospitals.flatMap((h) =>
        Object.keys(h.beds || {}).filter((t) => t.toLowerCase() !== 'emergency')
      )
    )
  );

  return (
    <div className="bg-teal-600 p-5 rounded-xl shadow-xl w-full max-w-sm">
      <h3 className="text-xl font-bold text-white mb-4 mt-4 flex items-center gap-2">
        Nearby Hospitals
      </h3>

      <div className="flex items-center gap-2 mb-2">
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

      <div className="flex mt-4 items-center gap-2 mb-3">
        <div className="flex-1 p-2 bg-white rounded-md border border-teal-300">
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
          className="bg-white text-teal-600 font-semibold px-3 py-2 rounded-md hover:bg-black hover:text-white shadow-md"
        >
          Filter
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <select
          className="w-full bg-white p-2 rounded-md border border-teal-300"
          value={selectedBedType}
          onChange={(e) => setSelectedBedType(e.target.value)}
        >
          <option value="">Select Bed Type</option>
          {bedTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={applyBedTypeFilter}
          className="bg-white text-teal-600 font-semibold px-3 py-2 rounded-md hover:bg-black hover:text-white shadow-md"
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

      <div className="space-y-2 max-h-[420px] p-2 overflow-y-auto">
        {filteredHospitals.length === 0 ? (
          <p className="text-white text-sm">No hospitals found nearby.</p>
        ) : (
          filteredHospitals.map((h, i) => {
            const filteredBeds = h.beds
              ? Object.fromEntries(
                  Object.entries(h.beds).filter(
                    ([type]) => type.toLowerCase() !== 'emergency'
                  )
                )
              : {};

            const unavailable = selectedBedType && h.beds?.[selectedBedType] === 0;
            const unavailableBeds = Object.entries(filteredBeds).filter(([_, count]) => count === 0);

            return (
              <div
                key={h.id || `${h.name}-${i}`}
                className={`cursor-pointer bg-white border border-teal-200 rounded-lg p-4 shadow-md shadow-teal-100 text-teal-900 hover:bg-teal-50 transition ${
                  unavailable ? 'opacity-80' : ''
                }`}
                onClick={() => openModal(h)}
              >
                <p className="text-base font-semibold">{h.name}</p>
                <p className="text-sm">{h.address}</p>
                <p className="text-sm mt-1">
                  Distance: {h.distance ? `${h.distance.toFixed(1)} km` : '–'}
                </p>

                {unavailable && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">
                    Unavailable {selectedBedType.charAt(0).toUpperCase() + selectedBedType.slice(1)} bed
                  </p>
                )}

                {unavailableBeds.length > 0 && h.wait && (
                  <div className="text-xs mt-1">
                    {unavailableBeds.map(([type]) => (
                      <p className="text-xs" key={type}>
                        {type}: Wait Time: {h.wait?.[type] || '–'}
                      </p>
                    ))}
                  </div>
                )}

                {Object.keys(filteredBeds).length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-1 text-sm font-medium">
                    {Object.entries(filteredBeds).map(([type, count]) => (
                      <span
                        key={type}
                        className="bg-teal-400 rounded px-1 py-1 text-center text-white"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}: <strong>{count}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <HospitalDialog
        isOpen={isOpen}
        closeModal={closeModal}
        selectedHospital={selectedHospital}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
}
