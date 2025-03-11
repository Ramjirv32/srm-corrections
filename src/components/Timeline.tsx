import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const timelineData = [
  {
    date: "15.3.2025",
    title: "Manuscript Submission Deadline",
    description: "Last day to submit your research papers",
  },
  {
    date: "25.3.2025",
    title: "Acceptance",
    description: "Authors will be notified of acceptance decisions",
  },
  {
    date: "5.4.2025",
    title: "Registration Date",
    description: "Registration Date for the conference",
  },
  {
    date: "26.4.2025 & 27.4.2025",
    title: "Conference Date",
    description: "ICMBNT begins",
  },
];

const Timeline = () => {
  return (
    <div className="flex flex-col items-center w-full py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#F5A051]">Important Dates</h2>
      <div className="relative w-full max-w-2xl px-4">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#F5A051]/20 via-[#F5A051] to-[#F5A051]/20"></div>
        
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`relative mb-16 flex items-center w-full`}
          >
            {index % 2 === 0 ? (
              <>
                <div className="w-1/2 flex justify-end px-4">
                  <div 
                    className="bg-white shadow-lg p-5 rounded-lg w-64 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-l-4 hover:border-[#F5A051] group"
                  >
                    <div className="flex items-center text-[#F5A051] font-semibold mb-2 group-hover:text-[#e08c3e] transition-colors">
                      <FaCalendarAlt className="mr-2" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-[#F5A051] transition-colors">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#F5A051] rounded-full z-10 shadow-lg hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="w-1/2"></div>
              </>
            ) : (
              <>
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#F5A051] rounded-full z-10 shadow-lg hover:scale-110 transition-transform duration-300"></div>
                </div>
                <div className="w-1/2 flex justify-start px-4">
                  <div 
                    className="bg-white shadow-lg p-5 rounded-lg w-64 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-r-4 hover:border-[#F5A051] group"
                  >
                    <div className="flex items-center text-[#F5A051] font-semibold mb-2 group-hover:text-[#e08c3e] transition-colors">
                      <FaCalendarAlt className="mr-2" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-[#F5A051] transition-colors">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;