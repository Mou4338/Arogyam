'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { Trash2, Pencil, Info } from 'lucide-react';
import AddReminder from '@/components/AddRemainder.jsx';
import { Dialog } from '@headlessui/react';

const weekDays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

const Remainder = () => {
  const [reminders, setReminders] = useState([]);
  const [enabledMap, setEnabledMap] = useState({});
  const [editingReminder, setEditingReminder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWeekDay, setSelectedWeekDay] = useState('');
  const [selectedReminder, setSelectedReminder] = useState(null);

  const toggleSwitch = (id) => {
    setEnabledMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteReminder = async (id) => {
    try {
      await deleteDoc(doc(db, 'reminders', id));
      setReminders((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Error deleting the reminder:', error);
    }
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setShowForm(true);
  };

  const fetchReminders = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'reminders'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReminders(data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const formatDate = (date) => date?.toISOString().split('T')[0];
  const getWeekdayName = (date) => date?.toLocaleDateString('en-US', { weekday: 'long' });
  const getDayOfMonth = (date) => (date ? String(date.getDate()) : null);

  const selectedDateStr = formatDate(selectedDate);
  const selectedDateWeekDay = getWeekdayName(selectedDate);
  const selectedMonthDay = getDayOfMonth(selectedDate);

  const filteredReminders = reminders.filter((reminder) => {
    const isDaily = reminder.frequency?.toLowerCase() === 'daily';
    const isSpecificMatch = reminder.specificDate === selectedDateStr;
    const isWeeklyByDate = reminder.weekDay === selectedDateWeekDay;
    const isWeeklyByDropdown = reminder.weekDay === selectedWeekDay;
    const isMonthly = reminder.monthDate === selectedMonthDay;

    if (!selectedDate && selectedWeekDay) return isDaily || isWeeklyByDropdown;
    if (selectedDate) return isDaily || isSpecificMatch || isWeeklyByDate || isWeeklyByDropdown || isMonthly;
    return true;
  });

  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedWeekDay('');
  };

  const renderReminderCard = (reminder) => (
    <div
      key={reminder.id}
      className="bg-teal-50 rounded-2xl shadow-xl p-5 relative border border-black max-h-[200px] scrollbar-color-black flex flex-col"
    >
      <div className="overflow-y-auto scrollbar-color-black pr-2">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xl border-[1px] border-[#3f8578] rounded-xl p-1.5 font-semibold text-gray-800">{reminder.title}</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedReminder(reminder)}
              className="text-gray-600 hover:text-[#3f8578]"
            >
              <Info className="w-5 h-5" />
            </button>
            <div
              onClick={() => toggleSwitch(reminder.id)}
              className={`w-12 h-6 flex items-center rounded-2xl p-1 cursor-pointer transition-colors duration-300 ${
                enabledMap[reminder.id] ? 'bg-black' : 'bg-[#3f8578]'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-lg shadow-md transform transition-transform ${
                  enabledMap[reminder.id] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </div>
          </div>
        </div>

        {reminder.description && (
          <p className="text-sm text-gray-600 mb-2">📝 <span className="font-medium">{reminder.description}</span></p>
        )}

        <div className="grid grid-cols-1 gap-y-1 text-sm text-gray-600">
          <p>📂 <span className="font-medium">Category:</span> {reminder.category}</p>
          <p>📅 <span className="font-medium">Frequency:</span> {reminder.frequency}</p>
          {reminder.weekDay && <p>📌 <span className="font-medium">Day:</span> {reminder.weekDay}</p>}
          {reminder.monthDate && <p>📌 <span className="font-medium">Date:</span> {reminder.monthDate}</p>}
          {reminder.specificDate && <p>📌 <span className="font-medium">Specific:</span> {reminder.specificDate}</p>}
           {Object.keys(reminder)
            .filter((key) => key.startsWith('time'))
            .map((key) => (
              <p key={key}>
                ⏰ <span className="font-medium">{key.replace('time', 'Time Slot ')}:</span> {reminder[key]}
              </p>
            ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => deleteReminder(reminder.id)} className="bg-red-100 rounded p-1 hover:bg-red-200 transition">
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
        <button onClick={() => handleEdit(reminder)} className="bg-blue-100 rounded p-1 hover:bg-blue-200 transition">
          <Pencil className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 rounded-xl">
      <h3 className="text-3xl font-bold mb-6 text-black">📋 Your Reminders</h3>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between bg-teal-50 rounded-2xl shadow-xl p-5 border border-black gap-4 mb-4">
        <div>
          <label className="block text-[#3f8578] font-bold mb-1">📅 Filter by Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Pick a date"
            className="border border-black rounded px-3 py-2 text-sm"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block font-bold text-[#3f8578] mb-1">🗓️ Filter by Weekday</label>
          <select
            value={selectedWeekDay}
            onChange={(e) => setSelectedWeekDay(e.target.value)}
            className="border border-black rounded px-3 py-2 text-sm w-full"
          >
            <option value="">-- Select --</option>
            {weekDays.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="self-start sm:self-end">
          <label className="block font-bold text-[#3f8578] mb-1">🔄 Reset Filters</label>
          <button onClick={resetFilters} className="mt-4 sm:mt-0 text-sm text-white bg-[#3f8578] px-8 py-1.5 rounded hover:bg-[#30695f] transition">
            Reset
          </button>
        </div>
      </div>

      {/* Reminder Cards */}
      {showForm ? (
        <AddReminder
          existingReminder={editingReminder}
          onSuccess={() => {
            setShowForm(false);
            setEditingReminder(null);
            fetchReminders();
          }}
        />
      ) : filteredReminders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-[400px] overflow-y-auto pr-1">
          {filteredReminders.map(renderReminderCard)}
        </div>
      ) : (
        <p className="text-gray-300 text-center mt-6">No reminders found for this filter.</p>
      )}

      {/* Dialog */}
      <Dialog open={!!selectedReminder} onClose={() => setSelectedReminder(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-[#3f8578]">
            <Dialog.Title className="text-2xl font-bold text-[#3f8578] mb-4">
              {selectedReminder?.title}
            </Dialog.Title>
            <div className="space-y-2 text-sm text-gray-800">
              <p>📝 <span className="font-medium">Description:</span> {selectedReminder?.description || 'N/A'}</p>
              <p>📂 <span className="font-medium">Category:</span> {selectedReminder?.category}</p>
              <p>📅 <span className="font-medium">Frequency:</span> {selectedReminder?.frequency}</p>
              {selectedReminder?.weekDay && <p>🗓️ <span className="font-medium">Weekday:</span> {selectedReminder.weekDay}</p>}
              {selectedReminder?.monthDate && <p>🗓️ <span className="font-medium">Month Date:</span> {selectedReminder.monthDate}</p>}
              {selectedReminder?.specificDate && <p>📌 <span className="font-medium">Specific Date:</span> {selectedReminder.specificDate}</p>}
              {Object.keys(selectedReminder || {})
                .filter((key) => key.startsWith('time'))
                .map((key) => (
                  <p key={key}>⏰ <span className="font-medium">{key.replace('time', 'Time Slot ')}:</span> {selectedReminder[key]}</p>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedReminder(null)} className="px-4 py-2 bg-[#3f8578] text-white rounded hover:bg-[#30695f]">
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Remainder;

