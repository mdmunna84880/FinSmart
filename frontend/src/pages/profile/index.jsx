import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchBudgetSummary } from '@/store/slices/budgetSlice';
import Modal from '@/components/common/Modal';
import ProfileHeader from './ProfileHeader';
import BudgetConfig from './BudgetConfig';
import BudgetForm from './BudgetForm';
import Security from './Security';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { summary } = useSelector((state) => state.budget);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBudgetSummary());
  }, [dispatch]);

  const handleBudgetSuccess = () => {
    setIsBudgetModalOpen(false);
    toast.success('Budget updated successfully!');
  };

  return (
    <div className="mx-auto max-w-4xl pb-12 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Profile Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your account details, monthly budget, and security settings.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <ProfileHeader user={user} />
        <BudgetConfig
          summary={summary}
          onConfigureClick={() => setIsBudgetModalOpen(true)}
        />
        <Security />
      </div>

      <Modal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        title="Configure Monthly Budget"
      >
        <BudgetForm currentSummary={summary} onSuccess={handleBudgetSuccess} />
      </Modal>
    </div>
  );
}