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
    <div className="bg-teal-50 p-5 rounded-2xl shadow-xl border border-teal-500 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search hospitals..."
        className="flex-1 px-4 py-2 rounded-lg border border-teal-500 focus:ring-2 focus:ring-teal-600 outline-none w-full sm:w-auto text-teal-800"
      />

      {/* Bed Type */}
      <select
        value={bedType}
        onChange={(e) => setBedType(e.target.value)}
        className="px-4 py-2 rounded-lg border border-teal-500 focus:ring-2 focus:ring-teal-600 outline-none w-full sm:w-auto text-teal-800"
      >
        <option value="">🛏️ Bed Type</option>
        <option value="general">General</option>
        <option value="icu">ICU</option>
        <option value="emergency">Emergency</option>
        <option value="maternity">Maternity</option>
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 rounded-lg border border-teal-500 focus:ring-2 focus:ring-teal-600 outline-none w-full sm:w-auto text-teal-800"
      >
        <option value="">↕️ Sort By</option>
        <option value="wait">Shortest Wait</option>
        <option value="distance">Nearest</option>
        <option value="availability">Most Beds</option>
      </select>

      {/* Apply */}
      <button
        onClick={handleApplyFilters}
        className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
}
