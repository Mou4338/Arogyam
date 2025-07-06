"use client"
import React,{useState} from "react"
import FilterControls from '@/components/FilterControls.jsx'
import MapSection from '@/components/MapView.jsx'
import FilterSidebar from '@/components/FilterSidebar.jsx'
import NearbyHospitals from '@/components/NearbyHospitals.jsx'
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
    <div className="bg-slate-50 min-h-screen">
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
        <div className="lg:col-span-3 space-y-4">
          <FilterControls />
          <MapSection />
        </div>
        <div className="space-y-4">
          <FilterSidebar />
          <NearbyHospitals />
        </div>
      </main>
    </div>
  )
}

