import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2, FiMessageSquare } from 'react-icons/fi';
import { fetchSessions, fetchSessionDetails, deleteSession, startNewChat } from '@/store/slices/chatSlice';
import { cn } from '@/utils/cn';

/** Sidebar panel for browsing and managing past chat sessions. */
export default function ChatSidebar() {
    const dispatch = useDispatch();
    const { sessions, activeSessionId, isHistoryLoading } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(fetchSessions());
    }, [dispatch]);

    const handleSelectSession = (sessionId) => {
        if (sessionId !== activeSessionId) dispatch(fetchSessionDetails(sessionId));
    };

    const handleDeleteSession = (event, sessionId) => {
        event.stopPropagation();
        dispatch(deleteSession(sessionId));
    };

    return (
        <div className="flex h-full w-56 shrink-0 flex-col bg-slate-50/50">
            <div className="p-4">
                <button
                    onClick={() => dispatch(startNewChat())}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-brand-100 transition-all hover:bg-brand-700 active:scale-95"
                    aria-label="Start a new chat conversation"
                >
                    <FiPlus className="text-lg" />
                    New Chat
                </button>
            </div>

            <p className="px-4 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                History
            </p>

            <div className="flex-1 overflow-y-auto space-y-1 px-2 pb-4">
                {isHistoryLoading && (
                    <div className="py-8 text-center"><span className="text-xs text-slate-400 animate-pulse">Loading...</span></div>
                )}
                {!isHistoryLoading && sessions.length === 0 && (
                    <div className="py-8 text-center"><span className="text-[10px] text-slate-400">No history found</span></div>
                )}
                {sessions.map((session) => (
                    <button
                        key={session._id}
                        onClick={() => handleSelectSession(session._id)}
                        className={cn(
                            'group flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition-all duration-200',
                            activeSessionId === session._id
                                ? 'bg-brand-100 text-brand-800 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                        )}
                    >
                        <div className="flex min-w-0 items-start gap-2">
                            <FiMessageSquare className={cn("mt-0.5 shrink-0 text-xs", activeSessionId === session._id ? "text-brand-600" : "text-slate-400")} />
                            <div className="min-w-0">
                                <p className="truncate text-xs font-bold leading-tight">{session.title}</p>
                                <p className="mt-0.5 text-[9px] text-slate-400">{new Date(session.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                            </div>
                        </div>
                        <button
                            onClick={(event) => handleDeleteSession(event, session._id)}
                            className="mt-0.5 shrink-0 rounded-lg p-1 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                            aria-label="Delete chat session"
                        >
                            <FiTrash2 className="text-xs" />
                        </button>
                    </button>
                ))}
            </div>
        </div>
    );
}
