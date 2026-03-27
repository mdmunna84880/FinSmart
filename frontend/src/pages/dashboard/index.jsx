import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown 
} from 'react-icons/fi';

import { 
  authenticatedUserProfile, 
  userMonthlyFinancialSummary, 
  financialTransactionsHistory, 
  sixMonthCashFlow
} from '@/data/mockData';

import SummaryCard from './SummaryCard';
import BudgetProgress from './BudgetProgress';
import RecentTransactions from './RecentTransactions';
import CashFlowChart from './CashFlowChart';

export default function Dashboard() {
  // Destructuring the user financial summary
  const { 
    totalMonthlyIncome, 
    totalMonthlyExpenses, 
    calculatedNetSavings, 
    allocatedMonthlyBudget 
  } = userMonthlyFinancialSummary;

  // Calculate 
  const savingsTrend = calculatedNetSavings > 0 ? "+12.5%" : "-2.4%";
  const savingsTrendType = calculatedNetSavings > 0 ? "positive" : "negative";

  return (
    <div className="mx-auto max-w-7xl space-y-8 font-sans">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {authenticatedUserProfile.userFullName.split(' ')[0]}!
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here is your financial overview for this month.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <SummaryCard 
          title="Net Savings" 
          amount={calculatedNetSavings} 
          icon={FiDollarSign}
          trend={savingsTrend}
          trendType={savingsTrendType}
        />
        <SummaryCard 
          title="Total Income" 
          amount={totalMonthlyIncome} 
          icon={FiTrendingUp}
          trend="+4.2%"
          trendType="positive"
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={totalMonthlyExpenses} 
          icon={FiTrendingDown}
          trend="+8.1%"
          trendType="negative"
        />
      </div>

      {/* Detailed Widgets */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Transactions (Charts and Recent Transactions) */}
        <div className="lg:col-span-2 space-y-8">
          <CashFlowChart data={sixMonthCashFlow} />
          <RecentTransactions transactions={financialTransactionsHistory} />
        </div>

        {/* Budget & Secondary Info */}
        <div className="space-y-8 lg:col-span-1">
          <BudgetProgress 
            totalExpense={totalMonthlyExpenses} 
            monthlyBudget={allocatedMonthlyBudget} 
          />
          
          {/* Mini-Promo Card */}
          <div className="rounded-3xl bg-brand-900 p-6 text-white shadow-lg relative overflow-hidden">
             <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand-500/30 blur-2xl"></div>
             <div className="relative z-10">
               <h3 className="text-lg font-bold">Try Smart Insights</h3>
               <p className="mt-2 text-sm text-brand-100 mb-4">
                 Ask our AI to analyze your spending habits and find hidden savings.
               </p>
               <button className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-900 transition hover:bg-slate-100 w-full">
                 Ask Gemini
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}