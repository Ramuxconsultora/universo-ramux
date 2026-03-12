import React, { useState } from 'react';
import GlassPanel from '../ui/GlassPanel';
import ChatMessage from './ChatMessage';
import { Zap, Send, Maximize2 } from 'lucide-react';

const IAChatWidget = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "Hola, soy Ramux IA. ¿En qué te puedo ayudar hoy con normativa financiera o análisis de mercado?", isUser: false }
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const newUserMsg = { id: Date.now(), text: input, isUser: true };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Estoy procesando tu solicitud sobre el marco normativo y los últimos reportes del mercado. Este es un entorno de prueba.",
                isUser: false
            }]);
        }, 1000);
    };

    return (
        <GlassPanel className="flex flex-col h-[400px] md:h-[500px]">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Zap className="text-violet-400 animate-pulse" size={20} />
                    <h3 className="font-bold text-white tracking-wide">Asistente IA</h3>
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider border border-violet-500/30">
                        Próximamente
                    </span>
                </div>
                <button className="text-slate-400 hover:text-white transition-colors cursor-not-allowed opacity-50">
                    <Maximize2 size={16} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 relative">
                <div className="absolute inset-0 z-10 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center cursor-not-allowed rounded-b-xl border-t border-white/5">
                    <span className="text-xs font-semibold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/50 shadow-lg">Funcionalidad en desarrollo</span>
                </div>
                <form onSubmit={handleSend} className="relative opacity-40 pointer-events-none">
                    <input
                        type="text"
                        value={input}
                        disabled
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pregunta a la IA..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#7B39FC] text-white rounded-full glow-button disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        <Send size={14} className="translate-x-[1px] translate-y-[1px]" />
                    </button>
                </form>
            </div>
        </GlassPanel>
    );
};

export default IAChatWidget;
