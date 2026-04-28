import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, name } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center">
          <div className="">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
              Fresh Crops, <br className="hidden md:block" /> Directly from Farmers
            </h1>
            <p className="text-lg md:text-xl text-green-50 max-w-2xl drop-shadow-md mb-10">
              Connect directly with local farmers to buy fresh, organic, and high-quality produce.
              Fair prices for farmers, fresh food for you. Let's connect and grow together.
            </p>
          </div>

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
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Why Choose CropMarket?</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Experience a new way of agricultural trading that benefits both farmers and consumers.</p>
        </div>

        {isAuthenticated ? (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-3xl p-10 md:p-16 text-center border border-green-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">{name}!</span></h2>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
              Ready to update your inventory? Manage your crops, check your listings, and connect with buyers seamlessly.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-1"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">List Your Harvest</h3>
              <p className="text-gray-500 leading-relaxed">Farmers can easily list crops, set competitive prices, and manage their agricultural inventory efficiently.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find Fresh Produce</h3>
              <p className="text-gray-500 leading-relaxed">Buyers can quickly search, filter, and discover specific fresh crops and organic varieties locally.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Connection</h3>
              <p className="text-gray-500 leading-relaxed">Eliminate unnecessary middlemen and establish a direct, transparent connection with the source.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
