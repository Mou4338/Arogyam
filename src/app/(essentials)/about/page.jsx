"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto text-gray-800 bg-slate-100">
      <h1 className="text-4xl font-bold mb-4 text-[#3f8578]">About Arogyam</h1>

      <p className="text-lg mb-6">
        <strong>Arogyam</strong> means <em>"the state of being free from diseases"</em>.
        It is a specialized healthcare platform designed to bridge the gap between
        patients and the health ecosystem — whether it's emergency help, everyday wellness,
        or informed prevention.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-black mb-2">Our Vision</h2>
        <p>
          “A world where access to health support is never a privilege, but a right.”
          We aim to ensure timely, accessible, and accurate health care for everyone —
          especially in underserved and rural areas.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-black mb-2">Problems We Address</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>No real-time hospital data and long emergency delays</li>
          <li>Confusion in emergency navigation</li>
          <li>Unverified and unsafe health advice online</li>
          <li>Lack of preventive health habits and outbreak awareness</li>
          <li>Limited access to doctors in rural/remote areas</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-black mb-2">Core Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Real-time hospital bed booking with filters and wait-time AI</li>
          <li>Emergency finder with ambulance/cab integration and SOS alerts</li>
          <li>AI-powered chatbot for symptom checking and treatment suggestions</li>
          <li>Medicine recommendation and e-consultation options</li>
          <li>Health alerts for diseases, vaccinations, and wellness tips</li>
          <li>Custom healthy habit and medication reminders</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-black mb-2">Our Contribution to SDGs</h2>
        <p>
          Arogyam supports several UN Sustainable Development Goals (SDGs):
          SDG 3 (Good Health), SDG 10 (Reduced Inequality), SDG 4 (Quality Education),
          SDG 11 (Sustainable Communities), and more — through digital health innovation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-black mb-2">Built for Impact</h2>
        <p>
          Arogyam combines technology, empathy, and medical knowledge to create a unified
          digital platform that empowers individuals to take control of their health,
          connect with doctors, and stay informed during emergencies.
        </p>
      </section>
    </main>
  );
}