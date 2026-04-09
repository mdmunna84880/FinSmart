import { useDispatch, useSelector } from 'react-redux';
import { FiMessageCircle } from 'react-icons/fi';
import { toggleChatPanel } from '@/store/slices/chatSlice';
import ChatPanel from './ChatPanel';

/** Floating action button that toggles the AI chat panel with a pulse animation when idle. */
export default function ChatWidget() {
    const dispatch = useDispatch();
    const { isPanelOpen } = useSelector((state) => state.chat);

    const handleOpenChat = () => dispatch(toggleChatPanel());

    return (
        <>
            {!isPanelOpen && (
                <button
                    onClick={handleOpenChat}
                    className="fixed bottom-6 right-6 z-80 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-brand-600 to-brand-700 shadow-2xl shadow-brand-200 ring-4 ring-brand-100 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Open AI chat assistant"
                >
                    <FiMessageCircle className="text-xl text-white animate-in zoom-in duration-300" />
                    <span className="absolute inset-0 rounded-full animate-ping bg-brand-400 opacity-20 pointer-events-none" />
                </button>
            )}

            <ChatPanel />
        </>
    );
}
