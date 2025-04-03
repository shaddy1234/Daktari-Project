-- Seed data for testing purposes
-- Note: Replace 'your-user-id' with actual test user IDs from auth.users

-- Insert test profile
INSERT INTO profiles (id, full_name, date_of_birth, gender, height, weight, medical_conditions, allergies)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'John Doe', '1990-01-01', 'male', 180, 75, 
   ARRAY['hypertension', 'asthma'], ARRAY['peanuts', 'shellfish']);

-- Insert test symptoms
INSERT INTO symptoms (user_id, symptoms, severity, duration, ai_analysis)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 
   ARRAY['headache', 'fever'], 
   'moderate', 
   '2 days',
   '{"analysis": "Possible viral infection. Monitor temperature and rest. Seek medical attention if symptoms worsen."}');

-- Insert test medications
INSERT INTO medications (user_id, medication_name, dosage, frequency, start_date, end_date, reminder_enabled, reminder_time)
VALUES 
  ('11111111-1111-1111-1111-111111111111',
   'Ibuprofen',
   '400mg',
   'twice daily',
   '2025-01-01',
   '2025-01-07',
   true,
   ARRAY['09:00:00', '21:00:00']);

-- Insert test nutrition plan
INSERT INTO nutrition_plans (user_id, dietary_preferences, meal_plan, calories_target)
VALUES 
  ('11111111-1111-1111-1111-111111111111',
   ARRAY['vegetarian', 'low-carb'],
   '{"plan": "Breakfast: Oatmeal with fruits\nLunch: Greek salad\nDinner: Vegetable stir-fry"}',
   2000);

-- Insert test chat history
INSERT INTO chat_history (user_id, message, ai_response)
VALUES 
  ('11111111-1111-1111-1111-111111111111',
   'What are common symptoms of the flu?',
   'Common flu symptoms include fever, body aches, fatigue, cough, and headache. Rest, hydration, and over-the-counter medications can help manage symptoms.');

-- Insert test mental health assessment
INSERT INTO mental_health_assessments (user_id, mood_rating, symptoms, notes)
VALUES 
  ('11111111-1111-1111-1111-111111111111',
   7,
   ARRAY['mild anxiety', 'occasional stress'],
   'Feeling better after starting regular exercise routine');