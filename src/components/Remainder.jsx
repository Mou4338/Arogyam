"use client"
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'

const Remainder = () => {
    const [remainders, setReminders] = useState([]);
    useState(() => {
        try {
            const fetchReminders = async () => {
                const remindersCollection = collection(db, "reminders");
                const reminderSnapshot = await getDocs(remindersCollection);
                const reminderList = reminderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReminders(reminderList);
            };
            fetchReminders();

        } catch (error) {
            console.error("Error fetching reminders:", error);
        }
        if (remainders.length === 0) {
            console.log("No reminders found");
            return <p className="text-gray-500">No reminders found.</p>;
        }

    }, [])

    const [enabled, setEnabled] = useState(false);
    return (
        <>
            <h3 className="text-xl text-black font-semibold mb-2">Your Reminders</h3>
            {remainders.length > 0 ? (
                <ul className="space-y-4 bg-[#3f8578] flex p-4 rounded-md">
                    {remainders.map(reminder => (
                        <div key={reminder.id} className="p-2 w-full/2 border border-gray-300 rounded-md">
                            <div className='flex justify-between items-center mb-2'>
                                <h4 className="font-semibold text-2xl">{reminder.title}</h4>
                                <button
                                    onClick={() => setEnabled(!enabled)}
                                    className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${enabled ? "bg-green-500" : "bg-gray-300"}`}>
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${enabled ? "translate-x-6" : "translate-x-0"}`}/>
                                </button>
                            </div>

                            <p className="text-sm text-gray-500">{reminder.description}</p>
                            <p className="text-xs text-gray-400">Frequency: {reminder.frequency}</p>
                            <p className="text-xs text-gray-400">Time: {reminder.time}</p>
                        </div>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No reminders found.</p>
            )}
        </>
    )
}

export default Remainder
