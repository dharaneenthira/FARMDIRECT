import React from 'react';
import { Sprout, ShieldCheck, Truck, TrendingUp, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">FARMDIRECT</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting farms directly with buyers. Transparent pricing, verified farmers, and fresh agricultural produce straight to your doorstep.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-emerald-400">
              <div className="flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Farmers
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/80">
                <Truck className="w-4 h-4 text-emerald-400" /> Direct Delivery
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/marketplace" className="hover:text-emerald-400 transition">All Products</Link></li>
              <li><Link to="/marketplace?category=Vegetables" className="hover:text-emerald-400 transition">Fresh Vegetables</Link></li>
              <li><Link to="/marketplace?category=Fruits" className="hover:text-emerald-400 transition">Farm Fruits</Link></li>
              <li><Link to="/marketplace?category=Grains" className="hover:text-emerald-400 transition">Grains & Pulses</Link></li>
              <li><Link to="/marketplace?category=Organic" className="hover:text-emerald-400 transition">Organic Produce</Link></li>
            </ul>
          </div>

          {/* Smart Tools & Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Farmer Tools</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/add-product" className="hover:text-emerald-400 transition">Sell Products</Link></li>
              <li><Link to="/ai-price-prediction" className="hover:text-emerald-400 transition">Price Predictor</Link></li>
              <li><Link to="/demand-forecast" className="hover:text-emerald-400 transition">Demand Forecast</Link></li>
              <li><Link to="/smart-buyer-matching" className="hover:text-emerald-400 transition">Buyer Matching</Link></li>
              <li><Link to="/farmer-dashboard" className="hover:text-emerald-400 transition">Farmer Dashboard</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Company & Support</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-emerald-400 transition">About Us</Link></li>
              <li><Link to="/chat" className="hover:text-emerald-400 transition">Contact & Help</Link></li>
              <li><Link to="/notifications" className="hover:text-emerald-400 transition">Notifications</Link></li>
              <li><Link to="/" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-emerald-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 FarmDirect Agriculture Technologies. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built for Sustainable Agriculture</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline mx-1" />
            <span>Farm to Table</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

