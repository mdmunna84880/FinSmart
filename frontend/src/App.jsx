import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';

import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/pages/dashboard';
import Transactions from '@/pages/transactions';
import Analytics from '@/pages/analytics';
import Profile from '@/pages/profile';
import NotFound from '@/pages/not-found';
import Landing from '@/pages/landing';

function App() {

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />

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
