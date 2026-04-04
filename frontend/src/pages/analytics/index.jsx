import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPieChart } from 'react-icons/fi';
import { fetchBudgetSummary } from '@/store/slices/budgetSlice';
import { formateToUS } from '@/utils/currencyFormater';
import CategorySpendingChart from './CategorySpendingChart';
import CategoryBudgetList from './CategoryBudgetList';

const CATEGORY_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#0ea5e9', '#f97316', '#14b8a6'];

// Provide a comprehensive overview of monthly spending and budget performance
export default function Analytics() {
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.budget);

  // Synchronize financial data for the current calendar month
  useEffect(() => {
    dispatch(fetchBudgetSummary());
  }, [dispatch]);

  // Derive chart data from categoryBudgets
  const categorySpending = useMemo(() => {
    const budgets = summary?.categoryBudgets ?? [];
    return budgets.map(({ category, spent }, i) => ({
      name: category,
      value: spent,
      color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }));
  }, [summary?.categoryBudgets]);
  const categoryBudgets = summary?.categoryBudgets ?? [];
  const totalSpent = summary?.totalExpense ?? 0;

  return (
    <div className="mx-auto max-w-7xl space-y-8 font-sans">
      {/* Analytics Dashboard Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            <FiPieChart className="text-brand-500" /> Analytics & Budgets
          </h1>
          <p className="mt-2 text-sm text-slate-500">Dive deep into your spending habits and track your monthly goals.</p>
        </div>

        {/* Highlighted Monthly Spending Total */}
        <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200 sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Spent (This Month)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formateToUS(totalSpent)}</p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="h-100"><CategorySpendingChart data={categorySpending} totalSpend={totalSpent} /></div>
        <div className="h-100"><CategoryBudgetList budgets={categoryBudgets} /></div>
      </div>
    </div>
  );
}