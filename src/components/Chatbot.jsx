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
    }, 600);
  };

  return (
    <div className="flex flex-col h-[500px] md:h-[550px] bg-black border border-white rounded-xl shadow-lg">
      <nav className="flex items-center justify-center gap-2 border-b border-white text-white text-lg font-semibold py-3">
        <RabbitIcon className="text-white" />
        Arogyam AI Shevak
      </nav>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-500">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`flex items-start gap-2 px-3 py-2 rounded-lg max-w-xs text-sm leading-snug ${
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

      <div className="flex items-center p-2 border-t border-white bg-white rounded-b-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded-l-lg bg-white text-black border border-gray-300 focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-[#3f8578] px-4 py-2 rounded-r-lg text-white hover:bg-[#32655a] transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
