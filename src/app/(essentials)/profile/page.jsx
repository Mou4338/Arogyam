"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);

        const remindersRef = collection(db, "reminders");
        const remindersSnap = await getDocs(query(remindersRef, where("userId", "==", authUser.uid)));
        setReminders(remindersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const alertsRef = collection(db, "consultation");
        const alertsSnap = await getDocs(query(alertsRef, where("userId", "==", authUser.uid)));
        setAlerts(alertsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl text-black font-bold mb-4 text-center">Profile</h1>

      <div className="bg-white text-black shadow-md rounded-md p-6 mb-6">
        <h2 className="text-xl text-black font-semibold mb-2">User Info</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.uid}</p>
        <span className="border-b px-85 text-black"></span>
        
        <h2 className="text-xl text-black font-semibold mb-2">Reminders</h2>
        {reminders.length === 0 ? (
          <p className="text-black">No reminders found.</p>
        ) : (
          <ul className="list-disc text-black p-5">
            {reminders.map((reminder) => (
              <li key={reminder.id}>{reminder.title} - {reminder.time}</li>
            ))}
          </ul>
        )}
      <span className="border-b px-85 text-black"></span>
        <h2 className="text-xl font-semibold mb-2">Alerts</h2>
        {alerts.length === 0 ? (
          <p>No alerts found.</p>
        ) : (
          <ul className="list-disc pl-5">
            {alerts.map((alert) => (
              <li key={alert.id}>{alert.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
