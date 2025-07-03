import { useState } from 'react'

export default function ScheduleForm() {
  const [form, setForm] = useState({
    date: '',
    time: '',
    timezone: 'Asia/Kolkata (IST)',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Appointment booked on ${form.date} at ${form.time} (${form.timezone})`)
  }

  return (
    <div className="bg-white shadow-xl border border-gray-100 rounded-xl p-6 space-y-6">
      <h3 className="text-xl font-semibold text-teal-700 flex items-center gap-2">
        📆 Book Your Appointment
      </h3>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Date */}
        <div>
          <label className="block text-sm text-gray-600 font-medium">Select Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm text-gray-600 font-medium">Select Time</label>
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          >
            <option value="">-- Choose a slot --</option>
            <option>09:00 AM</option>
            <option>11:30 AM</option>
            <option>02:00 PM</option>
            <option>04:30 PM</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm text-gray-600 font-medium">Timezone</label>
          <select
            name="timezone"
            value={form.timezone}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          >
            <option>Asia/Kolkata (IST)</option>
            <option>GMT</option>
            <option>EST</option>
            <option>PST</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 text-center font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition shadow-md"
        >
          ✅ Confirm Appointment
        </button>
      </form>
    </div>
  )
}
