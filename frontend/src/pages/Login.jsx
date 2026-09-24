import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Mail, Lock, ShieldCheck, Loader2, AlertCircle, ArrowRight, Leaf, Truck, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth, DEMO_USER_PROFILES } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('farmer@farmdirect.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || null;

  const handleRoleTab = (roleKey) => {
    setSelectedRole(roleKey);
    setErrorMessage('');
    if (roleKey === 'farmer') {
      setEmailOrPhone('farmer@farmdirect.com');
      setPassword('password123');
    } else if (roleKey === 'buyer') {
      setEmailOrPhone('buyer@farmdirect.com');
      setPassword('password123');
    } else if (roleKey === 'admin') {
      setEmailOrPhone('admin@farmdirect.com');
      setPassword('password123');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or phone number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let matchedUser = DEMO_USER_PROFILES[selectedRole];

      if (emailOrPhone.toLowerCase().includes('buyer') || selectedRole === 'buyer') {
        matchedUser = DEMO_USER_PROFILES.buyer;
      } else if (emailOrPhone.toLowerCase().includes('admin') || selectedRole === 'admin') {
        matchedUser = DEMO_USER_PROFILES.admin;
      } else {
        matchedUser = {
          ...DEMO_USER_PROFILES.farmer,
          email: emailOrPhone.includes('@') ? emailOrPhone : 'farmer@farmdirect.com',
          phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98430 11223'
        };
      }

      login(matchedUser);
      addToast(`Authenticated as ${matchedUser.name}`, 'success');
      setLoading(false);

      if (redirectPath) {
        navigate(redirectPath);
      } else if (matchedUser.role === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (matchedUser.role === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 lg:p-6 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-none lg:rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-screen lg:min-h-[640px] border border-slate-800/20">
        
        {/* Left Side: Agricultural Branding Panel */}
        <div className="lg:col-span-6 relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 text-white p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
          {/* Background Image Overlay */}
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
            alt="Farm Field"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
          />

          {/* Decorative Glow */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Brand Logo */}
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

          {/* Center Pitch Text */}
          <div className="relative z-10 my-10 space-y-4">
            <span className="bg-emerald-800/80 text-emerald-300 border border-emerald-600/60 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Direct Farmgate Network
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Fresh From Farms. <br />
              <span className="text-emerald-400">Directly to You.</span>
            </h1>
            <p className="text-emerald-100 text-sm leading-relaxed max-w-md">
              Connect directly with verified farmers, discover transparent market prices, and trade agricultural produce with zero middleman commissions.
            </p>

            <div className="pt-4 space-y-3 text-xs text-emerald-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Regional Farmers & Quality Produce</span>
              </div>
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Price Predictor & Market Intelligence</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Farmgate Dispatch & Order Tracking</span>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 text-xs text-slate-400">
            © 2026 FarmDirect Agriculture Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-6 p-8 lg:p-12 bg-white flex flex-col justify-between">
          <div className="max-w-md mx-auto w-full space-y-6">
            
            {/* Login Header */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Welcome back</h2>
              <p className="text-xs text-slate-500 font-medium">Login to continue to FarmDirect</p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Account Role Tabs */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Portal Role</label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => handleRoleTab('farmer')}
                  className={`py-2 rounded-lg transition ${selectedRole === 'farmer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  🌾 Farmer
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleTab('buyer')}
                  className={`py-2 rounded-lg transition ${selectedRole === 'buyer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  🛒 Buyer
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleTab('admin')}
                  className={`py-2 rounded-lg transition ${selectedRole === 'admin' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  ⚡ Admin
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email / Phone</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. farmer@farmdirect.com or +91 98430 11223"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  <Link to="/forgot-password" className="text-xs text-emerald-700 font-bold hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                {loading ? 'Verifying Credentials...' : 'Login'}
              </button>
            </form>

            {/* Create Account Link */}
            <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-200">
              Don't have an account?{' '}
              <Link to="/register" className="text-emerald-700 font-extrabold hover:underline">
                Sign Up
              </Link>
            </div>

          </div>

          <div className="text-center text-[11px] text-slate-400 pt-4">
            Secured with SSL Encryption • Farm Direct Access Protocol
          </div>
        </div>

      </div>
    </div>
  );
};
