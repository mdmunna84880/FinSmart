import { FiZap } from 'react-icons/fi';
import { DATA_WINDOW_LABEL } from './constants';

/** Informational badge indicating that AI responses are powered by the user's financial data. */
export default function DataInsightBadge() {
    return (
        <div className="mx-3 mt-3 flex items-start gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 animate-in fade-in slide-in-from-top-1 duration-300">
            <FiZap className="mt-0.5 shrink-0 text-brand-600 text-sm" />
            <p className="text-[11px] leading-relaxed text-brand-800">
                <span className="font-semibold">Insights:</span> {DATA_WINDOW_LABEL}. Including transactions, budgets, and trends.
            </p>
        </div>
    );
}
