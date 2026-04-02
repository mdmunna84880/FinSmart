import { cn } from '@/utils/cn';
import { FiLoader } from 'react-icons/fi';

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none rounded-lg';
  
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300',
    outline: 'border-2 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-50',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus-visible:outline-rose-600',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ghostDanger: 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-13 px-8 text-lg'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && (
        <FiLoader className={cn('animate-spin shrink-0', children ? 'mr-2' : '')} />
      )}
      {!isLoading && LeftIcon && (
        <LeftIcon className={cn('shrink-0', children ? 'mr-2 text-lg' : 'text-xl')} />
      )}
      
      {children}
      
      {!isLoading && RightIcon && (
        <RightIcon className={cn('shrink-0', children ? 'ml-2 text-lg' : 'text-xl')} />
      )}
    </button>
  );
}
