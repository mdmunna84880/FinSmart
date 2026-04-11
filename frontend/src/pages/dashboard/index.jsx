import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

import { fetchBudgetSummary } from '@/store/slices/budgetSlice';
import { fetchTransactions } from '@/store/slices/transactionSlice';
import { computeCashFlow } from '@/utils/chartUtils';

import SummaryCard from './SummaryCard';
import BudgetProgress from './BudgetProgress';
import RecentTransactions from './RecentTransactions';
import CashFlowChart from './CashFlowChart';
import GeminiInsightCard from './GeminiInsightCard';

/** Dashboard displaying financial overview with income, expenses, savings, and budget progress. */
export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { summary } = useSelector((state) => state.budget);
  const { transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchBudgetSummary());
    dispatch(fetchTransactions({ months: 6 }));
  }, [dispatch]);

  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpense = summary?.totalExpense ?? 0;
  const netSavings = summary?.netSavings ?? 0;
  const monthlyBudget = summary?.monthlyBudget ?? 0;
  const savingsTrendType = netSavings >= 0 ? 'positive' : 'negative';

  const cashFlowData = useMemo(() => computeCashFlow(transactions), [transactions]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 font-sans">

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here is your financial overview for this month.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <SummaryCard title="Net Savings" amount={netSavings} icon={FiDollarSign} trendType={savingsTrendType} />
        <SummaryCard title="Total Income" amount={totalIncome} icon={FiTrendingUp} trendType="positive" />
        <SummaryCard title="Total Expenses" amount={totalExpense} icon={FiTrendingDown} trendType="negative" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2 space-y-8">
          <CashFlowChart data={cashFlowData} />
          <RecentTransactions transactions={transactions} />
        </div>

        <div className="space-y-8 lg:col-span-1">
          <BudgetProgress totalExpense={totalExpense} monthlyBudget={monthlyBudget} />

          <GeminiInsightCard />
        </div>

      </div>
    </div>
  );
}