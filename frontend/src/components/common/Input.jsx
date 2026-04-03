import { cn } from '@/utils/cn';
import { useId, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField ? (isPasswordVisible ? 'text' : 'password') : type;

  // Adjust input padding based on the presence of right-aligned elements
  const hasRightElement = RightIcon || isPasswordField;

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
          type={inputType}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            error 
              ? "border-rose-500 focus-visible:ring-rose-500/20" 
              : "border-slate-300 focus-visible:border-brand-500 focus-visible:ring-brand-500/20",
            LeftIcon && "pl-10",
            hasRightElement && "pr-10",
            className
          )}
          {...props}
        />

        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700 focus:outline-none"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
          </button>
        ) : RightIcon ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
            <RightIcon className="text-lg" />
          </div>
        ) : null}
      </div>

      {(error || helperText) && (
        <p className={cn("text-xs font-medium mt-1", error ? "text-rose-500" : "text-slate-500")}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
