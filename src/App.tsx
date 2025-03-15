import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import RouteChangeTracker from "./components/RouteChangeTracker";
import VerifyEmail from "./components/auth/VerifyEmail";
import Registrations from "./components/Registrations";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import EditSubmission from "./components/EditSubmission";

// The App component should contain BrowserRouter
const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Add ScrollToTop component here */}
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
        
        {/* Apply loading effect to Dashboard */}
        <Route path="/dashboard" element={
          <RouteWithLoading element={<Dashboard/>} />
        } />
        
        {/* Protected routes with loading - only accessible when logged in */}
        <Route path="/paper-submission" element={
          <ProtectedRoute>
            <RouteWithLoading element={<PaperSubmission />} />
          </ProtectedRoute>
        } />
        <Route path="/call-for-papers" element={
          <RouteWithLoading element={<CallForPapers />} />
        } />
        <Route path="/submit-paper" element={
          <ProtectedRoute>
            <RouteWithLoading element={<SubmitPaperForm isOpen={true} onClose={() => {}} embedded={false} onSubmissionSuccess={() => {}} />} />
          </ProtectedRoute>
        } />
        <Route path="/registrations" element={
          <RouteWithLoading element={<Registrations />} />
        } />
        
        {/* Add loading effect to EditSubmission route */}
        <Route path="/edit-submission/:submissionId" element={
          <RouteWithLoading element={<EditSubmission />} />
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;