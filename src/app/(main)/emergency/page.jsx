'use client'
import React, { useState, useEffect } from "react"
import { Phone } from 'lucide-react';
import Quicktips from '@/components/Quicktips';
import MapSection from '@/components/emergencymap.jsx';
import EmergencyHospital from '@/components/EmergencyHospital.jsx';
import CabBooking from '@/components/CabBooking.jsx';
import EmergencyBooking from '@/components/EmergencyBooking.jsx';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
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

  // Handler to add a new booking
  const addEmergencyBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-slate-100 gap-4 p-4">
      {/* Left Side: Map + Emergency Hospitals */}
      <div className="w-full lg:w-[75%] flex flex-col gap-4">
        {/* Map Section */}
        <div className="bg-white rounded-lg p-4 shadow">
          <MapSection />
        </div>

        {/* Emergency Hospital Section */}
        <div className="gap-4">
          <EmergencyBooking bookings={bookings} />
        </div>
      </div>

      {/* Right Side: Emergency Call + Tips + Nearby Hospitals */}
      <div className="w-full lg:w-[25%] flex flex-col gap-4">
        {/* Emergency Call Box */}
        <Quicktips />
        <EmergencyHospital addEmergencyBooking={addEmergencyBooking}/>
        <CabBooking />
      </div>
    </div>
  );
}

