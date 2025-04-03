import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Profile functions
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select();
  return { data, error };
};

// Symptoms functions
export const addSymptoms = async (userId, symptoms) => {
  const { data, error } = await supabase
    .from('symptoms')
    .insert([{ user_id: userId, ...symptoms }])
    .select();
  return { data, error };
};

// Medications functions
export const getMedications = async (userId) => {
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

export const addMedication = async (userId, medication) => {
  const { data, error } = await supabase
    .from('medications')
    .insert([{ user_id: userId, ...medication }])
    .select();
  return { data, error };
};

// Nutrition functions
export const getNutritionPlans = async (userId) => {
  const { data, error } = await supabase
    .from('nutrition_plans')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
};

// Mental health functions
export const addMentalHealthAssessment = async (userId, assessment) => {
  const { data, error } = await supabase
    .from('mental_health_assessments')
    .insert([{ user_id: userId, ...assessment }])
    .select();
  return { data, error };
};