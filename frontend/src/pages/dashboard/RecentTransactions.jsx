import { Link } from 'react-router';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { cn } from '@/utils/cn';
import { formateToUS } from '@/utils/currencyFormater';

export default function RecentTransactions({ transactions = [] }) {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
        <Link
          to="/transactions"
          className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          View All
        </Link>
      </div>

      {recentTransactions.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">No recent transactions found.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {recentTransactions.map((transaction) => {
            const isIncome = transaction.type === 'Income';
            return (
              <li
                key={transaction._id}
                className="flex items-center justify-between gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm',
                    isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                  )}>
                    {isIncome ? <FiArrowUpRight className="text-xl" /> : <FiArrowDownLeft className="text-xl" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{transaction.desc}</p>
                    <p className="text-sm text-slate-500">
                      {transaction.category}
                      <span className="inline-block w-1 h-1 mb-0.5 mx-1 rounded-full bg-slate-400" />
                      {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className={cn('font-bold tracking-tight', isIncome ? 'text-emerald-600' : 'text-slate-900')}>
                  {isIncome ? '+' : '-'}{formateToUS(transaction.amount)}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}