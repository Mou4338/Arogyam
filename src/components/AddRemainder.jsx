'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { app, db } from '@/lib/firebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';

const AddReminder = ({ existingReminder = null, onSuccess, user }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [successMsg, setSuccessMsg] = useState('');
  const frequency = watch('frequency');
  const slotCount = watch('slotCount') || 1;

  useEffect(() => {
    if (existingReminder) {
      reset(existingReminder);
    }
  }, [existingReminder, reset]);

useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user, setValue]);
//   const sendEmail = async (data, userEmail) => {
//     const slotCount = Object.keys(data).filter((key) => key.startsWith('time')).length;

//     const extraInfo =
//       data.frequency === 'weekly'
//         ? `Day: ${data.weekDay}`
//         : data.frequency === 'monthly'
//           ? `Date: ${data.monthDate}`
//           : data.frequency === 'specific'
//             ? `Specific Date: ${data.specificDate}`
//             : '';

//     const timeSlots = Array.from({ length: slotCount }, (_, i) => data[`time${i + 1}`]).join(', ');

//     const templateParams = {
//       from_name: 'Krishna Mohanty',
//       from_email: 'mohantykrishna57@gmail.com',
//       to_email: userEmail,
//       message: `Reminder: ${data.title}
// Description: ${data.description || 'N/A'}
// Times: ${timeSlots}
// Frequency: ${data.frequency}
// ${extraInfo}
// Category: ${data.category}`,
//     };

//     try {
//       const result = await emailjs.send(
//         'service_5smqzqa',
//         'template_kp8umah',
//         templateParams,
//         'h2k2x1Wt5R_6KFdOC'
//       );
//       console.log("Email sent", result);
//     } catch (error) {
//       console.error('Email FAILED ', JSON.stringify(error, null, 2));
//     }
//   };


  const onSubmit = async (data) => {
    try {

      const docRef = existingReminder
        ? doc(db, 'reminders', existingReminder.id)
        : doc(collection(db, 'reminders'));

      await setDoc(docRef, {
        ...data,
        userEmail:user.email,
      });

      // await sendEmail(data, userEmail);

      setSuccessMsg('Reminder saved and email sent!');
      reset();
      onSuccess?.();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-3 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-white"> Add Health Reminder</h2>
      <p className="text-sm mb-6 text-white">
        Schedule alerts to stay consistent with your wellness routines - hydration, medication, exercise, and more.
      </p>

      {successMsg && (
        <p className="bg-green-200 text-green-800 px-4 py-2 mb-4 rounded text-sm">
          {successMsg}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Reminder Name */}
        <div className="bg-white rounded-lg shadow p-4">
          <label className="block font-medium text-gray-800 mb-1">Reminder Name *</label>
          <input
            type="text"
            placeholder="e.g. Take Medicine"
            className="w-full p-2 border border-gray-300 rounded text-black"
            {...register('title', { required: 'Reminder name is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow p-4">
          <label className="block font-medium text-gray-800 mb-1">Description (Optional)</label>
          <input
            type="text"
            placeholder="e.g. After breakfast or before bed"
            className="w-full p-2 border border-gray-300 rounded text-black"
            {...register('description')}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <label className="block font-medium text-gray-800 mb-1">Category *</label>
          <select
            className="w-full p-2 border border-gray-300 rounded text-black"
            {...register('category', { required: true })}
          >
            <option value="">Select a category</option>
            <option value="medication">Medication</option>
            <option value="hydration">Hydration</option>
            <option value="exercise">Exercise</option>
            <option value="checkup">Checkup</option>
            <option value="diet">Diet</option>
          </select>
        </div>

        {/* Frequency */}
        <div className="bg-white rounded-lg shadow p-4">
          <label className="block font-medium text-gray-800 mb-1">Frequency *</label>
          <select
            className="w-full p-2 border border-gray-300 rounded text-black"
            {...register('frequency', { required: true })}
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="specific">Specific Date</option>
          </select>
        </div>

        {/* Weekly */}
        {frequency === 'weekly' && (
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block font-medium text-gray-800 mb-1">Day of the Week *</label>
            <select
              className="w-full p-2 border border-gray-300 rounded text-black"
              {...register('weekDay', { required: true })}
            >
              <option value="">Select day</option>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                (day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {/* Monthly */}
        {frequency === 'monthly' && (
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block font-medium text-gray-800 mb-1">Date of Month *</label>
            <select
              className="w-full p-2 border border-gray-300 rounded text-black"
              {...register('monthDate', { required: true })}
            >
              <option value="">Select date</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Specific Date */}
        {frequency === 'specific' && (
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block font-medium text-gray-800 mb-1">Select Specific Date *</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded text-black"
              {...register('specificDate', { required: true })}
            />
          </div>
        )}

        {/* Slot Count */}
        <div className="bg-white rounded-lg shadow p-4">
          <label className="block font-medium text-gray-800 mb-1">Time Slots (1–5)</label>
          <select
            className="w-full p-2 border border-gray-300 rounded text-black"
            {...register('slotCount', { required: true })}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Slot{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: slotCount }, (_, i) => (
            <div key={`time${i + 1}`} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <label className="font-medium text-gray-800 mb-1">Slot {i + 1}</label>
              <input
                type="time"
                className="p-2 border border-gray-300 rounded text-black"
                {...register(`time${i + 1}`, { required: true })}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-white text-[#3f8578] font-semibold py-2 px-6 rounded-lg hover:bg-slate-100 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
          >
            {existingReminder ? ' Update Reminder' : ' Add Reminder'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReminder;


