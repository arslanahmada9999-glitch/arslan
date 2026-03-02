import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Zap, Shield, Eye } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50 p-4"
          >
            <div className="glass-panel rounded-2xl relative overflow-hidden border border-white/10 flex flex-col md:flex-row">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Free Tier */}
              <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
                <h3 className="text-xl font-bold text-white/80 mb-2">Guest Access</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-white/50 font-mono text-sm">/ forever</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-white/40 shrink-0" />
                    <span>Basic conversational AI capabilities</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-white/40 shrink-0" />
                    <span>Standard processing speed</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-white/40 shrink-0" />
                    <span>Limited daily queries</span>
                  </li>
                </ul>

                <button 
                  onClick={onClose}
                  className="w-full py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors font-medium"
                >
                  Continue as Guest
                </button>
              </div>

              {/* Premium Tier */}
              <div className="flex-1 p-8 md:p-12 relative bg-neon-green/5">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-green shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                <div className="absolute top-4 right-12 bg-neon-green/20 text-neon-green text-xs font-mono px-2 py-1 rounded border border-neon-green/30">
                  RECOMMENDED
                </div>
                
                <h3 className="text-xl font-bold text-neon-green mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Illuminated
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">$3</span>
                  <span className="text-white/50 font-mono text-sm">/ month</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-sm text-white/90">
                    <Zap className="w-5 h-5 text-neon-green shrink-0" />
                    <span>Priority processing & zero latency</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/90">
                    <Shield className="w-5 h-5 text-neon-green shrink-0" />
                    <span>Advanced reasoning & deep research modes</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="w-5 h-5 text-neon-green shrink-0" />
                    <span>Unlimited queries & full history retention</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="w-5 h-5 text-neon-green shrink-0" />
                    <span>Access to analytical dashboards</span>
                  </li>
                </ul>

                <button 
                  className="w-full py-3 rounded-lg bg-neon-green text-white font-bold hover:bg-[#4f46e5] transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                  onClick={() => alert('Stripe Checkout: Coming Soon. Please configure Stripe secret key in admin panel.')}
                >
                  Ascend Now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
