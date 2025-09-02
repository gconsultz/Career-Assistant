import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Verify() {
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

        if (error) {
          setMessage("Verification failed. Please try again or contact support.");
        } else if (data?.session) {
          setMessage("✅ Email verified! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setMessage("Verification link is invalid or expired.");
        }
      } catch (err) {
        setMessage("An unexpected error occurred.");
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <p>{message}</p>
      </div>
    </div>
  );
}