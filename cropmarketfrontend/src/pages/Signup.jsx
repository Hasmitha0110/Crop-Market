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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-6xl bg-white rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.06)] overflow-hidden min-h-[600px] border border-gray-100 flex-row-reverse">
        {/* Right Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative bg-green-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1470&auto=format&fit=crop" 
            alt="Farm Landscape" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute bottom-12 left-12 z-20 text-white pr-12">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight drop-shadow-md">Sow the seeds of success.</h2>
            <p className="text-lg text-gray-200 drop-shadow font-medium">Join our marketplace to connect with buyers and grow your business today.</p>
          </div>
        </div>

        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">Create Account</h2>
            <p className="text-gray-500 mb-8 font-medium">Please fill in the details below to join as a farmer.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {['name', 'contact', 'nic', 'district'].map(field => (
                  <div key={field}>
                    <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">{field}</label>
                    <input
                      type="text"
                      name={field}
                      placeholder={`Enter ${field}`}
                      value={form[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all font-medium text-gray-900"
                      required
                    />
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all font-medium text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all font-medium text-gray-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5 text-lg"
              >
                Sign Up
              </button>

              <p className="mt-6 text-center text-gray-600 font-medium">
                Already have an account? <a href="/login" className="text-green-600 hover:text-green-700 font-bold ml-1 transition-colors">Log in here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
