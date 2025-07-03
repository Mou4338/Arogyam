import { User, HeartPulse, Dumbbell } from "lucide-react";

const testimonials = [
  {
    name: "Michelle Simson",
    role: "Busy Parent",
    icon: <User className="w-5 h-5 mr-2 text-purple-500" />,
    content: "Arogyam helped me find the nearest hospital for my son instantly during an emergency.",
  },
  {
    name: "Marco Smith",
    role: "Emergency Responder",
    icon: <HeartPulse className="w-5 h-5 mr-2 text-red-500" />,
    content: "Real-time bed availability is a game changer for first responders like us.",
  },
  {
    name: "John Williamson",
    role: "Fitness Enthusiast",
    icon: <Dumbbell className="w-5 h-5 mr-2 text-green-500" />,
    content: "The AI chatbot helped me choose the best herbal solution for muscle recovery.",
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
    <div className="bg-gradient-to-b from-white to-slate-100 py-4 px-6 text-center rounded-xl">
      <h2 className="text-3xl text-black font-semibold my-4">Testimonials</h2>
      <div className="flex justify-center gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="hover:cursor-pointer bg-[#3f8578] shadow-lg rounded-xl p-6 w-80 transition hover:scale-105 duration-300"
          >
            <div className="text-black mb-4">{t.content}</div>
            <div className="flex items-center justify-center mt-4 bg-[#132d2e] rounded-full p-3">
              {t.icon}
              <div className="text-sm text-gray-300">
                <strong>{t.name}</strong> <br />
                <span className="text-xs text-gray-100">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold my-4 text-black">Our Trusted Partners</h3>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {partners.map((url, i) => (
          <img
            key={i}
            src={url}
            alt="Partner logo"
            className="h-10 w-10 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;