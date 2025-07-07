'use client';

import React from 'react';
import {
  BookOpen,
  Microscope,
  ShieldCheck,
  HeartHandshake,
  Leaf,
} from 'lucide-react';

const resources = [
  {
    icon: <BookOpen className="text-violet-600 w-5 h-5" />,
    title: 'WHO Guidelines on Disease Control',
    description: 'Access the latest WHO guidance on infection prevention and control.',
    link: 'https://www.who.int/health-topics/infection-prevention-and-control',
  },
  {
    icon: <Microscope className="text-indigo-600 w-5 h-5" />,
    title: 'Understanding Viral Infections',
    description: 'Explore causes, symptoms, and treatment of viral infections.',
    link: 'https://www.msdmanuals.com/home/infections/overview-of-viral-infections/overview-of-viral-infections',
  },
  {
    icon: <ShieldCheck className="text-blue-600 w-5 h-5" />,
    title: 'Emergency Preparedness Handbook',
    description: 'Learn how to prepare for health emergencies and disasters.',
    link: 'https://www.ready.gov/publications',
  },
  {
    icon: <HeartHandshake className="text-purple-600 w-5 h-5" />,
    title: 'Mental Health Support Resources',
    description: 'Find mental health services and support in your area.',
    link: 'https://manam.ngo/',
  },
  {
    icon: <Leaf className="text-green-600 w-5 h-5" />,
    title: 'Nutrition & Immunity Guide',
    description: 'Discover WHO’s advice on boosting immunity through proper nutrition.',
    link: 'https://www.who.int/publications/i/item/nutrition-advice-for-adults-during-covid-19',
  },
];

export default function HealthResources() {
  return (
    <section className="bg-[#3f8578] p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">
        Public Health Resources
      </h2>
      <ul className="space-y-4">
        {resources.map((item, index) => (
          <li
            key={index}
            className="bg-white rounded-xl p-4 flex items-start gap-4 shadow-md transition hover:scale-[1.02] hover:shadow-lg"
          >
            {item.icon}
            <div className="flex flex-col">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-[#225b5c] hover:underline"
              >
                {item.title}
              </a>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

