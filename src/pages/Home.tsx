import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Brain, Briefcase, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/utils/helpers';

export const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-32 max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-xs font-bold text-indigo-600 mb-8 uppercase tracking-widest">
              <Sparkles size={14} />
              <span>AI-Powered Matching Engine</span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-slate-900 leading-[0.85] mb-8">
              Hire the <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">future</span>.<br />
              <span className="text-slate-400">Match with intent.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mb-12 leading-relaxed font-medium">
              The world's most precise recruitment layer. We use semantic analysis to bridge the gap between human potential and organizational needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/register/student" 
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
              >
                Join as Student
                <Zap size={20} />
              </Link>
              <Link 
                to="/register/company" 
                className="border-2 border-slate-200 bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold text-lg hover:border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                Post a Job
                <Briefcase size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800">Match Pulse</h3>
                    <p className="text-[10px] uppercase font-bold text-slate-300">Analysis Active</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-lg border border-green-100 italic">
                  High Precision
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Role Compatibility', score: 94, color: 'bg-indigo-600' },
                  { label: 'Technical Depth', score: 88, color: 'bg-indigo-400' },
                  { label: 'Growth Potential', score: 82, color: 'bg-indigo-200' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tight text-slate-400">
                      <span>{stat.label}</span>
                      <span className="text-slate-800">{stat.score}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.score}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'circOut' }}
                        className={cn("h-full rounded-full", stat.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Features Section */}
      <section className="bg-slate-50/50 py-32 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-indigo-600 transition-all">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Sparkles className="text-indigo-600" size={32} />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tighter">Instant Semantic Matching</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-lg italic">
              "We don't just look for keywords. Our AI understands your experience, your growth trajectory, and how you'll fit into a team's technical ecosystem."
            </p>
          </div>
          <div className="md:col-span-4 bg-indigo-600 p-12 rounded-[2.5rem] text-white flex flex-col justify-end relative overflow-hidden">
            <Zap className="absolute -top-6 -right-6 w-32 h-32 text-white/10 -rotate-12" />
            <h3 className="text-2xl font-bold mb-2 relative z-10">Real-time Analysis</h3>
            <p className="text-indigo-100 text-sm font-medium relative z-10 opacity-80 leading-relaxed">
              Upload once, match forever. As new jobs are posted, we proactively suggest the best fits.
            </p>
          </div>
          
          <div className="md:col-span-4 bg-slate-900 p-12 rounded-[2.5rem] text-white flex flex-col justify-end">
            <Briefcase className="text-indigo-400 mb-8" size={40} />
            <h3 className="text-xl font-bold mb-2">Employer Suite</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Powerful dashboard to manage postings and view AI-vetted candidates with scored reasoning.
            </p>
          </div>
          <div className="md:col-span-8 bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex items-center justify-between group overflow-hidden">
            <div className="max-w-md">
              <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tighter">Data-Driven Growth</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Receive specific feedback on missing skills for every role. Know exactly what to learn next to land your dream job.
              </p>
            </div>
            <div className="hidden lg:flex gap-4 items-center pl-8 text-indigo-600/10">
              <Brain size={120} className="group-hover:scale-110 group-hover:text-indigo-600/20 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
