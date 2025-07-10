'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function HospitalDialog({
  isOpen,
  closeModal,
  selectedHospital,
  handleSubmit,
  onSubmit,
  register,
  errors,
}) {
  return (
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
  );
}
