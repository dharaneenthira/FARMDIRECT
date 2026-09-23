import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Login = () => {
  const [email, setEmail] = useState('farmer@farmdirect.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('farmer');

  const { login, switchRole } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    switchRole(role);
    addToast(`Successfully logged in as ${role.toUpperCase()}!`, 'success');
    if (role === 'farmer') navigate('/farmer-dashboard');
    else if (role === 'buyer') navigate('/buyer-dashboard');
    else navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Welcome to FarmDirect</h2>
          <p className="text-xs text-slate-500">Sign in to access your direct trade portal</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setRole('farmer'); setEmail('farmer@farmdirect.com'); }}
            className={`py-2 rounded-lg transition ${role === 'farmer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🌾 Farmer
          </button>
          <button
            type="button"
            onClick={() => { setRole('buyer'); setEmail('buyer@farmdirect.com'); }}
            className={`py-2 rounded-lg transition ${role === 'buyer' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🛒 Buyer
          </button>
          <button
            type="button"
            onClick={() => { setRole('admin'); setEmail('admin@farmdirect.com'); }}
            className={`py-2 rounded-lg transition ${role === 'admin' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
          >
            ⚡ Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-xs text-emerald-600 hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Log In to Portal
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200">
          Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register New Profile</Link>
        </div>

      </div>
    </div>
  );
};
