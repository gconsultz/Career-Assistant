import React, { useState, useEffect } from 'react';
import { Header } from '../components/Layout/Header';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, TrendingUp, DollarSign, Building, Star } from 'lucide-react';
import { CareerRecommendation } from '../types';
import { LoadingSpinner } from '../components/Layout/LoadingSpinner';

export const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);

  // Mock AI recommendation generation
  useEffect(() => {
    const generateMockRecommendations = () => {
      const mockData: CareerRecommendation[] = [
        {
          id: '1',
          title: 'Software Developer',
          description: 'Build and maintain software applications using modern programming languages and frameworks.',
          match_percentage: 92,
          required_skills: ['JavaScript', 'React', 'Node.js', 'Problem Solving'],
          growth_potential: 'high',
          salary_range: '$70k - $120k',
          industry: 'Technology',
        },
        {
          id: '2',
          title: 'UX/UI Designer',
          description: 'Design intuitive user interfaces and create exceptional user experiences for digital products.',
          match_percentage: 87,
          required_skills: ['Design Thinking', 'Figma', 'User Research', 'Creative Problem Solving'],
          growth_potential: 'high',
          salary_range: '$65k - $110k',
          industry: 'Design & Technology',
        },
        {
          id: '3',
          title: 'Data Analyst',
          description: 'Analyze complex datasets to derive insights and support business decision-making.',
          match_percentage: 78,
          required_skills: ['Python', 'SQL', 'Statistics', 'Critical Thinking'],
          growth_potential: 'medium',
          salary_range: '$60k - $95k',
          industry: 'Data & Analytics',
        },
      ];

      setTimeout(() => {
        setRecommendations(mockData);
        setLoading(false);
      }, 2000);
    };

    generateMockRecommendations();
  }, []);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 bg-green-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getGrowthIcon = (potential: string) => {
    switch (potential) {
      case 'high': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium': return <TrendingUp className="w-4 h-4 text-yellow-600" />;
      default: return <TrendingUp className="w-4 h-4 text-red-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Analyzing Your Profile
            </h2>
            <p className="text-gray-600">
              Our AI is generating personalized career recommendations...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <h1 className="text-3xl font-bold text-gray-900">Career Recommendations</h1>
            <p className="text-gray-600 mt-1">Based on your skills and interests assessment</p>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              We found {recommendations.length} career matches for you
            </h2>
          </div>
          <p className="text-gray-600">
            These recommendations are ranked by compatibility with your skills, interests, and career goals.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-6">
          {recommendations.map((recommendation, index) => (
            <div
              key={recommendation.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {recommendation.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{recommendation.industry}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getMatchColor(recommendation.match_percentage)}`}>
                    <Star className="w-4 h-4 mr-1" />
                    {recommendation.match_percentage}% Match
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {recommendation.description}
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                      Required Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.required_skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                      Salary Range
                    </h4>
                    <p className="text-lg font-bold text-gray-900">
                      {recommendation.salary_range}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      {getGrowthIcon(recommendation.growth_potential)}
                      <span className="ml-2">Growth Potential</span>
                    </h4>
                    <p className="text-sm text-gray-700 capitalize">
                      {recommendation.growth_potential}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-200">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                    Learn More
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mt-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Want More Detailed Insights?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Upgrade to our premium plan for personalized mentorship, detailed career roadmaps, 
            and direct connections with industry professionals.
          </p>
          <button
            onClick={() => navigate('/upgrade')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            Upgrade to Premium
          </button>
        </div>
      </main>
    </div>
  );
};