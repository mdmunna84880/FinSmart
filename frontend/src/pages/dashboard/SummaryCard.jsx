import { cn } from '@/utils/cn';
import { formateToUS } from '@/utils/currencyFormater';

export default function SummaryCard({ 
  title, 
  amount, 
  icon: Icon, 
  trend, 
  trendType = 'neutral',
  className 
}) {

  return (
    <div className={cn("flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {/* Dynamic Icon */}
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          trendType === 'positive' && "bg-emerald-100 text-emerald-600",
          trendType === 'negative' && "bg-rose-100 text-rose-600",
          trendType === 'neutral' && "bg-brand-100 text-brand-600"
        )}>
          {Icon && <Icon className="text-lg" />}
        </div>
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {formateToUS(amount)}
        </span>
      </div>

      {/*Trend Indicator */}
      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-sm">
          <span className={cn(
            "font-medium",
            trendType === 'positive' && "text-emerald-600",
            trendType === 'negative' && "text-rose-600",
            trendType === 'neutral' && "text-slate-600"
          )}>
            {trend}
          </span>
          <span className="text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
}