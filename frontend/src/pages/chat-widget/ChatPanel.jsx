import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { setChatPanelOpen, sendMessage, toggleHistory } from '@/store/slices/chatSlice';
import { FiX, FiClock } from 'react-icons/fi';
import ChatSidebar from './ChatSidebar';
import DataInsightBadge from './ChatDataBadge';
import ChatMessages from './ChatMessages';
import QuickQuestionPrompts from './QuickQuestions';
import ChatInputBar from './ChatInputBar';
import { cn } from '@/utils/cn';

/** Main slide-in panel containing the chat interface, conversation history, and history sidebar. */
export default function ChatPanel() {
    const dispatch = useDispatch();
    const { isPanelOpen, messages, activeSessionId, isLoading, isHistoryOpen } = useSelector((state) => state.chat);

    const handleClosePanel = useCallback(() => {
        dispatch(setChatPanelOpen(false));
    }, [dispatch]);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') handleClosePanel();
        };
        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, [handleClosePanel]);

    const handleSendMessage = (messageText) => {
        dispatch(sendMessage({ message: messageText, sessionId: activeSessionId }));
    };

    return (
        <>
            <div
                onClick={handleClosePanel}
                className={cn(
                    'fixed inset-0 z-60 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300',
                    isPanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
                aria-hidden={!isPanelOpen}
            />

            <div
                className={cn(
                    'fixed bottom-0 right-0 top-0 z-70 flex w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-162.5 lg:w-187.5',
                    isPanelOpen ? 'translate-x-0' : 'translate-x-full'
                )}
                role="dialog"
                aria-modal="true"
                aria-label="FinSmart AI Assistant"
            >
                {/* Header */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => dispatch(toggleHistory())}
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-xl transition-all active:scale-95",
                                isHistoryOpen ? "bg-brand-50 text-brand-600 ring-1 ring-brand-100 shadow-sm shadow-brand-50" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                            )}
                            aria-label={isHistoryOpen ? "Hide chat history" : "Show chat history"}
                        >
                            <FiClock className="text-lg" />
                        </button>

                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-700 shadow-lg shadow-brand-100 ring-4 ring-brand-50">
                            <span className="text-xs font-black text-white">AI</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 leading-none">FinSmart AI Assistant</span>
                            <span className="mt-1 text-[10px] uppercase font-black tracking-widest text-brand-500">Online</span>
                        </div>
                    </div>
                    <button
                        onClick={handleClosePanel}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50/50 text-slate-400 ring-1 ring-slate-100 transition-all duration-300 hover:bg-white hover:text-slate-900 hover:shadow-xl hover:shadow-slate-200/50 hover:ring-slate-200 active:scale-90"
                        aria-label="Close chat panel"
                    >
                        <FiX className="text-xl transition-transform duration-500 group-hover:rotate-90" />
                    </button>
                </div>

                {/* Main content area */}
                <div className="flex flex-1 overflow-hidden">
                    {isHistoryOpen && (
                        <div className="hidden sm:flex animate-in slide-in-from-left duration-300 border-r border-slate-100">
                            <ChatSidebar />
                        </div>
                    )}

                    <div className="flex flex-1 flex-col overflow-hidden bg-white">
                        <DataInsightBadge />

                        <div className="flex flex-1 flex-col overflow-hidden">
                            {messages.length === 0 && !isLoading ? (
                                <QuickQuestionPrompts onSelect={handleSendMessage} />
                            ) : (
                                <ChatMessages messages={messages} isLoading={isLoading} />
                            )}
                        </div>

                        <ChatInputBar onSend={handleSendMessage} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </>
    );
}
