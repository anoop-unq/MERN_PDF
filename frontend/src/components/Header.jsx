import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { FaFilePdf, FaDownload, FaSearch, FaUserTie, FaNetworkWired, FaChartLine, FaStar } from "react-icons/fa";
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { userdata } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isNewUser, setIsNewUser] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  
  useEffect(() => {
    // Check localStorage for signup flag
    const justSignedUp = localStorage.getItem('justSignedUp') === 'true';
    const justLoggedIn = localStorage.getItem('justLoggedIn') === 'true';
    
    if (justSignedUp) {
      setIsNewUser(true);
      localStorage.removeItem('justSignedUp');
    } else if (justLoggedIn) {
      setIsReturningUser(true);
      localStorage.removeItem('justLoggedIn');
    }
  }, [userdata]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[80vh] flex items-center">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-200/20 rounded-full filter blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content Section */}
          <div className="space-y-8">
            {/* Greeting */}
            <div className="flex items-center gap-3 animate-fadeIn mt-5">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaUserTie className="text-blue-600 text-xl md:text-2xl" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-7">
                {userdata?.user?.isGuest ? "Welcome, Guest!" : 
                 isNewUser ? `Welcome to ResumeShare, ${userdata?.user?.name?.split(' ')[0]}!` : 
                 isReturningUser ? `Great to see you again, ${userdata?.user?.name?.split(' ')[0]}!` :
                 userdata ? `Welcome back, ${userdata?.user?.name?.split(' ')[0]}!` : 
                 "Your Professional Resume Sharing Platform"}
              </h4>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Share Your Resume.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block"> Get Discovered.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
              {userdata?.user?.isGuest ? "Preview how professionals share resumes and connect with recruiters in our platform." :
               isNewUser ? "Upload your resume, showcase your skills, and connect with top employers and recruiters." :
               isReturningUser ? "Continue your job search journey with new opportunities waiting for you." :
               "Join thousands of professionals sharing resumes and connecting with opportunities worldwide."}
            </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
  {/* First Stats Card */}
  <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
    <div className="flex items-center gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md">
        <FaFilePdf className="text-white text-2xl" />
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800 font-poppins">100+</p>
        <p className="text-sm text-gray-600 mt-1 font-inter">Resumes Shared</p>
      </div>
    </div>
  </div>

  {/* Second Stats Card with Link */}
  <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
    <div className="flex items-center gap-4">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-md">
        <FaNetworkWired className="text-white text-2xl" />
      </div>
      <div className="flex-1">
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 font-poppins">Shared Resumes</p>
        <Link 
          to="/all-resumes" 
          className="inline-block mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-inter"
        >
          View All Resumes
        </Link>
      </div>
    </div>
  </div>
</div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                {
                  icon: <FaFilePdf className="text-blue-500 text-xl" />,
                  title: "PDF Resume Sharing",
                  desc: "Upload and share your resume in professional format",
                },
                {
                  icon: <FaSearch className="text-indigo-500 text-xl" />,
                  title: "Recruiter Discovery",
                  desc: "Get discovered by top companies and recruiters",
                },
                {
                  icon: <FaNetworkWired className="text-purple-500 text-xl" />,
                  title: "Professional Network",
                  desc: "Connect with industry professionals",
                },
                {
                  icon: <FaChartLine className="text-green-500 text-xl" />,
                  title: "Career Growth",
                  desc: "Find opportunities that match your skills",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {userdata?.user?.isGuest ? (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Create Professional Profile
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate(userdata ? "/home" : "/signup")}
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isReturningUser ? "Browse Opportunities" :
                     userdata ? "Upload Your Resume" : "Get Started - Free"}
                  </button>
                  {!userdata && (
                    <button
                      onClick={() => navigate("/login")}
                      className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50"
                    >
                      Existing User? Login
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Image Section */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional resume sharing platform"
                className="w-full max-w-md xl:max-w-lg rounded-2xl shadow-2xl border-4 border-white transform hover:scale-[1.01] transition duration-500"
              />
              
              {/* Floating elements */}
              {userdata?.user?.isGuest && (
                <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 animate-float-delay">
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <FaStar className="text-yellow-600 text-sm" />
                    </div>
                    <span className="font-medium text-sm">Guest Preview</span>
                  </div>
                </div>
              )}
              
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 animate-float">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaDownload className="text-green-600 text-sm" />
                  </div>
                  <span className="font-medium text-sm">500+ Resumes Shared Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;