import React from 'react';
import { CreditCard, Check, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function Payments() {
  const features = [
    'Unlimited skill tracking',
    'Advanced career recommendations',
    'Priority mentor access',
    'Detailed progress analytics',
    'Resume optimization tools',
    'Interview preparation resources',
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Experience</h1>
        <p className="text-gray-600 mt-2">
          Unlock premium features to accelerate your career growth
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Star className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Premium Plan</h2>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-gray-900">$29</span>
              <span className="text-gray-600">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-emerald-600 mr-3 flex-shrink-0" size={16} />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-blue-200">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                size="lg"
              >
                <CreditCard className="mr-2" size={20} />
                Upgrade with IntaSend
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Secure payment processing • Cancel anytime
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Plan */}
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 text-center">Current Plan: Free</h3>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">You're currently on the free plan</p>
                <p className="text-sm text-gray-600">Upgrade to unlock all features</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Skills tracked</span>
                  <span className="font-medium">5/5 (limit reached)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Recommendations</span>
                  <span className="font-medium">3/3 (limit reached)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}