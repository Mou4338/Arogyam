import React from 'react'
import Chatbot from '@/components/Chatbot'
import { Calendar, MessageCircle, Pin, ZapIcon } from 'lucide-react'
import Link from 'next/link'

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
    href: '/hospital'
  },
  {
    icon: <MessageCircle className="text-white" />,
    text: "Review Health Reminders",
    href: '/reminder'
  },
];

const Page = () => {
  return (
    <div className=" flex gap-4 bg-slate-100 p-4">
        <div className='flex-2/3 '>
      <Chatbot />
      </div>
      <div className="bg-[#3f8578] p-2 rounded flex-1/3">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        {quickactions.map((act, idx) => (
          <div
            key={idx}
            className="bg-[#3f8578] flex items-center gap-3 p-2 rounded-md my-2 shadow"
          >
            <Link href={act.href} className="flex items-center gap-2">
              {act.icon}
              <span className="text-md">{act.text}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
