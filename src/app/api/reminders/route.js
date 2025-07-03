// app/api/remainders/route.js
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, frequency, time } = body;

    const docRef = await addDoc(collection(db, "reminders"), {
      title,
      description,
      frequency,
      time,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Reminder added", id: docRef.id }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving reminder:", error);
    return new Response(JSON.stringify({ error: "Failed to add reminder" }), {
      status: 500,
    });
  }
}
