import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';
import { CustomTooltip } from './CustomToolTip';

const formatYAxis = (value) => {
  if (value >= 1000) return `$${value / 1000}k`;
  return `$${value}`;
};

export default function CashFlowChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
        <FiBarChart2 className="text-4xl text-slate-200" />
        <p className="mt-3 text-sm font-semibold text-slate-500">No cash flow data yet</p>
        <p className="mt-1 text-xs text-slate-400">Add transactions to see your 6-month trend.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Cash Flow</h2>
        <p className="text-sm text-slate-500">Income vs Expenses (Last 6 Months)</p>
      </div>

      <div className="h-72 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Legend
              iconType="circle"
              wrapperStyle={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#64748b',
                paddingTop: '20px',
              }}
            />
            <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expenses" name="Expenses" fill="#1e293b" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
