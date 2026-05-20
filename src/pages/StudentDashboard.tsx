import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { studentService, MatchRecommendation } from '@/src/services/studentService';
import { FileUp, Loader2, Sparkles, AlertCircle, Building2, ChevronRight, Briefcase } from 'lucide-react';
import { cn } from '@/src/utils/helpers';

export const StudentDashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [recommendations, setRecommendations] = useState<MatchRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load from session storage to persist recommendations on back navigation
  useEffect(() => {
    const saved = sessionStorage.getItem('recommendations');
    if (saved) {
      setRecommendations(JSON.parse(saved));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const data = await studentService.uploadCV(file);
      setRecommendations(data);
      sessionStorage.setItem('recommendations', JSON.stringify(data));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload CV');
    } finally {
      setUploading(false);
    }
  };

  const handleViewDetails = (rec: MatchRecommendation) => {
    navigate(`/job/${rec.job_id}`, { state: { recommendation: rec } });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">My Career Hub</h1>
        <p className="text-slate-500 font-medium italic">Empower your job search with AI-driven precision.</p>
      </div>

      {/* Upload Section */}
      <div className="mb-12">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Ready for your next move? 🚀</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Upload your resume in PDF format. Our AI will analyze your technical depth and match you with the best roles.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <input 
              id="cv-upload"
              type="file" 
              className="hidden" 
              accept=".pdf"
              onChange={handleFileChange}
            />
            <button 
              onClick={() => document.getElementById('cv-upload')?.click()}
              className="w-full sm:w-auto px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:border-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <FileUp size={18} className="text-indigo-600" />
              {file ? file.name : "Select Resume (PDF)"}
            </button>
            <button 
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:bg-slate-200 transition-all flex items-center justify-center gap-3 h-14"
            >
              {uploading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Sparkles size={20} />
              )}
              {uploading ? "Analyzing..." : "Sync with AI"}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-4 text-xs text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 font-bold flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </p>
        )}
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800">Top Job Recommendations</h3>
          {recommendations.length > 0 && (
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-black uppercase tracking-widest border border-indigo-100">
              {recommendations.length} Matches Found
            </span>
          )}
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-24 flex flex-col items-center justify-center text-slate-400 gap-6 grayscale opacity-60">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
              <Briefcase size={40} className="opacity-20" />
            </div>
            <div className="text-center">
              <p className="text-lg font-black text-slate-300 italic uppercase tracking-tighter mb-2">Waiting for your profile</p>
              <p className="text-sm font-medium">Upload your CV above to see personalized AI-vetted opportunities.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={rec.job_id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50/50 transition-all group flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Building2 size={24} />
                  </div>
                  <span className={cn(
                    "px-3 py-1.5 text-[10px] font-black uppercase rounded-xl border",
                    rec.match_quality === 'Excellent' ? "bg-green-50 text-green-700 border-green-100" :
                    rec.match_quality === 'Good' ? "bg-blue-50 text-blue-700 border-blue-100" :
                    "bg-yellow-50 text-yellow-700 border-yellow-100"
                  )}>
                    {rec.match_quality}
                  </span>
                </div>
                
                <h4 className="font-black text-slate-800 text-xl tracking-tight leading-tight mb-2 group-hover:text-indigo-600 transition-colors">{rec.role}</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">{rec.company.name}</p>
                
                <div className="pt-6 border-t border-slate-50 mt-auto flex justify-end items-center">
                  <button 
                    onClick={() => handleViewDetails(rec)}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all flex items-center gap-2 group/btn shadow-sm"
                  >
                    View Details
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
