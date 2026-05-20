import api from './api';

export interface Student {
  id: string;
  email: string;
  name: string;
  location: string;
  institution: string;
}

export interface Company {
  cac: string;
  name: string;
  email: string;
  location: string;
  industry?: string;
  description?: string;
}

export const authService = {
  registerStudent: async (data: any) => {
    const response = await api.post('/register/student', data);
    return response.data;
  },
  loginStudent: async (data: any) => {
    const response = await api.post('/login/student', data);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userType', 'student');
    }
    return response.data;
  },
  getStudents: async () => {
    const response = await api.get('/students');
    return response.data;
  },
  registerCompany: async (data: any) => {
    const response = await api.post('/register/company', data);
    return response.data;
  },
  loginCompany: async (data: any) => {
    const response = await api.post('/login/company', data);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userType', 'company');
    }
    return response.data;
  },
  getCompanyProfile: async () => {
    const response = await api.get('/company');
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location.href = '/';
  }
};
