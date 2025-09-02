import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/Verify`,
      }
    });

    setLoading(false);

    if (error) {
      setFormError(error.message);
    } else {
      setSuccessMsg("✅ Signup successful! Please check your email for verification.");
      setEmail("");
      setPassword("");
      console.log("Signup response:", data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Create Your Account
          </h1>

          <form onSubmit={handleSignup} className="flex flex-col gap-4" noValidate>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              aria-label="Password"
            />

            {formError && (
              <div className="text-red-600 text-sm text-center">{formError}</div>
            )}
            {successMsg && (
              <div className="text-green-600 text-sm text-center">{successMsg}</div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}