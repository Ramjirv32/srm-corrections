import React, { useState, useRef } from "react";
import { FaCloudUploadAlt, FaFilePdf, FaFileWord, FaFileAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

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
      
      // Check if file is PDF or Word document
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 to-[#F5A051] text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Paper Submission</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            International Conference on Multidisciplinary Breakthroughs and NextGen Technologies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Section */}
          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#F5A051] mb-6">Submit Your Research</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We invite scholars, researchers, and professionals to contribute to the multidisciplinary discourse 
              by submitting their insightful papers and abstracts. Join us in building a platform that celebrates 
              diverse perspectives and fosters collaboration across a spectrum of research domains. Submit your 
              work and be a part of the transformative dialogue at ICMBNT 2025.
            </p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Instructions To Authors:</h3>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li>The length of the manuscript is restricted to <strong>12 pages</strong>. The text should be in double-column format. The first page of your submission should include the paper title, author name(s), affiliations, e-mail address and Keywords.</li>
                <li>ICMBNT 2025 organizers regard plagiarism as a serious professional misconduct. All submissions will be screened for plagiarism and when identified, the submission by the same author will be rejected.</li>
                <li>All manuscript that confirm to submission will be peer reviewed and evaluated based on originality, technical and / or research content/ depth, correctness, relevance to conference, contributions and readability.</li>
                <li>Acceptance of manuscript will be communicated to authors by e-mail.</li>
                <li>The authors of the accepted manuscripts will be allowed to make corrections in accordance with the suggestions of the reviewers and submit camera-ready paper within the stipulated deadline.</li>
                <li>Accepted and registered manuscript will be included in the conference proceedings.</li>
                <li>Authors must submit their manuscript to the Email - ID: <a href="mailto:icmbnt2025@gmail.com" className="text-[#F5A051] hover:underline">icmbnt2025@gmail.com</a></li>
              </ol>
            </div>
          </section>

          {/* Submission Form Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            {submitSuccess ? (
              <div className="text-center py-12">
                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Submission Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your submission. We have received your paper and will review it shortly. 
                  You will receive a confirmation email with further details.
                </p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-[#F5A051] text-white px-6 py-3 rounded-md hover:bg-[#e08c3e] transition-colors duration-300"
                >
                  Submit Another Paper
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#F5A051] mb-6">Submission Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Paper Title */}
                  <div>
                    <label htmlFor="paperTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Paper Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="paperTitle"
                      name="paperTitle"
                      value={formData.paperTitle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent"
                      placeholder="Enter your paper title"
                    />
                  </div>

                  {/* Abstract */}
                  <div>
                    <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-1">
                      Abstract <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="abstract"
                      name="abstract"
                      value={formData.abstract}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-transparent"
                      placeholder="Enter your paper abstract"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Paper (PDF or Word) <span className="text-red-500">*</span>
                    </label>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors cursor-pointer" onClick={triggerFileInput}>
                      <div className="space-y-2 text-center">
                        {file ? (
                          <div className="flex flex-col items-center">
                            {getFileIcon()}
                            <p className="text-gray-700 mt-2">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <FaCloudUploadAlt className="text-[#F5A051] text-4xl" />
                            <p className="text-sm text-gray-600">
                              Click to upload your paper
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF or Word up to 10MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {fileError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <FaExclamationTriangle className="mr-1" /> {fileError}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F5A051] hover:bg-[#e08c3e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A051] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        </div>
      </div>
    </div>
  );
};

export default PaperSubmission;