import { FiCheckCircle, FiMail } from 'react-icons/fi';

const getInitials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');

export default function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">

        <div className="mx-auto h-24 w-24 shrink-0 sm:mx-0 flex items-center justify-center rounded-full bg-brand-100 ring-4 ring-brand-50">
          <span className="text-3xl font-bold text-brand-600">{getInitials(user.name)}</span>
        </div>

        <div className="flex-1 space-y-4 text-center sm:text-left">
          <div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <FiCheckCircle size={14} /> Verified Account
              </span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-slate-500 sm:justify-start">
              <FiMail className="text-slate-400" />
              <p>{user.email}</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
            FinSmart Premium Member
          </div>
        </div>

      </div>
    </div>
  );
}
