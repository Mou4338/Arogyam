"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'


const AddRemainder = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const [successMsg, setSuccessMsg] = useState("");

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

    console.log("Successfully sent data", result);
    setSuccessMsg("Reminder added successfully!");
    reset();

    setTimeout(() => setSuccessMsg(""), 3000);

  } catch (error) {
    console.error("Error adding remainder:", error);
  }
};

return (
    <>
        <h2 className="text-2xl  font-semibold mb-2">Add a New Reminder</h2>
        <p className="mb-4 text-sm text-slate-200">
            Set reminders for your health goals, like drinking water, exercising, or taking medication.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-4 flex flex-col '>
            <div className="items-center mb-2 px-2 ">
                <label className="block  text-md ">Reminder Name</label>
                <input
                    type="text"
                    placeholder="eg. Drink Water, Take Medicine"
                    className='w-full p-2 border border-gray-300 rounded-sm'
                    {...register("title", { required: true })}
                />
            </div>
            <div className=" items-center mb-2 px-2 ">
                <label className="block  text-md ">Description (optional)</label>
                <input
                    type="text"
                    placeholder="eg. Every 2 hours,before breakfast take Medicine"
                    className='w-full p-2 border border-gray-300 rounded-sm'
                    {...register("description", { required: false })}
                />
            </div>
            <div className="flex items-center mb-2 px-2 ">
                <label className="block text-md ">Frequency</label>
                <select {...register("frequency", { required: true })}>
                    <option value="daily" className=' px-1 hover:cursor-pointer'>Daily</option>
                    <option value="weekly" className=' px-1 hover:cursor-pointer'>Weekly</option>
                    <option value="monthly" className=' px-1 hover:cursor-pointer'>Monthly</option>
                </select>
            </div>
            <div className="flex items-center mb-2 px-2 ">
                <label className="block  text-md ">Time</label>
                <input
                    type='time'
                    {...register("time", { required: true })}
                />
            </div>
            <button type="submit" className=' rounded-md text-white'>Add Reminder</button>
        </form>
    </>
)
}

export default AddRemainder
