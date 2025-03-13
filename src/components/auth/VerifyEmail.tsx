import  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import PageTransition from '../PageTransition';

const VerifyEmail: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: 'Verifying your email...'
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        // Get the encoded data from URL
        const params = new URLSearchParams(location.search);
        const encodedData = params.get('data');
        
        if (!encodedData) {
          throw new Error('Verification data is missing');
        }
        
        // Decode the base64 data
        const decodedString = atob(encodedData);
        const verificationData = JSON.parse(decodedString);
        
        console.log("Decoded verification data:", {
          token: verificationData.token ? `${verificationData.token.substring(0, 10)}...` : 'missing',
          email: verificationData.email || 'missing',
          timestamp: verificationData.timestamp ? new Date(verificationData.timestamp).toLocaleString() : 'missing'
        });
        
        // Send verification request to server
        const apiUrl = import.meta.env.VITE_API_URL || 'https://srm-back.vercel.app';
        const response = await axios.post(`${apiUrl}/verify-email-token`, {
          token: verificationData.token,
          email: verificationData.email
        });
        
        if (response.data.success) {
          setVerificationStatus({
            success: true,
            message: 'Your email has been verified successfully!'
          });
          
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Email Verified',
            text: 'Your email has been verified successfully. You can now log in.',
            confirmButtonColor: '#F5A051'
          }).then(() => {
            navigate('/login');
          });
        } else {
          throw new Error(response.data.message || 'Verification failed');
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        
      
        // Show error message
       
        navigate('/login');
      
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmailToken();
  }, [location, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          {isVerifying ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F5A051] mx-auto"></div>
              <p className="mt-4 text-lg">Verifying your email address...</p>
            </>
          ) : (
            <>
              <div className={`rounded-full h-16 w-16 flex items-center justify-center mx-auto ${
                verificationStatus.success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {verificationStatus.success ? (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h2 className={`mt-4 text-xl font-bold ${
                verificationStatus.success ? 'text-green-600' : 'text-red-600'
              }`}>
                {verificationStatus.success ? 'Verification Successful' : 'Verification Failed'}
              </h2>
              <p className="mt-2 text-gray-600">{verificationStatus.message}</p>
              <button 
                onClick={() => navigate('/login')}
                className="mt-6 px-4 py-2 bg-[#F5A051] text-white rounded-md hover:bg-[#e08c3e]"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default VerifyEmail;
