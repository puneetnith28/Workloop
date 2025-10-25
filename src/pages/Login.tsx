
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import useAuth from '@/hooks/use-auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');

  const { login } = useAuth();

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt', { email, password });
    // Simulate successful login
    login();
    navigate('/dashboard');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register attempt', { name, email, password });
    // Simulate successful registration + login
    login();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <LoginForm 
          onLogin={handleLogin} 
          onRegister={handleRegister} 
          initialTab={tabParam === 'register' ? 'register' : 'login'} 
        />
      </div>
    </div>
  );
};

export default Login;
