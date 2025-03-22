import React from 'react';

function SymptomChecker() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Symptom Checker</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Check Your Symptoms</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What symptoms are you experiencing?
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Describe your symptoms..."
            ></textarea>
          </div>
          <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
            Analyze Symptoms
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Common Symptoms</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Headache</h3>
            <p className="text-gray-600">Common causes and treatment options for headaches</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Fever</h3>
            <p className="text-gray-600">Understanding fever symptoms and when to seek help</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Cough</h3>
            <p className="text-gray-600">Different types of coughs and their meanings</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Fatigue</h3>
            <p className="text-gray-600">Common causes of fatigue and energy loss</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;