import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { jobService, Job } from '@/src/services/jobService';
import { Plus, Trash2, Loader2, AlertCircle, Briefcase, Users, LayoutGrid, List } from 'lucide-react';
import { cn, parseSkills, parseList } from '@/src/utils/helpers';

export const CompanyDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    role: '',
    required_skills: '',
    preferred_skills: '',
    responsibilities: '',
    experience_level: 'Junior',
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getJobs();
      setJobs(data);
    } catch (err: any) {
      setError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);

    const jobPayload = {
      role: formData.role,
      required_skills: parseSkills(formData.required_skills),
      preferred_skills: parseSkills(formData.preferred_skills),
      responsibilities: parseList(formData.responsibilities),
      experience_level: formData.experience_level,
    };

    try {
      await jobService.createJob(jobPayload);
      setFormData({
        role: '',
        required_skills: '',
        preferred_skills: '',
        responsibilities: '',
        experience_level: 'Junior',
      });
      fetchJobs();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create job.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobService.deleteJob(id);
      fetchJobs();
    } catch (err: any) {
      setError('Failed to delete job.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Employer Dashboard</h1>
        <p className="text-slate-500 text-sm italic">Post positions and find the perfect AI-vetted matches.</p>
      </div>

      <div className="grid grid-cols-12 auto-rows-min gap-5">
        {/* Post Job Form */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Plus size={20} className="text-indigo-600" />
            New Opportunity
          </h2>

          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Job Title</label>
              <input 
                required
                type="text" 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 transition-all outline-none bg-slate-50"
                placeholder="Senior Product Designer"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Required Skills</label>
              <input 
                required
                type="text" 
                value={formData.required_skills}
                onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 transition-all outline-none bg-slate-50"
                placeholder="Comma separated: React, D3, Figma"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Preferred Skills (Optional)</label>
              <input 
                type="text" 
                value={formData.preferred_skills}
                onChange={(e) => setFormData({ ...formData, preferred_skills: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 transition-all outline-none bg-slate-50"
                placeholder="Python, AWS, Docker"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Responsibilities</label>
              <textarea 
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 transition-all outline-none min-h-[120px] bg-slate-50 resize-none font-medium text-slate-600"
                placeholder="Briefly describe the role's core impact..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Level</label>
                <select 
                  value={formData.experience_level}
                  onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-600 transition-all outline-none bg-slate-50"
                >
                  <option>Junior</option>
                  <option>Mid-level</option>
                  <option>Senior</option>
                  <option>Staff</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button 
                  disabled={actionLoading}
                  type="submit" 
                  className="w-full h-10 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                  Publish
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-[10px] font-bold flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}
          </form>
        </div>

        {/* Jobs Grid Column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          <div className="flex items-center justify-between sticky top-0 bg-[#F5F5F5] py-2 z-10">
            <h2 className="text-lg font-bold text-slate-800">Your Postings</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-500">
              {jobs.length} Active Positions
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 pb-8">
            {loading ? (
              <div className="col-span-2 flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-slate-200" size={48} />
              </div>
            ) : jobs.length === 0 ? (
              <div className="col-span-2 bg-white rounded-2xl p-20 text-center border border-slate-200 border-dashed">
                <Briefcase size={40} className="mx-auto mb-4 text-slate-200" />
                <h3 className="text-lg font-bold text-slate-400 italic">No job postings found.</h3>
              </div>
            ) : (
              jobs.map((job, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-indigo-300 transition-all relative group flex flex-col"
                >
                  <button 
                    onClick={() => handleDeleteJob(job.id)}
                    className="absolute top-4 right-4 p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="inline-flex items-center space-x-1.5 px-2 py-1 rounded-lg bg-indigo-50 text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 self-start border border-indigo-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                    {job.experience_level}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{job.role}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-6 font-medium italic">
                    {job.responsibilities || "No description provided."}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.required_skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-600 px-2 py-1 rounded-md text-[10px] font-bold border border-slate-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        <Users size={12} /> Pending Matches
                      </div>
                      <span className="text-[10px] font-black text-indigo-600">Active</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
