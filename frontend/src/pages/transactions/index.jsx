import { useState, useMemo } from 'react';
import { FiList } from 'react-icons/fi';

import { financialTransactionsHistory } from '@/data/mockData';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';

export default function Transactions() {
  // States for searching and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  // Filter the transactions based on search term and selected filters
  const filteredTransactions = useMemo(() => {
    return financialTransactionsHistory.filter((transaction) => {
      
      // Text Search in description and category
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        transaction.transactionDescription.toLowerCase().includes(searchLower) ||
        transaction.transactionCategory.toLowerCase().includes(searchLower);

      // Filter based on Category
      const matchesCategory = 
        selectedCategory === 'All Categories' || 
        transaction.transactionCategory === selectedCategory;

      // Filter based on Month
      const transactionDate = new Date(transaction.transactionDate);
      const transactionMonthName = transactionDate.toLocaleString('en-US', { month: 'long' });
      const matchesMonth = 
        selectedMonth === 'All Months' || 
        transactionMonthName === selectedMonth;

      // Only return the transaction if it survives ALL three filters
      return matchesSearch && matchesCategory && matchesMonth;
    });
  }, [searchTerm, selectedCategory, selectedMonth]);

  return (
    <div className="mx-auto max-w-7xl font-sans">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            <FiList className="text-brand-500" />
            Transaction Ledger
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            View, search, and manage your complete financial history.
          </p>
        </div>
        
        {/* Action Button for exporting but not active now*/}
        <button className="whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md">
          Export CSV
        </button>
      </div>

      {/* Filter component*/}
      <TransactionFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      {/* Table to display the transactions */}
      <TransactionTable transactions={filteredTransactions} />
      
      {/* Footer for transactions*/}
      <div className="mt-4 text-right text-sm text-slate-500">
        Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
      </div>

    </div>
  );
}