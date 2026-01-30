import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', contact: '', nic: '', district: '', email: '', password: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      alert('Admin registered successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <div className="space-y-4">
          {['name', 'contact', 'nic', 'district', 'email', 'password'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={`Enter your ${field}`}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-green-600 hover:underline font-medium">Log in</a>
        </p>
      </form>
    </div>
  );
}
