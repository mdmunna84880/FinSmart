import { FiBriefcase, FiCreditCard } from 'react-icons/fi';

export default function FinancialInfo({ user }) {
  if (!user) return null;

  // Mask the middle 4 digits of the PAN card
  const maskPan = (pan) => {
    if (!pan || pan.length !== 10) return "......";
    return `${pan.slice(0, 5)}....${pan.slice(9)}`;
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">Financial Details</h2>
      <p className="mt-1 text-sm text-slate-500">Your verified KYC and banking information.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:border-slate-200">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <FiCreditCard size={18} className="text-slate-400" />
            PAN Number
          </div>
          <p className="text-lg font-bold tracking-widest text-slate-900">
            {maskPan(user.panNumber)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:border-slate-200">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <FiBriefcase size={18} className="text-slate-400" />
            Primary Bank Account
          </div>
          <div>
            <p className="font-bold text-slate-900">{user.linkedBank?.bankName}</p>
            <p className="mt-1 text-sm text-slate-600">
              {user.linkedBank?.accountType} <span className="text-slate-400 tracking-widest">....</span> {user.linkedBank?.accountNumberLast4}
            </p>
            <p className="mt-1 text-xs text-slate-400">IFSC: {user.linkedBank?.ifscCode}</p>
          </div>
        </div>

      </div>
    </div>
  );
}