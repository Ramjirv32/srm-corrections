import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Signin from "./components/auth/Signin";
import Login from "./components/auth/Login";
import Commitee from "./components/Commitee";
import CallForPapers from "./components/CallforPaper";
import Papersubmission from "./components/Papersubmission";
import SubmitPaperForm from "./components/SubmitPaperForm";
import Dashboard from "./components/Dashboard";
import RouteChangeTracker from "./components/RouteChangeTracker";

// The App component should contain BrowserRouter
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Route wrapper component that conditionally applies loading
const RouteWithLoading = ({ 
  element, 
  skipLoading = false,
  loadingTime = 300 
}: { 
  element: React.ReactNode, 
  skipLoading?: boolean, 
  loadingTime?: number 
}) => {
  return skipLoading ? (
    <>{element}</>
  ) : (
    <RouteChangeTracker loadingTime={loadingTime}>
      {element}
    </RouteChangeTracker>
  );
};

// Separate component for the routes
const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check authentication on mount and whenever localStorage changes
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    
    // Listen for storage events (in case token is changed in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <RouteWithLoading element={<Home />} loadingTime={800} />
        } />
        <Route path="/contact" element={
          <RouteWithLoading element={<Contact />} />
        } />
        
        {/* Auth routes - no loading screen */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/commitee" element={
          <RouteWithLoading element={<Commitee />} />
        } />
        
        {/* Dashboard - only for authenticated users */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <RouteWithLoading element={<Dashboard />} />
          </ProtectedRoute>
        } />
        
        {/* Protected routes - only accessible when logged in */}
        <Route path="/paper-submission" element={
          <ProtectedRoute>
            <RouteWithLoading element={<Papersubmission />} />
          </ProtectedRoute>
        } />
        <Route path="/call-for-papers" element={
          <ProtectedRoute>
            <RouteWithLoading element={<CallForPapers />} />
          </ProtectedRoute>
        } />
        <Route path="/submit-paper" element={
          <ProtectedRoute>
            <RouteWithLoading element={<SubmitPaperForm isOpen={true} onClose={() => {}} />} />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;