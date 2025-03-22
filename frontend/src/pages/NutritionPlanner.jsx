import React from 'react';

function NutritionPlanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Nutrition Planner</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Your Meal Plan</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preferences
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Keto</option>
                <option>Paleo</option>
                <option>No restrictions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Calorie Goal
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="2000"
              />
            </div>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700">
              Generate Meal Plan
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Nutrition Tips</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Balance your meals with proteins, carbs, and healthy fats</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Include a variety of colorful fruits and vegetables</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Stay hydrated by drinking plenty of water throughout the day</p>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <p>Control portion sizes for better weight management</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NutritionPlanner;