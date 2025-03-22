import React from 'react';

function MedicationGuide() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Medication Guide</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Search Medications</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter medication name..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Medication Safety Tips</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Always follow prescribed dosage instructions</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Store medications in a cool, dry place</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Keep track of medication expiration dates</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Inform your doctor about all medications you're taking</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Common Medications</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold">Pain Relievers</h3>
            <p className="text-gray-600">Information about common pain medications</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold">Antibiotics</h3>
            <p className="text-gray-600">Guide to antibiotic medications</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold">Allergy Medications</h3>
            <p className="text-gray-600">Types of allergy relief medicines</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicationGuide;