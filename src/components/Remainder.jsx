"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
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
    const deleteReminder=async(id)=>{
        try{
            const reminderRef=doc(db,"reminders",id);
            await deleteDoc(reminderRef);
            console.log("Reminder deleted succesfully");
            setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
        }catch(error){
            console.log("Error deleting the reminder",error);
        }
    }


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
            <h3 className="text-2xl  font-semibold mb-2">Your Reminders</h3>
            {remainders.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#3f8578] p-4 rounded-md">
                    {remainders.map((reminder) => (
                        <div
                            key={reminder.id}
                            className="relative p-4 border border-gray-300 rounded-md  shadow"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-xl">{reminder.title}</h4>
                                <span
                                    onClick={() => toggleSwitch(reminder.id)}
                                    className={`w-12 h-6 flex items-center rounded-2xl p-1 transition-colors duration-300 ${enabledMap[reminder.id] ? "bg-white/70" : "bg-gray-800"
                                        }`}
                                >
                                    <div
                                        className={`w-4 h-4 bg-white rounded-lg shadow-md transform transition-transform ${enabledMap[reminder.id] ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </span>
                            </div>
                            <p className="text-sm">{reminder.description}</p>
                            <p className="text-sm">Frequency: {reminder.frequency}</p>
                            <p className="text-sm">Time: {reminder.time}</p>
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button className="bg-white/70 rounded p-1 cursor-pointer" onClick={()=>deleteReminder(reminder.id)}>
                                    <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800 transition" />
                                </button>
                                {/* <button className="bg-white/70 rounded p-1 cursor-pointer">
                                    <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-800 transition" />
                                </button> */}
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
