import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import Loading from './Loading';

export default function ProtectedRoute() {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);

  if (isCheckingAuth) return <Loading />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
