import React from 'react';
import Chatbot from '@/components/Chatbot';
import { Calendar, MessageCircle, Pin, ZapIcon } from 'lucide-react';
import Link from 'next/link';

const quickactions = [
  {
    icon: <Calendar className="text-white" />,
    text: "Schedule Virtual Consultation",
    href: '/consultation'
  },
  {
    icon: <ZapIcon className="text-white" />,
    text: "Order Recommended Medicine",
    href: '/consultation'
  },
  {
    icon: <Pin className="text-white" />,
    text: "Find Hospital Near Me",
    href: '/hospitals' // fixed typo from '/hospital'
  },
  {
    icon: <MessageCircle className="text-white" />,
    text: "Review Health Reminders",
    href: '/reminders' // fixed typo from '/reminder'
  },
];

const Page = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-slate-100 p-4 min-h-screen">
      <div className="lg:basis-2/3">
        <Chatbot />
      </div>

      <div className="lg:basis-1/3 bg-[#3f8578] p-4 rounded-xl shadow text-white">
        <h3 className="text-xl font-semibold mb-4 text-white">Quick Actions</h3>
        <div className="space-y-3">
          {quickactions.map((act, idx) => (
            <Link
              key={idx}
              href={act.href}
              className="flex items-center gap-3 bg-[#306960] hover:bg-[#2a5c54] transition px-4 py-3 rounded-lg shadow-md"
            >
              {act.icon}
              <span className="text-md">{act.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
