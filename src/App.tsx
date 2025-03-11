import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Signin from "./components/auth/Signin";
import Login from "./components/auth/Login";
import Commitee from "./components/Commitee";
import RouteTransition from "./components/RouteTransition";

// Wrap routes with AnimatePresence and RouteTransition
const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <RouteTransition>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/commitee" element={<Commitee />} />
          </Routes>
        </AnimatePresence>
      </RouteTransition>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
