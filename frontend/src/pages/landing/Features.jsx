import { FiPieChart, FiTrendingUp, FiShield, FiCheckCircle } from 'react-icons/fi';

// Highlight core platform capabilities for potential users
export default function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Features Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to master your money</h2>
          <p className="mt-4 text-lg text-slate-600">Powerful tools designed to give you absolute clarity and control over your financial history.</p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          
          {/* Smart Transaction Ledger */}
          <div className="flex flex-col justify-between rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200 transition-shadow hover:shadow-md">
            <div>
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"><FiShield className="text-2xl" /></div>
              <h3 className="text-xl font-bold text-slate-900">Advanced Smart Ledger</h3>
              <p className="mt-4 text-slate-600">Track every penny with cascading filters and real-time backend search across your entire transaction history.</p>
            </div>
          </div>

          {/* Precision Budgeting Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-xl lg:col-span-2">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow-inner"><FiTrendingUp className="text-2xl" /></div>
              <h3 className="text-2xl font-bold text-white">Precision Budgeting</h3>
              <p className="mt-4 max-w-md text-slate-300">Set monthly ceilings for each category. Get intelligent alerts as you approach limits with clear colorndcoded visual tracking.</p>
              
              <ul className="mt-8 space-y-3">
                {['Dynamic category ceilings', 'Real-time threshold alerts', 'Automatic overflow tracking'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                    <FiCheckCircle className="text-brand-400" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Analytics Section */}
          <div className="flex flex-col justify-between rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200 transition-shadow hover:shadow-md lg:col-span-3">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600"><FiPieChart className="text-2xl" /></div>
                <h3 className="text-2xl font-bold text-slate-900">Interactive Visual Analytics</h3>
                <p className="mt-4 text-slate-600">Visualize your monthly distribution with beautiful donut charts and track your 6-month cash flow trends with professional line visualizations.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}