export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src="public\logo.png" alt="Arogyam Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-teal-600">Arogyam</span>
      </div>
      <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
        <a href="#">Home</a>
        <a href="#">Hospitals</a>
        <a href="#">Emergency</a>
        <a href="#">Chatbot</a>
        <a href="#">Reminders</a>
        <a href="#">Alerts</a>
        <a href="#">Doctors</a>
      </nav>
      <div className="flex items-center space-x-2">
        <input type="text" placeholder="Search..." className="px-2 py-1 border rounded" />
        <img src="/profile.png" alt="User" className="h-8 w-8 rounded-full" />
      </div>
    </header>
  )
}
