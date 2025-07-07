'use client'

import React, { useState, useEffect } from "react"
import FilterControls from '@/components/FilterControls.jsx'
import MapSection from '@/components/MapView.jsx'
import FilterSidebar from '@/components/FilterSidebar.jsx'
import NearbyHospitals from '@/components/NearbyHospitals.jsx'
import BookedHospitals from '@/components/BookedHospitals.jsx'
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

  // Request geolocation on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("User location:", position.coords.latitude, position.coords.longitude);
          // You can store or use this location to fetch nearby hospitals
        },
        (error) => {
          console.warn("Location access denied or unavailable:", error.message);
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
    }
  }, []);

  // Handler to add a new booking
  const addBooking = (bookingDetails) => {
    setBookings((prev) => [...prev, bookingDetails]);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
        <div className="lg:col-span-3 space-y-4">
          <FilterControls />
          <MapSection />
          <BookedHospitals bookings={bookings} />
        </div>
        <div className="space-y-4">
          <FilterSidebar />
          <NearbyHospitals addBooking={addBooking} />
        </div>
      </main>
    </div>
  )
}
