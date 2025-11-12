import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, name } = useAuth();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-start pt-16">
      <h1 className="text-3xl font-bold mb-4">Welcome to Crop Market</h1>

      {isAuthenticated ? (
        <p className="mb-6 text-gray-700">Hello <span className="font-medium text-green-700">{name}</span>, glad to see you back!</p>
      ) : (
        <p className="mb-6 text-gray-700">Welcome farmer — please log in to manage your listings.</p>
      )}

      <div className="flex space-x-4">
        {!isAuthenticated && (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Signup
            </button>
          </>
        )}

        <button
          onClick={() => navigate('/market')}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
        >
          View Market
        </button>
      </div>
    </div>
  );
};

export default Home;
