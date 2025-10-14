import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  text = 'LOADING', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  };

  const textSizes = {
    sm: '10px',
    md: '12px',
    lg: '14px'
  };

  return (
    <div className={`text-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-[#D04007] mx-auto mb-4 ${sizeClasses[size]}`}></div>
      <p 
        className="text-white/70 uppercase-headline" 
        style={{ fontSize: textSizes[size], letterSpacing: '0.2em' }}
      >
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;
