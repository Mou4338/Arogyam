"use client";
import React, { useEffect, useState } from "react";
import RemainderHeroSection from "@/components/RemainderHeroSection";
import AddRemainder from "@/components/AddRemainder";
import Remainder from "@/components/Remainder";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig"; 

const Page = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, [auth]);

  return (
    <>
      {user ? (
        <>
          <RemainderHeroSection />

          <div className="bg-slate-100 py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
              <div className="flex-1 p-4 bg-white rounded shadow max-h-[500px] overflow-y-auto">
                <Remainder />
              </div>

              <div className="w-full lg:w-1/3 p-4 bg-[#3f8578] rounded-lg shadow text-white">
                <AddRemainder />
              </div>
            </div>
          </div>
        </>
       ) : (
        <div className="text-center p-10 text-xl text-gray-600">Please log in to access your reminders.</div>
      )} 
    </>
  );
};

export default Page;
