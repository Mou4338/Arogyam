import { useEffect, useState } from 'react';
import FilterControls from './FilterControls';

export default function HospitalListWithFilter() {
const [originalHospitals, setOriginalHospitals] = useState([]);
const [filteredHospitals, setFilteredHospitals] = useState([]);

useEffect(() => {
fetch('/api/hospitals')
.then((res) => res.json())
.then((data) => {
setOriginalHospitals(data);
setFilteredHospitals(data);
});
}, []);

const applyFilter = ({ search, bedType, sortBy }) => {
let results = [...originalHospitals];
if (search) {
  const s = search.toLowerCase();
  results = results.filter(h =>
    h.name.toLowerCase().includes(s) || h.address.toLowerCase().includes(s)
  );
}

if (bedType) {
  results = results.filter(h =>
    (bedType === 'general' && h.beds?.general > 0) ||
    (bedType === 'icu' && h.beds?.icu > 0) ||
    (bedType === 'emergency' && h.beds?.emergency > 0)
  );
}

if (sortBy === 'wait') {
  results.sort((a, b) => (a.waitTime || 999) - (b.waitTime || 999));
} else if (sortBy === 'distance') {
  results.sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
} else if (sortBy === 'availability') {
  results.sort((a, b) =>
    ((b.beds?.general || 0) + (b.beds?.icu || 0) + (b.beds?.emergency || 0)) -
    ((a.beds?.general || 0) + (a.beds?.icu || 0) + (a.beds?.emergency || 0))
  );
}

setFilteredHospitals(results);
};

return (
<div className="space-y-6">
<FilterControls onFilter={applyFilter} />
<div className="grid gap-4">
{filteredHospitals.map((h, idx) => (
<div key={idx} className="p-4 bg-white rounded-xl shadow border">
<div className="text-lg font-semibold">{h.name}</div>
<div className="text-sm text-gray-600">{h.address}</div>
<div className="text-sm mt-1">🚑 Wait: {h.wait}</div>
<div className="text-sm">🛏️ Beds — Gen: {h.beds?.general || 0}, ICU: {h.beds?.icu || 0}, ER: {h.beds?.emergency || 0}</div>
<div className="text-sm">📍 Distance: {h.distance}</div>
</div>
))}
</div>
</div>
);
}