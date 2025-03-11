import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import { auth } from "../config/firebase"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { Mail, Lock } from 'react-feather'; 
import PageTransition from '../PageTransition';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please enter email and password',
          timer: 2000,
        });
        return;
      }

      const response = await fetch('https://lynx-fun-normally.ngrok-free.app/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Please check your email to verify your account',
          timer: 2000,
        });
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } else {
        // Check if error is due to existing user
        if (data.message && data.message.includes("User already exists")) {
          Swal.fire({
            icon: 'info',
            title: 'Account Already Exists',
            text: 'An account with this email already exists. Redirecting you to login.',
            timer: 3000,
            showConfirmButton: false
          });
          
          // Redirect to login page after a short delay
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Signup Failed',
            text: data.message || 'Unable to create account',
            timer: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Error in connecting:", error);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Unable to connect to the server. Please try again.',
        timer: 2000,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const result = await signInWithPopup(auth, provider);
      
      const response = await axios.post(`https://lynx-fun-normally.ngrok-free.app/signin`, {
        email: result.user.email,
        password: result.user.uid
      });


      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Signed in with Google!',
          text: `Please Login to continue`,
          timer: 1500,
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        navigate('/membership-form');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google Sign-In Failed',
        text: getErrorMessage(error),
        timer: 3000,
      });
    }
  };

  const getErrorMessage = (error: any) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Response:", error.response);
      return `API Error: ${error.response?.data?.message || error.message}`;
    }
    
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled. Please contact the administrator.';
      case 'auth/popup-blocked':
        return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'The sign-in popup was closed before authentication could complete. Please try again.';
      default:
        return `An unexpected error occurred: ${error.message}. Please try again.`;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-150 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto" data-aos="fade-up">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
              <p className="text-gray-600">Join our community today</p>
            </div>

            <div className="mb-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Sign up with Google
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#F5A051] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#F5A051] hover:text-[#e08c3e]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}