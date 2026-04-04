import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { loginUser } from '@/store/slices/authSlice';
import { loginSchema } from '@/utils/AuthValidation';
import { joiResolver } from '@hookform/resolvers/joi';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error(result.payload?.message || 'Failed to authenticate');
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-100">
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900 mb-8">
          Sign in to your dashboard
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
            disabled={!isValid}
            rightIcon={FiArrowRight}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-500">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
