// RemainderHeroSection.jsx
import React from "react";

const RemainderHeroSection = () => {
  return (
    <>
    <div className="relative w-[97%] overflow-hidden rounded-2xl m-4 shadow-md">
      <img
        src="/remainder-hero.png" 
        alt="Health Reminders Background"
        className="w-full h-70 object-cover"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Your Path to Better Health, Every Day
        </h1>
        <p className="mb-4 text-sm md:text-base max-w-lg">
          Set smart reminders for water, exercise and habits to stay on track
          towards your health goals.
        </p>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition">
          Get Started
        </button>
      </div>
    </div>
    
    </>
  );
};

export default RemainderHeroSection;