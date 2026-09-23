import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { BarChart3, TrendingUp, DollarSign, MapPin, Layers } from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

const DEMAND_DATA = [
  { crop: 'Tomatoes', demand: 94 },
  { crop: 'Rice', demand: 88 },
  { crop: 'Onions', demand: 82 },
  { crop: 'Mangoes', demand: 78 },
  { crop: 'Bananas', demand: 75 },
];

const LOCATION_DATA = [
  { region: 'Madurai Hub', volume: 18500 },
  { region: 'Thanjavur Paddy', volume: 24000 },
  { region: 'Salem Orchards', volume: 14200 },
  { region: 'Coimbatore Market', volume: 19800 },
];

export const AnalyticsPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">Platform Analytics & Intelligence</h1>
          <p className="text-xs text-slate-500">Comprehensive data metrics on crop demand, regional trade, and farmer financial growth</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Crop Demand Index */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Crop Demand Index (%)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEMAND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="crop" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#15803d" radius={[6, 6, 0, 0]} name="Demand Index (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Trade Volume */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Regional Trade Volume (kg)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LOCATION_DATA}>
                  <defs>
                    <linearGradient id="locGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="region" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#locGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
