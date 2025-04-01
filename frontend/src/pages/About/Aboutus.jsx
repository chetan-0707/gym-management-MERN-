import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from "lucide-react";

export default function Aboutus() {

  const features = [
    "Top-Notch Facilities – Modern gym equipment, spacious workout areas, and clean amenities.",
    "Expert Trainers – Certified professionals to guide you on your fitness journey.",
    "Group Classes & Personal Training – From high-energy group workouts to one-on-one coaching.",
    "Flexible Memberships – Affordable plans that fit your lifestyle.",
    "Community & Motivation – A supportive environment to keep you inspired.",
  ];

  return (
    <div className="w-full h-[100vh]">
      <div className="mx-auto justify-between items-center border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl sticky top-0 flex gap-30">
        <Link to={"/"} className="text-2xl font-bold">Welcome To Google Fitness Club</Link>
        <div>
          <ul className="flex space-x-6">
            <Link to={"/about-us"} className="hover:text-gray-400">About</Link>
            <Link to={"/contact-us"} className="hover:text-gray-400">Contact</Link>
          </ul>
        </div>
      </div>

      <section className="bg-gray-20 py-10 px-6 md:px-12 rounded-lg shadow-md max-w-3xl mx-auto text-center mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
      <p className="text-gray-700 mb-6">
        Welcome to <span className="font-semibold text-red-500">Google Fitness Club</span>, where fitness meets community!
      </p>
      <p className="text-gray-700 mb-6">
        At <span className="font-semibold text-red-500">Google Fitness Club</span>, we believe in empowering individuals to achieve their 
        fitness goals through state-of-the-art equipment, expert trainers, and a motivating environment. Whether you’re 
        a beginner or an experienced athlete, our gym is designed to cater to all fitness levels.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
      <ul className="space-y-3 text-left max-w-lg mx-auto">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="text-gray-800 font-semibold">📍 Location: <span className="font-normal">Pune,Maharashtra,India</span></p>
        <p className="text-gray-800 font-semibold">📞 Contact: <span className="font-normal">+91-9922161064</span></p>
        <p className="text-gray-800 font-semibold">🌐 Website: <a href="#" className="text-blue-500 hover:underline">www.googlefitnessclub.com</a></p>
      </div>
    </section>
    </div>
  );
}
