"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Trash2, Pencil } from 'lucide-react';

const Remainder = () => {
    const [remainders, setReminders] = useState([]);
    const [enabled, setEnabled] = useState(false);
    const [enabledMap, setEnabledMap] = useState({});

    const toggleSwitch = (id) => {
        setEnabledMap((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const remindersCollection = collection(db, "reminders");
                const reminderSnapshot = await getDocs(remindersCollection);
                const reminderList = reminderSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReminders(reminderList);
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        };

        fetchReminders();
    }, []);

    return (
        <>
            <h3 className="text-xl text-black font-semibold mb-2">Your Reminders</h3>
            {remainders.length > 0 ? (
                <ul className="gap-4 bg-[#3f8578] flex flex-row  p-4 rounded-md">
                    {remainders.map((reminder) => (
                        <div
                            key={reminder.id}
                            className="relative p-2 border w-80 border-gray-300 rounded-md "
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-2xl ">
                                    {reminder.title}
                                </h4>
                                <span
                                    onClick={() => toggleSwitch(reminder.id)}
                                    className={`w-13 h-6 flex items-center rounded-2xl p-1 transition-colors duration-300 ${enabledMap[reminder.id] ? "bg-white/70" : "bg-gray-800"}`}>
                                    <div
                                        className={`w-4 h-4 bg-white rounded-lg shadow-md transform transition-transform ${enabledMap[reminder.id] ? "translate-x-6" : "translate-x-1"}`} />
                                </span>
                            </div>

                            <p className="text-sm ">{reminder.description}</p>
                            <p className="text-sm ">Frequency: {reminder.frequency}</p>
                            <p className="text-sm ">Time: {reminder.time}</p>
                            <div className="absolute bottom-4 right-4 flex gap-4 ">
                                <button className="bg-white/70 rounded p-1 cursor-pointer">
                                    <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800 transition" />
                                </button>
                                <button className="bg-white/70 rounded p-1 cursor-pointer">
                                    <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-800 transition" />
                                </button>
                            </div>

                        </div>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No reminders found.</p>
            )}
        </>
    );
};

export default Remainder;
