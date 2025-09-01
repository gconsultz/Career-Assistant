import React, { useState, useEffect } from 'react';
import { ArrowUpDown, DollarSign, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import type { Recommendation } from '../types';

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'score' | 'salary'>('score');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .order('score', { ascending: false });

      if (error) throw error;
      setRecommendations(data || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (sortBy === 'score') {
      return b.score - a.score;
    }
    return b.salary_max - a.salary_max;
  });

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Career Recommendations</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career Recommendations</h1>
          <p className="text-gray-600 mt-2">
            Personalized career paths based on your skills and interests
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Button
            variant={sortBy === 'score' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('score')}
          >
            <Target size={16} className="mr-1" />
            Score
          </Button>
          <Button
            variant={sortBy === 'salary' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('salary')}
          >
            <DollarSign size={16} className="mr-1" />
            Salary
          </Button>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-6">
        {sortedRecommendations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
              <p className="text-gray-600">
                Add more skills to your profile to get personalized career recommendations.
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedRecommendations.map((recommendation) => (
            <Card key={recommendation.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {recommendation.title}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {recommendation.score}% match
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {recommendation.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recommendation.required_skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:text-right">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-emerald-600 font-medium mb-1">Salary Range</p>
                      <p className="text-lg font-bold text-emerald-800">
                        ${recommendation.salary_min.toLocaleString()} - ${recommendation.salary_max.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}