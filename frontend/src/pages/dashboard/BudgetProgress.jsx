import { FiTarget, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router';
import { cn } from '@/utils/cn';
import { formateToUS } from '@/utils/currencyFormater';

// Visualize monthly spending progress against a defined budget ceiling
export default function BudgetProgress({ totalExpense = 0, monthlyBudget = 0 }) {
  const hasBudget = monthlyBudget > 0;
  const rawPercentage = hasBudget ? (totalExpense / monthlyBudget) * 100 : 0;
  const visualPercentage = Math.min(rawPercentage, 100);
  const isOverBudget = hasBudget && totalExpense > monthlyBudget;
  const remainingAmount = Math.max(monthlyBudget - totalExpense, 0);

  // Default status indicators for healthy spending
  let statusColor = 'bg-emerald-500';
  let textColor = 'text-emerald-600';
  let StatusIcon = FiCheckCircle;

  // Adjust indicators based on spending thresholds
  if (rawPercentage > 100) {
    statusColor = 'bg-rose-500';
    textColor = 'text-rose-600';
    StatusIcon = FiAlertCircle;
  } else if (rawPercentage >= 80) {
    statusColor = 'bg-amber-400';
    textColor = 'text-amber-600';
    StatusIcon = FiTarget;
  }

  // Render setup prompt if no budget is configured
  if (!hasBudget) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100"><FiTarget className="text-xl text-slate-400" /></div>
        <div>
          <p className="font-semibold text-slate-700">No budget set</p>
          <p className="mt-1 text-xs text-slate-400">Set a monthly ceiling to start tracking your limits.</p>
        </div>
        <Link to="/profile" className="mt-1 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-700">Configure Budget</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {/* Budget Header and Status Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Monthly Budget</h2>
        <div className={cn('flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold', textColor)}>
          <StatusIcon className="text-sm" /> {rawPercentage.toFixed(0)}% used
        </div>
      </div>

      {/* Spending Summary Values */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Spent</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{formateToUS(totalExpense)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ceiling</p>
          <p className="mt-1 text-base font-semibold text-slate-600">{formateToUS(monthlyBudget)}</p>
        </div>
      </div>

      {/* Progress Bar Component */}
      <div className="mt-5 relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={cn('absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-in-out', statusColor)} style={{ width: `${visualPercentage}%` }} />
      </div>

      {/* Dynamic Budget Alert Text */}
      <div className="mt-3 text-xs font-medium text-slate-500">
        {isOverBudget ? (
          <span className="flex items-center gap-1.5 text-rose-600"><FiAlertCircle /> Over budget by {formateToUS(totalExpense - monthlyBudget)}</span>
        ) : (
          <span><span className="font-bold text-slate-800">{formateToUS(remainingAmount)}</span> remaining this month</span>
        )}
      </div>
    </div>
  );
}