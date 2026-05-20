import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { authService } from '@/src/services/authService';
import { Building2, User, Loader2, AlertCircle, CheckCircle2, MapPin, School, Tag, FileText, Key, Hash } from 'lucide-react';

export const Register: React.FC = () => {
  const { type } = useParams<{ type: 'student' | 'company' }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Shared
    email: '',
    password: '',
    name: '',
    location: '',
    // Student only
    id: '',
    institution: '',
    // Company only
    cac: '',
    industry: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isStudent = type === 'student';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isStudent) {
        await authService.registerStudent({ 
          name: formData.name,
          id: formData.id,
          email: formData.email,
          location: formData.location,
          institution: formData.institution,
          password: formData.password
        });
      } else {
        await authService.registerCompany({ 
          cac: formData.cac,
          name: formData.name,
          email: formData.email,
          location: formData.location,
          industry: formData.industry,
          description: formData.description,
          password: formData.password 
        });
      }
      navigate(`/login/${type}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-slate-200"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-8 text-white">
          {isStudent ? <User size={28} /> : <Building2 size={28} />}
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Create {isStudent ? 'Student' : 'Employer'} Profile</h1>
        <p className="text-slate-500 mb-10 font-medium italic text-sm">
          {isStudent ? 'Join TalentAI to get matched with top opportunities' : 'Register your company to find the best talent'}
        </p>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-[11px] font-bold shadow-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conditional Fields based on User Type */}
            {!isStudent && (
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <Hash size={12} className="text-indigo-400" /> Corporate Affairs Commission (CAC)
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.cac}
                  onChange={(e) => setFormData({ ...formData, cac: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                  placeholder="RC-12345678"
                />
              </div>
            )}

            {isStudent && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <Tag size={12} className="text-indigo-400" /> Student Identification
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                  placeholder="STU-2024-XXXX"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                <User size={12} className="text-indigo-400" /> {isStudent ? 'Full Name' : 'Company Name'}
              </label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                placeholder={isStudent ? "John Doe" : "Acme Global Solutions"}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                <FileText size={12} className="text-indigo-400" /> Email Address
              </label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                placeholder="verified@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                <MapPin size={12} className="text-indigo-400" /> Primary Location
              </label>
              <input 
                required
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                placeholder="Lagos, Nigeria"
              />
            </div>

            {isStudent ? (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <School size={12} className="text-indigo-400" /> Academic Institution
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                  placeholder="University of Excellence"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <Tag size={12} className="text-indigo-400" /> Industry
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                  placeholder="FinTech, EdTech, etc."
                />
              </div>
            )}

            {!isStudent && (
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <FileText size={12} className="text-indigo-400" /> Organizational Description
                </label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium min-h-[100px] resize-none"
                  placeholder="Tell us about your company and mission..."
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                <Key size={12} className="text-indigo-400" /> Secure Password (Min 8 chars)
              </label>
              <input 
                required
                type="password" 
                value={formData.password}
                minLength={8}
                maxLength={128}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:border-indigo-600 transition-all outline-none text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed group h-14"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                <span>Initialize {isStudent ? 'Student' : 'Employer'} Profile</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Already have a profile?{' '}
            <Link to={`/login/${type}`} className="text-indigo-600 font-bold hover:underline transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
