import React, { useState } from 'react';
import { AuthForm } from '../components/Auth/AuthForm';
import { Compass, Target, TrendingUp, Users } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const features = [
    {
      icon: Compass,
      title: 'Career Discovery',
      description: 'Explore career paths that match your unique skills and interests',
    },
    {
      icon: Target,
      title: 'Personalized Recommendations',
      description: 'Get AI-powered suggestions tailored to your profile and goals',
    },
    {
      icon: TrendingUp,
      title: 'Growth Insights',
      description: 'Learn about industry trends and future opportunities',
    },
    {
      icon: Users,
      title: 'Professional Guidance',
      description: 'Connect with mentors and industry professionals',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Hero Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Your
                <span className="text-blue-600 block">Dream Career</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Get personalized career recommendations powered by AI. 
                Explore paths that align with your skills, interests, and aspirations.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <AuthForm
              mode={authMode}
              onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};