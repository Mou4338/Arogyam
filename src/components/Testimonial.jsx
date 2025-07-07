import { User, HeartPulse, Dumbbell } from "lucide-react";

const testimonials = [
  {
    name: "Michelle Simson",
    role: "Busy Parent",
    icon: <User className="w-5 h-5 mr-2 text-purple-500" />,
    content:
      "Arogyam helped me find the nearest hospital for my son instantly during an emergency.",
  },
  {
    name: "Marco Smith",
    role: "Emergency Responder",
    icon: <HeartPulse className="w-5 h-5 mr-2 text-red-500" />,
    content:
      "Real-time bed availability is a game changer for first responders like us.",
  },
  {
    name: "John Williamson",
    role: "Fitness Enthusiast",
    icon: <Dumbbell className="w-5 h-5 mr-2 text-green-500" />,
    content:
      "The AI chatbot helped me choose the best herbal solution for muscle recovery.",
  },
];

const partners = [
  "https://cdn-icons-png.flaticon.com/512/5968/5968855.png",
  "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
  "https://cdn-icons-png.flaticon.com/512/732/732221.png",
  "https://cdn-icons-png.flaticon.com/512/888/888870.png",
  "https://cdn-icons-png.flaticon.com/512/919/919825.png",
];

const Testimonial = () => {
  return (
    <div className="bg-gradient-to-b from-slate-100 to-gray-400 py-10 px-6 text-center">
      <h2 className="text-3xl text-black font-semibold mb-8">Testimonials</h2>

      {/* Testimonials Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-[#3f8578] shadow-lg rounded-xl p-6 w-[90%] sm:w-80 min-h-[200px] transition hover:scale-105 duration-300"
          >
            <div className="text-white text-sm">{t.content}</div>

            <div className="flex items-center justify-center mt-4 bg-[#132d2e] rounded-full p-3 gap-2">
              {t.icon}
              <div className="text-sm text-gray-300 text-center">
                <strong>{t.name}</strong> <br />
                <span className="text-xs text-gray-100">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Partners Section */}
      <h3 className="text-2xl font-semibold mt-12 text-black">Our Trusted Partners</h3>
      <p className="text-gray-700 text-sm mb-6">Collaborating for better care</p>

      <div className="flex justify-center items-center flex-wrap gap-6 px-4">
        {partners.map((url, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-3 shadow-md shadow-teal-600 border border-teal-100 transition hover:scale-105"
          >
            <img
              src={url}
              alt="Partner logo"
              className="h-12 w-12 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
