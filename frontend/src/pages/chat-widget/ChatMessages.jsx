import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiUser } from 'react-icons/fi';

/** Animated typing indicator showing three bouncing dots while AI processes. */
function TypingIndicator() {
    return (
        <div className="flex items-start gap-3 px-3 animate-in fade-in duration-300">
            <BotAvatar />
            <div className="flex h-10 items-center justify-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 border border-slate-100 shadow-sm transition-all shadow-slate-50">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500" />
            </div>
        </div>
    );
}

/** Avatar badge displaying the AI label for bot messages. */
function BotAvatar() {
    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-500 to-brand-700 shadow-lg ring-1 ring-white">
            <span className="text-[10px] font-black text-white">AI</span>
        </div>
    );
}

/** Avatar badge displaying a user icon for sender messages. */
function UserAvatar() {
    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
            <FiUser className="text-sm text-slate-500" />
        </div>
    );
}

/** Renders a single chat message with role-based styling and markdown support for AI responses. */
function MessageBubble({ role, content }) {
    const isUserMessage = role === 'user';

    return (
        <div className={`flex items-start gap-3 px-3 ${isUserMessage ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {isUserMessage ? <UserAvatar /> : <BotAvatar />}
            <div
                className={
                    isUserMessage
                        ? 'max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-3 text-sm font-medium text-white shadow-xl shadow-brand-50 ring-1 ring-brand-500'
                        : 'max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-slate-800 border border-slate-100 shadow-sm leading-relaxed'
                }
            >
                {isUserMessage ? (
                    <p className="whitespace-pre-wrap">{content}</p>
                ) : (
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold text-brand-700">{children}</strong>,
                            ul: ({ children }) => <ul className="ml-4 list-disc space-y-1 my-2">{children}</ul>,
                            ol: ({ children }) => <ol className="ml-4 list-decimal space-y-1 my-2">{children}</ol>,
                            code: ({ children }) => <code className="rounded bg-slate-50 px-1 py-0.5 font-mono text-xs text-brand-600 border border-slate-200">{children}</code>
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
}

/** Scrollable container that renders all chat messages with auto-scroll to latest. */
export default function ChatMessages({ messages, isLoading }) {
    const scrollAnchorRef = useRef(null);

    useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-2 pt-4 pb-2 scrollbar-hide">
            {messages.map((message, index) => (
                <MessageBubble key={index} role={message.role} content={message.content} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={scrollAnchorRef} />
        </div>
    );
}
