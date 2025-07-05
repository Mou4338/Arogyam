"use client";
import React, { useState } from 'react';
import { RabbitIcon, Send } from 'lucide-react';

const text = [
  "Stay calm and assess the situation safely.",
  "Call emergency services immediately if needed.",
  "Control bleeding with direct pressure.",
  "Comfort the injured person and keep them warm.",
  "Do not move someone with a suspected spinal injury.",
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am Arogyam AI Shevak. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');

    setTimeout(() => {
        const randomTip = text[Math.floor(Math.random() * text.length)];
      setMessages(prev => [...prev, { from: 'bot', text: randomTip }]);
    }, 500);
  };

  return (
    <div className=" p-2 bg-black border border-white rounded-lg shadow-lg ">
      <nav className="flex items-center justify-center gap-2 border-b border-white text-white text-lg font-semibold py-2">
        <RabbitIcon className="text-white" />
        Arogyam AI Shevak
      </nav>

      <div className="max-h-96 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.from === 'bot' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`flex items-start gap-2 px-3 py-2 rounded-lg max-w-xs text-sm ${
                msg.from === 'bot'
                  ? 'bg-[#3f8578] text-black'
                  : 'bg-white text-black'
              }`}
            >
              {msg.from === 'bot' && <RabbitIcon size={16} />}
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 border-t border-gray-700 pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-2 py-1 rounded-l bg-white text-black focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-[#3f8578] px-4 py-2 rounded-r text-white hover:bg-[#356b61] transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
