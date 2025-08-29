// User profile types
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

// Skills and interests form data
export interface SkillsAssessment {
  id?: string;
  user_id: string;
  technical_skills: string[];
  soft_skills: string[];
  interests: string[];
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  preferred_work_environment: 'office' | 'remote' | 'hybrid' | 'no_preference';
  career_goals: string;
  created_at?: string;
  updated_at?: string;
}

// Career recommendation types
export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  match_percentage: number;
  required_skills: string[];
  growth_potential: 'low' | 'medium' | 'high';
  salary_range: string;
  industry: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}