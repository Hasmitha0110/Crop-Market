import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { isAuthenticated, name, logout } = useAuth();

  const activeClass = ({ isActive }) =>
    isActive 
      ? 'text-green-700 font-bold bg-green-50 px-3 py-2 rounded-lg transition-all' 
      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-all font-medium';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">CropMarket</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" className={activeClass}>Home</NavLink>
              <NavLink to="/market" className={activeClass}>Market</NavLink>
              <NavLink to="/dashboard" className={activeClass}>Dashboard</NavLink>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <span className="hidden sm:inline-flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                Welcome, <span className="text-green-700 ml-1">{name || 'Farmer'}</span>
              </span>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="px-6 py-2.5 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                Logout
              </button>
            )}

            {/* small-screen menu button (optional) */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                onClick={() => {
                  // optional: you can implement a mobile menu toggle later
                  alert('Use a larger screen or implement mobile menu if needed.');
                }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
