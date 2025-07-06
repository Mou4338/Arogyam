"use client"
import React, { useState, useEffect } from "react";
import Head from "next/head";
import DoctorCard from "@/components/DoctorProfile";
import ScheduleCard from "@/components/ScheduleForm";
import Consultation from "@/components/Consultation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth/signup");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>Arogyam | Virtual Doctor Consultation</title>
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow px-4 md:px-16 py-10 space-y-12">
          <section className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4">
              Virtual Doctor Consultation
            </h1>
            <p className="text-lg text-gray-700">
              Schedule video calls with doctors, receive prescriptions, and manage your health from anywhere.
            </p>
          </section>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-8">
              <DoctorCard />
              <Consultation />
            </div>

            <div className="lg:w-1/3">
              <ScheduleCard />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
