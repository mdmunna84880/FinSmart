import { formateToUS } from '@/utils/currencyFormater';
import TypeBadge from './TypeBadge';
import { cn } from '@/utils/cn';

export default function TransactionTable({ transactions }) {
  
  // Formate the date
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  // When there is no transactions history
  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center">
        <h3 className="mt-2 text-sm font-semibold text-slate-900">No transactions found</h3>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  // Main table layout
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left align-middle">
          {/* Table heading */}
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="whitespace-nowrap py-3.5 pl-4 pr-3 text-sm font-semibold text-slate-900 sm:pl-6">Date</th>
              <th scope="col" className="whitespace-nowrap px-3 py-3.5 text-sm font-semibold text-slate-900">Description</th>
              <th scope="col" className="whitespace-nowrap px-3 py-3.5 text-sm font-semibold text-slate-900">Category</th>
              <th scope="col" className="whitespace-nowrap px-3 py-3.5 text-sm font-semibold text-slate-900">Type</th>
              <th scope="col" className="whitespace-nowrap py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-slate-900 sm:pr-6">Amount</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 bg-white">
            {transactions.map((transaction) => {
              const isCredit = transaction.transactionType?.toLowerCase() === 'credit';
              return (
                <tr 
                  key={transaction.transactionId} 
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-500 sm:pl-6">
                    {formatDate(transaction.transactionDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-900">
                    {transaction.transactionDescription}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                    {transaction.transactionCategory}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <TypeBadge type={isCredit} />
                  </td>
                  <td className={cn(
                    "whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-bold tracking-tight sm:pr-6",
                    isCredit ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {isCredit ? '+' : '-'}
                    {formateToUS(transaction.transactionAmount)}
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}