'use client';

import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function NearbyHospitalsHorizontal({ addEmergencyBooking }) {
  const [hospitals, setHospitals] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [approxTime, setApproxTime] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  useEffect(() => {
    fetch('/api/hospitals')
      .then((res) => res.json())
      .then((data) => {
        const emergencyOnly = data
          .map((h) => {
            const emergencyCount = h.beds?.Emergency || 0;
            const emergencyWait = emergencyCount === 0 ? h.wait?.Emergency || 'N/A' : null;

            return {
              name: h.name,
              address: h.address,
              distance: h.distance,
              Time: h.Time,
              phone: h.phone,
              email: h.email,
              website: h.website,
              beds: { Emergency: emergencyCount },
              wait: emergencyWait,
            };
          })
          .sort((a, b) => {
            const aBeds = a.beds?.Emergency || 0;
            const bBeds = b.beds?.Emergency || 0;
            if (aBeds > 0 && bBeds === 0) return -1;
            if (aBeds === 0 && bBeds > 0) return 1;
            const aWait = parseInt((a.wait || '999').match(/\d+/)?.[0] || '999');
            const bWait = parseInt((b.wait || '999').match(/\d+/)?.[0] || '999');
            return aWait - bWait;
          });

        setHospitals(emergencyOnly);
      })
      .catch((err) => console.error('Failed to fetch hospitals:', err));
  }, []);

  const openDialog = (hospital) => {
    setSelectedHospital(hospital);
    setApproxTime('');
    setIssueDescription('');
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedHospital(null);
  };

  const handleBookEmergency = () => {
    if (!approxTime.trim() || !issueDescription.trim()) {
      alert('Please enter all required details.');
      return;
    }

    const bookingData = {
      name: selectedHospital.name,
      address: selectedHospital.address,
      distance: selectedHospital.distance,
      Time: selectedHospital.Time,
      bedType: 'Emergency',
      time: approxTime,
      issue: issueDescription,
      wait: selectedHospital.wait || 'No Waiting Time',
      phone: selectedHospital.phone,
      email: selectedHospital.email,
      website: selectedHospital.website,
    };

    addEmergencyBooking(bookingData);
    alert(`✅ Emergency bed booked at ${selectedHospital.name} for approx ${approxTime}`);
    closeDialog();
  };

  return (
    <div className="w-full mt-2">
      <h3 className="text-xl font-bold text-white mb-3 px-2 flex items-center gap-2">
        🏥 Nearby Hospitals
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
                <p className="text-medium font-bold">{h.name}</p>
                <p className="text-semibold text-medium mt-1 mb-2">Address: {h.address}</p>
                <p className="text-sm mt-1">📍 Distance {h.distance || '–'}</p>
                <p className="text-sm mt-1">🚗 Time: {h.Time || '–'}</p>
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

                  <p className="text-medium font-semibold text-teal-800">📍 Address: {selectedHospital?.address}</p>
                  <div className="mt-3 space-y-1 text-medium text-teal-800">
                    <p>📏 Distance: {selectedHospital?.distance}</p>
                    <p>🚗 Time: {selectedHospital?.Time}</p>
                    <p>📞 Phone: {selectedHospital?.phone}</p>
                    <p>📧 Email: {selectedHospital?.email}</p>
                    {selectedHospital?.wait && (
                      <p>⏱️ Estimated Wait: {selectedHospital.wait}</p>
                    )}
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-teal-800">
                        Approximate Arrival Time
                      </label>
                      <input
                        type="time"
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        value={approxTime}
                        onChange={(e) => setApproxTime(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">Health Issue</label>
                      <textarea
                        rows={3}
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2 resize-none"
                        placeholder="Describe the emergency or patient condition..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4 justify-between text-center">
                    <button
                      className="w-1/2 bg-teal-600 hover:bg-black text-white font-semibold py-2 rounded"
                      onClick={handleBookEmergency}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}



