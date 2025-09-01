import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { BookOpen, Target, TrendingUp, Star } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { 
      name: 'Skills Tracked', 
      value: '12', 
      icon: BookOpen, 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      name: 'Recommendations', 
      value: '8', 
      icon: Target, 
      color: 'bg-emerald-100 text-emerald-600' 
    },
    { 
      name: 'Progress Score', 
      value: '78%', 
      icon: TrendingUp, 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      name: 'Achievement Level', 
      value: '⭐⭐⭐', 
      icon: Star, 
      color: 'bg-yellow-100 text-yellow-600' 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.full_name || 'Student'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your career development overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <BookOpen className="text-blue-600" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">Added JavaScript skill</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
              <Target className="text-emerald-600" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">New recommendation available</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="text-purple-600" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">Progress updated</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">Complete Your Skills Profile</h4>
              <p className="text-sm text-blue-700 mb-3">
                Add more skills to get better career recommendations.
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-blue-600 mt-1">60% complete</p>
            </div>
            
            <div className="p-4 border border-emerald-200 rounded-lg bg-emerald-50">
              <h4 className="font-medium text-emerald-900 mb-2">Explore Recommendations</h4>
              <p className="text-sm text-emerald-700">
                Check out personalized career paths based on your skills.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}