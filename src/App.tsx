import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Signin from "./components/auth/Signin";
import Login from "./components/auth/Login";
import Commitee from "./components/Commitee";
import CallForPapers from "./components/CallforPaper";
import PaperSubmission from "./components/Papersubmission";
import SubmitPaperForm from "./components/SubmitPaperForm";
import Dashboard from "./components/Dashboard";
// Fixed the broken import statement
import RouteChangeTracker from "./components/RouteChangeTracker";
import VerifyEmail from "./components/auth/VerifyEmail";
import Registrations from "./components/Registrations";
import Footer from "./components/Footer"
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

// Removed the duplicate RouteChangeTracker component definition
// Use the imported component instead


const AppRoutes = () => {
  
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
        <Route path="/verify" element={<VerifyEmail />} />
        
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
            <RouteWithLoading element={<PaperSubmission />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/registrations" element={
          <ProtectedRoute>
            <RouteWithLoading element={<Registrations />} />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;