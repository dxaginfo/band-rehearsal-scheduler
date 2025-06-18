import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { checkAuthStatus } from './features/auth/authSlice';
import { RootState, AppDispatch } from './store';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Page components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Bands from './pages/bands/Bands';
import BandDetails from './pages/bands/BandDetails';
import Rehearsals from './pages/rehearsals/Rehearsals';
import RehearsalDetails from './pages/rehearsals/RehearsalDetails';
import CreateRehearsal from './pages/rehearsals/CreateRehearsal';
import Setlists from './pages/setlists/Setlists';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public route component (accessible only when not authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
      </Route>

      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bands" element={<Bands />} />
        <Route path="bands/:bandId" element={<BandDetails />} />
        <Route path="rehearsals" element={<Rehearsals />} />
        <Route path="rehearsals/create" element={<CreateRehearsal />} />
        <Route path="rehearsals/:rehearsalId" element={<RehearsalDetails />} />
        <Route path="setlists" element={<Setlists />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;