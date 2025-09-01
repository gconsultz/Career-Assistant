import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import type { UserSkill } from '../types';

export function Skills() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'beginner' as const });

  useEffect(() => {
    if (user) {
      fetchSkills();
    }
  }, [user]);

  const fetchSkills = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newSkill.name.trim()) return;

    setAdding(true);
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .insert({
          user_id: user.id,
          skill_name: newSkill.name.trim(),
          skill_level: newSkill.level,
        })
        .select()
        .single();

      if (error) throw error;
      
      setSkills([data, ...skills]);
      setNewSkill({ name: '', level: 'beginner' });
    } catch (error) {
      console.error('Error adding skill:', error);
    } finally {
      setAdding(false);
    }
  };

  const removeSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('user_skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;
      setSkills(skills.filter(skill => skill.id !== skillId));
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-yellow-100 text-yellow-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">My Skills</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Skills</h1>
        <p className="text-gray-600 mt-2">Track and manage your professional skills</p>
      </div>

      {/* Add Skill Form */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Add New Skill</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={addSkill} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter skill name (e.g., JavaScript, Marketing)"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                required
              />
            </div>
            <div className="sm:w-40">
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <Button type="submit" disabled={adding} className="sm:w-auto">
              <Plus size={16} className="mr-2" />
              {adding ? 'Adding...' : 'Add Skill'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Skills List */}
      <div className="space-y-4">
        {skills.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
              <p className="text-gray-600">
                Start by adding your first skill above to begin tracking your progress.
              </p>
            </CardContent>
          </Card>
        ) : (
          skills.map((skill) => (
            <Card key={skill.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {skill.skill_name}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skill.skill_level)}`}>
                      {skill.skill_level.charAt(0).toUpperCase() + skill.skill_level.slice(1)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}