import React from 'react';
import { Sprout, ShieldCheck, Truck, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">FARMDIRECT</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              AI-Powered Direct Farmer-to-Buyer Platform solving SIH26033. Bypassing middleman commissions to maximize earnings for Indian farmers and offer fair pricing to buyers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-emerald-400">
              <div className="flex items-center gap-1 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/80">
                <ShieldCheck className="w-4 h-4" /> 100% Direct Trade
              </div>
              <div className="flex items-center gap-1 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/80">
                <TrendingUp className="w-4 h-4" /> AI Pricing
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Core Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/marketplace" className="hover:text-emerald-400 transition">Marketplace</Link></li>
              <li><Link to="/ai-price-prediction" className="hover:text-emerald-400 transition">AI Price Prediction</Link></li>
              <li><Link to="/demand-forecast" className="hover:text-emerald-400 transition">Demand Forecasting</Link></li>
              <li><Link to="/smart-buyer-matching" className="hover:text-emerald-400 transition">Smart Buyer Matching</Link></li>
              <li><Link to="/delivery-tracking/1" className="hover:text-emerald-400 transition">Delivery Logistics</Link></li>
            </ul>
          </div>

          {/* For Farmers & Buyers */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Dashboards</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/farmer-dashboard" className="hover:text-emerald-400 transition">Farmer Portal</Link></li>
              <li><Link to="/farmer-profile" className="hover:text-emerald-400 transition">Farm Profile Edit</Link></li>
              <li><Link to="/add-product" className="hover:text-emerald-400 transition">Publish New Crop</Link></li>
              <li><Link to="/buyer-dashboard" className="hover:text-emerald-400 transition">Buyer Portal</Link></li>
              <li><Link to="/admin-dashboard" className="hover:text-emerald-400 transition">Admin Console</Link></li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Agricultural Hubs</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Madurai Organic Belt</li>
              <li>Thanjavur Delta Paddy</li>
              <li>Salem Mango Orchards</li>
              <li>Coimbatore Agro Wholesale</li>
              <li>Pollachi Coconut Groves</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 FarmDirect AI Platform. Developed for Smart India Hackathon (SIH26033).</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for Indian Agriculture</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline mx-1" />
            <span>Farmgate to Buyer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
