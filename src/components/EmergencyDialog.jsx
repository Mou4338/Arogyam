'use client';

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

export default function EmergencyDialog({
  isOpen,
  closeDialog,
  selectedHospital,
  onSubmit,
  register,
  handleSubmit,
  errors,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
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
  );
}