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
    <div className="bg-white p-6 rounded-xl shadow-md border max-w-md mx-auto text-center">
      <div className="flex justify-center mb-4 text-pink-500">
        <Lightbulb className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-semibold mb-2">Quick First Aid Tips</h2>
      <hr className="my-2 border-gray-200" />
      <ul className="text-sm text-gray-700 space-y-2 mt-4 text-left">
        {tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuickAdd;