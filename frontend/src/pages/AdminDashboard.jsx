import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { 
  Users, Package, ShoppingBag, DollarSign, ShieldCheck, 
  BarChart3, CheckCircle, XCircle, AlertTriangle, UserCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useNotification } from '../context/NotificationContext';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 450000, orders: 120 },
  { month: 'Feb', revenue: 680000, orders: 190 },
  { month: 'Mar', revenue: 920000, orders: 240 },
  { month: 'Apr', revenue: 1200000, orders: 310 },
  { month: 'May', revenue: 1850000, orders: 450 },
];

const CATEGORY_PIE = [
  { name: 'Vegetables', value: 45, color: '#15803d' },
  { name: 'Grains & Rice', value: 30, color: '#10b981' },
  { name: 'Fruits', value: 15, color: '#f59e0b' },
  { name: 'Spices', value: 10, color: '#ef4444' }
];

export const AdminDashboard = () => {
  const { addToast } = useNotification();

  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, name: "Senthil Organic Paddy Farm", role: "Farmer", location: "Kumbakonam, Thanjavur", date: "Today" },
    { id: 2, name: "Covai Hotel Supplies", role: "Buyer", location: "RS Puram, Coimbatore", date: "Yesterday" },
  ]);

  const handleApprove = (id, name) => {
    setPendingUsers(prev => prev.filter(u => u.id !== id));
    addToast(`Approved user "${name}"! Account activated.`, 'success');
  };

  const handleReject = (id, name) => {
    setPendingUsers(prev => prev.filter(u => u.id !== id));
    addToast(`Rejected application for "${name}".`, 'info');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black">FarmDirect Admin Console</span>
              <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                System Admin ⚡
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">SIH26033 Platform Governance & Intermediary Elimination Monitoring</p>
          </div>

          <Link
            to="/analytics"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 transition self-start sm:self-auto"
          >
            <BarChart3 className="w-4 h-4" /> Full Platform Analytics
          </Link>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Farmers</span>
            <span className="text-2xl font-black text-slate-900">12,400</span>
            <span className="text-[10px] text-emerald-600 font-bold block">+14% Growth</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Buyers</span>
            <span className="text-2xl font-black text-slate-900">3,850</span>
            <span className="text-[10px] text-blue-600 font-bold block">+8% Growth</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Products Listed</span>
            <span className="text-2xl font-black text-slate-900">45,000 Tons</span>
            <span className="text-[10px] text-emerald-600 font-bold block">100% Direct</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Orders</span>
            <span className="text-2xl font-black text-slate-900">9,820</span>
            <span className="text-[10px] text-slate-500 block">98.6% Fulfilled</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Platform Revenue</span>
            <span className="text-2xl font-black text-emerald-700">₹18.5M</span>
            <span className="text-[10px] text-emerald-600 font-bold block">0% Brokerage</span>
          </div>

        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Revenue Bar Chart */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Monthly Trade Revenue & Order Volume</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#15803d" radius={[6, 6, 0, 0]} name="Trade Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Pie */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Product Categories Share</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CATEGORY_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {CATEGORY_PIE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              {CATEGORY_PIE.map(c => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }}></span>
                  <span className="text-slate-700">{c.name} ({c.value}%)</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* User Approval Requests */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" /> Pending User Approvals ({pendingUsers.length})
          </h3>

          {pendingUsers.length === 0 ? (
            <p className="text-xs text-slate-500">No pending user approvals at this time.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingUsers.map(u => (
                <div key={u.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{u.name}</h4>
                    <span className="text-slate-500">{u.role} • {u.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(u.id, u.name)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(u.id, u.name)}
                      className="bg-slate-100 hover:bg-slate-200 text-red-600 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};
