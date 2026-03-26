import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { cn } from '@/utils/cn';

export default function TypeBadge({ isCredit }) {

  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset w-fit",
        isCredit 
          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" 
          : "bg-rose-50 text-rose-700 ring-rose-600/20"
      )}
    >
      {isCredit ? (
        <FiArrowUpRight className="text-[10px]" strokeWidth={3} />
      ) : (
        <FiArrowDownLeft className="text-[10px]" strokeWidth={3} />
      )}
      {isCredit ? 'Credit' : 'Debit'}
    </span>
  );
}