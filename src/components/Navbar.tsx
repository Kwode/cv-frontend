import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { LogOut, User, Building2, Briefcase, LayoutDashboard } from 'lucide-react';
import { cn } from '@/src/utils/helpers';

export const Navbar: React.FC = () => {
  const { isAuthenticated, userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 flex items-center justify-between px-8 h-16 flex-shrink-0">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">TalentAI</span>
        </Link>
        <div className="hidden md:flex ml-10 gap-6 text-sm font-medium text-slate-500">
          <Link to="/jobs" className="hover:text-indigo-600 transition-colors">Find Jobs</Link>
          {isAuthenticated && (
            <Link 
              to={userType === 'student' ? '/student/dashboard' : '/company/dashboard'} 
              className="hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login/student" className="text-slate-500 hover:text-slate-800 text-sm font-medium">Login</Link>
            <Link 
              to="/login/company" 
              className="bg-indigo-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              For Companies
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter">Active User</p>
              <p className="text-[10px] text-slate-500">{userType === 'student' ? 'Student Portal' : 'Employer Portal'}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all group"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
