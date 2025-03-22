import React from 'react';

function MentalHealth() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Mental Health Support</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Stress Assessment</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Very stressed</option>
                <option>Moderately stressed</option>
                <option>Slightly stressed</option>
                <option>Calm</option>
                <option>Relaxed</option>
              </select>
            </div>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
              Get Personalized Support
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Coping Strategies</h2>
          <ul className="space-y-4">
            <li className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold">Deep Breathing</h3>
              <p className="text-gray-600">Practice deep breathing exercises for immediate stress relief</p>
            </li>
            <li className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold">Mindfulness</h3>
              <p className="text-gray-600">Stay present and focused with mindfulness techniques</p>
            </li>
            <li className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold">Physical Activity</h3>
              <p className="text-gray-600">Regular exercise can help reduce stress and anxiety</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MentalHealth;