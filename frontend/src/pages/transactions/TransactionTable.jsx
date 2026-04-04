import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { formateToUS } from '@/utils/currencyFormater';
import TypeBadge from './TypeBadge';

// Display transactions in a structured, sortable data table
export default function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date/Time</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Description</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {new Date(transaction.date).toLocaleDateString('en-GB')}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{transaction.category}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 line-clamp-1">{transaction.desc}</td>
                <td className="whitespace-nowrap px-6 py-4"><TypeBadge type={transaction.type} /></td>
                <td className={`whitespace-nowrap px-6 py-4 text-right text-sm font-bold ${transaction.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'}`}>{formateToUS(transaction.amount)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(transaction)} className="p-2 text-slate-400 hover:text-brand-600 transition-colors"><FiEdit2 className="text-lg" /></button>
                    <button onClick={() => onDelete(transaction)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><FiTrash2 className="text-lg" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}