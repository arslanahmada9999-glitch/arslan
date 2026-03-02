import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Key, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminPanel = () => {
  const [stripeKey, setStripeKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (stripeKey.trim()) {
      // Simulate saving to backend/env
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Settings className="text-neon-green" />
            System Administration
          </h1>
          <p className="text-white/50 font-mono text-sm">Configure core platform integrations and security parameters.</p>
        </header>

        <div className="glass-panel p-8 rounded-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-neon-green" />
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Key className="text-neon-green" />
            Payment Gateway Configuration
          </h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={18} />
            <div className="text-sm text-white/70">
              <p className="font-bold text-white mb-1">Stripe Integration Required</p>
              <p>To activate real payments for the Premium ($3/month) plan, you must provide your Stripe Secret Key. Until this is configured, the Subscribe button will show "Coming Soon".</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neon-green uppercase tracking-wider block">Stripe Secret Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  placeholder="sk_test_..."
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 transition-all font-mono text-sm"
                />
              </div>
              <p className="text-xs text-white/40 font-mono mt-2">Keep this key secure. Never share it publicly.</p>
            </div>

            <button 
              type="submit"
              disabled={!stripeKey.trim()}
              className="px-6 py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-[#00e68d] transition-colors disabled:opacity-50 disabled:hover:bg-neon-green flex items-center gap-2"
            >
              {isSaved ? (
                <>
                  <ShieldCheck size={18} />
                  Configuration Saved
                </>
              ) : (
                'Save Configuration'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
