// app/api/remainders/route.js
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const {  } = body;

    const docRef = await addDoc(collection(db, "consultation"), {
        subject: body.subject,
        date: body.date,
        time: body.time,
        timezone: body.timezone,
        createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Consultation added", id: docRef.id }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving consultation:", error);
    return new Response(JSON.stringify({ error: "Failed to add consultation" }), {
      status: 500,
    });
  }
}
