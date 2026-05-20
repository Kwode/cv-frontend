import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { Navbar } from './Navbar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Navbar />
      <main className="pt-24 pb-12">
        <Outlet />
      </main>
    </div>
  );
};

export const ProtectedRoute: React.FC<{ allowedType?: 'student' | 'company' }> = ({ allowedType }) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedType && userType !== allowedType) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
