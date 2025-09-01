// src/Verify.tsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xebctgcycxncqtwbdens.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlYmN0Z2N5Y3huY3F0d2JkZW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MjA0NTQsImV4cCI6MjA3MjE5NjQ1NH0.REFF7NtgUHNMhPncJZVATSRM6CDrPy2aqjU2dl9BSNA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Verify() {
  const [message, setMessage] = useState<string>("Verifying your email...");

  useEffect(() => {
    supabase.auth.getSessionFromUrl().then(({ data: { session }, error }) => {
      if (error) {
        setMessage(`Verification failed: ${error.message}`);
      } else if (session) {
        setMessage("Email verified successfully! You can now log in.");
      } else {
        setMessage("No verification session found.");
      }
    });
  }, []);

  return <div style={{ padding: "2rem", fontSize: "1.2rem" }}>{message}</div>;
}
