import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase"; // Make sure this import exists

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setShowResend(false);
    setResendMsg("");

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      if (
        error.message &&
        error.message.toLowerCase().includes("email not confirmed")
      ) {
        setErrorMsg(
          "Your email is not confirmed. Please check your inbox for the confirmation link."
        );
        setShowResend(true);
      } else {
        setErrorMsg(error.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMsg("");
    // Use the same redirect as in your signup
    const redirectTo = `${window.location.origin}/Verify`;
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setResendMsg("Failed to resend confirmation email. " + error.message);
    } else {
      setResendMsg("Confirmation email resent! Please check your inbox.");
    }
    setResendLoading(false);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded p-2"
      />
      {errorMsg && (
        <div className="text-red-600 text-sm text-center">{errorMsg}</div>
      )}
      {showResend && (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-blue-600 underline text-sm"
          >
            {resendLoading ? "Resending..." : "Resend confirmation email"}
          </button>
          {resendMsg && (
            <div className="text-green-600 text-xs text-center">{resendMsg}</div>
          )}
        </div>
      )}
      // ...existing code...
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white rounded p-2 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
// ...existing code...