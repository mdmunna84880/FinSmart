import { cn } from '@/utils/cn';
import { formateToUS } from '@/utils/currencyFormater';

export default function SummaryCard({ title, amount, icon: Icon, trendType = 'neutral', className }) {
  const isPositive = trendType === 'positive';
  const isNegative = trendType === 'negative';

  return (
    <div className={cn(
      'relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md',
      className
    )}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <div className={cn(
          'flex h-10 w-10 items-center justify-center rounded-xl',
          isPositive && 'bg-emerald-100 text-emerald-600',
          isNegative && 'bg-rose-100 text-rose-600',
          !isPositive && !isNegative && 'bg-brand-100 text-brand-600'
        )}>
          {Icon && <Icon className="text-lg" />}
        </div>
      </div>

      <p className={cn(
        'mt-4 text-3xl font-bold tracking-tight',
        isPositive && 'text-emerald-700',
        isNegative && 'text-rose-700',
        !isPositive && !isNegative && 'text-slate-900'
      )}>
        {formateToUS(amount)}
      </p>

      <div className="mt-4 text-xs font-medium text-slate-400">
        {isPositive && <span className="text-emerald-500">↑</span>}
        {isNegative && <span className="text-rose-400">↓</span>}
        {!isPositive && !isNegative && <span className="text-brand-400">◈</span>}
        {' '}{isPositive ? 'Total earned this month' : isNegative ? 'Total spent this month' : 'Balance after expenses'}
      </div>

      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl',
        isPositive && 'bg-emerald-400',
        isNegative && 'bg-rose-400',
        !isPositive && !isNegative && 'bg-brand-400'
      )} />
    </div>
  );
}