import React from 'react';

export const Logo = ({ className = "w-8 h-8", glow = false }: { className?: string, glow?: boolean }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${glow ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''}`}
  >
    {/* Outer Triangle */}
    <path 
      d="M50 10 L90 85 L10 85 Z" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinejoin="round"
      className="text-white"
    />
    
    {/* Inner Triangle Inverted */}
    <path 
      d="M25 60 L75 60 L50 95 Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinejoin="round"
      className="text-white/30"
    />

    {/* The All-Seeing Eye */}
    <path 
      d="M35 55 Q50 40 65 55 Q50 70 35 55 Z" 
      stroke="#6366f1" 
      strokeWidth="3" 
      fill="rgba(99,102,241,0.1)"
    />
    
    {/* Pupil */}
    <circle 
      cx="50" 
      cy="55" 
      r="6" 
      fill="#6366f1" 
    />
    
    {/* Light reflection */}
    <circle 
      cx="48" 
      cy="53" 
      r="2" 
      fill="white" 
    />
    
    {/* Top Rays */}
    <line x1="50" y1="25" x2="50" y2="15" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" className="opacity-50" />
    <line x1="40" y1="30" x2="33" y2="23" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" className="opacity-50" />
    <line x1="60" y1="30" x2="67" y2="23" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" className="opacity-50" />
  </svg>
);
