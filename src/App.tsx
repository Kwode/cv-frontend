/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout, ProtectedRoute } from './components/Layout';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { CompanyDashboard } from './pages/CompanyDashboard';
import { Jobs } from './pages/Jobs';
import { JobDetail } from './pages/JobDetail';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="jobs" element={<Jobs />} />
            
            {/* Auth Routes */}
            <Route path="login/:type" element={<Login />} />
            <Route path="register/:type" element={<Register />} />

            {/* Public/Shared Job Route */}
            <Route path="job/:id" element={<JobDetail />} />

            {/* Protected Student Routes */}
            <Route element={<ProtectedRoute allowedType="student" />}>
              <Route path="student/dashboard" element={<StudentDashboard />} />
            </Route>

            {/* Protected Company Routes */}
            <Route element={<ProtectedRoute allowedType="company" />}>
              <Route path="company/dashboard" element={<CompanyDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
