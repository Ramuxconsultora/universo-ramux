import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
    return (
        <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-sky-500/20 text-sky-400' : 'bg-violet-500/20 text-violet-400'
                }`}>
                {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm animate-fade-in ${isUser
                ? 'bg-sky-600 border border-sky-400/50 text-white rounded-tr-sm shadow-[0_0_10px_rgba(14,165,233,0.3)]'
                : 'bg-[#050505] border border-[#7B39FC] shadow-[0_0_15px_rgba(123,57,252,0.3)] text-slate-200 rounded-tl-sm'
                }`}>
                {message}
            </div>
        </div>
    );
};

export default ChatMessage;
