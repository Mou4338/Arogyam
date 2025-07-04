export default function FilterSidebar() {
  return (
    <div className="bg-white p-4 rounded shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-[#132d2e]">🔍 Filters</h3>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Available Beds</label>
        <input type="range" min="0" max="20" defaultValue="5" className="w-full" />
        <p className="text-xs text-gray-500 mt-1">Min 5 beds</p>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Max Distance</label>
        <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
        <p className="text-xs text-gray-500 mt-1">Up to 5 km</p>
      </div>

      <button className="w-full bg-[#64bcae] text-white py-2 rounded hover:bg-[#4ea79c] transition">
        Apply Filters
      </button>
    </div>
  )
}

