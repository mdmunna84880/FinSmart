import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import Loading from './Loading';

export default function PublicRoute() {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);

  if (isCheckingAuth) return <Loading />;

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
