"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ContactPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "contacts"), {
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: Timestamp.now(),
      });
      alert("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4 text-black">Contact Us</h1>
      <p className="mb-4">If you have any questions or feedback, feel free to reach out!</p>
      <form className="bg-white p-6 text-black rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
          <input className="border border-gray-300 p-2 w-full" type="text" id="name" {...register('name')} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
          <input className="border border-gray-300 p-2 w-full" type="email" id="email" {...register('email')} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
          <textarea className="border border-gray-300 p-2 w-full" id="message" rows="4" {...register('message')} required></textarea>
        </div>
        <button className="btn-slide px-6 py-2 rounded-md text-white font-medium shadow" type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
