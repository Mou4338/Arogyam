'use client';

import React from 'react';
import Chatbot from '@/components/Chatbot';
import {
  Calendar,
  MessageCircle,
  Pin,
  ZapIcon,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

const quickactions = [
  {
    icon: <Calendar className="w-6 h-6 text-white" />,
    text: 'Schedule Virtual Consultation',
    href: '/doctors',
  },
  {
    icon: <ZapIcon className="w-6 h-6 text-white" />,
    text: 'Emergency Bed Booking',
    href: '/emergency',
  },
  {
    icon: <Pin className="w-6 h-6 text-white" />,
    text: 'Find Hospital Near Me',
    href: '/hospitals',
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    text: 'Review Health Reminders',
    href: '/reminders',
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-white" />,
    text: 'View Public Health Alerts',
    href: '/alerts',
  },
  {
    icon: <ExternalLink className="w-6 h-6 text-white" />,
    text: 'Order Recommended Medicine',
    href: 'https://www.1mg.com/', // Replace with your preferred partner
    external: true,
  },
];

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-slate-100 p-4 min-h-screen">
      {/* Chatbot */}
      <div className="flex-1">
        <Chatbot />
      </div>

      {/* Quick Actions */}
      <div className="w-full md:max-w-xs bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-black mb-4">⚡ Quick Actions</h3>
        <div className="space-y-4">
          {quickactions.map((action, idx) => {
            const isExternal = action.external;
            return isExternal ? (
              <a
                key={idx}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#3f8578] rounded-md p-4 text-white shadow-md hover:shadow-lg hover:bg-[#356c60] transition transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  {action.icon}
                  <span className="text-sm font-medium">{action.text}</span>
                </div>
              </a>
            ) : (
              <Link
                key={idx}
                href={action.href}
                className="block bg-[#3f8578] rounded-md p-4 text-white shadow-md hover:shadow-lg hover:bg-[#356c60] transition transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  {action.icon}
                  <span className="text-sm font-medium">{action.text}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;


