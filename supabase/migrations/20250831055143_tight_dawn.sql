/*
  # Career Guidance Assistant Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Links to Supabase Auth
      - `email` (text, unique) - User email
      - `full_name` (text) - User's full name
      - `role` (text) - User role (student, mentor, admin)
      - `created_at` (timestamp) - Account creation date
    
    - `user_skills`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - Links to users table
      - `skill_name` (text) - Name of the skill
      - `skill_level` (text) - Skill proficiency level
      - `created_at` (timestamp) - When skill was added
    
    - `recommendations`
      - `id` (uuid, primary key)
      - `title` (text) - Career path title
      - `description` (text) - Detailed description
      - `score` (integer) - Match score (0-100)
      - `salary_min` (integer) - Minimum salary range
      - `salary_max` (integer) - Maximum salary range
      - `required_skills` (text array) - Skills needed for this path
      - `created_at` (timestamp) - When recommendation was created

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Public read access for recommendations table
*/

-- Create users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'admin')),
  created_at timestamptz DEFAULT now()
);

-- Create user_skills table
CREATE TABLE IF NOT EXISTS user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  skill_level text NOT NULL DEFAULT 'beginner' CHECK (skill_level IN ('beginner', 'intermediate', 'advanced')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_name)
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  score integer NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  salary_min integer NOT NULL DEFAULT 0,
  salary_max integer NOT NULL DEFAULT 0,
  required_skills text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users table policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User skills policies
CREATE POLICY "Users can read own skills"
  ON user_skills
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own skills"
  ON user_skills
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own skills"
  ON user_skills
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own skills"
  ON user_skills
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Recommendations policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read recommendations"
  ON recommendations
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample recommendations data
INSERT INTO recommendations (title, description, score, salary_min, salary_max, required_skills) VALUES
  (
    'Full Stack Developer',
    'Design and develop web applications using modern technologies. Work on both frontend and backend systems to create complete user experiences.',
    85,
    70000,
    120000,
    ARRAY['JavaScript', 'React', 'Node.js', 'Database Management', 'Git']
  ),
  (
    'Data Scientist',
    'Analyze complex data sets to extract meaningful insights and build predictive models. Work with machine learning algorithms and statistical analysis.',
    78,
    80000,
    140000,
    ARRAY['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization']
  ),
  (
    'UX/UI Designer',
    'Create intuitive and visually appealing user interfaces. Research user needs and design digital experiences that are both functional and beautiful.',
    92,
    60000,
    100000,
    ARRAY['Design Tools', 'User Research', 'Prototyping', 'Visual Design', 'HTML/CSS']
  ),
  (
    'Digital Marketing Specialist',
    'Develop and execute marketing campaigns across digital channels. Analyze campaign performance and optimize for better engagement and conversions.',
    88,
    50000,
    85000,
    ARRAY['Marketing Strategy', 'Social Media', 'Content Creation', 'Analytics', 'SEO']
  ),
  (
    'DevOps Engineer',
    'Streamline development processes and manage cloud infrastructure. Automate deployments and ensure system reliability and scalability.',
    75,
    85000,
    130000,
    ARRAY['Cloud Platforms', 'Docker', 'CI/CD', 'Infrastructure', 'Monitoring']
  ),
  (
    'Product Manager',
    'Guide product development from conception to launch. Work with cross-functional teams to define product strategy and execute roadmaps.',
    82,
    90000,
    150000,
    ARRAY['Product Strategy', 'Project Management', 'Analytics', 'Communication', 'User Research']
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_score ON recommendations(score);