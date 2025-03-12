import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Signin from "./components/auth/Signin";
import Login from "./components/auth/Login";
import Commitee from "./components/Commitee";
import CallForPapers from "./components/CallforPaper";
import Papersubmission from "./components/Papersubmission";
import SubmitPaperForm from "./components/SubmitPaperForm";

// The App component should contain BrowserRouter
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

// Separate component for the routes
const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/commitee" element={<Commitee />} />
        <Route path="/paper-submission" element={<Papersubmission />} />
        <Route path="/call-for-papers" element={<CallForPapers />} />
        <Route path="/submit-paper" element={<SubmitPaperForm isOpen={true} onClose={() => {}} />} />
      </Routes>
    </>
  );
};

export default App;