import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, BookOpen, Target, Compass, Globe } from 'lucide-react';

// Define the Conference component
const home: React.FC = () => {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  // Calculate days left until conference
  useEffect(() => {
    const conferenceDate = new Date('2025-04-26');
    const today = new Date();
    const diffTime = conferenceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays > 0 ? diffDays : 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white">
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
          
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg">
            REGISTER NOW
          </button>
          
          {daysLeft > 0 && (
            <p className="mt-4 text-lg">
              {daysLeft} days left until the conference
            </p>
          )}
        </div>
      </div>

      {/* Society Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-800">
            Society for Cyber Intelligent Systems
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-purple-700 mr-3" />
                <h3 className="text-2xl font-bold text-purple-800">Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The Vision of the society is to be a global leader in advancing cybersecurity and intelligent
                systems by fostering innovation, research, and collaboration, ensuring a secure and resilient
                digital future for all.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Compass className="w-8 h-8 text-purple-700 mr-3" />
                <h3 className="text-2xl font-bold text-purple-800">Mission</h3>
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
            <Globe className="w-10 h-10 text-purple-700 mr-4" />
            <h2 className="text-3xl font-bold text-purple-800">SCOPE OF THE CONFERENCE</h2>
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

      {/* Important Dates Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">Important Dates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DateCard 
              date="31" 
              month="JAN" 
              year="2025" 
              title="Abstract Submission Deadline"
            />
            <DateCard 
              date="15" 
              month="FEB" 
              year="2025" 
              title="Notification of Acceptance"
            />
            <DateCard 
              date="15" 
              month="MAR" 
              year="2025" 
              title="Full Paper Submission"
            />
            <DateCard 
              date="10" 
              month="APR" 
              year="2025" 
              title="Registration Deadline"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="mb-2">Society for Cyber Intelligent Systems, Puducherry, India</p>
          <p className="mb-2">Email: contact@icmbnt2025.org</p>
          <p className="mb-4">Phone: +91 XXXXXXXXXX</p>
          <p className="text-sm mt-8">© 2025 ICMBNT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Date card component
interface DateCardProps {
  date: string;
  month: string;
  year: string;
  title: string;
}

const DateCard: React.FC<DateCardProps> = ({ date, month, year, title }) => {
  return (
    <div className="flex flex-col bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-700 text-white p-4 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{date}</span>
        <span className="text-sm">{month} {year}</span>
      </div>
      <div className="p-4 text-center">
        <span className="font-medium">{title}</span>
      </div>
    </div>
  );
};

export default home;

