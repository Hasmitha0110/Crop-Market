import { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      // backend returns token, name, district
      const token = res.data.token;
      const name = res.data.name;
      login({ token, name }); // updates state & localStorage via context
      alert('Login successful');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-6xl bg-white rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.06)] overflow-hidden min-h-[600px] border border-gray-100">
        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative bg-green-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?q=80&w=1470&auto=format&fit=crop" 
            alt="Farm" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute bottom-12 left-12 z-20 text-white pr-12">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight drop-shadow-md">Welcome back to the harvest.</h2>
            <p className="text-lg text-gray-200 drop-shadow font-medium">Join our community to trade the freshest crops directly from the source.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">Sign In</h2>
            <p className="text-gray-500 mb-10 font-medium">Please enter your details to access your account.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all font-medium text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all font-medium text-gray-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5 text-lg"
              >
                Log In
              </button>

              <p className="mt-8 text-center text-gray-600 font-medium">
                Don't have an account? <a href="/signup" className="text-green-600 hover:text-green-700 font-bold ml-1 transition-colors">Sign up here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
