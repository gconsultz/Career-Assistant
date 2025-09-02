// src/pages/Payments.tsx
import React from "react";
import { CreditCard, Check, Star } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

// Load Paystack public key from environment variable (Vite format)
const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

export default function Payments() {
  const { user } = useAuth();

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

  const handlePayment = (plan: { name: string; price: number }) => {
    if (!paystackPublicKey) {
      alert("Paystack key is missing. Please check your environment settings.");
      return;
    }

    if (!user?.email) {
      alert("You must be logged in with a valid email to make a payment.");
      return;
    }

    // @ts-ignore - Paystack script injects PaystackPop globally
    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: user.email,
      amount: plan.price * 100,
      currency: "NGN",
      callback: async function (response: any) {
        try {
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
            alert("Payment succeeded but subscription save failed.");
          } else {
            alert(
              `Payment successful! 🎉 You are now on the ${plan.name} plan.`
            );
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          alert("Something went wrong while saving your subscription.");
        }
      },
      onClose: function () {
        alert("Payment window closed.");
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
                >
                  <CreditCard className="mr-2" size={20} />
                  Choose {plan.name}
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
