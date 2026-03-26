import Logo from '@/components/common/Logo';
import { Link } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <Logo />
        
        {/* Copyright & Disclaimer */}
        <p className="text-sm text-slate-500 text-center md:text-left">
          &copy; {currentYear} FinSmart Technologies, Inc. All rights reserved. <br className="hidden sm:block" />
          <span className="text-xs text-slate-400">This is a demo application. Not actual financial advice.</span>
        </p>
        
        {/* Links */}
        <div className="flex gap-6 text-sm font-medium text-slate-500">
          <Link to="#" className="transition-colors hover:text-slate-900">Privacy</Link>
          <Link to="#" className="transition-colors hover:text-slate-900">Terms</Link>
          <Link to="#" className="transition-colors hover:text-slate-900">Security</Link>
        </div>
        
      </div>
    </footer>
  );
}