import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'react-feather';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTransition from '../PageTransition';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
<<<<<<< HEAD


    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      console.log("Found token in URL:", token);
      setIsVerifying(true);
      verifyEmail(token);
    }
  }, [location]);



  const verifyEmail = async (token: string) => {
    try {
      setVerificationStatus({});
      const apiUrl = import.meta.env.VITE_API_URL || 'https://srm-back.vercel.app';
      
      // Log request details for debugging
      console.log(`Sending verification request to ${apiUrl}/verify-email with token: ${token}`);
      
      const response = await axios.get(`https://srm-back.vercel.app/verify-email`, {
        params: { token }
      });
      
      console.log("Verification API response:", response.data);
      
      if (response.data.success) {
        setVerificationStatus({
          success: true,
          message: response.data.message || 'Email verified successfully!'
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Email Verified',
          text: 'Your email has been verified successfully. You can now log in.',
          confirmButtonColor: '#F5A051'
        });
      } else {
        throw new Error(response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      console.error("Verification error details:", {
        error,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // setVerificationStatus({
      //   success: false,
      //   message: error.response?.data?.message || 'Invalid or expired verification link'
      // });
      
     
    } finally {
      setIsVerifying(false);
      // Remove the token from URL to avoid confusion if page is refreshed
      window.history.replaceState({}, document.title, '/login');
    }
  };
=======
  }, []);
>>>>>>> 6ad456a682a69322268e1514e86fbd275b88bad9

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

<<<<<<< HEAD
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://srm-back.vercel.app';
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password
      });

      // If login was successful but verification is needed
      if (response.data.needsVerification) {
        Swal.fire({
          icon: 'warning',
          title: 'Email Not Verified',
          text: 'Please verify your email before logging in',
          confirmButtonColor: '#F5A051',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Resend Verification Email'
        }).then((result) => {
          if (result.isConfirmed) {
            resendVerificationEmail(email);
          }
        });
        setIsLoading(false);
        return;
      }

      // If login was successful and user is verified
      if (response.data.success && response.data.verified) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          email: response.data.email,
          username: response.data.username
        }));
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You are now logged in',
          timer: 1500,
          showConfirmButton: false
        });

        navigate('/dashboard');
        window.location.reload();
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error("Login error:", error);
=======
    // Simulate loading for a better UX
    setTimeout(() => {
      // For now, skip backend integration and just navigate to dashboard
      localStorage.setItem('token', 'temporary-mock-token');
      localStorage.setItem('user', JSON.stringify({
        email: email || 'user@example.com',
        username: email ? email.split('@')[0] : 'user'
      }));
>>>>>>> 6ad456a682a69322268e1514e86fbd275b88bad9
      
      navigate('/');
      window.location.reload();
      // No need to reload the whole page
      setIsLoading(false);
    }, 800);
  };

<<<<<<< HEAD
  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://srm-back.vercel.app';
      const response = await axios.post(`${apiUrl}/resend-verification`, { email });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Verification Email Sent',
          text: 'Please check your inbox and follow the verification link',
          confirmButtonColor: '#F5A051'
        });
      } else {
        throw new Error(response.data.message || 'Failed to send verification email');
      }
    } catch (error: any) {
      console.error("Resend verification error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Resend',
        text: error.response?.data?.message || 'Could not send verification email',
        confirmButtonColor: '#F5A051'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Reset Password',
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'Email',
      confirmButtonColor: '#F5A051',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your email';
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'https://srm-back.vercel.app'}/forgot-password`, {
            email: result.value
          });
          
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'OTP Sent',
              text: 'Check your email for the password reset OTP',
              confirmButtonColor: '#F5A051'
            });
            
            // Show OTP input dialog
            setTimeout(() => {
              promptForOTP(result.value);
            }, 1000);
          }
        } catch (error:any ) {
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: error.response?.data?.message || 'Failed to send password reset email',
            confirmButtonColor: '#F5A051'
          });
        }
      }
    });
  };

  const promptForOTP = (email:any ) => {
    Swal.fire({
      title: 'Enter OTP',
      input: 'text',
      inputLabel: 'OTP sent to your email',
      inputPlaceholder: '6-digit OTP',
      confirmButtonColor: '#F5A051',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter the OTP';
        }
        if (value.length !== 6 || !/^\d+$/.test(value)) {
          return 'OTP must be 6 digits';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        promptForNewPassword(email, result.value);
      }
    });
  };

  const promptForNewPassword = (email:any , otp:any) => {
    Swal.fire({
      title: 'New Password',
      input: 'password',
      inputLabel: 'Enter your new password',
      inputPlaceholder: 'Password',
      confirmButtonColor: '#F5A051',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a new password';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters long';
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'https://srm-back.vercel.app'}/reset-password`, {
            email,
            otp,
            newPassword: result.value
          });
          
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Password Reset Successful',
              text: 'You can now log in with your new password',
              confirmButtonColor: '#F5A051'
            });
          }
        } catch (error:any ) {
          Swal.fire({
            icon: 'error',
            title: 'Reset Failed',
            text: error.response?.data?.message || 'Invalid or expired OTP',
            confirmButtonColor: '#F5A051'
          });
        }
      }
    });
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F5A051] mx-auto"></div>
          <p className="mt-4 text-lg">Verifying your email address...</p>
        </div>
      </div>
    );
  }

=======
>>>>>>> 6ad456a682a69322268e1514e86fbd275b88bad9
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-r from-red-50 to gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* Add demo notice */}
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800 text-center">
                <strong>Demo Mode:</strong> Enter any email and password to continue to dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-[#F5A051]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A051] focus:border-[#F5A051]"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#F5A051] focus:ring-[#F5A051] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  className="text-sm font-medium text-[#F5A051] hover:text-[#e08c3e]"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F5A051] ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e08c3e]'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A051]`}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Sign up link section */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/signin"
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A051]"
                >
                  Create a new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;