import { FiAlertCircle } from 'react-icons/fi';
import { cn } from '@/utils/cn';
import { formateToUS } from '@/utils/currencyFormater';

export default function CategoryBudgetList({ budgets = [] }) {

  // When there is no data
  if (!budgets || budgets.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">No active budgets found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Budget vs. Spending</h2>
        <p className="text-sm text-slate-500">Track your limits across categories</p>
      </div>
      
      {/* List Container */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto pr-2">
        {budgets.map((item) => {
          const rawPercentage = (item.spent / item.limit) * 100;
          const visualPercentage = Math.min(rawPercentage, 100); 
          const isOverBudget = rawPercentage >= 100;

          let barColor = "bg-brand-500";
          if (rawPercentage >= 90) {
            barColor = "bg-rose-500";
          } else if (rawPercentage >= 80) {
            barColor = "bg-amber-500";
          }

          return (
            <div key={item.id} className="group">
              <div className="mb-2 flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">{item.category}</span>
                  {isOverBudget && (
                    <FiAlertCircle className="text-rose-500" title="Over Budget!" />
                  )}
                </div>
                <div className="text-sm">
                  <span className={cn(
                    "font-bold",
                    isOverBudget ? "text-rose-600" : "text-slate-900"
                  )}>
                    {formateToUS(item.spent)}
                  </span>
                  <span className="text-slate-500"> / {formateToUS(item.limit)}</span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500 ease-out", barColor)}
                  style={{ width: `${visualPercentage}%` }}
                />
              </div>
              
            </div>
          );
        })}
      </div>

    </div>
  );
}