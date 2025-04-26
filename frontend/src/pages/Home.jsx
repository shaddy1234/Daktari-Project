import { Link } from "react-router-dom";

function FeatureCard({ title, description, icon, link }) {
  return (
    <Link
      to={link}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="text-4xl mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 flex justify-center">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

function ReviewCard({ name, review, role }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <p className="text-gray-600 italic mb-6 text-lg">"{review}"</p>
      <div className="font-semibold text-gray-800">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Welcome to DoktaAI
              </h1>
              <p className="text-xl mb-8 text-primary-50">
                Your AI-powered healthcare companion for personalized medical
                assistance and wellness guidance.
              </p>
              <div className="space-x-4">
                <Link
                  to="/signup"
                  className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-300"
                >
                  Get Started
                </Link>
                {/* <Link to="/signin" className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300">
                  Login
                </Link> */}
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src=".././onboarding-img.png"
                alt="Onboarding Image"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Symptom Checker"
              description="Get instant AI-powered analysis of your symptoms and potential diagnoses"
              link="/symptom-checker"
              icon="🏥"
            />
            <FeatureCard
              title="Nutrition Planner"
              description="Personalized diet plans and nutritional guidance for your health goals"
              link="/nutrition-planner"
              icon="🥗"
            />
            <FeatureCard
              title="Mental Health Support"
              description="Access tools and resources for mental wellness and stress management"
              link="/mental-health"
              icon="🧠"
            />
            <FeatureCard
              title="AI Chatbot"
              description="24/7 healthcare assistance and answers to your medical questions"
              link="/chatbot"
              icon="💬"
            />
            <FeatureCard
              title="Medication Guide"
              description="Comprehensive information about medications and prescriptions"
              link="/medication-guide"
              icon="💊"
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ReviewCard
              name="Sarah Johnson"
              review="DoktaAI has been a game-changer for managing my health. The symptom checker is incredibly accurate!"
              role="Healthcare Professional"
            />
            <ReviewCard
              name="Michael Chen"
              review="The nutrition planning feature helped me completely transform my diet and lifestyle."
              role="Fitness Enthusiast"
            />
            <ReviewCard
              name="Emily Rodriguez"
              review="Having 24/7 access to health guidance through the AI chatbot gives me peace of mind."
              role="Parent"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
