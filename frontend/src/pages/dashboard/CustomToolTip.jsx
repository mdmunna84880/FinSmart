import { formateToUS } from "@/utils/currencyFormater";

// Tooltip component to show detailed info on hover
export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
        <p className="mb-3 font-bold text-slate-900 border-b border-slate-100 pb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6 text-sm mb-1.5 last:mb-0"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-500 capitalize">{entry.name}</span>
            </div>
            <span className="font-semibold text-slate-900">
              {formateToUS(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};