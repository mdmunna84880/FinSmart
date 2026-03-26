import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RechartsDevtools } from '@recharts/devtools';
import { CustomTooltip } from "./CustomToolTip";

export default function CashFlowChart({ data = [] }) {
  // Converts 4000 to "$4k"
  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000) {
      return `$${tickItem / 1000}k`;
    }
    return `$${tickItem}`;
  };

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      {/* Chart Heading*/}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Cash Flow</h2>
        <p className="text-sm text-slate-500">
          Income vs Expenses (Last 6 Months)
        </p>
      </div>

      {/* Chart */}
      <div className="h-72 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barGap={8}
          >
            {/* Subtle horizontal grid lines  */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              tickFormatter={formatYAxis}
            />

            {/* Using custom tooltip in the built in tooltip*/}
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />

            <Legend
              iconType="circle"
              wrapperStyle={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#64748b",
                paddingTop: "20px",
              }}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#1e293b"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
          <RechartsDevtools />
        </ResponsiveContainer>
      </div>
    </div>
  );
}
