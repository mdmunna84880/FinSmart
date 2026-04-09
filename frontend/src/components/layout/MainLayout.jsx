import { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '@/utils/cn';
import { navigationLinks } from './navItems';
import { FiX } from 'react-icons/fi';
import Logo from '../common/Logo';
import ChatWidget from '@/pages/chat-widget';

/** Primary application layout with sidebar, navbar, content area, and floating AI chat widget. */
export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);
  const handleOpenMobileMenu = () => setIsMobileMenuOpen(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onOpenMobileMenu={handleOpenMobileMenu} />

        <div
          className={cn(
            "fixed inset-0 z-50 flex bg-slate-900/50 transition-opacity duration-300 md:hidden",
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <aside
            className={cn(
              "w-64 bg-white transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <Logo />
              <button onClick={handleCloseMobileMenu} aria-label="Close mobile menu">
                <FiX className="text-2xl text-slate-500 hover:text-slate-700" />
              </button>
            </div>

            <nav className="space-y-2 p-4">
              {navigationLinks.map((navItem) => (
                <NavLink
                  key={navItem.pageName}
                  to={navItem.pagePath}
                  onClick={handleCloseMobileMenu}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors",
                      isActive ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-100"
                    )
                  }
                >
                  <navItem.IconComponent className="text-xl" />
                  {navItem.pageName}
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <ChatWidget />
    </div>
  );
}