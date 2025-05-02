# Daktari-Project

## Overview
Daktari-Project is a health-focused platform that leverages AI to assist users with medication management, nutrition planning, mental health tracking, and symptom analysis.

## Features
- **User Authentication**: Secure sign-up, sign-in, and profile management.
- **Medication Management**: Add, update, and delete medications with reminders.
- **Nutrition Planning**: AI-generated meal plans based on user preferences.
- **Mental Health Tracking**: Record and analyze mood patterns and symptoms.
- **Chatbot Assistance**: AI-powered chatbot for health-related queries.

## Backend
The backend is built with Node.js and integrates with Supabase for database and authentication.

### Key Directories
- `controllers/`: Contains logic for handling API requests.
- `database/`: Includes SQL migrations for database schema.
- `functions/`: Serverless functions for specific tasks like reminders.
- `middleware/`: Custom middleware for error handling and request validation.
- `routes/`: Express route definitions.
- `services/`: Business logic services.
- `utils/`: Utility functions and helpers.

## Frontend
The frontend is built with React and Vite for a fast and modern user experience.

### Key Directories
- `src/`: Contains the main application code.
- `public/`: Static assets like images and icons.

## Getting Started

### Prerequisites
- Node.js (v16 or later is recommended)
- A Supabase account

### Installation

1. Clone the repository:
    ```sh
    git clone [repository-url]
    ```

2. Install the backend dependencies:
    ```sh
    cd backend
    npm install
    ```

3. Install the frontend dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

4. Configure Environment Variables:
    - For the backend, create a `.env` file in the `backend` folder with the required settings.
    - For the frontend, ensure the `.env` file (or `.env.example` if available) contains the correct values:
      - `VITE_SUPABASE_ANON_KEY`
      - `VITE_SUPABASE_URL`
      - `VITE_API_URL`

5. Run the Backend Server:
    ```sh
    cd backend
    npm run dev
    ```
  
6. Run the Frontend Development Server:
    ```sh
    cd frontend
    npm run dev
    ```

## Usage

- API Endpoints are available at `http://localhost:5000/api`.
- The frontend app can be accessed in your browser at `http://localhost:3000` (depending on your Vite configuration).

## Database Migrations

SQL migration files are located in the [migrations](http://_vscodecontentref_/1) folder.
Run these migrations using your preferred database client to set up the required tables and seed data.

## License

[Specify the license here]

## Contributing

Pull requests and issue submissions are welcome. Please ensure any contributions align with the project’s guidelines.

## Future Improvements
- Implement additional AI features for personalized health insights.
- Enhance the chatbot with more advanced natural language processing.
- Add more integrations with third-party health services.
- Improve the UI/UX based on user feedback.
- Implement a mobile version of the application.
- Add more detailed analytics and reporting features for users.
- Expand the medication management system to include prescription refills and pharmacy integration.
- Implement a community forum for users to share experiences and advice.
- Add gamification elements to encourage user engagement and adherence to health plans.
- Explore partnerships with healthcare providers for better data integration and user support.
- Implement a referral program to encourage user growth and engagement.

## Contact
For any inquiries or support, please contact [CEO KIM_S](mailto:musyokishadrach1@gmail.com).


## Acknowledgments
- [Supabase](https://supabase.io/) for the database and authentication services.
- [OpenAI](https://openai.com/) for the AI capabilities.
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the frontend framework.
- [Node.js](https://nodejs.org/) for the backend server.
- [Express](https://expressjs.com/) for the backend routing.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
