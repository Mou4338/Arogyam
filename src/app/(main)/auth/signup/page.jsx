"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registration successful");
      router.push("/reminders");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
}
