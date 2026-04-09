import { useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';

/** Auto-resizing textarea with a send button supporting Enter to send and Shift+Enter for newlines. */
export default function ChatInputBar({ onSend, isLoading }) {
    const [messageText, setMessageText] = useState('');
    const textareaRef = useRef(null);

    const handleSendMessage = () => {
        const trimmedMessage = messageText.trim();
        if (!trimmedMessage || isLoading) return;

        onSend(trimmedMessage);
        setMessageText('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    };

    const handleTextAreaInput = (event) => {
        setMessageText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${Math.min(event.target.scrollHeight, 120)}px`;
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="shrink-0 border-t border-slate-100 bg-white px-4 pt-4 pb-4 sm:pb-5">
            <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-50/20 transition-all duration-200">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={messageText}
                    onChange={handleTextAreaInput}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Message FinSmart AI..."
                    className="flex-1 resize-none bg-transparent py-1.5 text-sm text-slate-900 placeholder-slate-400 outline-none disabled:opacity-40"
                    style={{ maxHeight: '120px' }}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim() || isLoading}
                    className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-100 transition-all hover:bg-brand-800 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send message"
                >
                    <FiSend className="text-base" />
                </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-400 leading-none">
                AI may generate inaccurate information. Double-check important figures.
            </p>
        </div>
    );
}
