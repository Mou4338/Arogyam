import React from 'react';
import {
  Hospital, Ambulance, Pill, ShieldAlert, PhoneCall, BotMessageSquare,
  HeartPulse, Zap, CalendarCheck, ClipboardList
} from 'lucide-react';
import Testimonial from './Testimonial';

export default function HeroSection() {
  const services = [
    {
      title: "Hospital Search",
      description: "Find nearest hospitals with real-time bed availability and estimated wait times, ensuring quick access to care.",
      icon: <Hospital className="bg-green-200 text-black rounded-full p-2" size={35} />
    },
    {
      title: "Emergency Services",
      description: "Immediate access to critical emergency services, including one-click ambulance and cab booking.",
      icon: <Ambulance className="bg-green-200 text-black rounded-full p-2" size={35} />
    },
    {
      title: "Health Reminders",
      description: "Set customizable reminders for water intake, exercise, medication, and other healthy habits for daily wellness.",
      icon: <Pill className="bg-green-200 text-black rounded-full p-2" size={35} />
    },
    {
      title: "Public Health Alerts",
      description: "Stay informed with real-time notifications about prevalent public health concerns and disease outbreaks in your area.",
      icon: <ShieldAlert className="bg-green-200 text-black rounded-full p-2" size={35} />
    },
    {
      title: "Virtual Consultations",
      description: "Schedule secure video calls with certified doctors for convenient consultations from the comfort of your home.",
      icon: <PhoneCall className="bg-green-200 text-black rounded-full p-2" size={35} />
    },
    {
      title: "AI Chatbot",
      description: "Engage with our intelligent AI chatbot for personalized health advice, medicine recommendations, and support.",
      icon: <BotMessageSquare className="bg-green-200 text-black rounded-full p-2" size={35} />
    }
  ];

  const healthFeatures = [
    {
      icon: HeartPulse,
      title: "Personalized Health Insights",
      description: "Receive tailored health advice and recommendations based on your unique profile and interactions with the AI chatbot.",
    },
    {
      icon: Zap,
      title: "Rapid Emergency Response",
      description: "Access critical emergency services and transportation booking with unparalleled speed and efficiency during urgent situations.",
    },
    {
      icon: CalendarCheck,
      title: "Seamless Virtual Care",
      description: "Connect with certified medical professionals through secure video consultations, making healthcare accessible from anywhere.",
    },
    {
      icon: ClipboardList,
      title: "Comprehensive Health Management",
      description: "Manage appointments, track reminders, and stay updated on public health alerts—all from one intuitive platform.",
    },
  ];

  const stats = [
    { label: 'Departments', value: '12+' },
    { label: 'Happy Patients', value: '15,000+' },
    { label: 'Facilities', value: '50+' },
    { label: 'Doctors', value: '100+' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] bg-[url('/bg-hero.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-xs" />
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-black mb-4">
            Your Health, Our Priority.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
            Real-time hospital bed booking, AI health advice, and personalized care at your fingertips. Arogyam simplifies your health journey.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="bg-[#3a8981] text-white font-heading font-semibold px-6 py-2 rounded hover:bg-[#f8f9f9] hover:text-black transition-colors duration-200">
              Find a Hospital
            </button>
            <button className="bg-[#3a8981] text-white font-heading font-semibold px-6 py-2 rounded hover:bg-[#f8f9f9] hover:text-black transition-colors duration-200">
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-100 py-12">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-black mb-10">
          Comprehensive Health Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#3f8578] text-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
              </div>
              <p className="text-slate-200 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Arogyam */}
      <section className="py-12 flex flex-col md:flex-row items-center justify-between gap-8 px-4 bg-[#64bcae]">
        <div className="flex-1 flex flex-col rounded shadow-lg px-4 py-2">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-[#132d2e]">
            Why Choose Arogyam?
          </h2>
          <p className="text-md text-gray-800 mb-4">
            Arogyam is designed to provide you with seamless access to essential health services, empowering you to take control of your well-being with confidence and ease.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {healthFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
              >
                <div className="p-2 bg-green-900 rounded-full">
                  <feature.icon className="text-white" size={30} />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-[#132d2e] mb-1">{feature.title}</h3>
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src="/feature.png" alt="Arogyam Health Services" className="h-auto max-w-[500px] md:max-w-[600px]" />
        </div>
      </section>

      {/* Our Performance */}
      <section className="bg-slate-100 py-12">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-black mb-10">
          Our Performance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto px-6 text-center">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md py-6 px-4 hover:shadow-lg transition"
            >
              <p className="text-3xl font-bold text-[#132d2e]">{item.value}</p>
              <p className="text-sm text-gray-700 mt-2 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonial />
    </>
  );
}

