import { Link } from 'react-router';
import { FiPieChart, FiTrendingUp, FiShield, FiCheckCircle } from 'react-icons/fi';

export default function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to master your money
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Powerful tools designed to give you absolute clarity and control over your financial future.
          </p>
        </div>
        
        {/* The Box*/}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {/* Expense Tracking*/}
          <div className="flex flex-col justify-between rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200 transition-shadow hover:shadow-md">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiPieChart className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Zero-Effort Tracking</h3>
              <p className="mt-4 text-slate-600">
                Auto-categorize every transaction. See exactly where your money goes each month with beautiful, interactive visualizations.
              </p>
            </div>
          </div>

          {/*Budget Goals*/}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-xl lg:col-span-2">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow-inner">
                <FiTrendingUp className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-white">Dynamic Budget Goals</h3>
              <p className="mt-4 max-w-md text-slate-300">
                Set limits for specific categories. We'll alert you before you overspend and celebrate with you when you hit your savings milestones.
              </p>
              
              {/* features list*/}
              <ul className="mt-8 space-y-3">
                {['Custom category limits', 'Real-time spending alerts', 'Rollover unused budgets'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-brand-400" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Smart Insights */}
          <div className="flex flex-col justify-between rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200 transition-shadow hover:shadow-md lg:col-span-3">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <FiShield className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">AI-Powered Financial Analyst</h3>
                <p className="mt-4 text-slate-600">
                  Chat directly with your financial data. Ask Gemini to analyze your subscriptions, find ways to cut costs, or compare this month's spending to last year.
                </p>
              </div>
              <div className="shrink-0">
                 <Link 
                   to="#" 
                   className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
                 >
                    Try Smart Insights
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}