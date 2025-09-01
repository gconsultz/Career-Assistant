export interface User {
  id: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  full_name?: string;
  created_at: string;
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_name: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  score: number;
  salary_min: number;
  salary_max: number;
  required_skills: string[];
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}