"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AuthForm({ type = 'login', onSubmit }) {
  const isLogin = type === 'login'
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleGoogleClick = () => {
    alert('Google Auth clicked (frontend-only mock)')
  }

  return (
    <div className="bg-white shadow-xl rounded-xl px-8 py-6 w-full max-w-md mx-auto space-y-6">
      {/* Logo & Header */}
      <div className="text-center">
        <img src="/logo.png" className="h-12 mx-auto mb-3" alt="Arogyam Logo" />
        <h2 className="text-3xl font-bold text-teal-700">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="text-sm text-gray-500">
          {isLogin ? 'Login to continue' : 'Sign up and join Arogyam'}
        </p>
      </div>

      {/* Email/Password Form */}
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(form) }}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <span className="relative bg-white px-3 text-sm text-gray-500">or</span>
      </div>

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleClick}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:shadow-md text-gray-700 font-medium py-2 px-4 rounded-md transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google icon"
          className="h-5 w-5"
        />
        Continue with Google
      </button>

      {/* Switch between login/register */}
      <p className="text-sm text-center text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
        <Link href={isLogin ? '/register' : '/login'}>
          <span className="text-teal-600 hover:underline">{isLogin ? 'Log In' : 'Sign In'}</span>
        </Link>
      </p>
    </div>
  )
}
