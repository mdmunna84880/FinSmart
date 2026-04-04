import { FiDollarSign, FiTag, FiCalendar, FiType } from 'react-icons/fi';

// Wrap form fields with diagnostic labels and icons
// eslint-disable-next-line no-unused-vars
export const FormField = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
      <Icon className="text-sm" /> {label}
    </label>
    {children}
    {error && <span className="text-[10px] font-medium text-rose-500 uppercase tracking-tighter">{error}</span>}
  </div>
);

// Styled select input wrapper for consistent form design
// Supports both controlled usage and react-hook-form's register pattern
export const FormSelect = ({ options, error, className, ...props }) => (
  <select
    className={`block w-full rounded-xl border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ${error ? 'ring-rose-500 focus:ring-rose-500' : 'ring-slate-200 focus:ring-brand-500'} sm:text-sm outline-none transition-all ${className || ''}`}
    {...props}
  >
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);
