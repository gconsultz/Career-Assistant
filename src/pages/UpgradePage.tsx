import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Shield, Star } from 'lucide-react';

export const UpgradePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    'Detailed career roadmaps',
    'One-on-one mentorship sessions',
    'Industry insider insights',
    'Skill development recommendations',
    'Job market analysis',
    'Resume optimization tools',
    'Interview preparation guides',
    'Networking opportunities',
  ];

  const handlePaymentClick = () => {
    // TODO: Integrate with IntaSend payment gateway
    alert('Payment integration with IntaSend will be implemented here. This is a placeholder for the payment workflow.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upgrade to Premium</h1>
            <p className="text-gray-600 mt-1">Unlock advanced career guidance features</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Features List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What's included in Premium
            </h2>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mt-8">
              <div className="flex">
                <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    <strong>30-day money-back guarantee</strong> - If you're not satisfied with our premium features, 
                    we'll refund your payment within 30 days, no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Premium Plan</h3>
                <p className="text-gray-600 mt-2">Everything you need for career success</p>
              </div>

              {/* Plan Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedPlan === 'monthly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPlan('yearly')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedPlan === 'yearly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly (Save 20%)
                </button>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900">
                  ${selectedPlan === 'monthly' ? '29' : '279'}
                </div>
                <div className="text-gray-600 mt-1">
                  {selectedPlan === 'monthly' ? 'per month' : 'per year'}
                </div>
                {selectedPlan === 'yearly' && (
                  <div className="text-green-600 text-sm font-medium mt-2">
                    Save $69 annually
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePaymentClick}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Start Premium Trial</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by IntaSend. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};