"use client";

import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";
import {
  UserCircle,
  Clock,
  Bell,
  Stethoscope,
} from "lucide-react";
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
    <div className="max-w-6xl mt-10 mb-10 bg-[#3f8578] text-white mx-auto px-4 sm:px-6 lg:px-8 py-10 rounded-2xl shadow-xl space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4 flex flex-wrap items-center justify-center gap-2">
        <UserCircle className="text-white" size={32} /> Your Profile
      </h1>

      {error && <div className="mb-4 text-red-500 font-medium">{error}</div>}

      {/* Profile Info */}
      <div className="bg-teal-50 mt-8 text-teal-900 rounded-lg p-6 shadow-md space-y-4">
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

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={handleLogout}
            className="bg-black px-6 py-2 rounded-md text-white font-medium shadow w-full sm:w-auto"
          >
            Log out
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 px-6 py-2 rounded-md text-white font-medium shadow w-full sm:w-auto"
          >
            Delete account
          </button>
        </div>
      </div>

      {/* Reminders */}
      <div className="bg-teal-50 text-teal-900 rounded-lg p-6 shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
          <Clock size={22} /> Reminders
        </h2>
        {reminders.length === 0 ? (
          <p>No reminders found.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {reminders.map((reminder) => (
              <li key={reminder.id}>
                {reminder.title} —{" "}
                <span className="text-gray-600">{reminder.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Alerts */}
      <div className="bg-teal-50 text-teal-900 rounded-lg p-6 shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
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

      {/* Doctors Consulted */}
      <div className="bg-teal-50 text-teal-900 rounded-lg p-6 shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center gap-2">
          <Stethoscope size={22} /> Doctors Consulted
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          {demoDoctors.map((doc, idx) => (
            <li key={idx}>
              {doc.name} —{" "}
              <span className="text-gray-600">{doc.specialty}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
