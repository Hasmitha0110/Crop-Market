import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, name } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Fresh Crops, <br className="hidden md:block" /> Directly from Farmers
          </h1>
          <p className="text-lg md:text-xl text-green-100 max-w-2xl mb-10">
            Connect directly with local farmers to buy fresh, organic, and high-quality produce.
            Fair prices for farmers, fresh food for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/market')}
              className="px-8 py-3 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition transform hover:scale-105 shadow-lg"
            >
              Browse Market
            </button>
            {!isAuthenticated && (
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-3 bg-green-600 border-2 border-green-500 text-white font-bold rounded-full hover:bg-green-500 transition transform hover:scale-105 shadow-lg"
              >
                Join as Farmer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features / Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {isAuthenticated ? (
          <div className="bg-green-50 rounded-2xl p-8 md:p-12 text-center border border-green-100 shadow-sm">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Welcome back, {name}!</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Ready to update your inventory? Manage your crops and check your listings.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">List Your Harvest</h3>
              <p className="text-gray-600">Farmers can easily list crops, set prices, and manage inventory.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Find Fresh Produce</h3>
              <p className="text-gray-600">Buyers can search and filter for specific crops and varieties.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Direct Connection</h3>
              <p className="text-gray-600">Eliminate middlemen and connect directly with the source.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
