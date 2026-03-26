import { FiLock } from 'react-icons/fi';

export default function Security() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 ring-8 ring-white">
          <FiLock className="text-3xl text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Bank-level security standards</h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl">
          Your data is encrypted using AES-256. We use read-only access for your transactions, ensuring your money cannot be moved, and we never sell your personal information.
        </p>
      </div>
    </section>
  );
}