
import React, { useState, useEffect, useRef } from 'react';
import { Persona, Message } from '../types';
import { generatePersonaResponse } from '../services/geminiService';

interface ChatViewProps {
  persona: Persona;
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ persona, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchInitialMessage = async () => {
    setLoading(true);
    const initialText = await generatePersonaResponse(persona, []);
    setMessages([{ role: 'model', text: initialText }]);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialMessage();
  }, [persona]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleWhyClick = async () => {
    if (loading) return;
    
    // Add user's "Why?" to history
    const userMessage: Message = { role: 'user', text: 'Why?' };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    
    setLoading(true);
    const responseText = await generatePersonaResponse(persona, messages);
    setMessages([...newHistory, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className={`p-4 flex items-center justify-between border-b ${persona.color}`}>
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-lg">{persona.name}</h2>
          <span className="text-xs opacity-75">{persona.role}</span>
        </div>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-200 p-4 rounded-2xl rounded-tl-none max-w-[50%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <button
          onClick={handleWhyClick}
          disabled={loading || messages.length === 0}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
            persona.color.includes('rose') ? 'bg-rose-500 text-white' :
            persona.color.includes('blue') ? 'bg-blue-600 text-white' :
            persona.color.includes('amber') ? 'bg-amber-600 text-white' :
            persona.color.includes('purple') ? 'bg-purple-600 text-white' :
            persona.color.includes('orange') ? 'bg-orange-500 text-white' :
            'bg-emerald-600 text-white'
          }`}
        >
          {loading ? 'Thinking...' : 'Why?'}
        </button>
        <p className="text-center text-[10px] mt-3 text-gray-400 uppercase tracking-widest font-bold">
          The only question that matters
        </p>
      </div>
    </div>
  );
};
