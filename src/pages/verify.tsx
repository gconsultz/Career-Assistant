// src/pages/Verify.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Verify() {
  const [message, setMessage] = useState<string>("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

        if (error) {
          setMessage(`❌ Verification failed: ${error.message}`);
        } else if (data?.session) {
          setMessage("✅ Email verified successfully! You can now log in.");
        } else {
          setMessage("⚠️ No verification session found.");
        }
      } catch (err) {
        setMessage("Unexpected error occurred during verification.");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="p-6 text-lg text-center">
      {message}
    </div>
  );
}
