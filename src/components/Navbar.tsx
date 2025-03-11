import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle } from 'lucide-react';
import Logo from "./images/lo.png"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar with social icons */}
      <div className="container mx-auto px-4 py-3 flex justify-end items-center">
        {/* Social Media Icons */}
        <div className="hidden md:flex space-x-2">
          <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
            <Youtube size={20} />
          </a>
          <a href="#" className="bg-[#F5A051] text-white p-2 rounded-md hover:bg-[#e08c3e] transition-colors">
            <MessageCircle size={20} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo and Title Section */}
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={Logo}
                alt="Society for Cyber Intelligent Systems" 
                className="h-16 md:h-20" // Increased logo size
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60'%3E%3Cg fill='%23F5A051'%3E%3Ccircle cx='120' cy='30' r='15'/%3E%3C/g%3E%3C/svg%3E";
                }}
              />
              <span className="ml-3 text-white font-medium text-lg">Society for Cyber Intelligent Systems</span>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6">
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Home</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Call For Papers</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Paper Submission</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Registrations</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Committee</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Keynote speakers</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Contact</a></li>
              <li><a href="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors">Venue</a></li>
            </ul>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <ul className="flex flex-col">
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Home</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Call For Papers</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Paper Submission</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Registrations</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Committee</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Keynote speakers</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Contact</a></li>
                <li><a href="#" className="block py-2 px-4 hover:bg-gray-800">Venue</a></li>
              </ul>
              
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