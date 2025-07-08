
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import KanbanBoard from '../components/board/KanbanBoard';
import ActivityLog from '../components/activity/ActivityLog';
import Header from '../components/layout/Header';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (user, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {showRegister ? (
              <RegisterForm 
                onLogin={handleLogin}
                onToggleForm={() => setShowRegister(false)}
              />
            ) : (
              <LoginForm 
                onLogin={handleLogin}
                onToggleForm={() => setShowRegister(true)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header user={currentUser} onLogout={handleLogout} />
      <div className="flex h-screen pt-16">
        <div className="flex-1 p-6">
          <KanbanBoard currentUser={currentUser} />
        </div>
        <div className="w-80 border-l border-gray-200 bg-white">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default Index;
