import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle } from 'lucide-react';
import Logo from "./images/lo.png"
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-sm bg-white">
      {/* Top bar with social icons */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex justify-end items-center">
          {/* Social Media Icons */}
          <div className="hidden md:flex space-x-2">
            <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
              <Youtube size={18} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title Section */}
            <div className="flex items-center">
              <img 
                src={Logo}
                alt="Society for Cyber Intelligent Systems" 
                className="h-14 md:h-16" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60'%3E%3Cg fill='%23F5A051'%3E%3Ccircle cx='120' cy='30' r='15'/%3E%3C/g%3E%3C/svg%3E";
                }}
              />
              <span className="ml-3 text-white font-medium text-lg hidden md:block">Society for Cyber Intelligent Systems</span>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Navigation */}
<<<<<<< HEAD
            <div className="hidden md:block">
              <ul className="flex items-center space-x-1 lg:space-x-4">
                <li><Link to="/" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Home</Link></li>
                <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Call For Papers</a></li>
                <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Paper Submission</a></li>
                <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Registrations</a></li>
                <li><Link to="/commitee" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Committee</Link></li>
                <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Keynote speakers</a></li>
                <li><Link to="/contact" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Contact</Link></li>
                <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm lg:text-base">Venue</a></li>
              </ul>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login" className="py-1 px-3 bg-transparent border border-[#F5A051] text-[#F5A051] rounded-md hover:bg-[#F5A051] hover:text-white transition-colors text-sm">Log In</Link>
              <Link to="/signin" className="py-1 px-3 bg-[#F5A051] text-white rounded-md hover:bg-[#e08c3e] transition-colors text-sm">Sign Up</Link>
            </div>
=======
            <ul className="hidden md:flex items-center space-x-6">
              <li><Link to="/" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Home</Link></li>
              <li><Link to="/call-for-papers" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Call For Papers</Link></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Paper Submission</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Registrations</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Committee</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Keynote speakers</a></li>
              <li><Link to="/contact" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Contact</Link></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Venue</a></li>
            </ul>
>>>>>>> 28c1fe5b9175edab16a5b539675f7989ba8a4899
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pt-4">
              <ul className="flex flex-col space-y-2 pb-3 border-b border-gray-700">
                <li><Link to="/" className="block py-2 px-4 hover:bg-gray-800 rounded">Home</Link></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800 rounded">Call For Papers</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800 rounded">Paper Submission</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800 rounded">Registrations</a></li>
                <li><Link to="/commitee" className="block py-2 px-4 hover:bg-gray-800 rounded">Committee</Link></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800 rounded">Keynote speakers</a></li>
                <li><Link to="/contact" className="block py-2 px-4 hover:bg-gray-800 rounded">Contact</Link></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800 rounded">Venue</a></li>
              </ul>
              
              {/* Auth buttons - Mobile */}
              <div className="flex space-x-2 mt-4 mb-2">
                <Link to="/login" className="flex-1 py-2 px-3 border border-[#F5A051] text-[#F5A051] bg-transparent rounded text-center">Log In</Link>
                <Link to="/signin" className="flex-1 py-2 px-3 bg-[#F5A051] text-white rounded text-center">Sign Up</Link>
              </div>
              
              {/* Mobile Social Icons */}
              <div className="flex justify-center space-x-4 py-4">
                <a href="#" className="text-white hover:text-[#F5A051]">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#F5A051]">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#F5A051]">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#F5A051]">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#F5A051]">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-white hover:text-[#F5A051]">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;