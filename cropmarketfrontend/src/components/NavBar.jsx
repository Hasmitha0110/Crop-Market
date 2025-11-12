import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { isAuthenticated, name, logout } = useAuth();

  const activeClass = ({ isActive }) =>
    isActive ? 'text-green-700 font-semibold' : 'text-gray-700 hover:text-green-600';

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-green-600">CropMarket</Link>
            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/" className={activeClass}>Home</NavLink>
              <NavLink to="/market" className={activeClass}>Market</NavLink>
              <NavLink to="/dashboard" className={activeClass}>Dashboard</NavLink>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <span className="hidden sm:inline-block text-sm text-gray-700">
                Welcome, <span className="font-medium text-green-700">{name || 'Farmer'}</span>
              </span>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
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
