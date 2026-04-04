import { useState, useMemo } from 'react';
import { formateToUS } from '@/utils/currencyFormater';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function CategorySpendingChart({ data = [], totalSpend = 0 }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Modern Recharts Pattern:
  const pieData = useMemo(() => {
    return data.map(item => ({
      ...item,
      fill: item.color 
    }));
  }, [data]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  // Calculate the label and center value based on hover state
  const centerLabel = activeIndex >= 0 ? pieData[activeIndex].name : 'Total Spend';
  const centerValue = activeIndex >= 0 ? pieData[activeIndex].value : totalSpend;

  if (!data || data.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-500">No spending data available.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      
      <div className="mb-2">
        <h2 className="text-lg font-bold text-slate-900">Spending by Category</h2>
        <p className="text-sm text-slate-500">Where your money went this month</p>
      </div>
      
      <div className="relative flex-1 w-full min-h-75">
        
        {/* Center Text */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-10">
          <span className="text-sm font-bold text-slate-900 transition-all duration-300">
            {centerLabel}
          </span>
          <span className="text-sm font-medium text-slate-500 transition-all duration-300">
            {formateToUS(centerValue)}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%" 
              cy="50%" 
              innerRadius={80} 
              outerRadius={110} 
              dataKey="value"
              stroke="none"
              activeIndex={activeIndex}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              className="outline-none"
            />
            <Tooltip 
              formatter={(value) => formateToUS(value)}
              contentStyle={{ 
                borderRadius: '0.75rem', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                fontWeight: 600,
                color: '#0f172a'
              }}
              itemStyle={{ color: '#0f172a' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}