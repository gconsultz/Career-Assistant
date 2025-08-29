import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { AssessmentPage } from './pages/AssessmentPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { UpgradePage } from './pages/UpgradePage';
import { LoadingSpinner } from './components/Layout/LoadingSpinner';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/assessment" 
        element={
          <ProtectedRoute>
            <AssessmentPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recommendations" 
        element={
          <ProtectedRoute>
            <RecommendationsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/upgrade" 
        element={
          <ProtectedRoute>
            <UpgradePage />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;