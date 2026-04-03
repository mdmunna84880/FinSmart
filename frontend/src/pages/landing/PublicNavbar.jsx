import { Link } from 'react-router';
import { cn } from '@/utils/cn';
import Logo from '@/components/common/Logo';

export default function PublicNavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Area */}
          <Logo />
          
          {/* Call to Action Links */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
            >
              Log in
            </Link>
            <Link 
              to="/register" 
              className={cn(
                "rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white",
                "transition-all hover:bg-slate-800 hover:shadow-md"
              )}
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}