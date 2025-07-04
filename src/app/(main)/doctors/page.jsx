"use client"
import React from "react"
import Head from "next/head"
import DoctorCard from "@/components/DoctorProfile.jsx"
import ScheduleCard from "@/components/ScheduleForm.jsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>Arogyam | Virtual Doctor Consultation</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* <Header /> */}
        <main className="flex-grow px-4 md:px-16 py-10 space-y-12">
          <section>
            <h1 className="text-4xl font-bold text-teal-700 mb-4">Virtual Doctor Consultation</h1>
            <p className="text-lg text-gray-700">
              Schedule video calls with doctors, receive prescriptions, and manage your health from anywhere.
            </p>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DoctorCard />
            <ScheduleCard />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  )
}
