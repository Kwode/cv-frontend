import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Brain,
  Info,
  Target
} from 'lucide-react';
import { MatchRecommendation } from '@/src/services/studentService';
import { cn } from '@/src/utils/helpers';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to get data from location state
  const recommendation = location.state?.recommendation as MatchRecommendation | undefined;

  if (!recommendation) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <Info size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Analysis Missing</h2>
        <p className="text-slate-500 mb-8">Please return to the dashboard and upload your CV to generate an AI match analysis for this role.</p>
        <button 
          onClick={() => navigate('/student/dashboard')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm mb-8 transition-colors group"
      >
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </button>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Job Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 space-y-6"
        >
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 border border-slate-100">
                  <Building2 size={40} />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">{recommendation.role}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 text-indigo-600">
                      <Building2 size={16} />
                      {recommendation.company.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      Remote / On-site
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className={cn(
                    "px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border",
                    recommendation.match_quality === 'Excellent' ? "bg-green-50 text-green-700 border-green-200" :
                    recommendation.match_quality === 'Good' ? "bg-blue-50 text-blue-700 border-blue-200" :
                    "bg-yellow-50 text-yellow-700 border-yellow-200"
                  )}>
                    {recommendation.match_quality} Match
                  </span>
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-indigo-600" />
                  Role Overview
                </h3>
                <div className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl italic">
                  {recommendation.description || "This position requires a strategic thinker who can bridge the gap between technical complexity and business goals. You will be responsible for driving high-impact initiatives and collaborating with cross-functional teams."}
                </div>
              </section>

              {recommendation.responsibilities && recommendation.responsibilities.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Target size={20} className="text-indigo-600" />
                    Key Responsibilities
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {recommendation.responsibilities.map((resp, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Required Arsenal</h4>
                  <div className="flex flex-wrap gap-2">
                    {/* Note: recommendation object doesn't have ALL original skills, but usually we can infer or pass them. 
                        In this app, we'll show matched vs missing based on the analysis. */}
                    {Array.from(new Set([...(recommendation.missing_required_skills || [])])).map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-600 text-[11px] font-bold rounded-lg border border-red-100 flex items-center gap-2">
                        <XCircle size={12} /> {skill}
                      </span>
                    ))}
                    {/* We don't have the matched skills list in the recommendation object, 
                        but we can assume coverage is good if match_quality is high. */}
                    <div className="w-full mt-2 p-3 bg-green-50/50 rounded-xl border border-green-100 text-[11px] font-bold text-green-600 flex items-center gap-2">
                      <CheckCircle2 size={14} /> AI verified your core skill coverage as {recommendation.match_quality.toLowerCase()}
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Preferred Mastery</h4>
                  <div className="flex flex-wrap gap-2">
                    {(recommendation.missing_preferred_skills || []).map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-400 text-[11px] font-bold rounded-lg border border-slate-200">
                        {skill} (Missing)
                      </span>
                    ))}
                    {recommendation.missing_preferred_skills.length === 0 && (
                      <span className="text-xs font-medium text-slate-400 italic">No specific missing preferences identified.</span>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 text-indigo-400/20 group-hover:text-indigo-400/40 transition-colors">
               <ArrowRight size={120} />
             </div>
             <h3 className="text-2xl font-black mb-4 relative z-10">Ready to apply?</h3>
             <p className="text-slate-400 font-medium mb-8 max-w-md relative z-10">
               Your AI Profile analysis indicates a strong synergy. Leverage your coverage of key technical domains to stand out.
             </p>
             <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all relative z-10 shadow-lg shadow-indigo-900/50">
               Apply via TalentAI
               <ArrowRight size={20} />
             </button>
          </div>
        </motion.div>

        {/* AI Analysis Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-4 space-y-6"
        >
          {/* Recommendations Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Brain size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Growth Plan</h3>
            </div>
            
            <ul className="space-y-4">
              {recommendation.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-4 group">
                  <div className="mt-1 h-5 w-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                    <CheckCircle2 size={12} className="text-slate-300 group-hover:text-white" />
                  </div>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {rec}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Context */}
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white">
             <h3 className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-6 flex items-center gap-2">
               <Target size={16} /> Organizational Vibe
             </h3>
             <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-1">{recommendation.company.name}</h4>
                  <p className="text-xs text-indigo-100 font-medium opacity-80 mb-2 italic">Visionary Technology Hub</p>
                  <div className="h-1 w-12 bg-white/20 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold text-indigo-200 mb-1">Industry</p>
                    <p className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">{recommendation.company.industry || 'Technology'}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold text-indigo-200 mb-1">Location</p>
                    <p className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">{recommendation.company.location || 'Remote'}</p>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
