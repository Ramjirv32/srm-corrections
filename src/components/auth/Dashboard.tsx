import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert2';
import { FiEdit, FiFileText, FiCheckCircle, FiCalendar, FiClock } from 'react-icons/fi';
import PageTransition from '../PageTransition';

interface Submission {
  submissionId: string;
  bookingId: string;
  paperTitle: string;
  category: string;
  topic: string;
  status: string;
  submissionDate: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{email?: string, username?: string}>({});
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    // Remove authentication check
    // if (!token) {
    //   navigate('/login');
    //   return;
    // }

    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
          
          // Fetch user's submission status if token exists
          if (token) {
            fetchUserSubmission(token);
          } else {
            setLoading(false);
          }
        } else {
          throw new Error('Invalid user data format');
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        // Clear invalid data but don't navigate away
        localStorage.removeItem('user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [navigate]);
  
  const fetchUserSubmission = async (token: string) => {
    try {
      const response = await axios.get('https://final-srm-back.vercel.app/user-submission', {
        headers: {
          'Authorization': token
        }
      });
      
      if (response.data.hasSubmission) {
        setSubmission(response.data.submission);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching submission data:", error);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditSubmission = () => {
    if (submission) {
      console.log("Navigating to edit page with ID:", submission.submissionId);
      // Use absolute path to avoid relative path issues
      navigate(`/edit-submission/${submission.submissionId}`);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F5A051]"></div>
            </div>
          ) : (
            <>
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-lg text-gray-600">
                  {user.username ? 
                    `Welcome back, ${user.username}!` : 
                    <span>
                      Welcome! Please <Link to="/login" className="text-[#F5A051] hover:underline">login</Link> to see your submissions.
                    </span>
                  }
                </p>
              </header>

              {submission ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                  <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Your Paper Submission
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Details and status of your submitted paper
                      </p>
                    </div>
                    <button
                      onClick={handleEditSubmission}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A051]"
                    >
                      <FiEdit className="mr-2 -ml-0.5 h-4 w-4" />
                      Edit Submission
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiFileText className="mr-2" /> Paper Title
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {submission.paperTitle}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiCheckCircle className="mr-2" /> Status
                        </dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {submission.status}
                          </span>
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiCalendar className="mr-2" /> Submission Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {formatDate(submission.submissionDate)}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Category</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {submission.category}
                        </dd>
                      </div>
                      {submission.topic && (
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Topic</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {submission.topic}
                          </dd>
                        </div>
                      )}
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Submission ID</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {submission.submissionId}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Booking ID</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                          {submission.bookingId}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <div className="text-center py-8">
                    <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-xl font-medium text-gray-900">
                      {localStorage.getItem('token') ?
                        "No paper submissions yet" :
                        "Please log in to view your submissions"
                      }
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {localStorage.getItem('token') ?
                        "You haven't submitted any papers for the conference." :
                        "You need to be logged in to submit and view papers."
                      }
                    </p>
                    <div className="mt-6">
                      {localStorage.getItem('token') ? (
                        <Link
                          to="/submit-paper"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F5A051] hover:bg-[#e08c3e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A051]"
                        >
                          Submit a Paper
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F5A051] hover:bg-[#e08c3e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A051]"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Info cards section - always show these regardless of login status */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <FiFileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dt className="text-lg font-medium text-gray-900 truncate">Submit a Paper</dt>
                        <dd className="mt-1 text-sm text-gray-500">Submit your abstract or full paper</dd>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link to="/submit-paper" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Submit now &rarr;</Link>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <FiFileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dt className="text-lg font-medium text-gray-900 truncate">Paper Guidelines</dt>
                        <dd className="mt-1 text-sm text-gray-500">View submission format and requirements</dd>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a href="/call-for-papers" className="text-sm font-medium text-green-600 hover:text-green-500">View guidelines &rarr;</a>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-[#F5A051] rounded-md p-3">
                        <FiClock className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dt className="text-lg font-medium text-gray-900 truncate">Important Dates</dt>
                        <dd className="mt-1 text-sm text-gray-500">Key deadlines for the conference</dd>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a href="#" className="text-sm font-medium text-[#F5A051] hover:text-[#e08c3e]">View dates &rarr;</a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;