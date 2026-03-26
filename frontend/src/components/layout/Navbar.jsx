import { FiMenu, FiBell } from 'react-icons/fi';
import { authenticatedUserProfile } from '@/data/mockData';

export default function Navbar({ onOpenMobileMenu }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 md:justify-end">
      
      {/* Mobile Menu Toggle button*/}
      <button
        className="text-slate-500 hover:text-slate-700 md:hidden"
        onClick={onOpenMobileMenu}
        aria-label="Open navigation menu"
      >
        <FiMenu className="text-2xl" />
      </button>

      {/* Right Side-Notification and User profile */}
      <div className="flex items-center gap-4">
        
        {/* Notification */}
        <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
          <FiBell className="text-xl" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500"></span>
        </button>
        
        {/* Profile*/}
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 bg-brand-100 font-bold text-brand-600 shadow-sm">
          {authenticatedUserProfile.userAvatarInitials}
        </div>
        
      </div>
    </header>
  );
}