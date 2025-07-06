"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import {  getFirestore,  collection,  query,  where,  getDocs,  doc,  getDoc,} from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";
import {  UserCircle,  Clock,  Bell,  Stethoscope,} from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (error) {
      setError("Error signing out. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        await deleteUser(auth.currentUser);
        window.location.href = "/";
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          alert("Please log in again before deleting your account.");
        } else {
          setError("Error deleting account.");
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDocRef = doc(db, "users", authUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        const userData = userDocSnap.exists() ? userDocSnap.data() : {};
        const { dob, firstName = "", lastName = "" } = userData;

        setUser({
          ...authUser,
          dob,
          firstName,
          lastName,
        });

        const remindersSnap = await getDocs(
          query(collection(db, "reminders"), where("userId", "==", authUser.uid))
        );
        setReminders(remindersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const alertsSnap = await getDocs(
          query(collection(db, "consultation"), where("userId", "==", authUser.uid))
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
    <div className="max-w-4xl bg-slate-100 mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-black mb-8 flex items-center justify-center gap-2">
        <UserCircle className="text-black" size={32} /> Your Profile
      </h1>

      {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

      <div className="bg-[#3f8578] text-white rounded-lg p-6 space-y-4 shadow-lg">
        <div>
          <span className="block font-semibold">Name:</span>
          <p>
            {user.displayName ||
              [user.firstName, user.lastName].filter(Boolean).join(" ") ||
              "N/A"}
          </p>
        </div>
        <div>
          <span className="block font-semibold">Email:</span>
          <p>{user.email}</p>
        </div>
        <div>
          <span className="block font-semibold">User ID:</span>
          <p className="break-all">{user.uid}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleLogout}
            className="bg-black px-6 py-2 rounded-md text-white font-medium shadow"
          >
            Log out
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-6 py-2 rounded-md text-white font-medium shadow"
          >
            Delete account
          </button>
        </div>

        <div className="bg-[#3f8578] shadow-xl rounded-lg p-6 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Clock size={22} /> Reminders
          </h2>
          {reminders.length === 0 ? (
            <p>No reminders found.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {reminders.map((reminder) => (
                <li key={reminder.id}>
                  {reminder.title} — <span className="text-gray-200">{reminder.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#3f8578] shadow-xl rounded-lg p-6 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Bell size={22} /> Alerts
          </h2>
          {alerts.length === 0 ? (
            <p>No alerts found.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {alerts.map((alert) => (
                <li key={alert.id}>{alert.title}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#3f8578] shadow-xl rounded-lg p-6 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Stethoscope size={22} /> Doctors Consulted
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            {demoDoctors.map((doc, idx) => (
              <li key={idx}>
                {doc.name} — <span className="text-gray-200">{doc.specialty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
