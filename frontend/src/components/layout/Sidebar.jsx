import { NavLink } from 'react-router';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import Logo from '@/components/common/Logo';
import { navigationLinks } from './navItems';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);  

  return (
    <aside 
      className={cn(
        "hidden flex-col border-r border-slate-200 bg-white md:flex transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center justify-center border-b border-slate-200">
        <Logo isCollapsed={isCollapsed} />
      </div>
      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 p-4 overflow-hidden">
        {navigationLinks.map((item) => (
          <NavLink
            key={item.pageName}
            to={item.pagePath}
            title={isCollapsed ? item.pageName : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center rounded-lg py-2.5 transition-colors",
                isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                isActive ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-100"
              )
            }
          >
            <item.IconComponent className="text-xl shrink-0" />
            
            {/* Hide text when collapsed*/}
            <span 
              className={cn(
                "font-medium whitespace-nowrap transition-all duration-300",
                isCollapsed ? "hidden opacity-0 w-0" : "block opacity-100 w-auto"
              )}
            >
              {item.pageName}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle Button */}
      <div className="flex items-center justify-center border-t border-slate-200 p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <FiChevronRight className="text-xl" />
          ) : (
            <FiChevronLeft className="text-xl" />
          )}
        </button>
      </div>
    </aside>
  );
}