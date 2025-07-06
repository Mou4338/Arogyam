"use client"
import React from 'react'
import { Video } from 'lucide-react'

export default function DoctorProfile() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src="/doctor-ananya.png"
          alt="Dr. Ananya Sharma"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-teal-500"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Dr. Ananya Sharma</h2>
          <p className="text-sm text-gray-600">General Physician & Family Medicine</p>
          <div className="flex justify-center md:justify-start items-center mt-2 text-yellow-500 text-base font-medium">
            ★★★★☆ <span className="ml-1 text-gray-700">4.9</span>
            <span className="ml-2 text-sm text-gray-500">(152 reviews)</span>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            Dr. Ananya Sharma is a highly experienced general physician dedicated to providing compassionate and comprehensive healthcare. With over 15 years of practice, she specializes in preventative care, chronic disease management, and acute illness treatment. Her approach emphasizes personalized care plans and patient education to empower individuals in their health journey.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
          <p className="text-xl font-semibold text-teal-700">15+ Years</p>
          <p className="text-sm text-gray-600">Experience</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-xl font-semibold text-green-700">5,000+</p>
          <p className="text-sm text-gray-600">Happy Patients</p>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-md flex items-center gap-2 transition">
          <Video size={20} /> Book Video Consultation
        </button>
      </div>
    </div>
  )
}
