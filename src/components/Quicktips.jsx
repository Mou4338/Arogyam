// QuickAdd.jsx
import React from "react";
import { Lightbulb } from "lucide-react";

const tips = [
  "Stay calm and assess the situation safely.",
  "Call emergency services immediately if needed.",
  "Control bleeding with direct pressure.",
  "Comfort the injured person and keep them warm.",
  "Do not move someone with a suspected spinal injury.",
];

const QuickAdd = () => {
  return (
    <div className="bg-teal-50 border border-teal-500 shadow-xl rounded-2xl p-6 space-y-8">
      <div className="flex justify-center mb-4 text-pink-500">
        <Lightbulb className="h-6 w-6" />
      </div>
      <h2 className="text-black text-lg font-semibold mb-2">Quick First Aid Tips</h2>
      <hr className="my-2 border-gray-600" />
      <ul className="text-sm text-black space-y-2 mt-4 text-left">
        {tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuickAdd;