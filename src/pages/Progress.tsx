import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, Target, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function Progress() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSkills: 0,
    beginnerSkills: 0,
    intermediateSkills: 0,
    advancedSkills: 0,
    totalRecommendations: 0,
    averageMatch: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgressData();
    }
  }, [user]);

  const fetchProgressData = async () => {
    if (!user) return;

    try {
      // Fetch user skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('user_skills')
        .select('skill_level')
        .eq('user_id', user.id);

      if (skillsError) throw skillsError;

      // Count skills by level
      const skillCounts = skillsData?.reduce((acc, skill) => {
        acc[skill.skill_level] = (acc[skill.skill_level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      // Fetch recommendations for average match calculation
      const { data: recommendationsData, error: recError } = await supabase
        .from('recommendations')
        .select('score');

      if (recError) throw recError;

      const avgMatch = recommendationsData?.length > 0 
        ? recommendationsData.reduce((sum, rec) => sum + rec.score, 0) / recommendationsData.length 
        : 0;

      setStats({
        totalSkills: skillsData?.length || 0,
        beginnerSkills: skillCounts.beginner || 0,
        intermediateSkills: skillCounts.intermediate || 0,
        advancedSkills: skillCounts.advanced || 0,
        totalRecommendations: recommendationsData?.length || 0,
        averageMatch: Math.round(avgMatch),
      });
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillProgress = () => {
    const total = stats.totalSkills;
    if (total === 0) return 0;
    
    const weighted = (stats.beginnerSkills * 1) + (stats.intermediateSkills * 2) + (stats.advancedSkills * 3);
    const maxPossible = total * 3;
    return Math.round((weighted / maxPossible) * 100);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Progress Overview</h1>
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Progress Overview</h1>
        <p className="text-gray-600 mt-2">Track your career development journey</p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Skills</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalSkills}</p>
              </div>
              <BookOpen className="text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Skill Progress</p>
                <p className="text-3xl font-bold text-emerald-900">{getSkillProgress()}%</p>
              </div>
              <TrendingUp className="text-emerald-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Career Match</p>
                <p className="text-3xl font-bold text-purple-900">{stats.averageMatch}%</p>
              </div>
              <Target className="text-purple-600" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Skills Breakdown</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Beginner</span>
                <span className="font-medium">{stats.beginnerSkills}</span>
              </div>
              <div className="w-full bg-yellow-100 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.totalSkills > 0 ? (stats.beginnerSkills / stats.totalSkills) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Intermediate</span>
                <span className="font-medium">{stats.intermediateSkills}</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.totalSkills > 0 ? (stats.intermediateSkills / stats.totalSkills) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Advanced</span>
                <span className="font-medium">{stats.advancedSkills}</span>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.totalSkills > 0 ? (stats.advancedSkills / stats.totalSkills) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Award className="text-yellow-600" size={24} />
              <div>
                <p className="font-medium text-gray-900">Skill Collector</p>
                <p className="text-sm text-gray-600">Added {stats.totalSkills} skills</p>
              </div>
            </div>

            {stats.advancedSkills > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <Award className="text-emerald-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Expert Level</p>
                  <p className="text-sm text-gray-600">Reached advanced level in {stats.advancedSkills} skill(s)</p>
                </div>
              </div>
            )}

            {stats.averageMatch >= 80 && (
              <div className="flex items-center space-x-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <Award className="text-purple-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Perfect Match</p>
                  <p className="text-sm text-gray-600">High compatibility with career paths</p>
                </div>
              </div>
            )}

            {stats.totalSkills === 0 && stats.averageMatch === 0 && (
              <div className="text-center py-8">
                <Award className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">
                  Complete your skills profile to unlock achievements!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart Placeholder */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Progress Over Time</h3>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-8 text-center">
            <TrendingUp className="mx-auto text-gray-400 mb-4" size={48} />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Progress Chart Coming Soon</h4>
            <p className="text-gray-600">
              Detailed analytics and progress visualization will be available in the next update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}