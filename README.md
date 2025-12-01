# 🏥 DoktaAI - AI-Powered Healthcare Platform

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-brightgreen.svg)](https://supabase.io/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-orange.svg)](https://ai.google.dev/)

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Backend Services](#backend-services)
- [Security & Authentication](#security--authentication)
- [AI Integration](#ai-integration)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

**DoktaAI** is a comprehensive AI-powered healthcare platform that provides personalized medical assistance, symptom analysis, nutrition planning, mental health support, and medication management. Built with modern web technologies and powered by Google's Gemini AI, it offers users 24/7 access to intelligent healthcare guidance.

### 🎥 Live Demo
[not hosted]

## ✨ Key Features

### 🩺 **AI Health Assistant (Chatbot)**
- **Context-Aware Conversations**: Maintains conversation history for contextual responses
- **Medical Guidance**: Provides health-related information with appropriate disclaimers
- **24/7 Availability**: Always-on AI assistant for immediate health queries
- **Chat History Management**: Store, retrieve, and clear conversation history
- **Real-time Responses**: Instant AI-generated replies using Google Gemini

**Implementation Highlights:**
- History-aware prompting system in [`backend/services/geminiService.js`](backend/services/geminiService.js)
- Conversation persistence using JSON file storage in [`backend/data/chatHistory.json`](backend/data/chatHistory.json)
- Frontend chat interface with loading states in [`frontend/src/pages/Chatbot.jsx`](frontend/src/pages/Chatbot.jsx)

### 🔍 **Symptom Checker**
- **AI-Powered Analysis**: Analyzes user-reported symptoms using Gemini AI
- **Preliminary Assessment**: Provides possible conditions and recommendations
- **History Tracking**: Stores all symptom analyses for future reference
- **Markdown Formatting**: Rich text responses with proper formatting
- **Medical Disclaimers**: Clear warnings that AI is not a substitute for professional diagnosis

**Technical Details:**
- Symptom analysis logic in [`backend/services/geminiService.js`](backend/services/geminiService.js)
- Analysis storage in [`backend/data/symptomAnalyses.json`](backend/data/symptomAnalyses.json)
- Controller implementation in [`backend/controllers/symptomController.js`](backend/controllers/symptomController.js)

### 🥗 **Nutrition Planner**
- **Personalized Meal Plans**: AI-generated meal plans based on dietary preferences
- **Calorie Tracking**: Custom calorie targets for individual goals
- **Dietary Preferences**: Supports various dietary restrictions (vegan, keto, gluten-free, etc.)
- **Detailed Breakdown**: Breakfast, lunch, dinner, and snack recommendations
- **Nutritional Tips**: Static wellness tips and best practices

**Features:**
- Meal plan generation in [`backend/services/geminiService.js`](backend/services/geminiService.js)
- Nutrition controller in [`backend/controllers/nutritionController.js`](backend/controllers/nutritionController.js)
- Interactive UI in [`frontend/src/pages/NutritionPlanner.jsx`](frontend/src/pages/NutritionPlanner.jsx)

### 🧠 **Mental Health Support**
- **Mood Rating System**: Track mood on a 1-10 scale
- **Symptom Recording**: Document mental health symptoms
- **AI Analysis**: Receive supportive feedback and coping strategies
- **Wellness Suggestions**: Evidence-based coping mechanisms
- **Privacy-Focused**: Secure handling of sensitive mental health data

**Implementation:**
- Mental health analysis in [`backend/services/geminiService.js`](backend/services/geminiService.js)
- Assessment controller in [`backend/controllers/mentalHealthController.js`](backend/controllers/mentalHealthController.js)
- Frontend assessment form in [`frontend/src/pages/MentalHealth.jsx`](frontend/src/pages/MentalHealth.jsx)

### 💊 **Medication Management**
- **Medication Tracking**: Add, update, and delete medications
- **Dosage Information**: Track medication names and dosages
- **Reminder System**: Browser notifications for medication schedules (planned)
- **Medication History**: View all past and current medications
- **Safety Tips**: Static medication safety guidelines

**Backend:**
- CRUD operations in [`backend/controllers/medicationController.js`](backend/controllers/medicationController.js)
- API routes in [`backend/routes/medicationRoutes.js`](backend/routes/medicationRoutes.js)

### 👤 **User Profile Management**
- **Profile Information**: Full name, date of birth, gender
- **Editable Profiles**: Update personal information
- **Secure Authentication**: Supabase-powered authentication
- **Session Management**: JWT-based session handling

**Features:**
- Profile management in [`backend/controllers/authController.js`](backend/controllers/authController.js)
- Frontend profile page in [`frontend/src/pages/Profile.jsx`](frontend/src/pages/Profile.jsx)

## 🛠 Technology Stack

### **Frontend**
- **Framework**: React 18.x with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: 
  - Custom loading buttons ([`LoadingButton.jsx`](frontend/src/components/LoadingButton.jsx))
  - Loading screens ([`LoadingScreen.jsx`](frontend/src/components/LoadingScreen.jsx))
  - Spinner component ([`Loader.jsx`](frontend/src/components/Loader.jsx))
- **Icons**: Heroicons
- **Markdown Rendering**: react-markdown
- **State Management**: React Context API ([`AuthContext.jsx`](frontend/src/contexts/AuthContext.jsx))
- **HTTP Client**: Fetch API with custom wrapper ([`apiClient.js`](frontend/src/api/apiClient.js))

### **Backend**
- **Runtime**: Node.js 18.x
- **Framework**: Express.js 4.x
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with JWT
- **Security**: Helmet.js, CORS
- **Logging**: Morgan
- **Environment**: dotenv

### **Data Storage**
- **Primary Database**: Supabase PostgreSQL
- **File Storage**: JSON files for chat history and symptom analyses
- **Session Storage**: LocalStorage for client-side token management

### **AI & Machine Learning**
- **Model**: Google Gemini 1.5 Flash
- **Use Cases**:
  - Health conversation generation
  - Symptom analysis
  - Meal plan creation
  - Mental health assessment

## 🏗 Architecture

### **System Architecture**

```
┌─────────────────┐
│   React Client  │
│   (Frontend)    │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Express Server │
│   (Backend)     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│Supabase│ │Gemini│
│  DB    │ │  AI  │
└────────┘ └──────┘
```

### **Request Flow**

1. **Client Request** → React component makes API call via [`apiClient.js`](frontend/src/api/apiClient.js)
2. **Authentication** → JWT token validated by [`auth.js`](backend/middleware/auth.js)
3. **Routing** → Express routes in [`backend/routes/`](backend/routes/)
4. **Controller** → Business logic in [`backend/controllers/`](backend/controllers/)
5. **Service Layer** → AI/Database operations in [`backend/services/`](backend/services/)
6. **Response** → JSON response back to client

### **Middleware Chain**

```javascript
Request → CORS → Helmet → Morgan → attachSupabase → authMiddleware → Controller
```

## 📁 Project Structure

### **Backend Structure**

```
backend/
├── app.js                      # Express app configuration
├── server.js                   # Server entry point
├── package.json                # Dependencies
├── .env                        # Environment variables
├── config/
│   └── db.js                   # Supabase client configuration
├── controllers/
│   ├── authController.js       # Authentication logic
│   ├── chatController.js       # Chatbot message handling
│   ├── medicationController.js # Medication CRUD operations
│   ├── mentalHealthController.js # Mental health assessments
│   ├── nutritionController.js  # Meal plan generation
│   └── symptomController.js    # Symptom analysis
├── data/
│   ├── chatHistory.json        # Chat conversation storage
│   └── symptomAnalyses.json    # Symptom analysis history
├── middleware/
│   ├── auth.js                 # JWT authentication
│   └── errorHandler.js         # Global error handling
├── routes/
│   ├── authRoutes.js           # Auth endpoints
│   ├── chatRoutes.js           # Chat endpoints
│   ├── medicationRoutes.js     # Medication endpoints
│   ├── mentalHealthRoutes.js   # Mental health endpoints
│   ├── nutritionRoutes.js      # Nutrition endpoints
│   └── symptomRoutes.js        # Symptom endpoints
├── services/
│   ├── geminiService.js        # Google Gemini AI integration
│   ├── storageService.js       # JSON file operations
│   └── supabaseService.js      # Database operations (legacy)
└── utils/
    └── validators.js           # Input validation helpers
```

### **Frontend Structure**

```
frontend/
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint rules
├── .env                        # Environment variables
├── public/
│   ├── favicon.ico             # App icon
│   └── onboarding-img.png      # Hero image
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component
    ├── index.css               # Global styles
    ├── api/
    │   ├── apiClient.js        # HTTP client with auth
    │   ├── aiService.js        # AI service functions (legacy)
    │   ├── notifications.js    # Browser notifications
    │   ├── supabaseClient.js   # Supabase client (legacy)
    │   └── supabase.js         # Supabase instance
    ├── components/
    │   ├── Footer.jsx          # Footer component
    │   ├── Loader.jsx          # Loading spinner
    │   ├── LoadingButton.jsx   # Button with loading state
    │   ├── LoadingScreen.jsx   # Full-screen loader
    │   └── Navbar.jsx          # Navigation bar
    ├── contexts/
    │   └── AuthContext.jsx     # Authentication context
    └── pages/
        ├── Home.jsx            # Landing page
        ├── About.jsx           # About page
        ├── SignIn.jsx          # Login page
        ├── SignUp.jsx          # Registration page
        ├── Profile.jsx         # User profile
        ├── Chatbot.jsx         # AI chat interface
        ├── SymptomChecker.jsx  # Symptom analysis
        ├── NutritionPlanner.jsx # Meal planning
        ├── MentalHealth.jsx    # Mental health assessment
        └── MedicationGuide.jsx # Medication management
```

## 🚀 Setup & Installation

### **Prerequisites**
- Node.js v18.x or later
- npm or yarn
- Supabase account
- Google AI Studio account (for Gemini API key)

### **Backend Setup**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_KEY=your_supabase_service_role_key
   SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Server runs on `http://localhost:5000`

### **Frontend Setup**

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   App runs on `http://localhost:5173`

### **Environment Variables Explained**

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | ✅ |
| `SUPABASE_SERVICE_KEY` | Service role key for admin operations | ✅ |
| `SUPABASE_ANON_KEY` | Anonymous key for client-side operations | ✅ |
| `GEMINI_API_KEY` | Google AI Studio API key | ✅ |
| `PORT` | Backend server port (default: 5000) | ❌ |
| `VITE_API_URL` | Backend API URL for frontend | ✅ |

## 📡 API Documentation

### **Base URL**
```
http://localhost:5000/api
```

### **Authentication Endpoints**

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Get Profile
```http
GET /api/auth/profile/:userId
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/auth/profile/:userId
Authorization: Bearer {token}
Content-Type: application/json

{
  "full_name": "John Doe",
  "date_of_birth": "1990-01-01",
  "gender": "male"
}
```

### **Chat Endpoints**

#### Send Message
```http
POST /api/chat/message
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "What are the symptoms of flu?",
  "userId": "user-id-here"
}
```

#### Get Chat History
```http
GET /api/chat/history/:userId
Authorization: Bearer {token}
```

#### Clear Chat History
```http
DELETE /api/chat/history/:userId
Authorization: Bearer {token}
```

### **Symptom Checker Endpoints**

#### Analyze Symptoms
```http
POST /api/symptoms/analyze
Authorization: Bearer {token}
Content-Type: application/json

{
  "symptoms": ["headache", "fever", "fatigue"],
  "userId": "user-id-here"
}
```

#### Get Symptom History
```http
GET /api/symptoms/history/:userId
Authorization: Bearer {token}
```

### **Nutrition Endpoints**

#### Generate Meal Plan
```http
POST /api/nutrition/plan
Authorization: Bearer {token}
Content-Type: application/json

{
  "preferences": ["vegan", "high-protein"],
  "caloriesTarget": 2000,
  "userId": "user-id-here"
}
```

#### Get Nutrition Plans
```http
GET /api/nutrition/plans/:userId
Authorization: Bearer {token}
```

### **Mental Health Endpoints**

#### Submit Assessment
```http
POST /api/mental-health/analyze
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-id-here",
  "moodRating": 7,
  "symptoms": ["anxiety", "stress"],
  "notes": "Feeling overwhelmed with work"
}
```

#### Get Assessment History
```http
GET /api/mental-health/history/:userId
Authorization: Bearer {token}
```

### **Medication Endpoints**

#### Add Medication
```http
POST /api/medications
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-id-here",
  "medication_name": "Aspirin",
  "dosage": "500mg",
  "frequency": "twice daily"
}
```

#### Get Medications
```http
GET /api/medications/:userId
Authorization: Bearer {token}
```

#### Update Medication
```http
PUT /api/medications/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "dosage": "750mg"
}
```

#### Delete Medication
```http
DELETE /api/medications/:id
Authorization: Bearer {token}
```

### **Response Format**

All API endpoints return responses in this format:

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🎨 Frontend Features

### **Component Architecture**

#### **Reusable Components**

1. **LoadingButton** ([`LoadingButton.jsx`](frontend/src/components/LoadingButton.jsx))
   - Displays loading spinner during async operations
   - Prevents multiple submissions
   - Customizable styling with Tailwind classes

2. **Loader** ([`Loader.jsx`](frontend/src/components/Loader.jsx))
   - Configurable sizes (small, medium, large)
   - Multiple color options (primary, secondary, white)
   - Animated spinning indicator

3. **LoadingScreen** ([`LoadingScreen.jsx`](frontend/src/components/LoadingScreen.jsx))
   - Full-screen overlay loader
   - Custom loading messages
   - Used during authentication and page transitions

4. **Navbar** ([`Navbar.jsx`](frontend/src/components/Navbar.jsx))
   - Responsive navigation
   - User profile menu
   - Authentication-aware menu items
   - Logout functionality

5. **Footer** ([`Footer.jsx`](frontend/src/components/Footer.jsx))
   - Site-wide footer with links
   - Social media integration (planned)
   - Copyright and branding

### **Page Components**

#### **Home Page** ([`Home.jsx`](frontend/src/pages/Home.jsx))
- Hero section with call-to-action
- Feature cards showcasing main functionalities
- User testimonials/reviews section
- Responsive grid layout

#### **Authentication Pages**
- **Sign In** ([`SignIn.jsx`](frontend/src/pages/SignIn.jsx)): Login form with validation
- **Sign Up** ([`SignUp.jsx`](frontend/src/pages/SignUp.jsx)): Registration with email/password

#### **Feature Pages**
- **Chatbot** ([`Chatbot.jsx`](frontend/src/pages/Chatbot.jsx))
  - Message history display
  - Real-time AI responses
  - Clear chat functionality
  - Loading states for messages
  
- **Symptom Checker** ([`SymptomChecker.jsx`](frontend/src/pages/SymptomChecker.jsx))
  - Textarea for symptom input
  - AI analysis display with markdown
  - Common symptoms reference
  
- **Nutrition Planner** ([`NutritionPlanner.jsx`](frontend/src/pages/NutritionPlanner.jsx))
  - Preference input (comma-separated)
  - Calorie target slider
  - Generated meal plan display
  - Nutrition tips section
  
- **Mental Health** ([`MentalHealth.jsx`](frontend/src/pages/MentalHealth.jsx))
  - Mood rating slider (1-10)
  - Symptom textarea
  - AI analysis with coping strategies
  - Static wellness resources
  
- **Profile** ([`Profile.jsx`](frontend/src/pages/Profile.jsx))
  - View/edit profile information
  - Update personal details
  - Logout functionality

### **Routing & Protection**

#### **Protected Routes** ([`App.jsx`](frontend/src/App.jsx))
```jsx
<ProtectedRoute>
  <ComponentName />
</ProtectedRoute>
```

Protected routes require authentication and redirect to `/signin` if user is not logged in.

#### **Public Routes**
- `/` - Home
- `/signin` - Sign In
- `/signup` - Sign Up
- `/about` - About

#### **Protected Routes**
- `/profile` - User Profile
- `/chatbot` - AI Assistant
- `/symptom-checker` - Symptom Analysis
- `/nutrition-planner` - Meal Planning
- `/mental-health` - Mental Health Assessment
- `/medication-guide` - Medication Management

### **State Management**

#### **AuthContext** ([`AuthContext.jsx`](frontend/src/contexts/AuthContext.jsx))
```javascript
{
  user: null | { id, email, ... },
  isAuthenticated: boolean,
  loading: boolean,
  login: (email, password) => Promise,
  logout: () => Promise,
  signup: (email, password) => Promise
}
```

### **API Client** ([`apiClient.js`](frontend/src/api/apiClient.js))

Custom HTTP client with:
- Automatic JWT token attachment
- Centralized error handling
- Request/response interceptors
- Token management utilities

```javascript
// Example usage
import api from '../api/apiClient';

const response = await api.chat.sendMessage(message, userId);
```

## 🔧 Backend Services

### **Gemini AI Service** ([`geminiService.js`](backend/services/geminiService.js))

#### **Core Functions**

1. **generateHealthResponse(currentMessage, history)**
   - Generates AI responses for health-related questions
   - Maintains conversation context using history
   - Includes medical disclaimers in prompts
   - Returns markdown-formatted text

2. **analyzeSymptoms(symptoms)**
   - Analyzes array of symptoms
   - Provides preliminary assessments
   - Lists possible conditions
   - Recommends when to seek professional help

3. **generateMealPlan(preferences, caloriesTarget)**
   - Creates personalized meal plans
   - Considers dietary restrictions
   - Balances nutritional requirements
   - Formats output in markdown

4. **analyzeMentalState(assessmentData)**
   - Evaluates mood rating (1-10)
   - Processes reported symptoms
   - Provides supportive feedback
   - Suggests evidence-based coping strategies
   - Includes mental health disclaimers

#### **AI Prompt Engineering**

All prompts are carefully designed to:
- Set clear AI assistant persona
- Include strong medical disclaimers
- Encourage seeking professional help
- Provide empathetic, supportive responses
- Format output for readability

### **Storage Service** ([`storageService.js`](backend/services/storageService.js))

JSON file-based storage for:
- **Chat History**: [`chatHistory.json`](backend/data/chatHistory.json)
- **Symptom Analyses**: [`symptomAnalyses.json`](backend/data/symptomAnalyses.json)

#### **Functions**
- `readData(filePath)`: Read JSON file, return parsed data
- `writeData(filePath, data)`: Write data to JSON file

**Benefits:**
- Simple implementation for MVP
- Easy debugging and inspection
- No additional database setup required
- Can be migrated to database later

### **Database Service** ([`db.js`](backend/config/db.js))

Supabase client configuration with:
- Service role key for admin operations
- Connection pooling
- Error handling
- Middleware to attach client to requests

```javascript
// Usage in controllers
const { data, error } = await req.supabase
  .from('table_name')
  .select('*')
  .eq('user_id', userId);
```

## 🔐 Security & Authentication

### **Authentication Flow**

1. **User Sign Up/Sign In** → Supabase Auth
2. **JWT Token Generation** → Supabase
3. **Token Storage** → LocalStorage (client)
4. **Token Validation** → [`auth.js`](backend/middleware/auth.js) middleware
5. **User Context** → [`AuthContext.jsx`](frontend/src/contexts/AuthContext.jsx)

### **Security Middleware**

#### **Helmet.js**
- Sets security-related HTTP headers
- Protects against common vulnerabilities
- Configured in [`app.js`](backend/app.js)

#### **CORS**
- Cross-Origin Resource Sharing enabled
- Configured for frontend origin
- Allows credentials

#### **Authentication Middleware** ([`auth.js`](backend/middleware/auth.js))
```javascript
// Validates JWT token from Authorization header
// Attaches user to request object
// Returns 401 if invalid/missing token
```

### **Data Protection**

- **Passwords**: Hashed by Supabase Auth (bcrypt)
- **JWT Tokens**: Signed and verified by Supabase
- **HTTPS**: Recommended for production
- **Environment Variables**: Sensitive data stored in `.env` files

### **Input Validation**

- Request body validation in controllers
- Type checking for required fields
- Sanitization of user inputs (planned enhancement)

## 🤖 AI Integration

### **Google Gemini AI**

**Model**: Gemini 1.5 Flash

**Key Features:**
- Fast response times
- High-quality text generation
- Context-aware responses
- Markdown formatting support

### **AI Use Cases**

| Feature | Prompt Type | Max Tokens | Context Window |
|---------|-------------|------------|----------------|
| Chatbot | Conversational | 500 | Last 10 messages |
| Symptom Analysis | Analytical | 500 | Single request |
| Meal Planning | Generative | 1000 | Single request |
| Mental Health | Supportive | 700 | Single request |

### **Prompt Structure**

All prompts follow this pattern:
1. **System Role**: Define AI assistant persona
2. **Rules**: Medical disclaimers, limitations
3. **Context**: Conversation history (if applicable)
4. **User Input**: Current query/data
5. **Output Format**: Markdown, structure requirements

### **Example Prompt** (Chatbot)
```
You are DoktaAI, a helpful AI medical assistant.
Your primary goal is to provide informative and supportive health-related guidance.

**Important Rules:**
- DO NOT provide medical diagnoses.
- DO NOT provide specific treatment plans.
- ALWAYS recommend consulting a qualified healthcare professional.
- Keep responses concise, empathetic, and easy to understand.
- Use the conversation history for context.

Conversation History (Oldest to Newest):
User: I have a headache
AI: Headaches can have many causes...

User: What should I do?
AI: [Response here]
```

### **Error Handling**

- API rate limiting detection
- Fallback error messages
- Retry logic (planned)
- Logging of AI failures

## 🎯 Future Enhancements

### **High Priority**

1. **Database Migration**
   - [ ] Migrate chat history from JSON to PostgreSQL
   - [ ] Migrate symptom analyses to database
   - [ ] Implement proper data indexing
   - [ ] Add database transactions

2. **Enhanced AI Features**
   - [ ] Multi-turn conversation improvement
   - [ ] Image-based symptom analysis (Gemini Vision)
   - [ ] Voice input/output (Web Speech API)
   - [ ] Personalized health recommendations based on history

3. **Medication Reminders**
   - [ ] Browser notification integration
   - [ ] Email reminders via Supabase Edge Functions
   - [ ] SMS reminders (Twilio integration)
   - [ ] Reminder scheduling system

4. **Advanced Analytics**
   - [ ] Health trends dashboard
   - [ ] Symptom tracking over time
   - [ ] Mood pattern analysis
   - [ ] Nutrition adherence metrics

### **Medium Priority**

5. **Mobile Application**
   - [ ] React Native mobile app
   - [ ] Push notifications
   - [ ] Offline functionality
   - [ ] Camera integration for pill recognition

6. **Social Features**
   - [ ] Community forum
   - [ ] Peer support groups
   - [ ] Health tips sharing
   - [ ] Gamification (badges, streaks)

7. **Healthcare Provider Integration**
   - [ ] Telemedicine appointments
   - [ ] Share health data with doctors
   - [ ] Prescription management
   - [ ] Lab results integration

8. **Enhanced Security**
   - [ ] Two-factor authentication
   - [ ] HIPAA compliance measures
   - [ ] End-to-end encryption for sensitive data
   - [ ] Audit logging

### **Low Priority**

9. **UI/UX Improvements**
   - [ ] Dark mode
   - [ ] Accessibility enhancements (WCAG compliance)
   - [ ] Multi-language support (i18n)
   - [ ] Custom themes

10. **Performance Optimization**
    - [ ] Server-side rendering (Next.js migration)
    - [ ] Code splitting
    - [ ] Image optimization
    - [ ] Caching strategies

11. **Additional Features**
    - [ ] Wearable device integration (Fitbit, Apple Watch)
    - [ ] Pharmacy integration for medication refills
    - [ ] Insurance information management
    - [ ] Emergency contacts and medical history

12. **Testing & Quality**
    - [ ] Unit tests (Jest)
    - [ ] Integration tests
    - [ ] End-to-end tests (Cypress)
    - [ ] Load testing
    - [ ] Security audits

## 🧪 Testing (Planned)

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test

# E2E tests
npm run test:e2e
```

## 📦 Deployment

### **Frontend Deployment** (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### **Backend Deployment** (Heroku/Railway/Render)
```bash
cd backend
# Set environment variables
# Deploy with provided platform CLI
```

### **Environment Variables Checklist**
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_KEY`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `GEMINI_API_KEY`
- [ ] `VITE_API_URL`
- [ ] `PORT`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Coding Standards**
- Follow ESLint rules defined in [`eslint.config.js`](frontend/eslint.config.js)
- Use meaningful variable and function names
- Add comments for complex logic
- Write reusable, modular code

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Shadrack Kimaau (CEO KIM_S)**
- Email: musyokishadrach1@gmail.com
- GitHub: [@shaddy](https://github.com/shaddy/1234)

## 🙏 Acknowledgments

- [Supabase](https://supabase.io/) - Database and authentication
- [Google AI](https://ai.google.dev/) - Gemini AI models
- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Express.js](https://expressjs.com/) - Backend framework
- [Heroicons](https://heroicons.com/) - Icon library

---

**⭐ If you found this project helpful, please give it a star!**

**📧 For any inquiries or support, contact: musyokishadrach1@gmail.com**
