import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Note: react-router-dom import
import { Sprout, ShoppingCart, Bell, Search, Globe, User, ShieldCheck, ChevronDown, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, switchRole, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-emerald-950 text-white shadow-lg border-b border-emerald-800/50">
      {/* Top Banner: Quick Demo Role Switcher */}
      <div className="bg-emerald-900/90 text-emerald-200 text-xs py-1.5 px-4 flex justify-between items-center border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-700 text-emerald-100 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">SIH26033 Demo Mode</span>
          <span className="hidden sm:inline">Direct Farmer-to-Buyer Platform (Zero Intermediary Commissions)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-300 font-semibold">Active Demo Role:</span>
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-2.5 py-0.5 rounded text-xs transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="capitalize">{user ? user.role : 'Select Role'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-slate-900 text-white rounded-lg shadow-xl border border-slate-700 py-1 z-50 text-xs">
                <button
                  onClick={() => { switchRole('farmer'); setRoleDropdownOpen(false); navigate('/farmer-dashboard'); }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-800 flex items-center gap-2"
                >
                  🌾 Farmer Role (Murugan)
                </button>
                <button
                  onClick={() => { switchRole('buyer'); setRoleDropdownOpen(false); navigate('/buyer-dashboard'); }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-800 flex items-center gap-2"
                >
                  🛒 Buyer Role (FreshMart)
                </button>
                <button
                  onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); navigate('/admin-dashboard'); }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-800 flex items-center gap-2"
                >
                  ⚡ Admin Role (System)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-md group-hover:scale-105 transition transform">
              <Sprout className="w-6 h-6 text-emerald-950" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-300 transition">FARMDIRECT</span>
              <span className="block text-[10px] text-emerald-400 font-semibold tracking-wider uppercase -mt-1">Agro Direct Network</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-emerald-100">
            <Link to="/marketplace" className="hover:text-white hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg transition">{t('navMarketplace')}</Link>
            <Link to="/ai-price-prediction" className="hover:text-white hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('navAiPrediction')}
            </Link>
            <Link to="/demand-forecast" className="hover:text-white hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg transition">{t('navDemandForecast')}</Link>
            <Link to="/smart-buyer-matching" className="hover:text-white hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg transition">{t('navBuyerMatching')}</Link>
            {user?.role === 'farmer' && (
              <Link to="/farmer-dashboard" className="text-emerald-300 font-semibold hover:text-white px-3 py-1.5 bg-emerald-900/80 rounded-lg">{t('navFarmerDash')}</Link>
            )}
            {user?.role === 'buyer' && (
              <Link to="/buyer-dashboard" className="text-emerald-300 font-semibold hover:text-white px-3 py-1.5 bg-emerald-900/80 rounded-lg">{t('navBuyerDash')}</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin-dashboard" className="text-amber-300 font-semibold hover:text-white px-3 py-1.5 bg-amber-950/80 rounded-lg">{t('navAdmin')}</Link>
            )}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-emerald-900/80 border border-emerald-700/80 text-white placeholder-emerald-400 text-xs rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
          </form>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Multilingual Selector */}
            <div className="flex items-center gap-1 bg-emerald-900/80 border border-emerald-700/80 rounded-lg p-1 text-xs text-emerald-200">
              <Globe className="w-3.5 h-3.5 ml-1 text-emerald-400" />
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded font-bold transition ${lang === 'en' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-1.5 py-0.5 rounded font-bold transition ${lang === 'ta' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-1.5 py-0.5 rounded font-bold transition ${lang === 'hi' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}
              >
                हिंदी
              </button>
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/80 rounded-full transition">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-emerald-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Login/Profile */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={user.role === 'farmer' ? '/farmer-dashboard' : user.role === 'buyer' ? '/buyer-dashboard' : '/admin-dashboard'}
                  className="hidden sm:flex items-center gap-2 bg-emerald-800/90 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition border border-emerald-600/50"
                >
                  <User className="w-4 h-4 text-emerald-300" />
                  <span className="truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-emerald-300 hover:text-white hover:underline"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2 rounded-lg text-xs transition shadow"
              >
                {t('login')}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-3 pb-6 space-y-3 text-sm">
          <Link to="/marketplace" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100 hover:text-white">{t('navMarketplace')}</Link>
          <Link to="/ai-price-prediction" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100 hover:text-white">{t('navAiPrediction')}</Link>
          <Link to="/demand-forecast" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100 hover:text-white">{t('navDemandForecast')}</Link>
          <Link to="/smart-buyer-matching" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-100 hover:text-white">{t('navBuyerMatching')}</Link>
          <Link to="/farmer-dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-300 font-semibold">{t('navFarmerDash')}</Link>
          <Link to="/buyer-dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-emerald-300 font-semibold">{t('navBuyerDash')}</Link>
          <Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-amber-300 font-semibold">{t('navAdmin')}</Link>
        </div>
      )}
    </nav>
  );
};
