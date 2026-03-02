import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Activity, BrainCircuit, BookOpen, Search, Star, MessageSquare, Target, Flame } from 'lucide-react';

const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const AnalysisDashboard = () => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const metrics = [
    { label: 'Total Queries', value: 1204, suffix: '', icon: Activity, color: 'text-neon-green' },
    { label: 'Educational Focus', value: 45, suffix: '%', icon: BookOpen, color: 'text-blue-400' },
    { label: 'Reasoning Depth', value: 32, suffix: '%', icon: BrainCircuit, color: 'text-purple-400' },
    { label: 'Deep Research', value: 23, suffix: '%', icon: Search, color: 'text-amber-400' },
  ];

  const reviews = [
    { user: 'Agent K', rating: 5, comment: 'The reasoning engine is unparalleled. It solved my complex logic puzzle in seconds.', type: 'Reasoning' },
    { user: 'Scholar X', rating: 4, comment: 'Excellent for deep research. The historical cross-referencing is highly accurate.', type: 'Research' },
    { user: 'Student Y', rating: 5, comment: 'Educational mode breaks down complex topics perfectly. Highly recommended.', type: 'Educational' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 relative">
      {/* 3D Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 glow-text">Analytics Core</h1>
            <p className="text-white/50 font-mono text-sm">Advanced telemetry, goal tracking, and cognitive load analysis.</p>
          </div>
          
          <div className="glass-panel px-6 py-4 rounded-xl border border-neon-green/30 flex items-center gap-4 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
            <Clock className="text-neon-green animate-pulse" size={24} />
            <div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-wider">Session Duration</div>
              <div className="text-2xl font-mono text-neon-green font-bold">{formatTime(timeSpent)}</div>
            </div>
          </div>
        </header>

        {/* Intelligence Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goal Progress Intelligence */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-6 rounded-xl border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="text-blue-400" />
                Goal Progress Intelligence
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-blue-500/20 text-blue-400 rounded">ON TRACK</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/80">Master Quantum Mechanics</span>
                  <span className="font-mono text-blue-400"><CountUp end={78} suffix="%" /></span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.5 }} className="h-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/80">Complete Mars Research Paper</span>
                  <span className="font-mono text-blue-400"><CountUp end={42} suffix="%" /></span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Burnout Risk Analytics */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-xl border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-colors" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="text-orange-400" />
                Burnout Risk Analytics
              </h2>
              <span className="text-xs font-mono px-2 py-1 bg-orange-500/20 text-orange-400 rounded">MODERATE</span>
            </div>
            
            <div className="flex items-end gap-4 h-24">
              {[30, 45, 20, 60, 80, 40, 55].map((val, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group/bar">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${val}%` }} 
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`absolute bottom-0 w-full rounded-t-sm ${val > 70 ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-white/20'}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-mono text-white/40">
              <span>MON</span>
              <span>SUN</span>
            </div>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={metric.label}
                className="glass-panel p-6 rounded-xl border border-white/10 hover:border-neon-green/30 transition-colors relative overflow-hidden group transform hover:-translate-y-1 duration-300"
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity bg-current ${metric.color}`} />
                <Icon className={`mb-4 ${metric.color}`} size={28} />
                <div className="text-3xl font-bold text-white mb-1">
                  <CountUp end={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-xs font-mono text-white/50 uppercase tracking-wider">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Classification Analysis & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel p-8 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="text-neon-green" />
              Query Classification Analysis
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-400 font-mono">Educational (Learn, Explain, What)</span>
                  <span className="text-white/70"><CountUp end={45} suffix="%" /></span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} transition={{ duration: 1 }} className="h-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-400 font-mono">Reasoning (Why, Solve, Logic)</span>
                  <span className="text-white/70"><CountUp end={32} suffix="%" /></span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '32%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-amber-400 font-mono">Deep Research (History, Data, Analyze)</span>
                  <span className="text-white/70"><CountUp end={23} suffix="%" /></span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '23%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Review System */}
          <div className="glass-panel p-8 rounded-xl border border-white/10 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="text-neon-green" />
              System Reviews
            </h2>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white/90">{review.user}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "text-neon-green fill-neon-green" : "text-white/20"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mb-3">{review.comment}</p>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded bg-white/10 text-white/50">
                    {review.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
