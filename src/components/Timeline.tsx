import React from 'react';
import { Calendar } from 'lucide-react';

const Timeline = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#F5A051]">Important Dates</h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#F5A051]/20"></div>

          {/* Timeline items */}
          <div className="space-y-16">
            {/* Item 1 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-4 h-4 rounded-full bg-[#F5A051]"></div>
              <div className="ml-auto mr-8 md:mr-16 w-full md:w-5/12 bg-white rounded-lg shadow-md p-5 relative">
                <div className="flex items-center text-[#F5A051] mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">31.1.2025</span>
                </div>
                <h3 className="font-bold text-gray-800">Abstract Submission Deadline</h3>
                <p className="text-sm text-gray-600 mt-1">Last day to submit your research abstract</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-4 h-4 rounded-full bg-[#F5A051]"></div>
              <div className="mr-auto ml-8 md:ml-16 w-full md:w-5/12 bg-white rounded-lg shadow-md p-5 relative">
                <div className="flex items-center text-[#F5A051] mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">15.2.2025</span>
                </div>
                <h3 className="font-bold text-gray-800">Notification of Acceptance</h3>
                <p className="text-sm text-gray-600 mt-1">Authors will be notified of acceptance decisions</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-4 h-4 rounded-full bg-[#F5A051]"></div>
              <div className="ml-auto mr-8 md:mr-16 w-full md:w-5/12 bg-white rounded-lg shadow-md p-5 relative">
                <div className="flex items-center text-[#F5A051] mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">15.3.2025</span>
                </div>
                <h3 className="font-bold text-gray-800">Full Paper Submission</h3>
                <p className="text-sm text-gray-600 mt-1">Last day to submit your research papers</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-4 h-4 rounded-full bg-[#F5A051]"></div>
              <div className="mr-auto ml-8 md:ml-16 w-full md:w-5/12 bg-white rounded-lg shadow-md p-5 relative">
                <div className="flex items-center text-[#F5A051] mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">10.4.2025</span>
                </div>
                <h3 className="font-bold text-gray-800">Registration Deadline</h3>
                <p className="text-sm text-gray-600 mt-1">Registration Date for the conference</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;