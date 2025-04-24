import React, { useState } from "react";
import api from "../api/apiClient";
import LoadingButton from "../components/LoadingButton";

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // User ID - in a real app, get this from auth context
  const userId = "current-user-id"; // Replace with actual user ID from auth

  const handleAnalyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Convert comma-separated symptoms to array
      const symptomsArray = symptoms
        .split(",")
        .map((symptom) => symptom.trim())
        .filter((symptom) => symptom.length > 0);

      const response = await api.symptoms.analyze(symptomsArray, userId);

      if (response.success) {
        setAnalysis(response.data.analysis);
      }
    } catch (error) {
      setError("Failed to analyze symptoms. Please try again.");
      console.error("Symptom analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
              placeholder="Describe your symptoms... (separate multiple symptoms with commas)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              disabled={isLoading}
            ></textarea>
          </div>
          <LoadingButton onClick={handleAnalyzeSymptoms} isLoading={isLoading}>
            Analyze Symptoms
          </LoadingButton>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {analysis && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Analysis Result</h3>
              <p className="text-gray-800 whitespace-pre-line">{analysis}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Common Symptoms</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Headache</h3>
            <p className="text-gray-600">
              Common causes and treatment options for headaches
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Fever</h3>
            <p className="text-gray-600">
              Understanding fever symptoms and when to seek help
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Cough</h3>
            <p className="text-gray-600">
              Different types of coughs and their meanings
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Fatigue</h3>
            <p className="text-gray-600">
              Common causes of fatigue and energy loss
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;
