'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FilterEmergency from './FilterControls.jsx';
import { Car, Footprints as Walk, Bike } from 'lucide-react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapSection() {
  const mapRef = useRef(null);
  const origin = [85.8412, 20.2965];
  const [map, setMap] = useState(null);
  const [travelMode, setTravelMode] = useState('driving');
  const [destination, setDestination] = useState(null);
  const [durations, setDurations] = useState({ driving: null, walking: null, cycling: null });
  const [allHospitals, setAllHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current || !mapboxgl.accessToken) return;

    const initMap = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: origin,
      zoom: 15,
    });

    initMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(initMap);

    fetch('/api/hospitals')
      .then((res) => res.json())
      .then(async (hospitals) => {
        const emergencyHospitals = hospitals.filter((h) => h.beds?.Emergency !== undefined);
        const updatedHospitals = await Promise.all(
          emergencyHospitals.map(async (hospital) => {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${hospital.lng},${hospital.lat}?overview=false&access_token=${mapboxgl.accessToken}`;
            const res = await fetch(url);
            const data = await res.json();
            const distance = data.routes?.[0]?.distance ? data.routes[0].distance / 1000 : null;
            return { ...hospital, distance };
          })
        );

        setAllHospitals(updatedHospitals);
        setFilteredHospitals(updatedHospitals);
        renderMarkers(updatedHospitals, initMap);
      });

    return () => initMap.remove();
  }, []);

  const renderMarkers = (hospitals, mapInstance) => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    hospitals.forEach((hospital) => {
      const emergencyBeds = hospital.beds?.Emergency ?? 0;
      const markerColor = emergencyBeds > 0 ? '#64bcae' : '#d1d5db';

      const waitHTML = hospital.wait?.Emergency
        ? `<span class="text-yellow-600 font-medium">${hospital.wait.Emergency}</span><br/>`
        : '';

      const popupHTML = `
        <div class="text-sm leading-snug text-gray-800 font-normal">
          <strong class="text-base text-[#132d2e]">${hospital.name}</strong><br/>
          <span>${hospital.address}</span><br/>
          <span class="text-gray-700 font-medium">${hospital.distance?.toFixed(1) || 'N/A'} km away</span><br/>
          Emergency Beds: <span class="${emergencyBeds > 0 ? 'text-green-700' : 'text-red-600'}">${emergencyBeds}</span><br/>
          ${waitHTML}
        </div>
      `;

      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([hospital.lng, hospital.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
        .addTo(mapInstance);

      marker.getElement().addEventListener('click', async () => {
        const dest = [hospital.lng, hospital.lat];
        setDestination(dest);

        const profiles = ['driving', 'walking', 'cycling'];
        const updatedDurations = {};

        await Promise.all(
          profiles.map(async (profile) => {
            const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${origin[0]},${origin[1]};${dest[0]},${dest[1]}?overview=false&access_token=${mapboxgl.accessToken}`;
            const res = await fetch(url);
            const data = await res.json();
            updatedDurations[profile] = data.routes?.[0]?.duration
              ? (data.routes[0].duration / 60).toFixed(1) // duration in minutes with 1 decimal
              : null;
          })
        );

        setDurations(updatedDurations);
      });

      markersRef.current.push(marker);
    });
  };

  const handleFilter = (filters) => {
    let filtered = [...allHospitals];

    if (filters.search) {
      filtered = filtered.filter((h) =>
        h.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.maxWaitMinutes != null) {
      filtered = filtered.filter((h) => getFirstWait(h.wait) <= filters.maxWaitMinutes);
    }

    if (filters.maxDistanceKm != null) {
      filtered = filtered.filter((h) => h.distance !== null && h.distance <= filters.maxDistanceKm);
    }

    if (filters.sortBy === 'wait') {
      filtered.sort((a, b) => getFirstWait(a.wait) - getFirstWait(b.wait));
    } else if (filters.sortBy === 'distance') {
      filtered.sort((a, b) => a.distance - b.distance);
    }

    const noFiltersApplied = !filters.search && !filters.sortBy && filters.maxWaitMinutes == null && filters.maxDistanceKm == null;
    if (noFiltersApplied && map) {
      const routeLayerId = 'route-layer';
      const routeSourceId = 'route-source';
      if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
      if (map.getSource(routeSourceId)) map.removeSource(routeSourceId);
      setDestination(null);
      setDurations({ driving: null, walking: null, cycling: null });
    }

    setFilteredHospitals(filtered);
    if (map) renderMarkers(filtered, map);
  };

  useEffect(() => {
    if (!map || !destination) return;

    const routeLayerId = 'route-layer';
    const routeSourceId = 'route-source';

    const drawRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/${travelMode}/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      const res = await fetch(url);
      const data = await res.json();
      const route = data.routes[0].geometry;

      if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
      if (map.getSource(routeSourceId)) map.removeSource(routeSourceId);

      map.addSource(routeSourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
        },
      });

      map.addLayer({
        id: routeLayerId,
        type: 'line',
        source: routeSourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 5,
        },
      });

      const bounds = route.coordinates.reduce(
        (b, coord) => b.extend(coord),
        new mapboxgl.LngLatBounds(route.coordinates[0], route.coordinates[0])
      );
      map.fitBounds(bounds, { padding: 60 });
    };

    drawRoute();
  }, [map, destination, travelMode]);

  return (
    <div>
      <FilterEmergency onFilter={handleFilter} />
      <h3 className="text-2xl font-bold text-black p-3 mt-3">Emergency Bed Map View</h3>

      <div className="flex flex-wrap gap-3 my-3">
        {['driving', 'walking', 'cycling'].map((mode) => (
          <button
            key={mode}
            onClick={() => setTravelMode(mode)}
            className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition border ${
              travelMode === mode
                ? 'bg-[#64bcae] text-white border-[#64bcae]'
                : 'bg-white text-[#132d2e] border-gray-300 hover:bg-gray-100'
            }`}
          >
            {mode === 'driving' && 'Drive'}
            {mode === 'walking' && 'Walk'}
            {mode === 'cycling' && 'Cycle'}
            {durations[mode] !== null && (
              <span className="text-xs text-gray-600">({durations[mode]} min)</span>
            )}
          </button>
        ))}
      </div>

      <div ref={mapRef} className="h-[400px] w-full mt-2 rounded-xl border" />
    </div>
  );
}
