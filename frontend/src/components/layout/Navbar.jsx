import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FiMenu, FiBell, FiLogOut } from 'react-icons/fi';
import { logoutUser } from '@/store/slices/authSlice';

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export default function Navbar({ onOpenMobileMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 md:justify-end">
      <button
        className="text-slate-500 hover:text-slate-700 md:hidden"
        onClick={onOpenMobileMenu}
        aria-label="Open navigation menu"
      >
        <FiMenu className="text-2xl" />
      </button>

      <div className="flex items-center gap-3">
        <button
          className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100"
          aria-label="Notifications"
        >
          <FiBell className="text-xl" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div
          className="flex h-9 w-9 cursor-default select-none items-center justify-center rounded-full border border-brand-200 bg-brand-100 font-bold text-brand-600 shadow-sm"
          title={user?.name}
        >
          {getInitials(user?.name)}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600"
          aria-label="Logout"
        >
          <FiLogOut className="text-lg" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}