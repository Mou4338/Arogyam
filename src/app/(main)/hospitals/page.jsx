"use client"
import React from "react"
import FilterControls from '@/components/FilterControls.jsx'
import MapSection from '@/components/MapView.jsx'
import FilterSidebar from '@/components/FilterSidebar.jsx'
import NearbyHospitals from '@/components/NearbyHospitals.jsx'

export default function Home() {
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

