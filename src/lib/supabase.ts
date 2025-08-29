import { createClient } from '@supabase/supabase-js';

// Environment variables will be available after Supabase connection
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to get current user
export const getCurrentUser = async () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please connect to Supabase first.');
  }
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper function to sign out
export const signOut = async () => {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Please connect to Supabase first.');
  }
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};