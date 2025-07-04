'use client';
import { useState } from 'react';

export default function FilterControls({ onFilter }) {
const [searchTerm, setSearchTerm] = useState('');
const [bedType, setBedType] = useState('');
const [sortBy, setSortBy] = useState('');

const handleApplyFilters = () => {
onFilter({ search: searchTerm, bedType, sortBy });
};

return (
<div className="bg-white p-4 rounded-xl shadow-md border flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
<input
type="text"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
placeholder="🔍 Search hospitals..."
className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#64bcae] outline-none w-full sm:w-auto"
/>
<select
value={bedType}
onChange={(e) => setBedType(e.target.value)}
className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto"
>
<option value="">🛏️ Bed Type</option>
<option value="general">General</option>
<option value="icu">ICU</option>
<option value="emergency">Emergency</option>
</select>
<select
value={sortBy}
onChange={(e) => setSortBy(e.target.value)}
className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto"
>
<option value="">↕️ Sort By</option>
<option value="wait">Shortest Wait</option>
<option value="distance">Nearest</option>
<option value="availability">Most Beds</option>
</select>
<button onClick={handleApplyFilters} className="bg-[#64bcae] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#4ea79c] transition duration-200" >
✅ Apply Filters
</button>
</div>
);
}
