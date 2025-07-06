export default function FilterSidebar() {
  return (
    <div className="bg-[#3f8578] p-4 rounded shadow-md space-y-4">
      <h3 className="text-lg font-semibold "> Filters</h3>

      <div>
        <label className="block text-sm  mb-1">Available Beds</label>
        <input type="range" min="0" max="20" defaultValue="5" className="w-full" />
        <p className="text-xs  mt-1">Min 5 beds</p>
      </div>

      <div>
        <label className="block text-sm  mb-1">Max Distance</label>
        <input type="range" min="1" max="10" defaultValue="5" className="w-full" />
        <p className="text-xs  mt-1">Up to 5 km</p>
      </div>

      <button className="w-full bg-[#64bcae] text-white py-2 rounded hover:bg-[#4ea79c] hover:cursor-pointer transition">
        Apply Filters
      </button>
    </div>
  )
}

