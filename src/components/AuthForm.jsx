'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { auth, provider } from '@/lib/firebaseConfig';

export default function AuthForm({ type = 'login', onSubmit }) {
  const isLogin = type === 'login';

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      await fetch('/api/auth/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      alert('Google login successful!');
      window.location.href = "/reminders";

    } catch (error) {
      console.error('Google Auth Error:', error);
      alert('Google login failed!');
    }
  };

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

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        {!isLogin && (
          <>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="preferNotSay">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+91-9876543210"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </>
        )}

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
          <div className="mt-1 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <span className="relative bg-white px-3 text-sm text-gray-500">or</span>
      </div>

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

      <p className="text-sm text-center text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
        <Link href={isLogin ? '/auth/signup' : '/auth/login'}>
          <span className="text-teal-600 hover:underline">
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </Link>
      </p>
    </div>
  );
}


