import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { toast } from 'react-toastify';
import { FiDollarSign, FiTag, FiCalendar, FiType, FiAlignLeft, FiArrowRight } from 'react-icons/fi';
import { addTransaction, updateTransaction } from '@/store/slices/transactionSlice';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { transactionSchema } from '@/utils/TransactionValidation';
import { FormField, FormSelect } from './FormComponents';

// Predefined available categories and types
const CATEGORIES = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Shopping', 'Utilities', 'Salary', 'Investment', 'Other'];
const TYPES = ['Expense', 'Income'];

// Manage transaction entry and modification form state
export default function TransactionForm({ transaction, onSuccess }) {
  const dispatch = useDispatch();
  const { isMutating } = useSelector((state) => state.transactions);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(transactionSchema),
    defaultValues: {
      amount: '',
      type: 'Expense',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      desc: ''
    }
  });

  // Populate form with existing data when editing
  useEffect(() => {
    if (transaction) {
      reset({
        amount: String(transaction.amount),
        type: transaction.type,
        category: transaction.category,
        date: new Date(transaction.date).toISOString().split('T')[0],
        desc: transaction.desc
      });
    }
  }, [transaction, reset]);

  // Submit transaction data to the server
  const onSubmit = async (data) => {
    const payload = {
      amount: Number(data.amount),
      type: data.type,
      category: data.category,
      date: data.date,
      desc: data.desc,
    };

    const action = transaction
      ? updateTransaction({ id: transaction._id, data: payload })
      : addTransaction(payload);

    const result = await dispatch(action);

    if (addTransaction.fulfilled.match(result) || updateTransaction.fulfilled.match(result)) {
      onSuccess();
    } else {
      const errorMsg = result.payload?.message || (transaction ? 'Update failed' : 'Failed to add transaction');
      toast.error(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
      {/* Primary Financial Fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Amount" icon={FiDollarSign} error={errors.amount?.message}>
          <Input
            type="number"
            placeholder="0.00"
            error={errors.amount?.message}
            {...register('amount')}
          />
        </FormField>
        <FormField label="Date" icon={FiCalendar} error={errors.date?.message}>
          <Input
            type="date"
            error={errors.date?.message}
            {...register('date')}
          />
        </FormField>
      </div>

      {/* Categorization Fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Type" icon={FiType} error={errors.type?.message}>
          <FormSelect
            options={TYPES}
            error={errors.type?.message}
            {...register('type')}
          />
        </FormField>
        <FormField label="Category" icon={FiTag} error={errors.category?.message}>
          <FormSelect
            options={CATEGORIES}
            error={errors.category?.message}
            {...register('category')}
          />
        </FormField>
      </div>

      {/* Narrative Description Field */}
      <FormField label="Description" icon={FiAlignLeft} error={errors.desc?.message}>
        <Input
          type="text"
          placeholder="e.g., Grocery shopping"
          error={errors.desc?.message}
          {...register('desc')}
        />
      </FormField>

      {/* Form Submission Control */}
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="flex-1 py-3"
          isLoading={isMutating}
          disabled={!isValid}
          rightIcon={FiArrowRight}
        >
          {transaction ? 'Update Record' : 'Save Transaction'}
        </Button>
      </div>
    </form>
  );
}
