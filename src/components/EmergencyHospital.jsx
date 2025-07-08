'use client';

import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useForm } from 'react-hook-form';

const origin = [85.8412, 20.2965];
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function NearbyHospitalsHorizontal({ addEmergencyBooking }) {
  const [hospitals, setHospitals] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

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
              name: h.name,
              address: h.address,
              distance: h.distance,
              phone: h.phone,
              email: h.email,
              website: h.website,
              beds: { Emergency: emergencyCount },
              wait: emergencyCount === 0 ? waitRaw || 'N/A' : null,
              waitMinutes: emergencyCount === 0 ? waitMinutes : 0,
            };
          })
          .sort((a, b) => {
            if (a.waitMinutes !== b.waitMinutes) return a.waitMinutes - b.waitMinutes;
            return (a.distance ?? Infinity) - (b.distance ?? Infinity);
          });

        setHospitals(sorted);
      })
      .catch((err) => console.error('Failed to fetch hospitals:', err));
  }, []);

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
    <div className="w-full mt-2">
      <h3 className="text-xl font-bold text-white mb-3 px-2 flex items-center gap-2">
        Nearby Hospitals
      </h3>

      <div className="flex space-x-4 overflow-x-auto pr-2 scrollbar-thin scrollbar-thumb-teal-400 pb-2">
        {hospitals.length === 0 ? (
          <div className="text-white text-sm">No hospitals found nearby.</div>
        ) : (
          hospitals.map((h, i) => {
            const emergencyBeds = h.beds?.Emergency || 0;
            const showWait = emergencyBeds === 0 && h.wait;

            return (
              <div
                key={`${h.name}-${i}`}
                onClick={() => openDialog(h)}
                className="min-w-[250px] max-h-[250px] bg-white border border-teal-200 rounded-xl p-4 shadow-md shadow-teal-100 text-teal-900 cursor-pointer hover:bg-teal-50 transition"
              >
                <p className="text-xl font-bold">{h.name}</p>
                <p className="text-semibold text-medium mt-1 mb-2">Address: {h.address}</p>
                <p className="text-sm mt-1">
                  Distance:{' '}
                  {typeof h.distance === 'number' ? `${h.distance.toFixed(1)} km` : '–'}
                </p>
                {showWait && (
                  <p className="text-sm mt-1">⏱️ Emergency Wait Time: {h.wait}</p>
                )}
                <div className="mb-2 mt-3 text-medium font-medium">
                  <span className="justify-between bg-teal-400 rounded px-2 py-1 text-center text-white block">
                    Emergency: <strong>{emergencyBeds}</strong>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Dialog Box */}
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeDialog}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-teal-50 border border-teal-800 p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-3xl font-bold text-teal-800 mb-2">
                    {selectedHospital?.name}
                  </Dialog.Title>

                  <p className="text-medium font-semibold text-teal-800">
                    Address: {selectedHospital?.address}
                  </p>
                  <div className="mt-3 space-y-1 text-medium text-teal-800">
                    <p>
                      Distance:{' '}
                      {typeof selectedHospital?.distance === 'number'
                        ? `${selectedHospital.distance.toFixed(1)} km`
                        : selectedHospital?.distance || '–'}
                    </p>
                    <p>Phone: {selectedHospital?.phone}</p>
                    <p>Email: {selectedHospital?.email}</p>
                    {selectedHospital?.wait && (
                      <p>Estimated Wait: {selectedHospital.wait}</p>
                    )}
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-teal-800">Approximate Arrival Time</label>
                      <input
                        type="time"
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        {...register("approxTime", { required: true })}
                      />
                      {errors.approxTime && <p className="text-red-500 text-sm">Time is required.</p>}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">Health Issue</label>
                      <textarea
                        rows={3}
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2 resize-none"
                        placeholder="Describe the emergency or patient condition..."
                        {...register("issueDescription", { required: true })}
                      />
                      {errors.issueDescription && <p className="text-red-500 text-sm">Description is required.</p>}
                    </div>

                    <div className="mt-6 flex gap-4 justify-between text-center">
                      <button
                        type="submit"
                        className="w-1/2 bg-teal-600 hover:bg-black text-white font-semibold py-2 rounded"
                      >
                        Book Emergency
                      </button>
                      <a
                        href={selectedHospital?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-1/2 bg-teal-600 hover:bg-black text-white font-semibold py-2 rounded text-center"
                      >
                        Visit Site
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
