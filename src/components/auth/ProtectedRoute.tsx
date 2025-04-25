import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has the right permissions
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/auth/login');
      } else if (adminOnly && user?.role !== 'admin') {
        // Redirect to dashboard if user is not an admin but admin route is required
        router.push('/dashboard');
      } else {
        // User is authorized to view this route
        setIsAuthorized(true);
      }
    }
  }, [isLoading, isAuthenticated, user, adminOnly, router]);

  // Show loading state while checking authentication
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-neon-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Render children if user is authorized
  return <>{children}</>;
}
