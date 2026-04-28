import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CropList from '../components/CropList';
import AddCropForm from '../components/AddCropForm';

export default function Dashboard() {
  const { isAuthenticated, name } = useAuth();
  const [activeTab, setActiveTab] = useState('list');
  const [refreshKey, setRefreshKey] = useState(0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 rounded-3xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">Access Restricted</h2>
          <p className="text-gray-500 mb-8 font-medium">
            Please login or sign up as a <strong className="text-gray-800">farmer</strong> to access your Dashboard.
          </p>
          <a href="/login" className="block w-full bg-green-600 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-green-700 transition-all shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:-translate-y-0.5">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const handleAdded = () => {
    setActiveTab('list');
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Farmer Dashboard</h1>
            <p className="text-lg text-gray-500 font-medium">Manage your inventory, {name}.</p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 shrink-0">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === 'list' ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              My Crops
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === 'add' ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              + Add Crop
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-10 min-h-[500px]">
          {activeTab === 'list' && <CropList key={refreshKey} />}
          {activeTab === 'add' && <AddCropForm onAdded={handleAdded} />}
        </div>
      </div>
    </div>
  );
}
