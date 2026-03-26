import { FiTrendingUp } from 'react-icons/fi';
import { cn } from '@/utils/cn';
import { Link } from 'react-router';

export default function Logo({ isCollapsed = false, className }) {
  return (
    <Link to="/">
    <div className={cn("flex items-center gap-2 overflow-hidden", className)}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm">
        <FiTrendingUp className="text-xl" />
      </div>
      <span 
        className={cn(
          "text-xl font-bold tracking-tight text-slate-900 transition-all duration-300",
          isCollapsed ? "hidden w-0 opacity-0" : "block w-auto opacity-100 whitespace-nowrap"
        )}
      >
        Fin<span className="text-brand-500">Smart</span>
      </span>
    </div>
    </Link>
  );
}