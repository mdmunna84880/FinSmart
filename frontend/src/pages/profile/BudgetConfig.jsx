import { FiSettings, FiDollarSign, FiTarget, FiPieChart } from 'react-icons/fi';
import { formateToUS } from '@/utils/currencyFormater';

export default function BudgetConfig({ summary, onConfigureClick }) {
  const hasConfig = summary?.monthlyBudget > 0;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Monthly Budget</h2>
          <p className="mt-1 text-sm text-slate-500">Configure your monthly spending ceiling and category limits.</p>
        </div>
        <button
          onClick={onConfigureClick}
          className="flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
        >
          <FiSettings size={15} />
          {hasConfig ? 'Edit Budget' : 'Set Budget'}
        </button>
      </div>

      {hasConfig ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <FiDollarSign />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Ceiling</p>
              <p className="text-lg font-bold text-slate-900">{formateToUS(summary.monthlyBudget)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <FiTarget />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings Target</p>
              <p className="text-lg font-bold text-slate-900">{formateToUS(summary.savingsTarget ?? 0)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <FiPieChart />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Spent This Month</p>
              <p className="text-lg font-bold text-slate-900">{formateToUS(summary.totalExpense ?? 0)}</p>
            </div>
          </div>

          {summary.categoryBudgets?.length > 0 && (
            <div className="sm:col-span-2">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FiPieChart size={15} className="text-brand-500" />
                Category Limits
              </div>
              <ul className="space-y-2">
                {summary.categoryBudgets.map((b) => (
                  <li key={b.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm ring-1 ring-inset ring-slate-200">
                    <span className="font-semibold text-slate-700">{b.category}</span>
                    <span className="text-slate-500">
                      {formateToUS(b.spent)} <span className="text-slate-300">/</span> {formateToUS(b.limit)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <FiDollarSign className="text-3xl text-slate-300" />
          <p className="mt-2 text-sm font-semibold text-slate-600">No budget configured</p>
          <p className="mt-1 text-xs text-slate-400">Set a monthly ceiling to start tracking your spending limits.</p>
        </div>
      )}
    </div>
  );
}
