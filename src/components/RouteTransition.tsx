import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';

interface RouteTransitionProps {
  children: React.ReactNode;
}

const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedChildren, setDisplayedChildren] = useState(children);

  useEffect(() => {
    setIsLoading(true);
    
    // Store the children that should be displayed after loading
    setDisplayedChildren(children);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Show loading for 1 second
    
    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin text-[#F5A051]">
            <Loader size={40} className="animate-spin" />
          </div>
          <div className="mt-4 text-lg font-medium text-gray-800">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return <>{displayedChildren}</>;
};

export default RouteTransition;
