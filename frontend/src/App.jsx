import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import NutritionPlanner from './pages/NutritionPlanner';
import MentalHealth from './pages/MentalHealth';
import Chatbot from './pages/Chatbot';
import MedicationGuide from './pages/MedicationGuide';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/nutrition-planner" element={<NutritionPlanner />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/medication-guide" element={<MedicationGuide />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </main>
      
      <Footer />
      {/* <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/nutrition-planner" element={<NutritionPlanner />} />
          <Route path="/mental-health" element={<MentalHealth />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/medication-guide" element={<MedicationGuide />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main> */}
      <Footer />
    </div>
  );
}

export default App;