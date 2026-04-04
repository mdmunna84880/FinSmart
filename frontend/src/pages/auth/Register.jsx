import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { joiResolver } from '@hookform/resolvers/joi';
import { registerUser } from '@/store/slices/authSlice';
import { registerSchema } from '@/utils/AuthValidation';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    }));
    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.payload?.message || 'Failed to create account');
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-100">
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900 mb-8">
          Create your account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            type="text"
            leftIcon={FiUser}
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email address"
            type="email"
            leftIcon={FiMail}
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            leftIcon={FiLock}
            placeholder="abcde@1947"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            leftIcon={FiLock}
            placeholder="abcde@1947"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            isLoading={isLoading}
            disabled={!isValid}
            rightIcon={FiArrowRight}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-500">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
