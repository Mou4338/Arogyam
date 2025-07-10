"use client";

import React from 'react';
import { useForm } from 'react-hook-form';

export default function ScheduleForm({user}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      subject: '',
      description: '',
      date: '',
      time: '',
      email:user?.email ,
      timezone: 'Asia/Kolkata (IST)',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch('api/consultation', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        console.log("Consultation set successfully", result);
        alert("Appointment booked successfully!");
      }
    } catch (error) {
      console.log("Error setting consultation", error);
    }
  };

  return (
    <div className="bg-[#3f8578] shadow-xl border border-black rounded-2xl p-6 space-y-6 text-white max-w-md mx-auto">
      <h3 className="text-2xl font-bold">Book Your Appointment</h3>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

        {/* Subject */}
        <div className="bg-white rounded-xl p-4 shadow">
          <label className="block text-sm font-bold text-gray-800 mb-1">Consult For *</label>
          <input
            type="text"
            {...register('subject', { required: true })}
            placeholder="Enter subject of consultation"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#3f8578] transition"
          />
          {errors.subject && <span className="text-sm text-red-500">Subject is required</span>}
        </div>

        {/* Problem Description */}
        <div className="bg-white rounded-xl p-4 shadow">
          <label className="block text-sm font-bold text-gray-800 mb-1">Problem Description *</label>
          <textarea
            {...register('description', { required: true })}
            rows="4"
            placeholder="Briefly describe your health issue"
            className="w-full px-4 py-2 max-h-[80px] rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#3f8578] transition"
          ></textarea>
          {errors.description && <span className="text-sm text-red-500">Description is required</span>}
        </div>

        {/* Date */}
        <div className="bg-white rounded-xl p-4 shadow">
          <label className="block text-sm font-bold text-gray-800 mb-1">Select Date *</label>
          <input
            type="date"
            {...register('date', { required: true })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#3f8578] transition"
          />
          {errors.date && <span className="text-sm text-red-500">Date is required</span>}
        </div>

        {/* Time */}
        <div className="bg-white rounded-xl p-4 shadow">
          <label className="block text-sm font-bold text-gray-800 mb-1">Select Time *</label>
          <select
            {...register('time', { required: true })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#3f8578] transition"
          >
            <option value="">-- Choose a slot --</option>
            <option>09:00 AM</option>
            <option>11:30 AM</option>
            <option>02:00 PM</option>
            <option>04:30 PM</option>
          </select>
          {errors.time && <span className="text-sm text-red-500">Time is required</span>}
        </div>

        {/* Timezone */}
        <div className="bg-white rounded-xl p-4 shadow">
          <label className="block text-sm font-bold text-gray-800 mb-1">Timezone</label>
          <select
            {...register('timezone')}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3f8578] transition"
          >
            <option>Asia/Kolkata (IST)</option>
            <option>GMT</option>
            <option>EST</option>
            <option>PST</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-center font-bold text-[#3f8578] bg-white hover:bg-gray-200 rounded-lg transition shadow-md"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}
