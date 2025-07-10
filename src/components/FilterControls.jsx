'use client';

import { useState } from 'react';

export default function FilterControls({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [bedType, setBedType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [customValue, setCustomValue] = useState('');

  const handleApplyFilters = () => {
    onFilter({
      search: searchTerm.trim(),
      bedType: bedType.toLowerCase(),
      sortBy,
      maxWaitMinutes: sortBy === 'wait' ? Number(customValue) || null : null,
      maxDistanceKm: sortBy === 'distance' ? Number(customValue) || null : null,
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setBedType('');
    setSortBy('');
    setCustomValue('');
    onFilter({ search: '', bedType: '', sortBy: '', maxWaitMinutes: null, maxDistanceKm: null });
  };

  return (
    <div className="bg-teal-50 p-5 rounded-2xl shadow-xl border border-teal-500 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search hospitals..."
        className="flex-1 px-4 py-2 rounded-lg border border-teal-500 focus:ring-2 focus:ring-teal-600 outline-none w-full sm:w-auto text-teal-800"
      />

      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setCustomValue(''); // Reset custom value on sort change
        }}
        className="px-4 py-2 rounded-lg border border-teal-700 focus:ring-2 focus:ring-teal-600 outline-none w-full sm:w-auto text-teal-800"
      >
        <option value="">Sort By</option>
        <option value="wait">Shortest Wait time</option>
        <option value="distance">Nearest</option>
      </select>

      {sortBy && (
        <input
          type="number"
          min={sortBy === 'wait' ? '5' : '1'}
          max={sortBy === 'wait' ? '120' : '20'}
          placeholder={sortBy === 'wait' ? 'Max Wait (min)' : 'Max Distance (km)'}
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          className="w-40 px-4 py-2 rounded-lg border border-teal-500 focus:ring-2 focus:ring-teal-600 outline-none text-teal-800"
        />
      )}

      <button
        onClick={handleApplyFilters}
        className="bg-teal-600 hover:bg-black text-white font-medium px-6 py-2 rounded-lg transition duration-200"
      >
        Apply
      </button>

      <button
        onClick={handleReset}
        className="bg-teal-600 hover:bg-black text-white font-medium px-6 py-2 rounded-lg transition duration-200"
      >
        Reset
      </button>
    </div>
  );
}
