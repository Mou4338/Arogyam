'use client';

import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function BookedHospitalsPage({ bookings }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
    });
  };

  const openDialog = (booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedBooking(null);
    setIsDialogOpen(false);
  };

  const filteredBookings =
    bookings?.filter((b) => b.bedType?.toLowerCase() !== 'emergency') || [];

  const getWaitTime = (booking) => {
    const bedType = booking?.bedType;
    const count = booking?.bedTypeCount?.[bedType] ?? 1;
    const wait =
      typeof booking?.waitTimes === 'object'
        ? booking?.waitTimes?.[bedType]
        : booking?.waitTimes;

    if (count === 0 && wait) {
      return wait;
    }
    return null;
  };

  return (
    <div className="bg-teal-600 p-6 rounded-2xl shadow-xl w-full max-w-6xl mx-auto mt-6 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">📋 Booked Hospitals</h3>

      {filteredBookings.length === 0 ? (
        <p className="text-white font-semibold text-xl">No bed bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((b, idx) => (
            <div
              key={idx}
              className="bg-teal-50 text-teal-900 border border-teal-200 rounded-lg p-5 shadow-md flex flex-col justify-between"
            >
              <div>
                <p className="text-lg font-semibold break-words">{b.name}</p>
                <p className="text-sm mt-1 break-words">{b.address}</p>
                <div className="text-sm mt-3 space-y-1">
                  <p>🛏️ Bed Type: <strong>{b.bedType}</strong></p>
                  <p>📅 Date: {b.date}</p>
                  <p>⏰ Time: {b.time}</p>
                </div>
              </div>
              <button
                className="mt-4 text-sm bg-teal-700 hover:bg-black text-white px-4 py-2 rounded"
                onClick={() => openDialog(b)}
              >
                View Full Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Full Details Dialog */}
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
                <Dialog.Panel className="w-full max-w-md sm:max-w-lg bg-teal-50 border border-teal-600 p-6 sm:p-8 rounded-2xl shadow-xl">
                  <Dialog.Title className="text-2xl sm:text-3xl font-bold text-teal-800 mb-2 break-words">
                    {selectedBooking?.name}
                  </Dialog.Title>
                  <p className="text-sm sm:text-base font-semibold text-teal-800 mb-4 break-words">
                    Address: {selectedBooking?.address}
                  </p>

                  <div className="text-sm text-teal-800 space-y-2 break-words">
                    <p><strong>📅 Booked On:</strong> {getCurrentDateTime()}</p>
                    <p><strong>📍 Distance:</strong> {selectedBooking?.distance?.toFixed(1)} km</p>
                    <p><strong>🛏️ Bed Type:</strong> {selectedBooking?.bedType}</p>
                    <p><strong>📅 Appointment Date:</strong> {selectedBooking?.date}</p>
                    <p><strong>⏰ Time:</strong> {selectedBooking?.time}</p>
                    <p><strong>📞 Phone:</strong> {selectedBooking?.phone}</p>
                    <p><strong>✉️ Email:</strong> {selectedBooking?.email}</p>

                    {getWaitTime(selectedBooking) && (
                      <p><strong>⏱️ Wait Time:</strong> {getWaitTime(selectedBooking)}</p>
                    )}

                    <p><strong>📝 Issue:</strong></p>
                    <p className="bg-white text-black border border-teal-800 p-3 rounded whitespace-pre-line break-words">
                      {selectedBooking?.issue}
                    </p>
                  </div>

                  <div className="mt-6 text-center gap-4 flex flex-col sm:flex-row justify-between">
                    {selectedBooking?.website && (
                      <a
                        href={selectedBooking.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-700 hover:bg-black text-white px-4 py-2 rounded block w-full sm:w-1/2"
                      >
                        Visit Site
                      </a>
                    )}
                    <button
                      className="bg-teal-700 hover:bg-black text-white px-4 py-2 rounded block w-full sm:w-1/2"
                      onClick={closeDialog}
                    >
                      Close
                    </button>
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





