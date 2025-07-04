"use client";

import React from "react";
import {
  BookOpen,
  Microscope	,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";

const resources = [
  {
    icon: <BookOpen className="text-violet-600 w-5 h-5" />,
    title: "WHO Guidelines on Disease Control",
    description: "Access the latest global health guidelines.",
  },
  {
    icon: <Microscope	 className="text-indigo-600 w-5 h-5" />,
    title: "Understanding Viral Infections",
    description: "A comprehensive guide to common viral diseases.",
  },
  {
    icon: <ShieldCheck className="text-blue-600 w-5 h-5" />,
    title: "Emergency Preparedness Handbook",
    description: "Essential steps for individual and family safety during health crises.",
  },
  {
    icon: <HeartHandshake className="text-purple-600 w-5 h-5" />,
    title: "Mental Health Support Resources",
    description: "Find local and online support for mental well-being.",
  },
];

export default function HealthResources() {
  return (
    <section className="bg-[#3f8578] p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 ">Public Health Resources</h2>
      <ul className="space-y-4 align-center">
        {resources.map((item, index) => (
          <li key={index} className="bg-black/10  rounded p-2 flex items-start gap-3">
            {item.icon}
            <div>
              <h3 className="font-medium ">{item.title}</h3>
              <p className="text-sm ">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
