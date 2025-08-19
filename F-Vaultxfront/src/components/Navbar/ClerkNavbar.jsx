// src/components/Navbar/ClerkNavbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClerkNavbar = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const email = localStorage.getItem('email') || '';
    setUser({ firstName, lastName, email });

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 shadow-xl px-3 sm:px-6 py-2 flex justify-between items-center sticky top-0 z-40 backdrop-blur-sm border-b border-indigo-700/30">
      {/* Title */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xs">C</span>
        </div>
        <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">
          <span className="hidden sm:inline">Clerk Dashboard</span>
          <span className="sm:hidden">Clerk</span>
        </h1>
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-3 focus:outline-none group transition-all duration-200 hover:scale-105"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center gap-1 bg-indigo-800/30 rounded-full px-2 py-1 border border-indigo-600/30 group-hover:bg-indigo-700/40 transition-all duration-200">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold uppercase shadow-lg ring-2 ring-indigo-400/30 text-xs sm:text-sm">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-white font-medium text-xs leading-tight">{user.firstName} {user.lastName}</p>
              <p className="text-indigo-300 text-xs leading-tight">Clerk</p>
            </div>
            <svg 
              className={`w-4 h-4 text-indigo-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 w-64 sm:w-72 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden z-50 border border-gray-200/50 animate-in slide-in-from-top-2 duration-200">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-gray-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-bold uppercase shadow-md text-sm sm:text-base">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-indigo-600 font-medium">Clerk</p>
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-all duration-200 group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClerkNavbar;
