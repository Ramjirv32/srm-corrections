import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

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
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);
    
    return () => clearTimeout(timer);
  }, [location.pathname, loadingTime]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return <>{children}</>;
};

export default RouteChangeTracker;
