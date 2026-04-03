import { Link } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 h-[calc(100dvh-1rem)] lg:h-[calc(100dvh-1.5rem)]">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-100"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
            </span>
            FinSmart AI is now in Beta
          </span>
          
          {/* Headline */}
          <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
            Wealth management, <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-brand-500 to-emerald-400 bg-clip-text text-transparent">
              beautifully simplified.
            </span>
          </h1>
          
          {/* Sub-headline */}
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Connect your accounts, track your net worth, and get AI-driven insights to grow your wealth. The financial operating system for the modern earner.
          </p>
          
          {/* Calls to Action */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              to="/register" 
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30 sm:w-auto"
            >
              Open Free Account
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