import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Layout/Header';
import { User, FileText, Lightbulb, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: 'Skills Assessment',
      description: 'Complete your skills and interests profile to get personalized recommendations',
      icon: FileText,
      action: 'Start Assessment',
      path: '/assessment',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Career Recommendations',
      description: 'View AI-powered career suggestions based on your profile',
      icon: Lightbulb,
      action: 'View Recommendations',
      path: '/recommendations',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Premium Features',
      description: 'Unlock advanced insights and personalized mentorship opportunities',
      icon: CreditCard,
      action: 'Upgrade Now',
      path: '/upgrade',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.user_metadata?.full_name || 'Student'}!
              </h1>
              <p className="text-gray-600 text-lg">
                Ready to discover your next career opportunity?
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <strong>Pro tip:</strong> Complete your skills assessment to receive 
                  more accurate career recommendations tailored to your unique profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group"
            >
              <div className="p-8">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <card.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {card.description}
                </p>
                <button
                  onClick={() => navigate(card.path)}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${card.color}`}
                >
                  {card.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">0%</div>
              <p className="text-gray-600">Profile Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <p className="text-gray-600">Recommendations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <p className="text-gray-600">Saved Careers</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};