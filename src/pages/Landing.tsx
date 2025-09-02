// src/pages/Landing.tsx
import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Target, TrendingUp, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

type Feature = {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
};

const Landing = () => {
  const features: Feature[] = [
    {
      icon: GraduationCap,
      title: "Skill Assessment",
      description:
        "Track and evaluate your skills to identify areas for improvement.",
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description:
        "Get career path suggestions tailored to your skills and interests.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Monitor your career development journey with detailed analytics.",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description:
        "Connect with industry professionals for guidance and advice.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="text-blue-600" size={32} />
              <h1 className="text-xl font-bold text-gray-900">
                Career Guidance
              </h1>
            </div>
            <div className="space-x-4">
              <Link to="/login">
                <Button variant="ghost" aria-label="Sign In">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button aria-label="Get Started">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Shape Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
              Career Path
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your strengths, explore career opportunities, and get
            personalized guidance to reach your professional goals with our
            AI-powered career assistant.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="px-8" aria-label="Start Your Journey">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="px-8"
                aria-label="Sign In"
              >
                I Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and insights you
            need to make informed career decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="pt-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to transform your career?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have discovered their ideal
            career path.
          </p>
          <Link to="/signup">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              aria-label="Get Started Today"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="text-blue-600" size={24} />
              <span className="text-lg font-semibold text-gray-900">
                Career Guidance
              </span>
            </div>
            <p className="text-gray-600">
              © 2025 Career Guidance Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
