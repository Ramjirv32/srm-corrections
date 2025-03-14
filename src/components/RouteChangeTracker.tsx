import  { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

interface RouteChangeTrackerProps {
  children: React.ReactNode;
  loadingTime?: number;
}

const RouteChangeTracker: React.FC<RouteChangeTrackerProps> = ({ 
  children, 
  loadingTime = 300 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);
    
    return () => clearTimeout(timer);
  }, [location.pathname, loadingTime]);
  
  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F5A051]"></div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default RouteChangeTracker;
