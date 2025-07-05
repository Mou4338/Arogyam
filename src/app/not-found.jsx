'use client';

import Link from 'next/link';
import { Stethoscope, Hospital, AlertTriangle, AlarmCheckIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ebf2f0] to-white text-center p-6">
      <div className="text-red-700 mb-4">
        <AlertTriangle size={64} />
      </div>

      <h1 className="flex text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        <AlarmCheckIcon className='text-red-500 mx-2 mt-2'/> 404 - Page Flatlined!
      </h1>
      <p className="text-gray-600 max-w-md">
        This page didn't make it through surgery. We tried CPR, a defibrillator,
        and even gave it coffee — but it's officially gone.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <Link
          href="/"
          className="bg-[#3f8578] text-white px-5 py-2 rounded-md shadow hover:bg-[#326b5d] transition"
        >
          🏥 Back to Hospital (Home)
        </Link>
        <Link
          href="/chatbot"
          className="border border-[#3f8578] text-[#3f8578] px-5 py-2 rounded-md hover:bg-[#3f8578] hover:text-white transition"
        >
          💬 Consult Arogyam AI
        </Link>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <Stethoscope className="inline-block mr-1" size={16} />
        Diagnosed by Arogyam Medical AI Systems
      </div>
    </div>
  );
}
