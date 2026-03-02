import { motion } from 'motion/react';
import { Logo } from './Logo';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
          filter: ['drop-shadow(0 0 10px rgba(0,255,157,0.2))', 'drop-shadow(0 0 30px rgba(0,255,157,0.8))', 'drop-shadow(0 0 10px rgba(0,255,157,0.2))']
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <Logo className="w-32 h-32" glow />
      </motion.div>
      
      <motion.div 
        className="mt-12 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-neon-green tracking-[0.3em] uppercase text-sm font-mono mb-4">
          Initializing Axes AI
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-neon-green"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "circOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};
