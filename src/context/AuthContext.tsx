import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  userType: 'student' | 'company' | null;
  isAuthenticated: boolean;
  login: (token: string, type: 'student' | 'company') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userType, setUserType] = useState<'student' | 'company' | null>(
    localStorage.getItem('userType') as 'student' | 'company' | null
  );

  const login = (newToken: string, type: 'student' | 'company') => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userType', type);
    setToken(newToken);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setToken(null);
    setUserType(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userType, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
