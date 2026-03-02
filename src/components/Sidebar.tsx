import React from 'react';
import { Clock, MessageSquare, Search, BookOpen, Brain, Activity, Eye } from 'lucide-react';

interface SidebarProps {
  activeTab: 'chat' | 'history' | 'analysis';
  setActiveTab: (tab: 'chat' | 'history' | 'analysis') => void;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}

export const Sidebar = ({ activeTab, setActiveTab, isLoggedIn, onOpenLogin }: SidebarProps) => {
  return (
    <div className="w-64 border-r border-white/5 bg-black/80 backdrop-blur-xl flex flex-col h-full">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 text-neon-green mb-1">
          <Eye className="w-6 h-6" />
          <span className="font-bold text-xl tracking-widest uppercase">AXES AI</span>
        </div>
        <div className="text-xs font-mono text-white/30">STATUS: ONLINE</div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col justify-between">
        <div>
          <nav className="space-y-1 px-3">
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Terminal
            </button>
            
            <button
              onClick={() => {
                if (isLoggedIn) setActiveTab('history');
                else onOpenLogin();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'history' 
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              Chronicles
              {!isLoggedIn && <LockIcon />}
            </button>
            
            <button
              onClick={() => {
                if (isLoggedIn) setActiveTab('analysis');
                else onOpenLogin();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analysis' 
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              Analysis
              {!isLoggedIn && <LockIcon />}
            </button>
          </nav>

          {isLoggedIn && activeTab === 'history' && (
            <div className="mt-8 px-6">
              <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider mb-4">Recent Queries</h4>
              <div className="space-y-3">
                {[
                  { title: 'Quantum computing basics', type: 'educational', icon: BookOpen },
                  { title: 'Market trends 2026', type: 'research', icon: Search },
                  { title: 'Paradox resolution', type: 'reasoning', icon: Brain },
                ].map((item, i) => (
                  <button key={i} className="w-full text-left group">
                    <div className="flex items-center gap-2 text-sm text-white/70 group-hover:text-neon-green transition-colors truncate">
                      <item.icon className="w-3.5 h-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
                      <span className="truncate">{item.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ad Placeholder */}
        <div className="p-4 mt-auto">
          <div className="w-full h-32 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center text-white/30 hover:text-white/50 transition-colors cursor-pointer relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs font-mono uppercase tracking-widest mb-2">Ad Space</span>
            <span className="text-[10px] text-center px-4">Support Axes AI by engaging with our sponsors</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LockIcon = () => (
  <svg className="w-3 h-3 ml-auto opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
