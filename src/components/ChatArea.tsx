import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, X, AlertTriangle, BookOpen, BrainCircuit, Search } from 'lucide-react';
import { Logo } from './Logo';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

interface ChatAreaProps {
  isPremium: boolean;
  onSubscribeClick: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  type?: 'educational' | 'reasoning' | 'research' | 'general';
}

export const ChatArea = ({ isPremium, onSubscribeClick }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Welcome to Axes AI. I am your illuminated assistant. How may I guide your inquiry today?',
      type: 'general'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBanner, setShowBanner] = useState(!isPremium);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowBanner(!isPremium);
  }, [isPremium]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Initialize Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Determine type based on keywords
      const lowerInput = userMsg.content.toLowerCase();
      let type: Message['type'] = 'general';
      if (lowerInput.includes('learn') || lowerInput.includes('explain') || lowerInput.includes('what is')) {
        type = 'educational';
      } else if (lowerInput.includes('why') || lowerInput.includes('solve') || lowerInput.includes('logic')) {
        type = 'reasoning';
      } else if (lowerInput.includes('research') || lowerInput.includes('deep') || lowerInput.includes('history')) {
        type = 'research';
      }

      // Call Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg.content,
        config: {
          systemInstruction: "You are Axes AI, an advanced, highly intelligent, and slightly mysterious AI assistant. You provide detailed, accurate, and insightful answers. You use a professional, futuristic tone. Format your responses using markdown.",
        }
      });

      const aiResponseText = response.text || "I was unable to process that query through my neural pathways.";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponseText,
        type
      }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "System Error: Neural connection to the core was interrupted. Please try again.",
        type: 'general'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getIconForType = (type?: string) => {
    switch (type) {
      case 'educational': return <BookOpen size={16} className="text-blue-400" />;
      case 'reasoning': return <BrainCircuit size={16} className="text-purple-400" />;
      case 'research': return <Search size={16} className="text-amber-400" />;
      default: return <Sparkles size={16} className="text-neon-green" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Premium Banner */}
      {showBanner && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-neon-green/10 border-b border-neon-green/30 p-3 flex items-center justify-between backdrop-blur-md z-10"
        >
          <div className="flex items-center gap-3 text-sm">
            <AlertTriangle size={16} className="text-neon-green" />
            <span className="text-white/80">
              You are using Guest Access. <button onClick={onSubscribeClick} className="text-neon-green font-bold hover:underline">Ascend to Premium</button> for deep research and zero latency.
            </span>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-white/50 hover:text-white">
            <X size={16} />
          </button>
        </motion.div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' 
                ? 'bg-white/10 border border-white/20' 
                : 'bg-neon-green/10 border border-neon-green/30'
            }`}>
              {msg.role === 'user' ? 'AG' : <Logo className="w-6 h-6" glow />}
            </div>
            
            <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
              {msg.role === 'ai' && msg.type && msg.type !== 'general' && (
                <div className="flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-mono text-white/50">
                  {getIconForType(msg.type)}
                  {msg.type}
                </div>
              )}
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-white/10 text-white rounded-tr-sm whitespace-pre-wrap'
                  : 'glass-panel text-white/90 rounded-tl-sm border-neon-green/20 shadow-[0_4px_20px_rgba(0,255,157,0.05)] prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 max-w-none'
              }`}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 max-w-4xl mx-auto"
          >
            <div className="w-10 h-10 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center shrink-0">
              <Logo className="w-6 h-6" glow />
            </div>
            <div className="glass-panel border-neon-green/20 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs font-mono text-neon-green/50 ml-2 uppercase tracking-widest">Processing</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 max-w-4xl mx-auto w-full">
        <form onSubmit={handleSend} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/0 via-neon-green/20 to-neon-green/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex items-center bg-black/80 border border-white/20 rounded-xl p-2 backdrop-blur-xl focus-within:border-neon-green/50 transition-colors">
            <button type="button" className="p-3 text-white/40 hover:text-neon-green transition-colors">
              <Sparkles size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Transmit your query to Axes AI..."
              className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-white/30 px-2"
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 bg-neon-green text-white rounded-lg hover:bg-[#4f46e5] disabled:opacity-50 disabled:hover:bg-neon-green transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        <div className="text-center mt-3 text-xs font-mono text-white/30">
          Axes AI may produce illuminated insights. Verify critical data.
        </div>
      </div>
    </div>
  );
};
