"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";
import {
  Mail,
  UserCircle,
  Clock,
  Bell,
  Stethoscope,
} from "lucide-react";

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
        const remindersSnap = await getDocs(
          query(remindersRef, where("userId", "==", authUser.uid))
        );
        setReminders(remindersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const alertsRef = collection(db, "consultation");
        const alertsSnap = await getDocs(
          query(alertsRef, where("userId", "==", authUser.uid))
        );
        setAlerts(alertsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const demoDoctors = [
    { name: "Dr. Priya Sharma", specialty: "Cardiologist" },
    { name: "Dr. Rohan Das", specialty: "General Physician" },
    { name: "Dr. Ananya Mehta", specialty: "Dermatologist" },
  ];

  if (loading) return <div className="text-center mt-10 text-gray-700">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-white mb-8 flex items-center justify-center gap-2">
        <UserCircle className="text-white" size={32} /> Your Profile
      </h1>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white text-black shadow-xl rounded-lg p-6 border hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#132d2e] flex items-center gap-2">
            <Mail className="text-[#3f8578]" size={22} /> User Info
          </h2>
          <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">User ID:</span> {user.uid}</p>
        </div>

        <div className="bg-white text-black shadow-xl rounded-lg p-6 border hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#132d2e] flex items-center gap-2">
            <Clock className="text-[#3f8578]" size={22} /> Reminders
          </h2>
          {reminders.length === 0 ? (
            <p className="text-gray-600">No reminders found.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {reminders.map((reminder) => (
                <li key={reminder.id} className="hover:text-[#3f8578] transition">
                  {reminder.title} — <span className="text-gray-600">{reminder.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white text-black shadow-xl rounded-lg p-6 border hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#132d2e] flex items-center gap-2">
            <Bell className="text-[#3f8578]" size={22} /> Alerts
          </h2>
          {alerts.length === 0 ? (
            <p className="text-gray-600">No alerts found.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {alerts.map((alert) => (
                <li key={alert.id} className="hover:text-[#3f8578] transition">{alert.title}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white text-black shadow-xl rounded-lg p-6 border hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#132d2e] flex items-center gap-2">
            <Stethoscope className="text-[#3f8578]" size={22} /> Doctors Consulted
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            {demoDoctors.map((doc, idx) => (
              <li key={idx} className="hover:text-[#3f8578] transition">
                {doc.name} — <span className="text-gray-600">{doc.specialty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
