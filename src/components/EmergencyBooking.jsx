'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { db } from '@/lib/firebaseConfig';
import { MapPin, Phone, Mail, Globe, StickyNote } from 'lucide-react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';


export default function BookedEmergency() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setIsDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleDelete = async (bookingId) => {
  if (!bookingId) return;
  try {
    await deleteDoc(doc(db, 'emergencyBookings', bookingId));
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    // Optionally close dialog if deleting from dialog
    if (selectedBooking?.id === bookingId) closeDialog();
  } catch (error) {
    alert('Failed to delete booking.');
    console.error(error);
  }
};


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsRef = collection(db, 'emergencyBookings');
        const snapshot = await getDocs(bookingsRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  if (!bookings.length) {
    return (
      <div className="mt-4 mb-4 bg-[#3f8578] text-white font-semibold rounded-2xl shadow-xl p-4 text-xl px-4">
        No emergency bookings made yet.
      </div>
    );
  }

  return (
    <div className="mt-3 mb-3 w-full bg-[#3f8578] rounded-2xl shadow-xl p-4">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <StickyNote size={22} className="inline-block" />
        Booked Emergency Beds
      </h3>

      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-teal-400 pb-2">
        {bookings.map((booking, i) => (
          <div
            key={i}
            className="max-w-[300px] sm:min-w-[260px] md:min-w-[280px] bg-teal-50 border border-teal-600 rounded-2xl shadow-xl p-4 text-teal-800 flex-shrink-0"
          >
            <p className="text-xl font-bold mb-1">{booking.name}</p>
            <p className="text-medium mt-1 flex items-center gap-1">
              <MapPin size={16} /> Address: {booking.address}
            </p>
            <p className="text-sm mt-1">Distance: {booking.distance}</p>
            <p className="text-sm mt-1">Bed Type: <strong>{booking.bedType}</strong></p>
            <p className="text-sm mt-1">Arrival: {booking.time}</p>
            <p className="text-sm mt-1">Wait: {booking.wait || 'No Waiting'}</p>

            <button
              onClick={() => openDialog(booking)}
              className="mt-3 w-full bg-teal-500 hover:bg-black text-white py-1.5 text-sm rounded transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Dialog for details */}
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-teal-50 border border-teal-600 p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-3xl font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <StickyNote size={28} /> {selectedBooking?.name}
                  </Dialog.Title>

                  <p className="text-medium font-semibold text-teal-700 mb-1 flex items-center gap-1">
                    <MapPin size={16} /> Address: {selectedBooking?.address}
                  </p>

                  <div className="mt-3 space-y-2 text-medium text-teal-800">
                    <p>Booked On: {getCurrentDateTime()}</p>
                    <p>Distance: {selectedBooking?.distance}</p>
                    <p>Bed Type: {selectedBooking?.bedType}</p>
                    <p>Approx. Arrival Time: {selectedBooking?.time}</p>
                    <p>Wait Time: {selectedBooking?.wait || 'No Waiting'}</p>
                    <p className="flex items-center gap-1">
                      <Phone size={16} /> Phone: {selectedBooking?.phone}
                    </p>
                    <p className="flex items-center gap-1">
                      <Mail size={16} /> Email: {selectedBooking?.email}
                    </p>
                    {selectedBooking?.issue && (
                      <div>
                        <p className="font-semibold flex items-center gap-1">
                          <StickyNote size={16} /> Issue:
                        </p>
                        <p className="text-black border border-teal-800 bg-white p-3 rounded-md mt-2 whitespace-pre-line">
                          {selectedBooking.issue}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
                    {selectedBooking?.website && (
                      <a
                        href={selectedBooking.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-700 hover:bg-black text-white px-4 py-2 rounded w-full sm:w-1/2 text-center flex items-center justify-center gap-1"
                      >
                        <Globe size={16} /> Visit Site
                      </a>
                    )}
                    <a
                    href='https://www.dial4242.com'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-700 hover:bg-black text-white px-4 py-2 rounded block w-full sm:w-1/2 flex items-center justify-center gap-1">
                    <Phone size={16} /> Ambulance
                    </a>
                    <button
                      onClick={() => handleDelete(selectedBooking.id)}
                      className="bg-red-600 hover:bg-black text-white px-4 py-2 rounded w-full sm:w-1/2"
                    >
                      Delete
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
