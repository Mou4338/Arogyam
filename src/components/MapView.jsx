'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import FilterControls from './FilterControls';

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
        const updatedHospitals = await Promise.all(
          hospitals.map(async (hospital) => {
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
      let waitHTML = '';
      if (hospital.wait) {
        for (const bedType in hospital.wait) {
          waitHTML += `${bedType}: <span class="text-yellow-600 font-medium">${hospital.wait[bedType]}</span><br/>`;
        }
      }

      const popupHTML = `
        <div class="text-sm leading-snug text-gray-800 font-normal">
          <strong class="text-base text-[#132d2e]">${hospital.name}</strong><br/>
          <span>${hospital.address}</span><br/>
          <span class="text-gray-700 font-medium">${hospital.distance?.toFixed(1)||'N/A'} km away</span><br/>
          ${waitHTML}
          <button class="start-journey-btn mt-2 px-2 py-1 text-white bg-[#64bcae] rounded text-sm">Start Journey</button>
        </div>
      `;

      const marker = new mapboxgl.Marker({ color: '#64bcae' })
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
              ? Math.round(data.routes[0].duration / 60)
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

    if (filters.sortBy === 'wait') {
      filtered = filtered.filter((h) => getFirstWait(h.wait) <= 12);
      filtered.sort((a, b) => getFirstWait(a.wait) - getFirstWait(b.wait));
    } else if (filters.sortBy === 'distance') {
      filtered = filtered.filter((h) => h.distance !== null && h.distance <= 2);
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (filters.sortBy === 'availability') {
      filtered.sort((a, b) => totalBeds(b.beds) - totalBeds(a.beds));
    }

    const noFiltersApplied = !filters.search && !filters.sortBy;
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

  const getFirstWait = (wait) => {
    if (!wait) return Infinity;
    const times = Object.values(wait).map((v) => parseInt(v));
    return Math.min(...times);
  };

  const totalBeds = (beds) => {
    if (!beds) return 0;
    return Object.values(beds).reduce((sum, count) => sum + count, 0);
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
    <div className="bg-white p-4 rounded shadow">
      <FilterControls onFilter={handleFilter} />
      <h3 className="text-2xl font-bold text-black p-3 mt-3"> Map View</h3>
      <div className="flex flex-wrap gap-3 my-3">
        {['driving', 'walking', 'cycling'].map((mode) => (
          <button
            key={mode}
            onClick={() => setTravelMode(mode)}
            className={`px-3 py-1 rounded text-sm ${
              travelMode === mode ? 'bg-[#64bcae] text-white' : 'bg-gray-100 text-[#132d2e]'
            }`}
          >
            {mode === 'driving' && 'Car'}
            {mode === 'walking' && 'Walk'}
            {mode === 'cycling' && 'Cycle'}
            {durations[mode] !== null && ` (${durations[mode]} min)`}
          </button>
        ))}
      </div>
      <div ref={mapRef} className="h-[400px] w-full mt-2 rounded-xl border" />
    </div>
  );
}
