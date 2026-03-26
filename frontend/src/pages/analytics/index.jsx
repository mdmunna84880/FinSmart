import { FiPieChart } from 'react-icons/fi';

import { categorySpending, categoryBudgets } from '@/data/mockData';
import CategorySpendingChart from './CategorySpendingChart';
import CategoryBudgetList from './CategoryBudgetList';
import { formateToUS } from '@/utils/currencyFormater';

export default function Analytics() {
  
  // Total spending
  const totalSpent = categorySpending.reduce((acc, current) => acc + current.value, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8 font-sans">
      
      {/* Page Header*/}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            <FiPieChart className="text-brand-500" />
            Analytics & Budgets
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Dive deep into your spending habits and track your monthly goals.
          </p>
        </div>
        
        {/* Summary Metric */}
        <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200 sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Spent (March)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formateToUS(totalSpent)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        {/* The Interactive Donut Chart */}
        <div className="h-100">
          <CategorySpendingChart data={categorySpending} />
        </div>

        {/* The Budget Tracking List */}
        <div className="h-100">
          <CategoryBudgetList budgets={categoryBudgets} />
        </div>
      </div>
      
    </div>
  );
}