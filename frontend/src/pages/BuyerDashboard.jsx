import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { 
  ShoppingBag, CheckCircle2, DollarSign, Heart, MapPin, 
  Eye, Truck, Star, ArrowUpRight, MessageSquare 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const BuyerDashboard = () => {
  const { user } = useAuth();

  const recentPurchases = [
    { id: 'FD-2026-98401', farmer: 'Murugan (Madurai Farm)', product: 'Country Tomatoes', qty: '500 kg', amount: '₹16,000', status: 'In Transit', date: 'Today' },
    { id: 'FD-2026-98211', farmer: 'Velu (Thanjavur Agro)', product: 'Sona Masoori Rice', qty: '1000 kg', amount: '₹58,000', status: 'Delivered', date: '3 Days Ago' },
    { id: 'FD-2026-98105', farmer: 'Lakshmi (Salem Orchards)', product: 'Alphonso Mangoes', qty: '250 kg', amount: '₹35,000', status: 'Delivered', date: 'Last Week' },
  ];

  const nearbyFarmers = [
    { name: "Murugan Agricultural Farm", location: "Madurai (12.4 km)", rating: 4.9, crops: "Tomato, Red Onion, Green Chilli" },
    { name: "Lakshmi Salem Orchards", location: "Salem (28.0 km)", rating: 4.95, crops: "Alphonso Mango, Tender Coconut" },
    { name: "Velu Thanjavur Paddy", location: "Thanjavur (45.0 km)", rating: 4.8, crops: "Sona Masoori Rice" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="buyer" />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">Buyer Portal – {user ? user.name : 'FreshMart Supermarkets'}</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-300">
                Wholesale Buyer 🛒
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Location: RS Puram, Coimbatore • Verified Direct Sourcing Account</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/marketplace"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
            >
              Browse Marketplace
            </Link>
            <Link
              to="/smart-buyer-matching"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
            >
              Smart Matches
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">2 Orders</div>
            <p className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> 1 Shipment in Transit
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Completed Orders</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">8 Orders</div>
            <p className="text-[11px] text-slate-500">100% Direct Farmgate</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Spending</span>
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">₹1,12,000</div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> -15% Savings vs Brokers
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Wishlist Items</span>
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">2 Saved</div>
            <p className="text-[11px] text-slate-500">Track Price Alerts</p>
          </div>

        </div>

        {/* Recent Purchases Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Direct Purchases</h3>
              <p className="text-xs text-slate-500">Crops purchased directly from verified farmers</p>
            </div>
            <Link to="/orders" className="text-xs font-bold text-emerald-600 hover:underline">View All →</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Farmer Name</th>
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-6">Quantity</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentPurchases.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{p.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{p.farmer}</td>
                    <td className="py-4 px-6 text-slate-600">{p.product}</td>
                    <td className="py-4 px-6 text-slate-600">{p.qty}</td>
                    <td className="py-4 px-6 font-bold text-emerald-700">{p.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        p.status === 'In Transit'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to="/delivery-tracking/1"
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-800"
                      >
                        <Eye className="w-3.5 h-3.5" /> Track Live
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nearby Verified Farmers Grid */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Nearby Verified Farmers for Direct Sourcing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nearbyFarmers.map((f, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{f.name}</h4>
                    <span className="text-xs text-slate-500 block mt-0.5">{f.location}</span>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    ★ {f.rating}
                  </span>
                </div>
                <p className="text-xs text-emerald-700 font-semibold">Crops: {f.crops}</p>
                <Link
                  to="/chat"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Contact Farmer
                </Link>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};
