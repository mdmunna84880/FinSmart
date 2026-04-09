import { QUICK_QUESTIONS } from './constants';
import { FiMessageSquare } from 'react-icons/fi';

/** Grid of clickable prompt chips displayed when the chat is empty. */
export default function QuickQuestionPrompts({ onSelect }) {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="flex flex-col items-center justify-center gap-6 px-6 py-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br from-brand-500 to-brand-700 shadow-xl shadow-brand-200">
                        <FiMessageSquare className="text-3xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Ask FinSmart AI</h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                        Choose a suggestion below or type your own question.
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-md">
                    {QUICK_QUESTIONS.map((question) => (
                        <button
                            key={question.id}
                            onClick={() => onSelect(question.text)}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                        >
                            {question.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
