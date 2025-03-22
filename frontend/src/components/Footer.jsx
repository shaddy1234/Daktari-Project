function Footer() {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary-400">KimSAI</h3>
              <p className="text-gray-400">Your AI-powered healthcare companion available 24/7.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="/symptom-checker" className="text-gray-400 hover:text-white transition-colors duration-200">Symptom Checker</a></li>
                <li><a href="/nutrition-planner" className="text-gray-400 hover:text-white transition-colors duration-200">Nutrition Planner</a></li>
                <li><a href="/mental-health" className="text-gray-400 hover:text-white transition-colors duration-200">Mental Health</a></li>
                <li><a href="/chatbot" className="text-gray-400 hover:text-white transition-colors duration-200">AI Chatbot</a></li>
                <li><a href="/medication-guide" className="text-gray-400 hover:text-white transition-colors duration-200">Medication Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} KimSAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;