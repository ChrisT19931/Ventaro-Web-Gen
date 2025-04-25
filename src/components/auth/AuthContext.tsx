"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// User type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    // In a real app, this would check for a token in localStorage
    // and validate it with the backend
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // In a real app, this would make an API call to authenticate
    // For now, we'll simulate a successful login
    const mockUser: User = {
      id: 'user-1',
      name: 'John Doe',
      email,
      role: email.includes('admin') ? 'admin' : 'user',
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // In a real app, this would make an API call to register
    // For now, we'll simulate a successful registration
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    setUser(null);
  };

  // Value object that will be passed to consumers
  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
