// filepath: c:\Users\User\Desktop\Coding\projects\Daktari-Project\frontend\src\pages\About.jsx
import React from "react";

function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary-700 mb-4">
            About DoktaAI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering individuals with accessible, intelligent healthcare
            guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-primary-100 transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700">
              To provide personalized, AI-driven health insights and support,
              making proactive healthcare accessible to everyone, everywhere.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-primary-100 transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700">
              A future where technology bridges the gap in healthcare, offering
              reliable and instant medical assistance for a healthier world.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-primary-100 transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-primary-600 mb-4">
              Our Technology
            </h2>
            <p className="text-gray-700">
              Leveraging cutting-edge AI and machine learning to analyze
              symptoms, offer guidance, and connect users with the care they
              need.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Join Us on Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Become part of a community dedicated to improving health outcomes
            through innovation and technology.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
