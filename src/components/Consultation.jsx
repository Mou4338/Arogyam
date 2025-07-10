'use client';
import React, { useState, useEffect, Fragment } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { Dialog, Transition } from '@headlessui/react';
import { CalendarClock, ChevronDown, ChevronUp, Send } from 'lucide-react';

const Consultation = ({user}) => {
  const [consultation, setConsultation] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to your consultation!' }
  ]);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const consultationCollection = collection(db, 'consultation');
        const snapshot = await getDocs(consultationCollection);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConsultation(list);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };
    fetchConsultation();
  }, []);

  const now = new Date().toISOString().split('T')[0];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Thank you for sharing. A doctor will respond shortly.' }]);
    }, 600);
  };

  return (
    <>
      <div className="p-6 bg-[#3f8578] rounded-lg shadow-xl text-white max-w-3xl mx-auto mt-6">
        <h3 className="text-3xl font-bold mb-6 text-center">My Consultations</h3>

        {consultation.length > 0 ? (
          <ul className="space-y-5">
            {consultation.filter(item => item.email === user?.email)
              .map((item, index) => (
                <li
                  key={item.id}
                  className="bg-white p-5 rounded-lg text-black shadow-md transition hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <h4 className="text-xl font-semibold">{item.subject}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-md text-sm font-medium">
                      <CalendarClock size={18} />
                      {item.date} at {item.time}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleToggle(index)}
                      className="text-sm flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
                    >
                      {openIndex === index ? (
                        <>
                          Hide Details <ChevronUp size={18} />
                        </>
                      ) : (
                        <>
                          View Details <ChevronDown size={18} />
                        </>
                      )}
                    </button>
                  </div>

                  {openIndex === index && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-md border border-gray-300 transition-all duration-300">
                      <h5 className="font-semibold text-gray-800 mb-2 text-lg">Consultation Details</h5>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p><strong>Subject:</strong> {item.subject}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <p><strong>Date:</strong> {item.date}</p>
                        <p><strong>Time:</strong> {item.time}</p>
                      </div>

                      {item.date === now && item.time === now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) && (
                        <div className="mt-4 text-right">
                          <button
                            onClick={() => setChatOpen(true)}
                            className="hover:cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2 rounded-md shadow-md transition"
                          >
                            Join Consultation
                          </button>
                          ):(
                          <span className="text-sm text-gray-600 italic ml-2">
                            Scheduled at {item.date} {item.time}
                          </span>
                        </div>)}
                    </div>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-white text-sm bg-teal-700 px-4 py-2 rounded-md inline-block mt-4">
            No consultations scheduled.
          </p>
        )}
      </div>

      <Transition show={chatOpen} as={Fragment}>
        <Dialog onClose={() => setChatOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
                <Dialog.Title className="text-xl font-semibold text-teal-700 mb-3 text-center">
                  Live Consultation
                </Dialog.Title>

                <div className="max-h-64 overflow-y-auto mb-4 space-y-2">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`text-sm px-4 py-2 rounded-md w-fit max-w-xs ${msg.from === 'user'
                          ? 'bg-teal-600 text-white ml-auto'
                          : 'bg-gray-200 text-black'
                        }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t pt-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-700"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Consultation;
