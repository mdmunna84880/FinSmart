import { cn } from '@/utils/cn';
import { useId } from 'react';

const Input = ({
  label,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  id,
  type = 'text',
  ref,
  ...props
}) => {
  // Generate a random ID if none provided
  const inputId = id || useId();

  return (
    <div className="flex w-full flex-col space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <LeftIcon className="text-lg" />
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            error 
              ? "border-rose-500 focus-visible:ring-rose-500/20" 
              : "border-slate-300 focus-visible:border-brand-500 focus-visible:ring-brand-500/20",
            LeftIcon ? "pl-10" : "",
            RightIcon ? "pr-10" : "",
            className
          )}
          {...props}
        />

        {RightIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
            <RightIcon className="text-lg" />
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={cn("text-xs font-medium", error ? "text-rose-500" : "text-slate-500")}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
