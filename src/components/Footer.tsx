// import React from 'react';
import { Mail, Phone } from 'react-feather';
import { Link } from 'react-router-dom';
// import SmallLogo from './images/lo.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Society<span className="text-[#F5A051]">CIS</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-md">
              Enhance your society's management with our comprehensive online platform, offering seamless communication, financial tracking, and more.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="mailto:info@societycis.com" className="text-gray-700 hover:text-gray-900">
                <Mail size={20} />
              </a>
              <a href="tel:+1234567890" className="text-gray-700 hover:text-gray-900">
                <Phone size={20} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="font-medium text-gray-900">Company</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-500">
                <Link to="/about" className="hover:text-gray-700">About</Link>
                <Link to="/contact" className="hover:text-gray-700">Contact</Link>
                <Link to="/careers" className="hover:text-gray-700">Careers</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium text-gray-900">Solutions</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-500">
                <Link to="/services" className="hover:text-gray-700">Services</Link>
                <Link to="/pricing" className="hover:text-gray-700">Pricing</Link>
                <Link to="/faq" className="hover:text-gray-700">FAQ</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium text-gray-900">Legal</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm text-gray-500">
                <Link to="/privacy-policy" className="hover:text-gray-700">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-gray-700">Terms & Conditions</Link>
                <Link to="/cookies" className="hover:text-gray-700">Cookies</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SocietyCIS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
