'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RabbitIcon, Send, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hello! I am Arogyam AI Shevak. How can I assist you today?',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [clientReady, setClientReady] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, isTyping]);

  const formatTime = (ts) =>
    new Intl.DateTimeFormat([], {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(ts));

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { from: 'user', text: trimmed, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      let data;

      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error('Invalid JSON from server');
      }

      if (!res.ok || !data.reply) {
        throw new Error('Invalid response');
      }

      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: data.reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: '🤖 Sorry, I couldn’t understand your problem. Please try rephrasing.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[550px] bg-black border border-white rounded-lg shadow-lg text-white">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 border-b border-white text-lg font-semibold py-2 px-4">
        <RabbitIcon className="text-white" />
        Arogyam AI Shevak
      </div>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-600"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-md whitespace-pre-line ${
                msg.from === 'bot'
                  ? 'bg-[#3f8578] text-white'
                  : 'bg-white text-black'
              }`}
            >
              {msg.text}
              <div className="text-[10px] text-right text-gray-300 mt-1">
                {clientReady && formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start pl-2 items-center text-gray-400 text-sm gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Shevak is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-600 bg-black px-4 py-3 flex items-center gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your problem..."
          className="flex-1 resize-none text-sm px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f8578]"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-[#3f8578] text-white rounded-md hover:bg-[#2f6f62] transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
