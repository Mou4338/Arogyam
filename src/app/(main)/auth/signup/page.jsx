"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth, app } from "@/lib/firebaseConfig";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const router = useRouter();
  const db = getFirestore(app);

  // Accept full form data, not just email/password
  const handleRegister = async (form) => {
    try {
      // Create user in Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Save extra fields to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        dob: form.birthDate,
        gender: form.gender,
        phone: form.phone,
        email: form.email,
      });

      console.log("Registration and Firestore save successful");
      router.push("/reminders");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
