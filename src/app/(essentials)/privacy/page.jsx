"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl bg-slate-100 mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-[#3f8578]"> Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-500">
        <strong>Effective Date:</strong> 06-07-2026<br />
        <strong>Last Updated:</strong> 06-07-2025
      </p>

      <p className="mb-8">
        At <strong>Arogyam</strong>, your privacy is important to us. This Privacy Policy explains how we collect,
        use, store, and protect your personal and health-related information.
      </p>

      <h2 className="text-2xl font-semibold mb-3"> 1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Personal Details: Name, email, phone number, location, and demographic data.</li>
        <li>Health Information: Symptoms, treatment preferences, reminders, and consultation history.</li>
        <li>Device Information: IP address, device type, browser, and usage analytics.</li>
        <li>Location Data: To show nearby hospitals and emergencies (only with permission).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3"> 2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Provide personalized health support (e.g., symptom checker, reminders)</li>
        <li>Help locate hospitals and emergency care services</li>
        <li>Enable virtual consultations and e-prescriptions</li>
        <li>Send important health alerts and notifications</li>
        <li>Improve our AI chatbot and app features</li>
        <li>Ensure user safety, support, and fraud prevention</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3"> 3. AI & Data Usage</h2>
      <p className="mb-6">
        Our AI tools are trained on real doctor-approved data. While we aim for accuracy, AI-generated responses should <strong>not replace professional medical advice</strong>.
      </p>

      <h2 className="text-2xl font-semibold mb-3"> 4. Sharing Information</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>With doctors during virtual consultations (with consent)</li>
        <li>With hospitals for emergency help (if needed)</li>
        <li>With verified partners (e.g., for medicine orders or transport)</li>
        <li>If required by law or public safety</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3"> 5. Data Security</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>End-to-end encryption</li>
        <li>Secure servers</li>
        <li>Role-based access control</li>
        <li>Regular vulnerability checks</li>
      </ul>
      <p className="mb-6">
        Despite our efforts, no system is 100% secure. Use strong passwords and avoid sharing your login.
      </p>

      <h2 className="text-2xl font-semibold mb-3"> 6. Your Rights</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>View or update your data</li>
        <li>Request deletion of your account</li>
        <li>Opt out of notifications or data sharing</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3"> 7. Data from Minors</h2>
      <p className="mb-6">
        Our platform is not intended for users under 13 without guardian supervision. We do not knowingly collect personal data from minors.
      </p>

      <h2 className="text-2xl font-semibold mb-3"> 8. International Users</h2>
      <p className="mb-6">
        If you are accessing Arogyam outside India, your data may be processed and stored in India as per local laws.
      </p>

      <h2 className="text-2xl font-semibold mb-3"> 9. Policy Updates</h2>
      <p className="mb-6">
        We may update this Privacy Policy periodically. Changes will be reflected here. Continued use of Arogyam means you agree to the latest version.
      </p>
      <br />
        <p className="text-2xl">Have questions or concerns? </p>
      <Link href='/contact' ><button className="text-md hover:text-blue-500 hover:cursor-pointer  font-semibold mb-3">Contact Us</button></Link>
      
    </div>
  );
}
