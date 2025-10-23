import React from 'react';

interface PageLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PageLoader({ message = 'Loading...', size = 'md' }: PageLoaderProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative">
          {/* Outer spinning ring */}
          <div 
            className={`rounded-full border-4 border-gray-200 border-t-[#D04007] mx-auto ${sizeClasses[size]}`}
            style={{
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          {/* Inner spinning dot */}
          <div 
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#D04007] rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: 'spin 0.5s linear infinite reverse'
            }}
          ></div>
        </div>
        <p className="mt-4 text-[#262930] opacity-70 uppercase-headline" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
          {message}
        </p>
      </div>
    </div>
  );
}

export function ProductLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative">
          {/* Outer spinning ring */}
          <div 
            className="rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#D04007] mx-auto"
            style={{
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          {/* Inner spinning dot */}
          <div 
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-[#D04007] rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: 'spin 0.5s linear infinite reverse'
            }}
          ></div>
        </div>
        <p className="mt-4 text-[#262930] opacity-70 uppercase-headline" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
          LOADING PRODUCT
        </p>
      </div>
    </div>
  );
}

export function PageTransitionLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Outer spinning ring */}
          <div 
            className="rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#D04007] mx-auto"
            style={{
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          {/* Inner spinning dot */}
          <div 
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#D04007] rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: 'spin 0.5s linear infinite reverse'
            }}
          ></div>
        </div>
        <p className="mt-4 text-[#262930] opacity-70 uppercase-headline" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
          LOADING
        </p>
      </div>
    </div>
  );
}
