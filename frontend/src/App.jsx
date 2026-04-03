import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/pages/dashboard';
import Transactions from '@/pages/transactions';
import Analytics from '@/pages/analytics';
import Profile from '@/pages/profile';
import NotFound from '@/pages/not-found';
import Landing from '@/pages/landing';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import { getUserProfile } from '@/store/slices/authSlice';
import Loading from './components/common/Loading';

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((state) => state.auth);

  
  // Validate session on application mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Render loading state while session verification is pending
  if (isCheckingAuth) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated App page*/}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch-all the routes which is not available*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
