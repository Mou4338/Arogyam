"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AuthForm({ type = "login", onSubmit }) {
  const isLogin = type === "login";
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="bg-white shadow-md rounded-xl px-8 py-6 w-full max-w-md">
      <div className="text-center mb-6">
        <img src="/logo.png" className="h-10 mx-auto mb-3" alt="Arogyam Logo" />
        <h2 className="text-2xl font-bold text-teal-700">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="text-sm text-gray-500">
          {isLogin ? "Login to continue" : "Sign up and join Arogyam"}
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className=" text-black mt-1 block w-full px-4 py-2 border border-gray-600 rounded focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <Link href={isLogin ? "/auth/signup" : "/auth/login"}>
            <span className="text-teal-600 hover:underline">
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}
