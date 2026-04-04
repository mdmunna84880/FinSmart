import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiList, FiPlus, FiInbox } from 'react-icons/fi';

import { deleteTransaction, fetchTransactions, fetchAvailableFilters } from '@/store/slices/transactionSlice';
import { useTransactionFilters } from './useTransactionFilters';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';
import TransactionModals from './TransactionModals';
import Pagination from './Pagination';

// Provide a unified transaction management interface
export default function Transactions() {
  const dispatch = useDispatch();
  const { transactions, pagination, availableFilters, isLoading, isMutating } = useSelector((state) => state.transactions);
  const filterState = useTransactionFilters();

  const [addModalOpen, setAddModalOpen]       = useState(false);
  const [editModalOpen, setEditModalOpen]     = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Re-fetch transaction data and filter options
  const refreshData = () => {
    dispatch(fetchTransactions(filterState.getQueryParams()));
    dispatch(fetchAvailableFilters(filterState.getQueryParams()));
  };

  // Open edit or delete modal for a specific record
  const handleEditOpen = (transaction) => { setSelectedTransaction(transaction); setEditModalOpen(true); };
  const handleDeleteOpen = (transaction) => { setSelectedTransaction(transaction); setDeleteModalOpen(true); };

  // Remove a transaction after confirmation
  const handleDeleteConfirm = async () => {
    const result = await dispatch(deleteTransaction(selectedTransaction._id));
    if (deleteTransaction.fulfilled.match(result)) {
      toast.success('Transaction deleted'); setDeleteModalOpen(false); setSelectedTransaction(null); refreshData();
    } else {
      toast.error('Deletion failed');
    }
  };

  return (
    <div className="mx-auto max-w-7xl font-sans">
      {/* Transaction Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"><FiList className="text-brand-500" />Transaction Ledger</h1>
          <p className="mt-2 text-sm text-slate-500">View, search, and manage your financial records.</p>
        </div>
        <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-md"><FiPlus className="text-lg" />Add Transaction</button>
      </div>

      <TransactionFilters {...filterState} availableYears={availableFilters.years} availableMonths={availableFilters.months} availableCategories={availableFilters.categories} availableTypes={availableFilters.types} />

      {/* Transaction Content */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 text-sm text-slate-500">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 text-center"><FiInbox className="text-4xl text-slate-200 mb-3" /><p className="text-sm font-semibold text-slate-600">No transactions found</p><p className="text-xs text-slate-400 mt-1">Adjust filters or search terms.</p></div>
      ) : (
        <>
          <TransactionTable transactions={transactions} onEdit={handleEditOpen} onDelete={handleDeleteOpen} />
          <Pagination currentPage={filterState.currentPage} totalPages={pagination?.totalPages || 0} totalEntries={pagination?.totalTransactions || 0} limitPerPage={filterState.limitPerPage} onPageChange={filterState.setCurrentPage} />
        </>
      )}

      {/* Hidden Operations UI */}
      <TransactionModals addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen} editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} selectedTransaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} isMutating={isMutating} onAddSuccess={() => { setAddModalOpen(false); refreshData(); toast.success('Added record'); }} onEditSuccess={() => { setEditModalOpen(false); setSelectedTransaction(null); refreshData(); toast.success('Updated record'); }} onDeleteConfirm={handleDeleteConfirm} />
    </div>
  );
}