import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { FiDollarSign, FiTarget, FiPlus, FiTrash2, FiTag } from 'react-icons/fi';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { setBudget, fetchBudgetSummary } from '@/store/slices/budgetSlice';
import { cn } from '@/utils/cn';

const CATEGORIES = [
  'Housing', 'Food', 'Transportation', 'Entertainment',
  'Shopping', 'Utilities', 'Salary', 'Investment', 'Other',
];

const schema = Joi.object({
  monthlyBudget: Joi.number().positive().required().messages({
    'number.base': 'Monthly budget must be a number',
    'number.positive': 'Monthly budget must be greater than 0',
    'any.required': 'Monthly budget is required',
  }),
  savingsTarget: Joi.number().positive().optional().allow('', null),
  categoryLimits: Joi.array().items(
    Joi.object({
      category: Joi.string().required(),
      limit: Joi.number().positive().required().messages({
        'number.positive': 'Limit must be greater than 0',
      }),
    })
  ).optional(),
});

export default function BudgetForm({ onSuccess, currentSummary }) {
  const dispatch = useDispatch();
  const { isMutating } = useSelector((state) => state.budget);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      monthlyBudget: currentSummary?.monthlyBudget || '',
      savingsTarget: currentSummary?.savingsTarget || '',
      categoryLimits: currentSummary?.categoryBudgets?.map((b) => ({
        category: b.category,
        limit: b.limit,
      })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'categoryLimits' });

  const onSubmit = async (data) => {
    const payload = {
      year: currentYear,
      month: currentMonth,
      monthlyBudget: Number(data.monthlyBudget),
      savingsTarget: data.savingsTarget ? Number(data.savingsTarget) : undefined,
      categoryLimits: data.categoryLimits?.map((c) => ({
        category: c.category,
        limit: Number(c.limit),
      })) || [],
    };

    const result = await dispatch(setBudget(payload));
    if (setBudget.fulfilled.match(result)) {
      await dispatch(fetchBudgetSummary());
      onSuccess?.();
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

      <Input
        label="Monthly Budget Ceiling"
        type="number"
        step="0.01"
        min="0"
        leftIcon={FiDollarSign}
        placeholder="e.g. 5000"
        error={errors.monthlyBudget?.message}
        {...register('monthlyBudget')}
      />

      <Input
        label="Savings Target (optional)"
        type="number"
        step="0.01"
        min="0"
        leftIcon={FiTarget}
        placeholder="e.g. 1000"
        error={errors.savingsTarget?.message}
        {...register('savingsTarget')}
      />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">Category Limits (optional)</p>
          <button
            type="button"
            onClick={() => append({ category: '', limit: '' })}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50 transition-colors"
          >
            <FiPlus />
            Add Category
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <FiTag className="text-base" />
                </div>
                <select
                  className={cn(
                    'flex h-11 w-full appearance-none rounded-lg border bg-white pl-9 pr-3 py-2 text-sm text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2',
                    errors.categoryLimits?.[index]?.category
                      ? 'border-rose-400 focus-visible:ring-rose-500/20'
                      : 'border-slate-300 focus-visible:border-brand-500 focus-visible:ring-brand-500/20'
                  )}
                  {...register(`categoryLimits.${index}.category`)}
                >
                  <option value="">Category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="w-32">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  leftIcon={FiDollarSign}
                  placeholder="Limit"
                  error={errors.categoryLimits?.[index]?.limit?.message}
                  {...register(`categoryLimits.${index}.limit`)}
                />
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-0.5 rounded-lg p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
              >
                <FiTrash2 className="text-base" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isLoading={isMutating}
        disabled={!isValid}
      >
        Save Budget
      </Button>
    </form>
  );
}
