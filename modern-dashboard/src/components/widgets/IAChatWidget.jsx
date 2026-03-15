import React, { useState } from 'react';
import NeumorphicPanel from '../ui/NeumorphicPanel';
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

        const newUserMsg = { id: Date.now(), text: input, isUser: true };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Estoy procesando tu solicitud sobre el marco normativo y los últimos reportes del mercado. Este es un entorno de prueba.",
                isUser: false
            }]);
        }, 1000);
    };

    return (
        <NeumorphicPanel radiance="purple" className="flex flex-col h-[440px] group">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-black/10 bg-[#1a1f2b] relative">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Zap className="text-orange-500" size={18} />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-white text-sm tracking-tight uppercase">Ramux Financial & Legal IA</h3>
                        <p className="text-[10px] text-slate-500 font-medium lowercase">v3.0_premium</p>
                    </div>
                </div>
                
                {/* Premium Access Label (Shown on Hover) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <span className="px-3 py-1 bg-[#F76B1C] text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-[#F76B1C]/20 ring-1 ring-white/20">
                        PREMIUM_ACCESS_GRANTED
                    </span>
                </div>

                <button className="text-slate-500 hover:text-white transition-all z-10">
                    <Maximize2 size={16} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-black/5">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
                ))}
            </div>

            {/* Input Area (Inset effect) */}
            <div className="p-5 border-t border-white/5 bg-[#141821] relative">
                <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center cursor-not-allowed">
                    <span className="text-[10px] font-bold text-slate-400 bg-[#1a1f2b] px-4 py-1.5 rounded-full border border-white/5 shadow-md uppercase tracking-widest">IA_OFFLINE</span>
                </div>
                <form onSubmit={handleSend} className="relative opacity-30 pointer-events-none">
                    <div className="flex bg-[#12161f] rounded-2xl shadow-inner border border-black/20 overflow-hidden">
                        <input
                            type="text"
                            value={input}
                            disabled
                            placeholder="Pregunta a la IA..."
                            className="w-full bg-transparent py-3 pl-4 pr-12 text-sm text-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled
                            className="p-2 bg-sky-600 text-white rounded-xl m-1 opacity-50"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </NeumorphicPanel>
    );
};

export default IAChatWidget;
