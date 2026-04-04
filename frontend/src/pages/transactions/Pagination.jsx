import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/cn';

export default function Pagination({ currentPage, totalPages, totalEntries, limitPerPage, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * limitPerPage + 1}</span> to{' '}
        <span className="font-semibold text-slate-700">{Math.min(currentPage * limitPerPage, totalEntries)}</span> of{' '}
        <span className="font-semibold text-slate-700">{totalEntries}</span> entries
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
        >
          <FiChevronLeft />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
          .map((p, i, arr) => (
            <div key={p} className="flex items-center">
              {i > 0 && p - arr[i - 1] > 1 && <span className="px-2 text-slate-300">...</span>}
              <button
                onClick={() => onPageChange(p)}
                className={cn(
                  "h-9 w-9 rounded-lg text-sm font-semibold transition-colors",
                  currentPage === p 
                    ? "bg-brand-600 text-white shadow-sm" 
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                {p}
              </button>
            </div>
          ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
