import { User, HeartPulse, Dumbbell } from "lucide-react";

const testimonials = [
  {
    name: "Michelle Simson",
    role: "Busy Parent",
    icon: <User className="w-5 h-5 mr-2 text-yellow-400" />,
    content:
      "Arogyam helped me find the nearest hospital for my son instantly during an emergency.",
  },
  {
    name: "Marco Smith",
    role: "Emergency Responder",
    icon: <HeartPulse className="w-5 h-5 mr-2 text-red-600" />,
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
      
      {/* Partners Section */}
      <h3 className="text-3xl font-bold text-black">Our Trusted Partners</h3>
      <p className="text-gray-700 text-sm mb-8">Collaborating for better care</p>

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

      {/* Testimonials Section */}
      <h2 className="text-4xl text-black font-bold mt-16">Testimonials</h2>

      <div className="flex flex-wrap justify-center mt-10 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-teal-50 border border-teal-500 shadow-xl rounded-2xl p-6 space-y-3 w-[90%] sm:w-80 min-h-[200px] transition hover:scale-105 duration-300"
          >
            <div className="text-black text-sm">{t.content}</div>

            <div className="flex items-center justify-center mt-4 bg-[#3f8578] rounded-full p-3 gap-2">
              {t.icon}
              <div className="text-sm text-white text-center">
                <strong>{t.name}</strong> <br />
                <span className="text-xs text-gray-100">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
