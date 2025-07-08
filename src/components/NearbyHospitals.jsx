'use client';

import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { db } from '@/lib/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';

export default function NearbyHospitals({ addBooking }) {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const origin = [85.8412, 20.2965];

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
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

        const parseWait = (hospital) => {
          const beds = hospital.beds || {};
          const wait = hospital.wait || {};
          const unavailable = Object.entries(beds).filter(
            ([type, count]) => count === 0 && type.toLowerCase() !== 'emergency'
          );
          const waitTimes = unavailable.map(([type]) => {
            const val = wait[type];
            if (!val) return Infinity;
            const num = parseInt(val.match(/\d+/)?.[0]);
            return isNaN(num) ? Infinity : num;
          });
          return waitTimes.length > 0 ? Math.min(...waitTimes) : Infinity;
        };

        updatedHospitals.sort((a, b) => {
          const distA = a.distance ?? Infinity;
          const distB = b.distance ?? Infinity;
          if (distA !== distB) return distA - distB;
          const waitA = parseWait(a);
          const waitB = parseWait(b);
          return waitA - waitB;
        });

        setHospitals(updatedHospitals);
      } catch (err) {
        console.error('Failed to fetch or calculate distances:', err);
      }
    };

    fetchAndCalculateDistances();
  }, []);

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

  // Handle form submission
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
      alert(
        `✅ Booking confirmed for ${data.bedType} bed at ${selectedHospital.name} on ${data.date} at ${data.time}.`
      );
      setIsOpen(false);
      reset();
    } catch (error) {
      alert('Error saving booking. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="bg-teal-600 p-5 rounded-xl shadow-xl w-full max-w-sm">
      <div className="space-y-4"></div>
      <h3 className="text-xl font-bold text-white mb-4 mt-4 flex items-center gap-2">
        Nearby Hospitals
      </h3>

      <div className="space-y-2 max-h-[420px] p-2 overflow-y-auto">
        {hospitals.length === 0 ? (
          <p className="text-white text-sm">No hospitals found nearby.</p>
        ) : (
          hospitals.map((h, i) => {
            const filteredBeds = h.beds
              ? Object.fromEntries(
                  Object.entries(h.beds).filter(([type]) => type.toLowerCase() !== 'emergency')
                )
              : {};

            const unavailableBeds = Object.entries(filteredBeds).filter(([_, count]) => count === 0);

            return (
              <div
                key={h.id || `${h.name}-${i}`}
                className="cursor-pointer bg-white border border-teal-200 rounded-lg p-4 shadow-md shadow-teal-100 text-teal-900 hover:bg-teal-50 transition"
                onClick={() => openModal(h)}
              >
                <p className="text-base font-semibold">{h.name}</p>
                <p className="text-sm">{h.address}</p>
                <p className="text-sm mt-1">
                  Distance: {h.distance ? `${h.distance.toFixed(1)} km` : '–'}
                </p>

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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="ease-in duration-200"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-teal-50 border border-teal-600 rounded-2xl shadow-xl p-6 text-left align-middle transition-all">
                  <Dialog.Title className="text-3xl font-bold text-teal-800 mb-2">
                    {selectedHospital?.name}
                  </Dialog.Title>
                  <p className="text-medium font-semibold text-teal-800">
                    Address: {selectedHospital?.address}
                  </p>

                  <div className="mt-3 text-sm space-y-1 text-teal-800">
                    <p>
                      Distance:{' '}
                      {selectedHospital?.distance
                        ? `${selectedHospital.distance.toFixed(1)} km`
                        : '-'}
                    </p>
                    <p>Phone: {selectedHospital?.phone}</p>
                    <p>Email: {selectedHospital?.email}</p>
                  </div>

                  {selectedHospital?.beds && selectedHospital?.wait && (
                    <div className="mt-2">
                      <div className="space-y-1 text-sm text-teal-800">
                        {Object.entries(selectedHospital.beds)
                          .filter(([type, count]) => count === 0 && type.toLowerCase() !== 'emergency')
                          .map(([type]) => (
                            <p key={type}>
                              {type}: Wait Time: {selectedHospital.wait?.[type] || '–'}
                            </p>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <h4 className="font-bold text-sm mb-1 text-teal-800">Available Beds:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {selectedHospital?.beds &&
                        Object.entries(selectedHospital.beds)
                          .filter(([type]) => type.toLowerCase() !== 'emergency')
                          .map(([type, count]) => (
                            <div
                              key={type}
                              className="mt-1 bg-teal-300 text-teal-800 rounded px-2 py-1 text-center"
                            >
                              {type}: <strong>{count}</strong>
                            </div>
                          ))}
                    </div>
                  </div>

                  {/* react-hook-form booking form */}
                  <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label className="text-sm font-semibold text-teal-800">Select Bed Type</label>
                      <select
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        {...register('bedType', { required: true })}
                      >
                        <option value="">-- Choose Bed Type --</option>
                        {selectedHospital?.beds &&
                          Object.keys(selectedHospital.beds)
                            .filter((type) => type.toLowerCase() !== 'emergency')
                            .map((type) => (
                              <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                            ))}
                      </select>
                      {errors.bedType && (
                        <span className="text-red-500 text-xs">Please select a bed type.</span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">Appointment Date</label>
                      <input
                        type="date"
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        {...register('date', { required: true })}
                      />
                      {errors.date && (
                        <span className="text-red-500 text-xs">Please select a date.</span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">Appointment Time</label>
                      <input
                        type="time"
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        {...register('time', { required: true })}
                      />
                      {errors.time && (
                        <span className="text-red-500 text-xs">Please select a time.</span>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">
                        Describe Health Issue
                      </label>
                      <textarea
                        rows={3}
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2 resize-none"
                        placeholder="Briefly describe the patient’s condition..."
                        {...register('issue', { required: true })}
                      />
                      {errors.issue && (
                        <span className="text-red-500 text-xs">
                          Please describe the health issue.
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex gap-4 justify-between text-center">
                      <button
                        type="submit"
                        className="w-1/2 bg-[#3f8578] hover:bg-black text-white font-semibold py-2 rounded"
                      >
                        Book Bed
                      </button>
                      <a
                        href={selectedHospital?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-1/2 bg-[#3f8578] hover:bg-black text-white font-semibold py-2 rounded text-center"
                      >
                        Visit Website
                      </a>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
