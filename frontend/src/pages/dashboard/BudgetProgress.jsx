import { FiTarget, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { cn } from '@/utils/cn';
import { formateToUS } from '@/utils/currencyFormater';

export default function BudgetProgress({ totalExpense = 0, monthlyBudget = 1 }) {
  // Prevent division by zero and cap the visual progress bar
  const safeBudget = monthlyBudget > 0 ? monthlyBudget : 1;
  const rawPercentage = (totalExpense / safeBudget) * 100;
  const visualPercentage = Math.min(rawPercentage, 100); 
  
  const isOverBudget = totalExpense > monthlyBudget;
  const remainingAmount = Math.max(monthlyBudget - totalExpense, 0);

  // Color state and icon
  let statusColor = "bg-emerald-500";
  let textColor = "text-emerald-600";
  let StatusIcon = FiCheckCircle;

  if (rawPercentage >= 90) {
    statusColor = "bg-rose-500";
    textColor = "text-rose-600";
    StatusIcon = FiAlertCircle;
  } else if (rawPercentage >= 75) {
    statusColor = "bg-amber-400";
    textColor = "text-amber-600";
    StatusIcon = FiTarget;
  }

  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      
      {/* Header*/}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Monthly Budget</h2>
        <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-slate-50", textColor)}>
          <StatusIcon className="text-sm" />
          {rawPercentage.toFixed(1)}% Used
        </div>
      </div>

      {/* Total spent and budget limit */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Total Spent</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            {formateToUS(totalExpense)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500">Budget Limit</p>
          <p className="mt-1 text-lg font-semibold text-slate-700">
            {formateToUS(monthlyBudget)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div 
          className={cn("absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-in-out", statusColor)}
          style={{ width: `${visualPercentage}%` }}
        />
      </div>

      {/* Message */}
      <div className="mt-4 flex items-center justify-between text-sm">
        {isOverBudget ? (
          <span className="font-medium text-rose-600 flex items-center gap-1.5">
            <FiAlertCircle /> You have exceeded your budget by {formateToUS(totalExpense - monthlyBudget)}
          </span>
        ) : (
          <span className="font-medium text-slate-500">
            <span className="text-slate-900">{formateToUS(remainingAmount)}</span> remaining this month
          </span>
        )}
      </div>

    </div>
  );
}