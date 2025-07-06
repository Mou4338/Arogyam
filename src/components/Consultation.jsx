import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { CalendarClock } from 'lucide-react';

const Consultation = () => {
  const [consultation, setConsultation] = useState([]);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const consultationCollection = collection(db, 'consultation');
        const consultationSnapshot = await getDocs(consultationCollection);
        const consultationList = consultationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConsultation(consultationList);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };

    fetchConsultation();
  }, []);

  return (
    <div className="p-6 bg-[#3f8578] rounded-lg shadow-md text-white max-w-3xl mx-auto mt-6">
      <h3 className="text-2xl font-bold mb-4">My Consultations</h3>

      {consultation.length > 0 ? (
        <ul className="space-y-4">
          {consultation.map((item) => (
            <li
              key={item.id}
              className="bg-white text-black p-4 rounded-md shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-l-4 border-teal-600"
            >
              <div>
                <h4 className="text-lg font-semibold">{item.subject}</h4>
              </div>
              <div className="flex items-center text-sm gap-2 text-teal-700 bg-teal-100 px-3 py-1 rounded-md">
                <CalendarClock size={16} />
                {item.date} at {item.time}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white text-sm bg-teal-700 px-4 py-2 rounded-md inline-block">
          No consultations scheduled.
        </p>
      )}
    </div>
  );
};

export default Consultation;
