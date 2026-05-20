import api from './api';

export interface Job {
  id: string;
  company_id: string;
  role: string;
  required_skills: string[];
  preferred_skills: string[];
  responsibilities: string[];
  experience_level: string;
  company?: {
    name: string;
    email: string;
  };
}

export const jobService = {
  createJob: async (data: Omit<Job, 'id' | 'company_id'>) => {
    const response = await api.post('/job', data);
    return response.data;
  },
  getJobs: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },
  deleteJob: async (id: string) => {
    const response = await api.delete(`/job/${id}`);
    return response.data;
  }
};
