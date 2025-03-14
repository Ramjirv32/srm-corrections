import  { useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { 
 
  FaFilePdf, 
 
  FaFileAlt, 
  FaCheckCircle, 
  FaExclamationTriangle,
  
  FaEnvelope,
  

  FaQuoteRight,
  FaPaperPlane,
  FaEdit,
  FaEye
} from "react-icons/fa";
import SubmitPaperForm from "./SubmitPaperForm";
import PageTransition from "./PageTransition";

interface Submission {
  submissionId: string;
  bookingId: string;
  paperTitle: string;
  authorName: string;
  category: string;
  topic: string;
  abstractFileUrl: string | null;
  status: string;
  submissionDate: string;
}

const PaperSubmission = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasExistingSubmission, setHasExistingSubmission] = useState(false);
  const [existingSubmission, setExistingSubmission] = useState<Submission | null>(null);
  const navigate = useNavigate();
  
  // Check for authentication and existing submission when component mounts
  useEffect(() => {
    const checkUserSubmission = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If not logged in, redirect to login
        Swal.fire({
          icon: 'info',
          title: 'Login Required',
          text: 'Please login to submit or edit your paper',
          confirmButtonColor: '#F5A051'
        }).then(() => {
          navigate('/login');
        });
        return;
      }
      
      try {
        // Check for existing submission
        const response = await axios.get('https://final-srm-back.vercel.app/user-submission', {
          headers: {
            'Authorization': token
          }
        });
        
        if (response.data.hasSubmission) {
          setHasExistingSubmission(true);
          setExistingSubmission(response.data.submission);
        }
      } catch (error) {
        console.error("Error fetching user submission:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUserSubmission();
  }, [navigate]);
  
  // Handler for submission success
  const handleSubmissionSuccess = () => {
    setSubmitSuccess(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  // Function to handle edit navigation
  const handleEditSubmission = () => {
    if (existingSubmission) {
      navigate(`/edit-submission/${existingSubmission.submissionId}`);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header Banner with decorative elements */}
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

        {/* Content Container */}
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 relative">
          {/* Decorative side elements */}
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
                    onClick={() => navigate('/dashboard')}
                    className="bg-[#F5A051] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-[#e08c3e] transition-all duration-300 hover:shadow-lg text-base sm:text-lg font-medium"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F5A051]"></div>
              </div>
            )}

            {/* Introduction Section */}
            {!loading && !submitSuccess && (
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
                    <li className="transition-all hover:translate-x-1">The length of the manuscript is restricted to <strong>12 pages</strong>. The text should be in double-column format.</li>
                    <li className="transition-all hover:translate-x-1">ICMBNT 2025 organizers regard plagiarism as a serious professional misconduct.</li>
                    <li className="transition-all hover:translate-x-1">All manuscript will be peer reviewed and evaluated based on originality, technical and research content.</li>
                    <li className="transition-all hover:translate-x-1">Acceptance of manuscript will be communicated to authors by e-mail.</li>
                    <li className="transition-all hover:translate-x-1">Accepted and registered manuscript will be included in the conference proceedings.</li>
                  </ol>
                </div>
              </section>
            )}

            {/* Existing Submission Section */}
            {!loading && hasExistingSubmission && existingSubmission && !submitSuccess && (
              <section className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg sm:shadow-xl border-t-4 border-blue-800 mb-8">
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <div className="flex items-center">
                    <FaExclamationTriangle className="text-blue-600 mr-3 flex-shrink-0" />
                    <p className="text-blue-700">
                      You already have an existing submission. You can view and edit it below.
                    </p>
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaFileAlt className="text-blue-800 mr-3" />
                  Your Existing Submission
                </h2>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Submission ID</p>
                      <p className="text-gray-800 font-medium">{existingSubmission.submissionId}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Booking ID</p>
                      <p className="text-gray-800 font-medium">{existingSubmission.bookingId}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Paper Title</p>
                      <p className="text-gray-800 font-medium">{existingSubmission.paperTitle}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Author Name</p>
                      <p className="text-gray-800 font-medium">{existingSubmission.authorName}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Category</p>
                      <p className="text-gray-800 font-medium">{existingSubmission.category}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Status</p>
                      <p>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {existingSubmission.status}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Submission Date</p>
                      <p className="text-gray-800 font-medium">{formatDate(existingSubmission.submissionDate)}</p>
                    </div>
                    
                    {existingSubmission.topic && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Topic</p>
                        <p className="text-gray-800 font-medium">{existingSubmission.topic}</p>
                      </div>
                    )}
                  </div>
                  
                  {existingSubmission.abstractFileUrl && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-500 text-sm mb-2">Submitted File</p>
                      <div className="flex items-center">
                        <FaFilePdf className="text-red-500 mr-2" />
                        <span className="text-gray-800">Abstract/Paper File</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <button 
                    onClick={handleEditSubmission}
                    className="bg-[#F5A051] text-white px-6 py-3 rounded-md hover:bg-[#e08c3e] transition-all duration-300 flex items-center justify-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit Submission
                  </button>
                  
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaEye className="mr-2" />
                    View in Dashboard
                  </button>
                </div>
              </section>
            )}

            {/* Paper Submission Form Section - Only show if no existing submission */}
            {!loading && !hasExistingSubmission && !submitSuccess && (
              <>
                {/* Important Note before Form */}
                <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <span className="font-medium">Important:</span> To submit your paper, please fill out the form below. Make sure to include all required information and attach your paper in PDF or Word format.
                      </p>
                    </div>
                  </div>
                </div>

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
              </>
            )}
            
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

            {/* Footer section with quote */}
            <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
              <blockquote className="italic text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                "Research is formalized curiosity. It is poking and prying with a purpose."
                <footer className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">— Zora Neale Hurston</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PaperSubmission;