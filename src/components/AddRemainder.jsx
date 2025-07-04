"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { getAuth } from 'firebase/auth';
import { app } from "@/lib/firebaseConfig";

const AddRemainder = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [successMsg, setSuccessMsg] = useState("");

  const sendEmail = async (data, userEmail) => {
    const templateParams = {
      from_name: 'Krishna Mohanty',
      from_email: 'mohantykrishna57@gmail.com',
      to_email: userEmail,
      message: `📝 Reminder: ${data.title}\n📄 Description: ${data.description || 'N/A'}\n🕒 Time: ${data.time}\n📅 Frequency: ${data.frequency}`
    };

    try {
      const result = await emailjs.send(
        'service_5smqzqa',
        'template_kp8umah',
        templateParams,
        'h2k2x1Wt5R_6KFdOC'
      );
      console.log('Email SUCCESS!', result.status, result.text);
    } catch (error) {
      console.error('Email FAILED...', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Server error:", result.error);
        return;
      }

      const auth = getAuth(app);
      const user = auth.currentUser;
      const userEmail = user?.email;

      if (!userEmail) {
        console.error("User not logged in, can't send email.");
        return;
      }

      console.log("Successfully saved reminder:", result);
      setSuccessMsg("Reminder added successfully!");
      reset();

      await sendEmail(data, userEmail);

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Add a New Reminder</h2>
      {successMsg && <p className="text-green-600">{successMsg}</p>}
      <p className="mb-4 text-sm text-slate-200">
        Set reminders for your health goals, like drinking water, exercising, or taking medication.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='gap-4 flex flex-col'>
        <div className="items-center mb-2 px-2">
          <label className="block text-md">Reminder Name</label>
          <input
            type="text"
            placeholder="eg. Drink Water, Take Medicine"
            className='w-full p-2 border border-gray-300 rounded-sm'
            {...register("title", { required: true })}
          />
        </div>
        <div className="items-center mb-2 px-2">
          <label className="block text-md">Description (optional)</label>
          <input
            type="text"
            placeholder="eg. Every 2 hours, before breakfast take Medicine"
            className='w-full p-2 border border-gray-300 rounded-sm'
            {...register("description", { required: false })}
          />
        </div>
        <div className="flex items-center mb-2 px-2">
          <label className="block text-md">Frequency</label>
          <select {...register("frequency", { required: true })}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="flex items-center mb-2 px-2">
          <label className="block text-md">Time</label>
          <input
            type='time'
            {...register("time", { required: true })}
          />
        </div>
        <button type="submit" className='bg-blue-600 px-4 py-2 rounded text-white'>Add Reminder</button>
      </form>
    </>
  );
};

export default AddRemainder;
