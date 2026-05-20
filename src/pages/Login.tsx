import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { authService } from '@/src/services/authService';
import { useAuth } from '@/src/context/AuthContext';
import { LogIn, Building2, User, Loader2, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const { type } = useParams<{ type: 'student' | 'company' }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isStudent = type === 'student';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      if (isStudent) {
        response = await authService.loginStudent({ email, password });
      } else {
        response = await authService.loginCompany({ email, password });
      }

      if (response.access_token) {
        login(response.access_token, type as 'student' | 'company');
        navigate(isStudent ? '/student/dashboard' : '/company/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-slate-200"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-2xl mb-8 text-white">
          {isStudent ? <User size={24} /> : <Building2 size={24} />}
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Access Portal</h1>
        <p className="text-slate-500 mb-8 font-medium italic text-sm">
          {isStudent ? 'Continue your journey to a dream tech role.' : 'Login to find your organization\'s next star.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-[11px] font-bold">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Internal Identity</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
              placeholder="verified@example.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 mt-4 px-4">Passkey Complexity</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              maxLength={128}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
              placeholder="Min 8 characters required"
            />
          </div>
          
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
            Authorize {isStudent ? 'Student' : 'Employer'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-500 text-sm font-medium">
            New to the platform?{' '}
            <Link to={`/register/${type}`} className="text-indigo-600 font-bold hover:underline">
              Create Profile
            </Link>
          </p>
          <div className="mt-6 flex justify-center">
            <Link to={isStudent ? '/login/company' : '/login/student'} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              Switch to {isStudent ? 'Employer' : 'Student'} Portal
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
