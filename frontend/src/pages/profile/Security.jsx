import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiShield, FiLock, FiArrowRight } from 'react-icons/fi';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { securitySchema } from '@/utils/SecurityValidation';
import { changePassword, resetSecurityStatus } from '@/store/slices/securitySlice';

export default function Security() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.security);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data) => {
    const result = await dispatch(changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    }));

    if (changePassword.fulfilled.match(result)) {
      toast.success('Password changed successfully!');
      reset();
      dispatch(resetSecurityStatus());
    } else {
      toast.error(result.payload?.message || 'Failed to change password.');
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200">
          <FiShield size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Security</h2>
          <p className="text-sm text-slate-500">Update your account password.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Current Password"
          type="password"
          leftIcon={FiLock}
          placeholder="Enter current password"
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />

        <Input
          label="New Password"
          type="password"
          leftIcon={FiLock}
          placeholder="abcde@1947"
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <Input
          label="Confirm New Password"
          type="password"
          leftIcon={FiLock}
          placeholder="abcde@1947"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          variant="primary"
          className="mt-4"
          isLoading={isLoading}
          disabled={!isValid}
          rightIcon={FiArrowRight}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}
