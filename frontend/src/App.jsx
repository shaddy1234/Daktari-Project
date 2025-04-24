import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import NutritionPlanner from "./pages/NutritionPlanner";
import MentalHealth from "./pages/MentalHealth";
import Chatbot from "./pages/Chatbot";
import MedicationGuide from "./pages/MedicationGuide";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Loading application..." />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/symptom-checker"
        element={
          <ProtectedRoute>
            <SymptomChecker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nutrition-planner"
        element={
          <ProtectedRoute>
            <NutritionPlanner />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mental-health"
        element={
          <ProtectedRoute>
            <MentalHealth />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/medication-guide"
        element={
          <ProtectedRoute>
            <MedicationGuide />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
