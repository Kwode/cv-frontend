import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { jobService, Job } from '@/src/services/jobService';
import { authService, Company } from '@/src/services/authService';
import { Search, Briefcase, Building2, MapPin, Loader2, Filter, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/src/utils/helpers';

export const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getJobs();
        setJobs(data);
      } catch (err) {
        console.error('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.role.toLowerCase().includes(search.toLowerCase()) || 
    job.company?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Header & Search */}
      <div className="py-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Explore Opportunities</h1>
            <p className="text-slate-500 font-medium italic text-sm">Discover tech roles vetted by TalentAI matching metrics.</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by role or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm focus:border-indigo-600 focus:ring-0 transition-all outline-none text-sm font-medium"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <Filter size={14} /> Filter Jobs
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-3">Commitment</h4>
                  {['Full-time', 'Contract', 'Internship'].map(type => (
                    <label key={type} className="flex items-center gap-3 py-1.5 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center group-hover:border-indigo-600 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-sm bg-indigo-600 opacity-0 group-hover:opacity-10" />
                      </div>
                      <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-6 rounded-2xl text-white relative overflow-hidden group shadow-lg shadow-indigo-100">
              <Sparkles className="absolute -top-4 -right-4 text-white/20 w-24 h-24 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
              <h3 className="text-lg font-bold mb-2 relative z-10">AI Match Score</h3>
              <p className="text-[10px] text-indigo-100 font-bold mb-4 relative z-10 uppercase tracking-wider">Analysis Tool</p>
              <p className="text-xs text-indigo-50 font-medium mb-4 relative z-10 leading-relaxed">
                Connect your profile to see instant match percentages for every role.
              </p>
              <button className="text-[11px] font-black uppercase tracking-widest text-white underline underline-offset-4 relative z-10 hover:text-indigo-200">Connect Profile</button>
            </div>
          </div>
        </div>

        {/* Jobs Feed */}
        <div className="lg:col-span-9">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-slate-200" size={48} />
              <p className="text-slate-400 font-bold italic text-sm tracking-tight">Syncing latest feeds...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-20 text-center border border-slate-200 border-dashed">
              <Search size={40} className="mx-auto mb-6 text-slate-100" />
              <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">No results for "{search}"</h3>
              <p className="text-slate-500 font-medium italic text-sm">Try broader search terms like "React" or "Design".</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filteredJobs.map((job, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={job.id}
                  className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Building2 size={24} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase rounded-md tracking-widest border border-slate-100">
                        {job.experience_level}
                      </span>
                      <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                        <MapPin size={10} /> Remote
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight mb-1">{job.role}</h3>
                  <p className="text-xs font-bold text-indigo-600 mb-6 uppercase tracking-wider">{job.company?.name || 'Top Company'}</p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {job.required_skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-100 group-hover:bg-slate-100 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Verified Entry</span>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-2">
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
