import React, { useState } from 'react';
import { Header } from '../components/Layout/Header';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { SkillsAssessment } from '../types';

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<SkillsAssessment>>({
    technical_skills: [],
    soft_skills: [],
    interests: [],
    experience_level: 'beginner',
    preferred_work_environment: 'no_preference',
    career_goals: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const addSkill = (type: 'technical_skills' | 'soft_skills') => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        [type]: [...(prev[type] || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (type: 'technical_skills' | 'soft_skills', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type]?.filter((_, i) => i !== index) || []
    }));
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: Save assessment data to Supabase
    setTimeout(() => {
      setLoading(false);
      navigate('/recommendations');
    }, 2000);
  };

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Skills Assessment</h1>
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          {/* Step 1: Technical Skills */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Technical Skills</h2>
              <p className="text-gray-600">Add your technical skills and competencies</p>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill('technical_skills')}
                  placeholder="e.g., JavaScript, Python, Data Analysis"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => addSkill('technical_skills')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.technical_skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill('technical_skills', index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Soft Skills */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Soft Skills</h2>
              <p className="text-gray-600">What soft skills do you excel at?</p>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill('soft_skills')}
                  placeholder="e.g., Leadership, Communication, Problem Solving"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => addSkill('soft_skills')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.soft_skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill('soft_skills', index)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Interests & Passions</h2>
              <p className="text-gray-600">What topics or activities energize you?</p>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  placeholder="e.g., Artificial Intelligence, Sustainability, Design"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addInterest}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                  >
                    {interest}
                    <button
                      onClick={() => removeInterest(index)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Career Preferences</h2>
              <p className="text-gray-600">Tell us about your career goals and work preferences</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={formData.experience_level}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience_level: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Environment
                  </label>
                  <select
                    value={formData.preferred_work_environment}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferred_work_environment: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="no_preference">No Preference</option>
                    <option value="office">Office</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Goals
                </label>
                <textarea
                  value={formData.career_goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, career_goals: e.target.value }))}
                  rows={4}
                  placeholder="Describe your career aspirations, what you hope to achieve, and what motivates you professionally..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
            <button
              onClick={() => currentStep === 1 ? navigate('/dashboard') : setCurrentStep(current => current - 1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? 'Back to Dashboard' : 'Previous'}
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(current => current + 1)}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
              >
                {loading ? 'Generating...' : 'Get Recommendations'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};