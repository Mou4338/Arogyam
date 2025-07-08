'use client';

import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FilterSidebar from '@/components/FilterSidebar.jsx';

export default function NearbyHospitals({ addBooking }) {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [waitTime, setWaitTime] = useState(60); // Min initially
  const [distance, setDistance] = useState(5); // Min initially

  const origin = [85.8412, 20.2965]; // [lng, lat]

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
            const distance = routeData.routes?.[0]?.distance ? routeData.routes[0].distance / 1000 : null;

            return { ...hospital, distance };
          })
        );

        setHospitals(updatedHospitals);
      } catch (err) {
        console.error('Failed to fetch or calculate distances:', err);
      }
    };

    fetchAndCalculateDistances();
  }, []);

  const openModal = (hospital) => {
    setSelectedHospital(hospital);
    setSelectedBedType('');
    setAppointmentDate('');
    setAppointmentTime('');
    setIssueDescription('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedHospital(null);
    setIsOpen(false);
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    const isWithinDistance = hospital.distance <= distance;

    const hasAcceptableWait = Object.entries(hospital.beds || {})
      .filter(([type]) => type.toLowerCase() !== 'emergency')
      .some(([type, count]) => {
        const wt = Number(hospital.wait?.[type]);
        return (
          count > 0 || (wt >= 0 && wt <= waitTime)
        );
      });

    return isWithinDistance && hasAcceptableWait;
  });

  return (
    <div className="bg-teal-600 p-5 rounded-xl shadow-xl w-full max-w-sm">
      <div className="space-y-4">
        <FilterSidebar
          waitTime={waitTime}
          setWaitTime={setWaitTime}
          distance={distance}
          setDistance={setDistance}
        />
      </div>

      <h3 className="text-xl font-bold text-white mb-4 mt-4 flex items-center gap-2">
        🏥 Nearby Hospitals
      </h3>

      <div className="space-y-2 max-h-[420px] p-2 overflow-y-auto">
        {filteredHospitals.length === 0 ? (
          <p className="text-white text-sm">No hospitals found nearby.</p>
        ) : (
          filteredHospitals.map((h, i) => {
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
                  📍 Distance: {h.distance ? `${h.distance.toFixed(1)} km` : '–'}
                </p>

                {unavailableBeds.length > 0 && h.wait && (
                  <div className="text-xs mt-1">
                    {unavailableBeds.map(([type]) => (
                      <p className="text-xs" key={type}>
                        ⏱️ {type}: Wait Time: {h.wait?.[type] || '–'}
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

      {/* Booking Modal */}
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
                    <p>📍 Distance: {selectedHospital?.distance ? `${selectedHospital.distance.toFixed(1)} km` : '–'}</p>
                    <p>📞 Phone: {selectedHospital?.phone}</p>
                    <p>✉️ Email: {selectedHospital?.email}</p>
                  </div>

                  {selectedHospital?.beds && selectedHospital?.wait && (
                    <div className="mt-2">
                      <div className="space-y-1 text-sm text-teal-800">
                        {Object.entries(selectedHospital.beds)
                          .filter(([type, count]) => count === 0 && type.toLowerCase() !== 'emergency')
                          .map(([type]) => (
                            <p key={type}>
                              ⏱️ {type}: Wait Time: {selectedHospital.wait?.[type] || '–'}
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

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-teal-800">Select Bed Type</label>
                      <select
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        value={selectedBedType}
                        onChange={(e) => setSelectedBedType(e.target.value)}
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
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">Appointment Date</label>
                      <input
                        type="date"
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">Appointment Time</label>
                      <input
                        type="time"
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-teal-800">Describe Health Issue</label>
                      <textarea
                        rows={3}
                        className="w-full mt-1 border border-teal-600 rounded px-3 py-2 resize-none"
                        placeholder="Briefly describe the patient’s condition..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4 justify-between text-center">
                    <button
                      className="w-1/2 bg-[#3f8578] hover:bg-black text-white font-semibold py-2 rounded"
                      onClick={() => {
                        if (
                          !selectedBedType ||
                          !appointmentDate ||
                          !appointmentTime ||
                          !issueDescription.trim()
                        ) {
                          alert('Please fill in all booking details.');
                          return;
                        }

                        const bedCount = selectedHospital?.beds?.[selectedBedType] ?? 1;
                        const waitTime =
                          bedCount === 0
                            ? selectedHospital?.wait?.[selectedBedType] || '–'
                            : null;

                        const bookingDetails = {
                          name: selectedHospital.name,
                          address: selectedHospital.address,
                          distance: selectedHospital.distance,
                          bedType: selectedBedType,
                          date: appointmentDate,
                          time: appointmentTime,
                          issue: issueDescription,
                          wait: selectedHospital.wait,
                          bedTypeCount: selectedHospital.beds,
                          phone: selectedHospital.phone,
                          email: selectedHospital.email,
                          website: selectedHospital.website,
                        };

                        addBooking(bookingDetails);

                        alert(
                          `✅ Booking confirmed for ${selectedBedType} bed at ${selectedHospital.name} on ${appointmentDate} at ${appointmentTime}.`
                        );
                        setIsOpen(false);
                      }}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
