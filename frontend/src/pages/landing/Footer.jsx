import Logo from '@/components/common/Logo';
import { Link } from 'react-router';

// Global footer for public-facing landing and marketing pages
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand Information Area */}
        <Logo />
        
        {/* Compliance and Copyright Notice */}
        <p className="text-sm text-slate-500 text-center md:text-left">
          &copy; {currentYear} FinSmart Technologies, Inc. <br className="hidden sm:block" />
          <span className="text-xs text-slate-400">Demo application. Not professional financial advice.</span>
        </p>
        
        {/* Legal and Security Navigation */}
        <div className="flex gap-6 text-sm font-medium text-slate-500">
          <Link to="#" className="transition-colors hover:text-slate-900">Privacy</Link>
          <Link to="#" className="transition-colors hover:text-slate-900">Terms</Link>
          <Link to="#" className="transition-colors hover:text-slate-900">Security</Link>
        </div>
        
      </div>
    </footer>
  );
}