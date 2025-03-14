import React, { useState, useRef } from "react";
import { 
  FaCloudUploadAlt, 
  FaFilePdf, 
  FaFileWord, 
  FaFileAlt, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaUser,
  FaEnvelope,
  FaHeading,
  FaFileAlt as FaFileTextIcon,
  FaQuoteRight,
  FaPaperPlane
} from "react-icons/fa";
import SubmitPaperForm from "./SubmitPaperForm";

const PaperSubmission = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Handler for submission success from the embedded form
  const handleSubmissionSuccess = () => {
    setSubmitSuccess(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Banner with decorative elements - Responsive adjustments */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-[#F5A051] text-white py-12 sm:py-16 md:py-24 overflow-hidden">
        {/* Decorative elements - Hide some on mobile */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 border-4 border-white rounded-full hidden sm:block"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 md:w-40 md:h-40 border-4 border-white rounded-full hidden sm:block"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 md:w-24 md:h-24 border-4 border-white transform -translate-y-1/2 hidden md:block"></div>
        </div>
        
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-12 md:w-16 h-1 bg-[#F5A051] mx-auto mb-2"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Paper Submission</h1>
            <div className="w-12 md:w-16 h-1 bg-[#F5A051] mx-auto mt-2"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light px-2">
            International Conference on Multidisciplinary Breakthroughs and NextGen Technologies
          </p>
        </div>
      </div>

      {/* Content Container - Responsive padding */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 relative">
        {/* Decorative side elements - Show only on larger screens */}
        <div className="hidden lg:block absolute top-20 left-0 w-32 border-t border-gray-200"></div>
        <div className="hidden lg:block absolute top-20 right-0 w-32 border-t border-gray-200"></div>
        
        <div className="max-w-4xl mx-auto">
          {/* Success message displayed if submission successful */}
          {submitSuccess && (
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg sm:shadow-xl border-t-4 border-green-500 mb-8 sm:mb-12 md:mb-16">
              <div className="text-center py-6 sm:py-8 px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <FaCheckCircle className="text-green-500 text-3xl sm:text-4xl" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Submission Successful!</h3>
                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-10 max-w-lg mx-auto">
                  Thank you for your submission. We have received your paper and will review it shortly. 
                  You will receive a confirmation email with further details.
                </p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-[#F5A051] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-[#e08c3e] transition-all duration-300 hover:shadow-lg text-base sm:text-lg font-medium"
                >
                  Submit Another Paper
                </button>
              </div>
            </div>
          )}

          {/* Introduction Section - Responsive padding and typography */}
          <section className="mb-8 sm:mb-12 md:mb-16 bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg sm:shadow-xl border-t-4 border-[#F5A051] transform transition-all hover:shadow-2xl">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center">
              <div className="bg-[#F5A051] w-10 h-10 rounded-full flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                <FaQuoteRight className="text-white text-lg" />
              </div>
              <span className="mt-1">Submit Your Research</span>
            </h2>
            
            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              We invite scholars, researchers, and professionals to contribute to the multidisciplinary discourse 
              by submitting their insightful papers and abstracts. Join us in building a platform that celebrates 
              diverse perspectives and fosters collaboration across a spectrum of research domains.
            </p>
            
            <div className="mt-6 sm:mt-8 bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg border-l-4 border-blue-800">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Instructions To Authors:</h3>
              <ol className="list-decimal pl-4 sm:pl-5 space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
                <li className="transition-all hover:translate-x-1">The length of the manuscript is restricted to <strong>12 pages</strong>. The text should be in double-column format. The first page of your submission should include the paper title, author name(s), affiliations, e-mail address and Keywords.</li>
                <li className="transition-all hover:translate-x-1">ICMBNT 2025 organizers regard plagiarism as a serious professional misconduct. All submissions will be screened for plagiarism and when identified, the submission by the same author will be rejected.</li>
                <li className="transition-all hover:translate-x-1">All manuscript that confirm to submission will be peer reviewed and evaluated based on originality, technical and / or research content/ depth, correctness, relevance to conference, contributions and readability.</li>
                <li className="transition-all hover:translate-x-1">Acceptance of manuscript will be communicated to authors by e-mail.</li>
                <li className="transition-all hover:translate-x-1">The authors of the accepted manuscripts will be allowed to make corrections in accordance with the suggestions of the reviewers and submit camera-ready paper within the stipulated deadline.</li>
                <li className="transition-all hover:translate-x-1">Accepted and registered manuscript will be included in the conference proceedings.</li>
                <li className="transition-all hover:translate-x-1">Authors must submit their manuscript to the Email - ID: 
                  <a href="mailto:icmbnt2025@gmail.com" className="ml-2 text-blue-800 font-medium hover:underline hover:text-[#F5A051] transition-colors">
                    icmbnt2025@gmail.com
                  </a>
                </li>
              </ol>
            </div>
          </section>
          
          {/* Important Note before Form */}
          <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Important:</span> To submit your paper, please fill out the form below. Make sure to include all required information and attach your paper in PDF or Word format. You'll receive a confirmation email once your submission is processed.
                </p>
              </div>
            </div>
          </div>

          {/* Paper Submission Form Section */}
          <section className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg sm:shadow-xl border-t-4 border-blue-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center">
              <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                <FaPaperPlane className="text-white text-lg" />
              </div>
              <span className="mt-1">Submit Your Paper</span>
            </h2>
            
            {/* Embedded SubmitPaperForm component */}
            <SubmitPaperForm 
              isOpen={true} 
              onClose={() => {}} 
              embedded={true} 
              onSubmissionSuccess={handleSubmissionSuccess} 
            />
          </section>
          
          {/* Additional information */}
          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">Contact for Submission Assistance</h3>
            <p className="mb-2">If you encounter any issues with the submission form, please contact:</p>
            <div className="flex items-center mt-3">
              <FaEnvelope className="text-blue-800 mr-2" />
              <a href="mailto:icmbnt2025@gmail.com" className="text-blue-800 hover:underline">
                icmbnt2025@gmail.com
              </a>
            </div>
          </div>

          {/* Footer section with quote - Responsive text sizing */}
          <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
            <blockquote className="italic text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              "Research is formalized curiosity. It is poking and prying with a purpose."
              <footer className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">— Zora Neale Hurston</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperSubmission;