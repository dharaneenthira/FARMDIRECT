import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, User, Mail, Phone, MapPin, Lock, ShieldCheck, AlertCircle, Leaf, CheckCircle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    role: 'farmer'
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.location.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addToast(`Account created successfully as ${formData.role.toUpperCase()}! Please log in to continue.`, 'success');
      navigate('/login');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 lg:p-6 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-none lg:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-screen lg:min-h-[640px] border border-slate-800/20">
        
        {/* Left Side: Agricultural Branding */}
        <div className="lg:col-span-5 relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=1200&q=80"
            alt="Farm Produce"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
          />

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">FARMDIRECT</span>
                <span className="block text-[10px] text-emerald-400 font-bold tracking-widest uppercase -mt-1">Agricultural Marketplace</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 my-8 space-y-4">
            <span className="bg-emerald-800/80 text-emerald-300 border border-emerald-600/60 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Account Creation
            </span>
            <h1 className="text-3xl font-black text-white leading-tight">
              Join India's Direct <br />
              <span className="text-emerald-400">Agri Marketplace.</span>
            </h1>
            <p className="text-emerald-100 text-xs leading-relaxed max-w-sm">
              Register as a verified farmer to list crops directly or as a buyer to source fresh produce at transparent farmgate prices.
            </p>
          </div>

          <div className="relative z-10 text-xs text-slate-400">
            © 2026 FarmDirect Agriculture Inc.
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-8 lg:p-10 bg-white flex flex-col justify-between overflow-y-auto">
          <div className="max-w-md mx-auto w-full space-y-5">
            
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Create Account</h2>
              <p className="text-xs text-slate-500">Sign up to trade agricultural products directly</p>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Account Type Selection */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">I want to register as:</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'farmer' })}
                  className={`py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${formData.role === 'farmer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <input type="radio" checked={formData.role === 'farmer'} onChange={() => {}} className="accent-emerald-400" />
                  <span>Farmer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'buyer' })}
                  className={`py-2.5 rounded-lg transition flex items-center justify-center gap-1.5 ${formData.role === 'buyer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <input type="radio" checked={formData.role === 'buyer'} onChange={() => {}} className="accent-emerald-400" />
                  <span>Buyer</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98430 11223"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Location / District</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Madurai, Tamil Nadu"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 pl-9 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                <ShieldCheck className="w-4 h-4" /> {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-200">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-700 font-extrabold hover:underline">
                Log In
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
