import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  navigateWithLoading: (url: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const navigateWithLoading = (url: string) => {
    setIsLoading(true);
    // Add a small delay to show the loading animation
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  };

  return (
    <NavigationContext.Provider value={{ isLoading, setLoading, navigateWithLoading }}>
      {children}
      {isLoading && (
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
      )}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
