"use client";

import React from 'react';
import { useForm } from 'react-hook-form';

export default function ScheduleForm() {
  const {
    register,handleSubmit,formState: { errors }} = useForm({
    defaultValues: {
      subject: '',
      date: '',
      time: '',
      timezone: 'Asia/Kolkata (IST)',
    },
  });

  const onSubmit = async(data) => {
    console.log(data);
    try{
      const res=await fetch('api/consultation',{
        method:"POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result=await res.json();
      if(res.ok){
        console.log("Consultation set successfully", result);
        alert("Appointment booked successfully!");
      }
    }catch(error){
      console.log("Error setting consultation",error);
    }
  }
  return (
    <div className="bg-[#3f8578] shadow-xl border border-gray-100 rounded-xl p-6 space-y-6 text-white">
      <h3 className="text-xl font-semibold flex items-center gap-2">
         Book Your Appointment
      </h3>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium mb-1">Consult For</label>
          <input
            type="text"
            {...register('subject', { required: true })}
            placeholder='Enter subject of consultation'
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          {errors.subject && <span className="text-sm text-red-200">Subject is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <input
            type="date"
            {...register('date', { required: true })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          {errors.date && <span className="text-sm text-red-200">Date is required</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Select Time</label>
          <select
            {...register('time', { required: true })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            <option value="">-- Choose a slot --</option>
            <option>09:00 AM</option>
            <option>11:30 AM</option>
            <option>02:00 PM</option>
            <option>04:30 PM</option>
          </select>
          {errors.time && <span className="text-sm text-red-200">Time is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Timezone</label>
          <select
            {...register('timezone')}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-white transition"
          >
            <option>Asia/Kolkata (IST)</option>
            <option>GMT</option>
            <option>EST</option>
            <option>PST</option>
          </select>
        </div>

        <button type="submit"
          className="w-full py-3 text-center font-semibold text-[#3f8578] bg-white hover:bg-gray-100 rounded-lg transition shadow-md">
           Confirm Appointment
        </button>
      </form>
    </div>
  );
}
