'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  BedDouble,
  Clock,
  StickyNote,
  CalendarDays,
  User,
} from 'lucide-react';
import { db } from '@/lib/firebaseConfig';

export default function BookedHospitalsPage() {
  const [bookings, setBookings] = useState([]);
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

  useEffect(() => {
    const fetchHospitalBookings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'bookings'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(data);
      } catch (err) {
        console.error('Error fetching hospital bookings:', err);
      }
    };

    fetchHospitalBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) => b.bedType?.toLowerCase() !== 'emergency'
  );

  const renderWaitTimes = (waitTimes) => {
    if (!waitTimes || typeof waitTimes !== 'object') return null;

    return Object.entries(waitTimes).map(([bed, wait], i) => (
      <p key={i}>
        <Clock size={14} className="inline-block mr-1" />
        Wait ({bed}): <strong>{wait}</strong>
      </p>
    ));
  };

  return (
    <div className="bg-teal-600 p-6 rounded-2xl shadow-xl w-full max-w-6xl mx-auto mt-6 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <BedDouble size={26} /> Booked Hospitals
      </h3>

      {filteredBookings.length === 0 ? (
        <p className="text-white font-semibold text-xl">No bed bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {filteredBookings.map((b, idx) => (
              <div
                key={idx}
                className="min-w-[300px] max-w-sm bg-teal-50 text-teal-900 border border-teal-200 rounded-lg p-5 shadow-md flex flex-col justify-between"
              >
                <div>
                  <p className="text-lg font-semibold break-words flex items-center gap-2">
                    <User size={18} /> {b.name}
                  </p>
                  <p className="text-sm mt-1 break-words flex items-center gap-1">
                    <MapPin size={16} /> {b.address}
                  </p>
                  <div className="text-sm mt-3 space-y-1">
                    <p>
                      <MapPin size={14} className="inline-block mr-1" />
                      Distance: {b.distance?.toFixed(1)} km
                    </p>
                    <p>
                      <BedDouble size={14} className="inline-block mr-1" />
                      Bed Type: <strong>{b.bedType}</strong>
                    </p>
                    <p>
                      <CalendarDays size={14} className="inline-block mr-1" />
                      Date: {b.date}
                    </p>
                    <p>
                      <Clock size={14} className="inline-block mr-1" />
                      Time: {b.time}
                    </p>
                    {renderWaitTimes(b.wait)}
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
              <form action="onSubmit">
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
                    <Dialog.Title className="text-2xl sm:text-3xl font-bold text-teal-800 mb-2 break-words flex items-center gap-2">
                      <User size={24} /> {selectedBooking?.name}
                    </Dialog.Title>
                    <p className="text-sm sm:text-base font-semibold text-teal-800 mb-4 break-words flex items-center gap-1">
                      <MapPin size={16} /> {selectedBooking?.address}
                    </p>

                    <div className="text-sm text-teal-800 space-y-2 break-words">
                      <p>
                        <Clock size={14} className="inline-block mr-1" />
                        <strong>Booked On:</strong> {getCurrentDateTime()}
                      </p>
                      <p>
                        <MapPin size={14} className="inline-block mr-1" />
                        <strong>Distance:</strong> {selectedBooking?.distance?.toFixed(1)} km
                      </p>
                      <p>
                        <BedDouble size={14} className="inline-block mr-1" />
                        <strong>Bed Type:</strong> {selectedBooking?.bedType}
                      </p>
                      <p>
                        <CalendarDays size={14} className="inline-block mr-1" />
                        <strong>Appointment Date:</strong> {selectedBooking?.date}
                      </p>
                      <p>
                        <Clock size={14} className="inline-block mr-1" />
                        <strong>Time:</strong> {selectedBooking?.time}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone size={16} /> <strong>Phone:</strong> {selectedBooking?.phone}
                      </p>
                      <p className="flex items-center gap-1">
                        <Mail size={16} /> <strong>Email:</strong> {selectedBooking?.email}
                      </p>

                      {renderWaitTimes(selectedBooking?.wait)}

                      {selectedBooking?.issue && (
                        <div>
                          <p className="font-semibold flex items-center gap-1 mt-3">
                            <StickyNote size={16} /> Issue:
                          </p>
                          <p className="bg-white text-black border border-teal-800 p-3 rounded whitespace-pre-line break-words">
                            {selectedBooking.issue}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 text-center gap-4 flex flex-col sm:flex-row justify-between">
                      {selectedBooking?.website && (
                        <a
                          href={selectedBooking.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-teal-700 hover:bg-black text-white px-4 py-2 rounded block w-full sm:w-1/2 flex items-center justify-center gap-1"
                        >
                          <Globe size={16} /> Visit Site
                        </a>
                      )}
                      <a
                          href='https://www.dial4242.com'
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-teal-700 hover:bg-black text-white px-4 py-2 rounded block w-full sm:w-1/2 flex items-center justify-center gap-1"
                        >
                          <Phone size={16} /> Ambulance
                        </a>
                      <button
                        className="bg-red-600 hover:bg-black text-white px-4 py-2 rounded block w-full sm:w-1/2"
                        onClick={async () => {
                          if (selectedBooking?.id) {
                            try {
                              await deleteDoc(doc(db, 'bookings', selectedBooking.id));
                              setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));
                              alert(' Booking deleted successfully');
                              closeDialog();
                            } catch (err) {
                              console.error('Error deleting booking:', err);
                              alert('Failed to delete booking');
                            }
                          }
                        }}
                      >
                        Delete Booking
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
