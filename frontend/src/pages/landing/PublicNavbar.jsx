import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { cn } from '@/utils/cn';
import Logo from '@/components/common/Logo';

// Global navigation bar for all public landing page visitors
export default function PublicNavbar() {
  const { user, isCheckingAuth } = useSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand Logo Identity */}
          <Logo />
          
          {/* Conditional Authentication Navigation */}
          <div className="flex items-center gap-4">
            {!isCheckingAuth && user ? (
              <Link to="/dashboard" className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-md">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">Log in</Link>
                <Link to="/register" className={cn("rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white", "transition-all hover:bg-slate-800 hover:shadow-md")}>Get Started</Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}