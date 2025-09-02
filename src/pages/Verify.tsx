// src/pages/Verify.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Verify() {
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (typeof window === "undefined") return;

        const { data, error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );

        if (error) {
          setMessage(`❌ Verification failed: ${error.message}`);
        } else if (data?.session) {
          setMessage("✅ Email verified successfully! You can now log in.");
        } else {
          setMessage("⚠️ No verification session found.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setMessage("❌ Unexpected error occurred during verification.");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
