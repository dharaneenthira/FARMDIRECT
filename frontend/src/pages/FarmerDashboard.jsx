import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { 
  Package, ShoppingBag, CheckCircle2, DollarSign, TrendingUp, 
  BarChart3, Plus, ArrowUpRight, ShieldCheck, Eye, Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  LineChart, Line, CartesianGrid 
} from 'recharts';
import { useAuth } from '../context/AuthContext';

const SALES_DATA = [
  { month: 'Jan', sales: 24000 },
  { month: 'Feb', sales: 38000 },
  { month: 'Mar', sales: 45000 },
  { month: 'Apr', sales: 62000 },
  { month: 'May', sales: 85000 },
  { month: 'Jun', sales: 110000 },
];

const PRICE_TREND_DATA = [
  { week: 'Wk 1', tomato: 28, rice: 54, onion: 24 },
  { week: 'Wk 2', tomato: 30, rice: 55, onion: 26 },
  { week: 'Wk 3', tomato: 35, rice: 57, onion: 28 },
  { week: 'Wk 4', tomato: 32, rice: 58, onion: 28 },
  { week: 'Wk 5', tomato: 36, rice: 59, onion: 30 },
];

export const FarmerDashboard = () => {
  const { user } = useAuth();

  const recentOrders = [
    { id: 'FD-2026-98401', buyer: 'FreshMart Supermarkets', product: 'Country Tomatoes', qty: '500 kg', amount: '₹16,000', status: 'In Transit', date: 'Today, 10:30 AM' },
    { id: 'FD-2026-98389', buyer: 'Annapoorna Hotel Network', product: 'Sona Masoori Rice', qty: '1200 kg', amount: '₹69,600', status: 'Delivered', date: 'Yesterday' },
    { id: 'FD-2026-98312', buyer: 'Wholesale Agro Corp', product: 'Salem Red Onions', qty: '800 kg', amount: '₹22,400', status: 'Confirmed', date: '2 Days Ago' },
    { id: 'FD-2026-98244', buyer: 'Organic Basket Direct', product: 'Alphonso Mangoes', qty: '200 kg', amount: '₹28,000', status: 'Delivered', date: '3 Days Ago' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="farmer" />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">Welcome Back, {user ? user.name : 'Murugan'}!</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                Verified Farmer 🌾
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Farm: Green Valley Organic Farms, Madurai (12.5 Acres)</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/ai-price-prediction"
              className="bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-700 flex items-center gap-1.5 transition"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" /> AI Price Calculator
            </Link>
            <Link
              to="/add-product"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> Add New Crop
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">6 Listed</div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 2 New Harvests Pending
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">3 Orders</div>
            <p className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> 1 Order In Transit
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Completed Orders</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">14 Orders</div>
            <p className="text-[11px] text-slate-500">100% On-time Dispatch</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Earnings</span>
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">₹1,85,000</div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18% vs Intermediary Rates
            </p>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sales Overview Area Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Direct Sales Overview (INR)</h3>
                <p className="text-xs text-slate-500">Monthly revenue directly received from buyers</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                2026 Growth
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#15803d" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#15803d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" stroke="#15803d" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crop Price Trend Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Crop Market Price Trend (₹/kg)</h3>
                <p className="text-xs text-slate-500">Real-time market price benchmark</p>
              </div>
              <Link to="/ai-price-prediction" className="text-xs text-emerald-600 font-bold hover:underline">Full AI Analysis →</Link>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PRICE_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="tomato" stroke="#ef4444" strokeWidth={2.5} name="Tomatoes" />
                  <Line type="monotone" dataKey="rice" stroke="#10b981" strokeWidth={2.5} name="Sona Rice" />
                  <Line type="monotone" dataKey="onion" stroke="#f59e0b" strokeWidth={2.5} name="Onions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Direct Buyer Orders</h3>
              <p className="text-xs text-slate-500">Orders placed by verified wholesalers & retailers</p>
            </div>
            <Link to="/orders" className="text-xs font-bold text-emerald-600 hover:underline">View All Orders →</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Buyer Name</th>
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-6">Quantity</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{o.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{o.buyer}</td>
                    <td className="py-4 px-6 font-medium text-slate-600">{o.product}</td>
                    <td className="py-4 px-6 font-medium text-slate-600">{o.qty}</td>
                    <td className="py-4 px-6 font-bold text-emerald-700">{o.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        o.status === 'In Transit'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : o.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to="/delivery-tracking/1"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800"
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

      </main>
    </div>
  );
};
