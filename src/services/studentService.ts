import api from './api';

export interface MatchRecommendation {
  job_id: string;
  score: number;
  match_quality: 'Excellent' | 'Good' | 'Partial' | 'Poor';
  missing_required_skills: string[];
  missing_preferred_skills: string[];
  recommendations: string[];
  company: {
    name: string;
    email: string;
    location?: string;
    industry?: string;
    description?: string;
  };
  role: string;
  description?: string;
  responsibilities?: string[];
}

export const studentService = {
  uploadCV: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Should return AI job recommendations
  }
};
