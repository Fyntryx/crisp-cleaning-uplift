import React from 'react';

export default function DirectionIcon({ 
  direction = 'N', 
  className = '', 
  size = 24,
  strokeWidth = 2
}: { 
  direction?: 'N' | 'S' | 'E' | 'W' | 'C', 
  className?: string, 
  size?: number,
  strokeWidth?: number
}) {
  // We'll rotate the needle
  let rotation = 0;
  let letter = 'N';
  
  switch(direction) {
    case 'N': rotation = 0; letter = 'N'; break;
    case 'E': rotation = 90; letter = 'E'; break;
    case 'S': rotation = 180; letter = 'S'; break;
    case 'W': rotation = -90; letter = 'W'; break;
    case 'C': rotation = 0; letter = 'C'; break;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Outer Circle with ticks */}
      <circle cx="12" cy="12" r="9" />
      <path d="M12 1v2M12 21v2M1 12h2M21 12h2" />
      
      {/* The Needle that rotates */}
      <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '12px 12px' }}>
        <path d="M12 4 l3.5 7 -3.5 -1.5 -3.5 1.5 z" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      </g>
      
      {/* The Letter */}
      {direction !== 'C' && (
        <text 
          x="12" 
          y={rotation === 0 ? "17.5" : rotation === 180 ? "8.5" : "16"} 
          fontSize="5" 
          fontWeight="bold" 
          fontFamily="sans-serif"
          textAnchor="middle" 
          fill="currentColor" 
          stroke="none"
          style={{ transform: `rotate(${-rotation}deg)`, transformOrigin: '12px 12px' }}
        >
          {letter}
        </text>
      )}
      
      {direction === 'C' && (
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      )}
    </svg>
  );
}
