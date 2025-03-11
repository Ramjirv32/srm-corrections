import React from 'react';
import { Calendar, MapPin, Users, Target, Compass, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Timeline from './Timeline';

// Create a simple countdown timer if the original is causing issues
const SimpleCountdownTimer = () => {
  return (
    <div className="text-white font-bold text-xl">
      Coming Soon: April 26-27, 2025
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-[#F5A051] text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            International Conference on Multidisciplinary Breakthroughs and NextGen Technologies
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            (ICMBNT–2025)
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>April 26 & 27, 2025</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>SRM HOTEL - Maraimalai Nagar - CHENNAI - India</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>Hybrid Conference (In-person + Virtual)</span>
            </div>
          </div>
          
          <p className="text-xl mb-8">
            Organized by<br />
            <span className="font-bold">Society for Cyber Intelligent Systems</span><br />
            Puducherry – India
          </p>
          
          <button className="bg-[#F5A051] hover:bg-[#e08c3e] text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg">
            REGISTER NOW
          </button>
          
          <div className="mt-8">
            <SimpleCountdownTimer />
          </div>
        </div>
      </div>

      {/* Society Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F5A051]">
            Society for Cyber Intelligent Systems
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-[#F5A051] mr-3" />
                <h3 className="text-2xl font-bold text-[#F5A051]">Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The Vision of the society is to be a global leader in advancing cybersecurity and intelligent
                systems by fostering innovation, research, and collaboration, ensuring a secure and resilient
                digital future for all.
              </p>
            </div>
            
            <div className="p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Compass className="w-8 h-8 text-[#F5A051] mr-3" />
                <h3 className="text-2xl font-bold text-[#F5A051]">Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The primary mission is to advance cybersecurity and intelligent systems by promoting cutting-edge 
                technologies like AI and machine learning, fostering research in cyber intelligence, and
                enhancing threat detection and mitigation strategies. We are committed to organizing
                training programs, workshops, and awareness campaigns to educate professionals and the
                public on best practices. Through the publication of research journals, international
                collaborations, and strategic partnerships with academic institutions, industries, and
                government agencies, we aim to strengthen the global cybersecurity ecosystem. Upholding
                ethical AI practices, disseminating practical knowledge, and hosting national and international
                conferences, we strive to create a secure, innovative, and resilient digital future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Scope Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Globe className="w-10 h-10 text-[#F5A051] mr-4" />
            <h2 className="text-3xl font-bold text-[#F5A051]">SCOPE OF THE CONFERENCE</h2>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 leading-relaxed mb-4">
              International Conference on Multidisciplinary Breakthroughs and NextGen Technologies
              (ICMBNT 2025) is designed to integrate perspectives from Science, Technology, Medical and
              Healthcare, Management, social sciences, Education, sports and environmental studies to
              develop holistic solutions for global issues.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Also in a rapidly evolving digital-first business world, global organizations are highly influenced
              by next generation technologies. Future technological advancements, developments, and
              innovations enabled by the internet, software, and services are known as next generation
              technologies. These include advanced robotics, AI, IoT, RPA, quantum computing, 3-D
              printing, 5G wireless networks, virtual reality and augmented reality, and blockchain.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Next generation technologies are paving a way for network-enabled, miniature, and fully
              automated machines. Although enterprise applications based on such technologies are still
              in the nascent stages of development, they are gradually beginning to drive innovation
              strategies of the business and the overall impact of these technologies is expected to
              multifold over the coming years.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              ICMBNT 2025 will be a central hub for esteemed Research experts worldwide and can
              anticipate unparalleled opportunities to network, gain invaluable insights, showcase their
              hidden potential, present significant research findings, receive due credit and recognition for
              their contributions.
            </p>
          </div>
        </div>
      </section>

      {/* Important Dates Section using Timeline Design */}
      <Timeline />

      {/* Footer */}
      <footer className="bg-[#0B1829] text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Conference Title Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">ICMBNT-2025</h2>
            <p className="text-gray-300 mb-6">
              The vision behind organising this conference is to provide an excellent forum for
              researchers, scientists and industrialists from interdisciplinary areas to showcase
              their current contributions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#F5A051] transition-colors">
                <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center">
                  <Twitter size={20} />
                </div>
              </a>
              <a href="#" className="hover:text-[#F5A051] transition-colors">
                <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center">
                  <Facebook size={20} />
                </div>
              </a>
              <a href="#" className="hover:text-[#F5A051] transition-colors">
                <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center">
                  <Instagram size={20} />
                </div>
              </a>
              <a href="#" className="hover:text-[#F5A051] transition-colors">
                <div className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center">
                  <Linkedin size={20} />
                </div>
              </a>
            </div>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Call For Papers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Paper Submission</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Registrations</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Committee</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Keynote speakers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#F5A051] transition-colors">Venue</a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="text-gray-300">
              <p className="mb-2">Society for Cyber Intelligent Systems</p>
              <p className="mb-2">Puducherry– India</p>
              <p className="mb-2">
                <span className="font-bold">Phone:</span> +91 9445690101
              </p>
              <p>
                <span className="font-bold">Email:</span> icmbnt2025@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400 text-sm">
            <p>© Copyright 2025. All Rights Reserved</p>
            <p>Society for Cyber Intelligent Systems</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

