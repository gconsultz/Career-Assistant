import React, { useState } from "react";
import { CreditCard, Check, Star } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

// TypeScript: declare PaystackPop on window
declare global {
  interface Window {
    PaystackPop: any;
  }
}

const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

export default function Payments() {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const features = [
    "Unlimited skill tracking",
    "Advanced career recommendations",
    "Priority mentor access",
    "Detailed progress analytics",
    "Resume optimization tools",
    "Interview preparation resources",
  ];

  const plans = [
    { name: "Monthly", price: 2900, tag: "Best for trying it out" },
    { name: "Quarterly", price: 7900, tag: "Save 10%" },
    { name: "Yearly", price: 29900, tag: "Save 15%" },
  ];

  // Call your Vercel serverless function to verify payment
  const verifyPaymentWithBackend = async (reference: string) => {
    try {
      const res = await fetch("/api/verify-paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      return data.verified;
    } catch (err) {
      return false;
    }
  };

  const handlePayment = (plan: { name: string; price: number }) => {
    if (!paystackPublicKey) {
      alert("Paystack key is missing. Please check your environment settings.");
      return;
    }

    if (!user?.email) {
      alert("You must be logged in with a valid email to make a payment.");
      return;
    }

    if (!window.PaystackPop) {
      alert("Paystack script not loaded. Please refresh the page.");
      return;
    }

    setLoadingPlan(plan.name);

    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: user.email,
      amount: plan.price * 100,
      currency: "NGN",
      callback: async function (response: any) {
        try {
          // 1. Verify payment with backend
          const verified = await verifyPaymentWithBackend(response.reference);

          if (!verified) {
            alert("Payment could not be verified. Please contact support.");
            setLoadingPlan(null);
            return;
          }

          // 2. Save subscription in Supabase
          const { error } = await supabase.from("subscriptions").insert({
            user_id: user.id,
            plan_name: plan.name,
            amount: plan.price,
            paystack_reference: response.reference,
            status: "active",
            created_at: new Date().toISOString(),
          });

          if (error) {
            console.error("Supabase error:", error);
            alert("Payment verified but subscription save failed.");
          } else {
            alert(
              `Payment successful! 🎉 You are now on the ${plan.name} plan.`
            );
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("Something went wrong while verifying your payment.");
        } finally {
          setLoadingPlan(null);
        }
      },
      onClose: function () {
        alert("Payment window closed.");
        setLoadingPlan(null);
      },
    });

    handler.openIframe();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Upgrade Your Experience
        </h1>
        <p className="text-gray-600 mt-2">
          Unlock premium features to accelerate your career growth
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`${
              index === 0
                ? "border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100"
                : "border"
            }`}
          >
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="text-yellow-500 mr-2" size={20} />
                <h2 className="text-xl font-bold text-gray-900">
                  {plan.name} Plan
                </h2>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-900">
                  ₦{plan.price.toLocaleString()}
                </span>
                <span className="text-gray-600">/{plan.name.toLowerCase()}</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">{plan.tag}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check
                      className="text-emerald-600 mr-2 flex-shrink-0"
                      size={16}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-blue-200">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                  size="lg"
                  onClick={() => handlePayment(plan)}
                  disabled={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? (
                    <span>
                      <svg
                        className="animate-spin inline-block mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <CreditCard className="mr-2" size={20} />
                      Choose {plan.name}
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Secure payment processing • Cancel anytime
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}