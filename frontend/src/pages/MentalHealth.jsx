import React, { useState } from "react";
import api from "../api/apiClient"; // Assuming apiClient is set up
import LoadingButton from "../components/LoadingButton"; // Assuming LoadingButton component exists
import { useAuth } from "../contexts/AuthContext"; // Assuming AuthContext exists
import ReactMarkdown from "react-markdown"; // For rendering markdown content

function MentalHealth() {
  const { user } = useAuth();
  const [moodRating, setMoodRating] = useState(5); // Default mood rating (e.g., 1-10 scale)
  const [symptoms, setSymptoms] = useState(""); // User-described symptoms
  const [notes, setNotes] = useState(""); // Additional notes
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeMentalHealth = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!user?.id) {
      setError("You must be logged in to submit an assessment.");
      return;
    }
    if (!symptoms.trim() && !notes.trim()) {
      setError("Please describe your symptoms or add some notes.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    // Prepare data for the backend
    // Convert comma-separated symptoms string to array if needed by backend
    const symptomsArray = symptoms
      .split(",")
      .map((symptom) => symptom.trim())
      .filter((symptom) => symptom.length > 0);

    const assessmentData = {
      userId: user.id,
      moodRating: parseInt(moodRating, 10), // Ensure it's a number
      symptoms: symptomsArray, // Send as array or string based on backend expectation
      notes: notes.trim(),
    };

    try {
      // --- Backend Interaction ---
      // Call the new API client function
      const response = await api.mentalHealth.analyzeAssessment(assessmentData);

      if (response.success && response.data?.analysis) {
        setAnalysis(response.data.analysis);
        // Optionally clear the form fields after successful submission
        // setSymptoms("");
        // setNotes("");
        // setMoodRating(5);
      } else {
        throw new Error(
          response.error || "Failed to get analysis from the server."
        );
      }
    } catch (err) {
      setError(
        err.message || "Failed to analyze mental health. Please try again."
      );
      console.error("Mental health analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Mental Health Check-in & Analysis
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Assessment Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>
          <form onSubmit={handleAnalyzeMentalHealth} className="space-y-4">
            {/* Mood Rating */}
            <div>
              <label
                htmlFor="moodRating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rate your current mood (1=Very Low, 10=Very High): {moodRating}
              </label>
              <input
                type="range"
                id="moodRating"
                name="moodRating"
                min="1"
                max="10"
                value={moodRating}
                onChange={(e) => setMoodRating(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                disabled={isLoading}
              />
            </div>

            {/* Symptoms */}
            <div>
              <label
                htmlFor="symptoms"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Describe any symptoms you're experiencing (e.g., anxiety, low
                energy, difficulty concentrating - separate with commas):
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="3"
                placeholder="e.g., feeling anxious, trouble sleeping"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                disabled={isLoading}
              ></textarea>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Any additional notes or context? (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="3"
                placeholder="e.g., recent stressful event, specific concerns"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isLoading}
              ></textarea>
            </div>

            {/* Submit Button */}
            <LoadingButton type="submit" isLoading={isLoading}>
              Analyze & Get Suggestions
            </LoadingButton>

            {/* Error Display */}
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Analysis Result & Coping Strategies */}
        <div className="space-y-8">
          {/* Analysis Result */}
          {analysis && (
            <div className="bg-blue-50 rounded-xl shadow-md p-6 border border-blue-200">
              <h2 className="text-2xl font-semibold mb-3 text-blue-800">
                AI Analysis & Suggestions
              </h2>
              <div className="text-gray-800 whitespace-pre-line prose max-w-none">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Coping Strategies (Static) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              General Coping Strategies
            </h2>
            <ul className="space-y-4">
              <li className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold">Deep Breathing</h3>
                <p className="text-gray-600">
                  Practice deep breathing exercises for immediate stress relief.
                </p>
              </li>
              <li className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold">Mindfulness</h3>
                <p className="text-gray-600">
                  Stay present and focused with mindfulness techniques.
                </p>
              </li>
              <li className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold">Physical Activity</h3>
                <p className="text-gray-600">
                  Regular exercise can help reduce stress and anxiety.
                </p>
              </li>
              <li className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold">Seek Support</h3>
                <p className="text-gray-600">
                  Talk to friends, family, or a mental health professional.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentalHealth;
