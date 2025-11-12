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
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white shadow-md rounded p-6 text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-3">Access Restricted</h2>
          <p className="text-gray-700 mb-4">
            Please login or sign up as a <strong>farmer</strong> to access the Dashboard.
          </p>
          <a href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Login
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {name}</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded ${activeTab === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Crop List
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded ${activeTab === 'add' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Add Crop
        </button>
      </div>

      {activeTab === 'list' && <CropList key={refreshKey} />}
      {activeTab === 'add' && <AddCropForm onAdded={handleAdded} />}
    </div>
  );
}
