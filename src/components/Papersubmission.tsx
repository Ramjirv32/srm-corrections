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
  FaQuoteRight
} from "react-icons/fa";

const PaperSubmission = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    paperTitle: "",
    abstract: ""
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;
      
      if (fileType === "application/pdf" || 
          fileType === "application/msword" || 
          fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
        setFileError("");
      } else {
        setFile(null);
        setFileError("Please upload a valid PDF or Word document");
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setFileError("Please upload your paper");
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", formData);
      console.log("File:", file);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormData({
        fullName: "",
        email: "",
        paperTitle: "",
        abstract: ""
      });
      setFile(null);
      
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return <FaFileAlt className="text-gray-400 text-4xl" />;
    
    const fileType = file.type;
    if (fileType === "application/pdf") {
      return <FaFilePdf className="text-red-500 text-4xl" />;
    } else {
      return <FaFileWord className="text-blue-500 text-4xl" />;
    }
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

          {/* Submission Form Section - Responsive adjustments */}
          <section className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg sm:shadow-xl border-t-4 border-blue-800">
            {submitSuccess ? (
              <div className="text-center py-8 sm:py-12 md:py-16 px-4">
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
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                    <FaFileTextIcon className="text-white text-lg" />
                  </div>
                  <span className="mt-1">Submission Form</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="fullName" className="flex items-center text-gray-700 text-base sm:text-lg font-medium mb-2">
                      <FaUser className="mr-2 text-blue-800" />
                      Full Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent transition-all text-gray-700 bg-gray-50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="form-group">
                    <label htmlFor="email" className="flex items-center text-gray-700 text-base sm:text-lg font-medium mb-2">
                      <FaEnvelope className="mr-2 text-blue-800" />
                      Email Address <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent transition-all text-gray-700 bg-gray-50"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Paper Title */}
                  <div className="form-group">
                    <label htmlFor="paperTitle" className="flex items-center text-gray-700 text-base sm:text-lg font-medium mb-2">
                      <FaHeading className="mr-2 text-blue-800" />
                      Paper Title <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="paperTitle"
                      name="paperTitle"
                      value={formData.paperTitle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent transition-all text-gray-700 bg-gray-50"
                      placeholder="Enter your paper title"
                    />
                  </div>

                  {/* Abstract */}
                  <div className="form-group">
                    <label htmlFor="abstract" className="flex items-center text-gray-700 text-base sm:text-lg font-medium mb-2">
                      <FaFileAlt className="mr-2 text-blue-800" />
                      Abstract <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="abstract"
                      name="abstract"
                      value={formData.abstract}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent transition-all text-gray-700 bg-gray-50"
                      placeholder="Enter your paper abstract"
                    />
                  </div>

                  {/* File Upload - Improved for touch devices */}
                  <div className="form-group">
                    <label className="flex items-center text-gray-700 text-base sm:text-lg font-medium mb-2">
                      <FaCloudUploadAlt className="mr-2 text-blue-800" />
                      Upload Paper (PDF or Word) <span className="text-red-500 ml-1">*</span>
                    </label>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    
                    <div 
                      className={`mt-2 flex justify-center px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-8 border-2 border-dashed ${fileError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'} rounded-md hover:border-[#F5A051] transition-colors cursor-pointer group`}
                      onClick={triggerFileInput}
                    >
                      <div className="space-y-2 sm:space-y-3 text-center">
                        {file ? (
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-100 rounded-full mb-2 group-hover:scale-110 transition-transform">
                              {getFileIcon()}
                            </div>
                            <p className="text-gray-800 font-medium mt-1 sm:mt-2 text-sm sm:text-lg group-hover:text-[#F5A051] transition-colors">
                              {file.name.length > 25 ? `${file.name.substring(0, 25)}...` : file.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                              <FaCloudUploadAlt className="text-[#F5A051] text-2xl sm:text-3xl" />
                            </div>
                            <p className="text-gray-700 font-medium text-sm sm:text-base group-hover:text-[#F5A051] transition-colors">
                              Click to upload your paper
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                              PDF or Word up to 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {fileError && (
                      <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                        <FaExclamationTriangle className="mr-1" /> {fileError}
                      </p>
                    )}
                  </div>

                  {/* Submit Button - Responsive sizing */}
                  <div className="pt-4 sm:pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-3 sm:py-4 px-4 sm:px-6 border border-transparent rounded-md shadow-md sm:shadow-lg text-base md:text-lg font-medium text-white bg-gradient-to-r from-blue-800 to-[#F5A051] hover:from-[#F5A051] hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A051] transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : "Submit Paper"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </section>

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