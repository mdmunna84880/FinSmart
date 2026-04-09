import { useDispatch } from 'react-redux';
import { setChatPanelOpen } from '@/store/slices/chatSlice';
import { FiZap, FiArrowRight } from 'react-icons/fi';

// Dashboard shortcut to trigger AI chat
export default function GeminiInsightCard() {
  const dispatch = useDispatch();

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-2xl transition-all hover:shadow-brand-500/20">
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl transition-all group-hover:bg-brand-500/30" />
      
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500 to-indigo-600 shadow-xl">
            <FiZap className="text-xl" />
          </div>
          <h3 className="mb-2 text-xl font-bold tracking-tight">Financial Insights</h3>
          <p className="max-w-50 text-sm leading-relaxed text-slate-400">
            Let Gemini analyze your 12-month data to find hidden saving opportunities.
          </p>
        </div>

        <button
          onClick={() => dispatch(setChatPanelOpen(true))}
          className="mt-8 flex items-center gap-2 font-semibold text-brand-400 transition-all hover:gap-3 hover:text-brand-300"
        >
          <span>Ask Gemini</span>
          <FiArrowRight className="text-lg" />
        </button>
      </div>

      {/* Decorative Brand Tag */}
      <div className="absolute right-6 top-6 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        AI Beta
      </div>
    </div>
  );
}
