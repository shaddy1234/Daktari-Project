// filepath: c:\Users\User\Desktop\Coding\projects\Daktari-Project\frontend\src\pages\NutritionPlanner.jsx
import React, { useState } from "react";
import api from "../api/apiClient"; // Assuming apiClient is set up
import LoadingButton from "../components/LoadingButton"; // Assuming LoadingButton component exists
import { useAuth } from "../contexts/AuthContext"; // Assuming AuthContext exists
import ReactMarkdown from "react-markdown"; // For rendering markdown content

function NutritionPlanner() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState(""); // Comma-separated string
  const [caloriesTarget, setCaloriesTarget] = useState(2000); // Default calorie target
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update the API call and response handling
  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      setError("You must be logged in to generate a meal plan.");
      return;
    }
    if (!preferences.trim()) {
      setError("Please enter at least one dietary preference or goal.");
      return;
    }
    if (!caloriesTarget || caloriesTarget <= 0) {
      setError("Please enter a valid positive calorie target.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMealPlan(null);

    // Convert comma-separated preferences string to array
    const preferencesArray = preferences
      .split(",")
      .map((pref) => pref.trim())
      .filter((pref) => pref.length > 0);

    try {
      // Call the backend API
      const response = await api.nutrition.createPlan(
        preferencesArray,
        parseInt(caloriesTarget, 10),
        user.id
      );

      if (response.success && response.data) {
        // Access the meal plan from the correct path in response
        const plan = response.data.meal_plan?.plan || response.data.mealPlan;
        setMealPlan(plan);
      } else {
        throw new Error(
          response.error || "Failed to generate meal plan from the server."
        );
      }
    } catch (err) {
      setError(
        err.message || "Failed to generate meal plan. Please try again."
      );
      console.error("Nutrition plan generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        AI Nutrition Planner
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Plan Generation Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Your Meal Plan</h2>
          <form onSubmit={handleGeneratePlan} className="space-y-4">
            <div>
              <label
                htmlFor="preferences"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dietary Preferences/Goals (comma-separated)
              </label>
              <input
                type="text"
                id="preferences"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="e.g., vegetarian, high-protein, low-carb"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div>
              <label
                htmlFor="caloriesTarget"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Daily Calorie Goal
              </label>
              <input
                type="number"
                id="caloriesTarget"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="e.g., 2000"
                value={caloriesTarget}
                onChange={(e) => setCaloriesTarget(e.target.value)}
                disabled={isLoading}
                min="1"
                required
              />
            </div>
            <LoadingButton type="submit" isLoading={isLoading}>
              Generate Meal Plan
            </LoadingButton>

            {/* Error Display */}
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Generated Plan & Tips */}
        <div className="space-y-8">
          {/* Generated Meal Plan */}
          {mealPlan && (
            <div className="bg-green-50 rounded-xl shadow-md p-6 border border-green-200">
              <h2 className="text-2xl font-semibold mb-3 text-green-800">
                Your Generated Meal Plan
              </h2>
              <div className="text-gray-800 whitespace-pre-line prose max-w-none">
                {/* Use ReactMarkdown if the plan is expected in Markdown format */}
                <ReactMarkdown>{mealPlan}</ReactMarkdown>
                {/* Or render directly if it's plain text */}
                {/* <pre>{mealPlan}</pre> */}
              </div>
            </div>
          )}

          {/* Static Nutrition Tips */}
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
                <p>
                  Stay hydrated by drinking plenty of water throughout the day
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <p>Control portion sizes for better weight management</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPlanner;
