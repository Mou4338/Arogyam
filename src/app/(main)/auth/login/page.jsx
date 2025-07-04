"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      router.push("/reminders");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
}
