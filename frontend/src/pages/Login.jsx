import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Mail, Lock, ShieldCheck, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth, DEMO_USER_PROFILES } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || null;

  const handleQuickLogin = (roleKey) => {
    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const targetUser = DEMO_USER_PROFILES[roleKey];
      login(targetUser);
      addToast(`Welcome back, ${targetUser.name}!`, 'success');
      setLoading(false);

      if (redirectPath) {
        navigate(redirectPath);
      } else if (roleKey === 'farmer') {
        navigate('/farmer-dashboard');
      } else if (roleKey === 'buyer') {
        navigate('/buyer-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
    }, 400);
  };

  const handleSubmit = (e) => {
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
      // Find matching profile or construct user
      let matchedUser = DEMO_USER_PROFILES[selectedRole];

      if (emailOrPhone.toLowerCase().includes('buyer') || selectedRole === 'buyer') {
        matchedUser = DEMO_USER_PROFILES.buyer;
      } else if (emailOrPhone.toLowerCase().includes('admin') || selectedRole === 'admin') {
        matchedUser = DEMO_USER_PROFILES.admin;
      } else {
        matchedUser = {
          ...DEMO_USER_PROFILES.farmer,
          email: emailOrPhone.includes('@') ? emailOrPhone : 'user@farmdirect.com',
          phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98430 11223'
        };
      }

      login(matchedUser);
      addToast(`Successfully logged in as ${matchedUser.name}`, 'success');
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
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Log In to FarmDirect</h2>
          <p className="text-xs text-slate-500">Access your agricultural trade portal & orders</p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setSelectedRole('farmer'); setEmailOrPhone('farmer@farmdirect.com'); setPassword('password123'); }}
            className={`py-2 rounded-lg transition ${selectedRole === 'farmer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🌾 Farmer
          </button>
          <button
            type="button"
            onClick={() => { setSelectedRole('buyer'); setEmailOrPhone('buyer@farmdirect.com'); setPassword('password123'); }}
            className={`py-2 rounded-lg transition ${selectedRole === 'buyer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🛒 Buyer
          </button>
          <button
            type="button"
            onClick={() => { setSelectedRole('admin'); setEmailOrPhone('admin@farmdirect.com'); setPassword('password123'); }}
            className={`py-2 rounded-lg transition ${selectedRole === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            ⚡ Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email or Phone Number</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="name@example.com or +91 98430 11223"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-xs text-emerald-600 hover:underline font-semibold">Forgot Password?</Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {loading ? 'Authenticating...' : 'Log In to Account'}
          </button>
        </form>

        {/* Quick One-Click Demo Role Buttons */}
        <div className="pt-2 border-t border-slate-200 space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Quick Demo Accounts</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickLogin('farmer')}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-2 rounded-xl text-center transition"
            >
              Continue as Farmer
            </button>
            <button
              onClick={() => handleQuickLogin('buyer')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold py-2 rounded-xl text-center transition"
            >
              Continue as Buyer
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200">
          Don't have an account? <Link to="/register" className="text-emerald-600 font-extrabold hover:underline">Create Account</Link>
        </div>

      </div>
    </div>
  );
};
