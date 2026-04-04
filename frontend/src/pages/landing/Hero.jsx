import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi';

// Main value proposition and conditional call-to-action
export default function Hero() {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 h-[calc(100dvh-1rem)] lg:h-[calc(100dvh-1.5rem)]">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-100"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
            </span>
            FinSmart 2.0 is now live
          </span>
          
          <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
            Financial freedom, <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-brand-500 to-emerald-400 bg-clip-text text-transparent">beautifully simplified.</span>
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Track every transaction with cascading filters, set smart monthly budgets, and visualize your financial growth with the ultimate smart ledger.
          </p>
          
          {/* Dynamic Action Button based on Authentication State */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              to={user ? "/dashboard" : "/register"} 
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30 sm:w-auto"
            >
              {user ? "Go to Dashboard" : "Start Your Ledger Free"}
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-sm text-slate-500 sm:ml-4">
              Takes 2 minutes. No credit card required.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}