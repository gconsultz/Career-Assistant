// auth.js
import { createClient } from '@supabase/supabase-js';
import readline from 'readline';

// === SETUP ===
const SUPABASE_URL = 'https://xebctgcycxncqtwbdens.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlYmN0Z2N5Y3huY3F0d2JkZW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjA0NTQsImV4cCI6MjA3MjE5NjQ1NH0.REFF7NtgUHNMhPncJZVATSRM6CDrPy2aqjU2dl9BSNA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// === READ INPUT FROM TERMINAL ===
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const action = (await ask('Do you want to signup or login? (signup/login): ')).toLowerCase();
  const email = await ask('Enter email: ');
  const password = await ask('Enter password: ');

  if (action === 'signup') {
    // ✅ Include redirectTo so email verification works
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { redirectTo: 'http://localhost:5173/verify' } // match your frontend verify page
    );
    if (error) {
      console.log('Signup error:', error.message);
    } else {
      console.log('Signup successful!');
      console.log('Check your email to verify before logging in.');
    }
  } else if (action === 'login') {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log('Login error:', error.message);
    } else {
      if (!data.user.email_confirmed_at) {
        console.log('Login blocked: Email not verified. Check your inbox!');
      } else {
        console.log('Login successful!');
        console.log('User ID:', data.user.id);
      }
    }
  } else {
    console.log('Invalid action. Type "signup" or "login".');
  }

  rl.close();
}

main();
