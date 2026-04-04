import { FiAlertTriangle } from 'react-icons/fi';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import TransactionForm from './TransactionForm';

// Orchestrate Add, Edit, and Delete modal displays
export default function TransactionModals({
  addModalOpen, setAddModalOpen,
  editModalOpen, setEditModalOpen,
  deleteModalOpen, setDeleteModalOpen,
  selectedTransaction, setSelectedTransaction,
  isMutating,
  onAddSuccess,
  onEditSuccess,
  onDeleteConfirm,
}) {
  return (
    <>
      {/* Create New Record Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Transaction">
        <TransactionForm onSuccess={onAddSuccess} />
      </Modal>

      {/* Modify Existing Record Modal */}
      <Modal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); setSelectedTransaction(null); }} title="Edit Transaction">
        <TransactionForm transaction={selectedTransaction} onSuccess={onEditSuccess} />
      </Modal>

      {/* Delete Record Confirmation */}
      <Modal isOpen={deleteModalOpen} onClose={() => { setDeleteModalOpen(false); setSelectedTransaction(null); }} title="Delete Transaction">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
            <FiAlertTriangle className="text-2xl text-rose-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Are you sure?</p>
            <p className="mt-1 text-sm text-slate-500">
              Permanently delete "{selectedTransaction?.desc || 'transaction'}". Action cannot be undone.
            </p>
          </div>
          <div className="mt-2 flex w-full gap-3">
            <button onClick={() => { setDeleteModalOpen(false); setSelectedTransaction(null); }} className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
            <Button variant="danger" className="flex-1" isLoading={isMutating} onClick={onDeleteConfirm}>Delete</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
