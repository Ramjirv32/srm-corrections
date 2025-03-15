import { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import Logo from "./images/lo.png"
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Create a custom event for auth state changes
const authStateChanged = new CustomEvent('authStateChanged');

// Update localStorage setItem and removeItem to dispatch our custom event
const originalSetItem = localStorage.setItem;
const originalRemoveItem = localStorage.removeItem;

localStorage.setItem = function(key, value) {
  originalSetItem.call(this, key, value);
  if (key === 'token' || key === 'user') {
    window.dispatchEvent(authStateChanged);
  }
};

localStorage.removeItem = function(key) {
  originalRemoveItem.call(this, key);
  if (key === 'token' || key === 'user') {
    window.dispatchEvent(authStateChanged);
  }
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in on mount and when auth state changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    
    // Check initial state
    checkAuthStatus();
    
    // Listen for auth state changes
    window.addEventListener('authStateChanged', checkAuthStatus);
    
    // Also check auth status on route change
    return () => {
      window.removeEventListener('authStateChanged', checkAuthStatus);
    };
  }, [location.pathname]);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Helper function to check if link is active
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-[#F5A051]' : '';
  };

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header className={`w-full bg-white sticky top-0 z-50 ${scrolled ? 'shadow-md' : 'shadow-sm'} transition-all duration-300`}>
      {/* Top bar with social icons */}
      <div className="bg-gray-100 py-1 md:py-2 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-end items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-1 sm:space-x-2">
            <a href="#" className="bg-[#F5A051] text-white p-1.5 sm:p-2 rounded-md hover:bg-[#e08c3e] transition-all duration-300 transform hover:-translate-y-1">
              <Facebook size={16} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-1.5 sm:p-2 rounded-md hover:bg-[#e08c3e] transition-all duration-300 transform hover:-translate-y-1">
              <Twitter size={16} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-1.5 sm:p-2 rounded-md hover:bg-[#e08c3e] transition-all duration-300 transform hover:-translate-y-1">
              <Linkedin size={16} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-1.5 sm:p-2 rounded-md hover:bg-[#e08c3e] transition-all duration-300 transform hover:-translate-y-1">
              <Instagram size={16} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-1.5 sm:p-2 rounded-md hover:bg-[#e08c3e] transition-all duration-300 transform hover:-translate-y-1">
              <Youtube size={16} />
            </a>
            <a href="#" className="bg-[#F5A051] text-white p-1.5 sm:p-2 rounded-md hover:bg-[#e08c3e] transition-all duration-300 transform hover:-translate-y-1">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black text-white py-1 sm:py-2">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16 relative">
            {/* Logo and Title Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={Logo}
                  alt="Society for Cyber Intelligent Systems" 
                  className="h-10 sm:h-12 md:h-14" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60'%3E%3Cg fill='%23F5A051'%3E%3Ccircle cx='120' cy='30' r='15'/%3E%3C/g%3E%3C/svg%3E";
                  }}
                />
                {/* Logo text - optimize for medium screens */}
                <span className="ml-2 text-white font-medium text-xs sm:text-sm md:text-base lg:text-lg truncate max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-none hidden sm:inline">
                  Society for Cyber Intelligent Systems
                </span>
              </Link>
            </div>

            {/* Medium screens: Simplified navigation with dropdowns */}
            <div className="hidden md:block lg:hidden">
              <div className="flex items-center space-x-1">
                <Link to="/" className={`py-2 px-2 hover:text-[#F5A051] transition-colors text-sm ${isActive('/')}`}>
                  Home
                </Link>
                
                {/* Research dropdown for medium screens */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('research')}
                    className="py-2 px-2 text-sm hover:text-[#F5A051] transition-colors flex items-center"
                  >
                    Research <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === 'research' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <Link 
                            to="/call-for-papers" 
                            className={`block px-4 py-2 text-sm hover:bg-gray-800 ${isActive('/call-for-papers')}`}
                          >
                            Call For Papers
                          </Link>
                          <Link 
                            to="/paper-submission" 
                            className={`block px-4 py-2 text-sm hover:bg-gray-800 ${isActive('/paper-submission')}`}
                          >
                            Paper Submission
                          </Link>
                  {activeDropdown === 'research' && (
                    <div className="absolute left-0 top-full mt-1 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-20">
                      {isLoggedIn && (
                        <>
                          
                        </>
                      )}
                      <Link 
                        to="#" 
                        className="block px-4 py-2 text-sm hover:bg-gray-800"
                      >
                        Keynote Speakers
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* About dropdown for medium screens */}
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown('about')}
                    className="py-2 px-2 text-sm hover:text-[#F5A051] transition-colors flex items-center"
                  >
                    About <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'about' && (
                    <div className="absolute left-0 top-full mt-1 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-20">
                      <Link 
                        to="/commitee" 
                        className={`block px-4 py-2 text-sm hover:bg-gray-800 ${isActive('/commitee')}`}
                      >
                        Committee
                      </Link>
                      {isLoggedIn && (
                        <Link 
                          to="#" 
                          className="block px-4 py-2 text-sm hover:bg-gray-800"
                        >
                          Registrations
                        </Link>
                      )}
                      <Link 
                        to="#" 
                        className="block px-4 py-2 text-sm hover:bg-gray-800"
                      >
                        Venue
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link 
                  to="/contact" 
                  className={`py-2 px-2 hover:text-[#F5A051] transition-colors text-sm ${isActive('/contact')}`}
                >
                  Contact
                </Link>
                
                {/* Auth for medium screens */}
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout}
                    className="ml-1 py-1.5 px-3 flex items-center bg-[#F5A051] text-white rounded-md hover:bg-[#e08c3e] transition-all duration-300 text-xs"
                  >
                    <LogOut size={14} className="mr-1" /> Log Out
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="ml-1 py-1.5 px-3 bg-[#F5A051] text-white rounded-md hover:bg-[#e08c3e] transition-all duration-300 text-xs"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? 
                <X size={24} className="transition-transform duration-300 transform rotate-0" /> : 
                <Menu size={24} className="transition-transform duration-300 transform rotate-0" />
              }
            </button>

            {/* Desktop Navigation (Large screens only) */}
            <div className="hidden lg:block flex-grow mx-4">
              <ul className="flex items-center justify-center space-x-1 xl:space-x-4">
                <li><Link to="/" className={`py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base ${isActive('/')}`}>Home</Link></li>
                <li><Link to="/call-for-papers" className={`py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base ${isActive('/call-for-papers')}`}>Call For Papers</Link></li>
                {isLoggedIn && (
                  <>
                    <li><Link to="/paper-submission" className={`py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base ${isActive('/paper-submission')}`}>Paper Submission</Link></li>
                    <li><Link to="/Registrations" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base">Registrations</Link></li>
                  </>
                )}
                <li><Link to="/commitee" className={`py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base ${isActive('/commitee')}`}>Committee</Link></li>
                <li><Link to="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base">Keynote speakers</Link></li>
                <li><Link to="/contact" className={`py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base ${isActive('/contact')}`}>Contact</Link></li>
                <li><Link to="#" className="py-2 px-2 hover:text-[#F5A051] transition-colors text-sm xl:text-base">Venue</Link></li>
              </ul>
            </div>

            {/* Auth Buttons - Desktop only (Large screens) */}
            <div className="hidden lg:flex items-center space-x-2">
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="py-1.5 px-3 flex items-center bg-[#F5A051] text-white rounded-md hover:bg-[#e08c3e] transition-all duration-300 text-sm"
                >
                  <LogOut size={16} className="mr-1" /> Log Out
                </button>
              ) : (
                <>
                  <Link to="/login" className="py-1.5 px-3 bg-transparent border border-[#F5A051] text-[#F5A051] rounded-md hover:bg-[#F5A051] hover:text-white transition-all duration-300 text-sm">Log In</Link>
                  <Link to="/signin" className="py-1.5 px-3 bg-[#F5A051] text-white rounded-md hover:bg-[#e08c3e] transition-all duration-300 text-sm">Sign Up</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation - Improved animation */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="flex flex-col space-y-1 py-2">
              <li>
                <Link 
                  to="/" 
                  className={`block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors ${isActive('/')}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/call-for-papers" 
                  className={`block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors ${isActive('/call-for-papers')}`}
                >
                  Call For Papers
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <Link 
                      to="/paper-submission" 
                      className={`block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors ${isActive('/paper-submission')}`}
                    >
                      Paper Submission
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/registrations" 
                      className="block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Registrations
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link 
                  to="/commitee" 
                  className={`block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors ${isActive('/commitee')}`}
                >
                  Committee
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors"
                >
                  Keynote speakers
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors ${isActive('/contact')}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="block py-2.5 px-4 hover:bg-gray-800 rounded-md transition-colors"
                >
                  Venue
                </Link>
              </li>
            </ul>
            
            {/* Auth buttons - Mobile */}
            <div className="flex space-x-2 mt-2 mb-2 px-4">
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="flex-1 flex justify-center items-center py-2.5 px-4 bg-[#F5A051] text-white rounded-md text-center hover:bg-[#e08c3e] transition-colors"
                >
                  <LogOut size={16} className="mr-2" /> Log Out
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex-1 py-2.5 px-4 border border-[#F5A051] text-[#F5A051] bg-transparent rounded-md text-center hover:bg-gray-800 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/signin" 
                    className="flex-1 py-2.5 px-4 bg-[#F5A051] text-white rounded-md text-center hover:bg-[#e08c3e] transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Social Icons */}
            <div className="grid grid-cols-6 gap-2 px-4 py-3 border-t border-gray-700">
              <a href="#" className="flex justify-center items-center h-10 rounded-md bg-gray-800 text-white hover:text-[#F5A051] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="flex justify-center items-center h-10 rounded-md bg-gray-800 text-white hover:text-[#F5A051] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="flex justify-center items-center h-10 rounded-md bg-gray-800 text-white hover:text-[#F5A051] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="flex justify-center items-center h-10 rounded-md bg-gray-800 text-white hover:text-[#F5A051] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="flex justify-center items-center h-10 rounded-md bg-gray-800 text-white hover:text-[#F5A051] transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="flex justify-center items-center h-10 rounded-md bg-gray-800 text-white hover:text-[#F5A051] transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;