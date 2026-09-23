import React, { useState } from 'react';
import { Bell, CheckCircle, TrendingUp, Truck, ShoppingBag, ShieldCheck } from 'lucide-react';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Direct Order Received!",
      message: "Buyer FreshMart Supermarkets placed an order for 500 kg Country Tomatoes.",
      type: "order",
      time: "10 mins ago",
      is_read: false
    },
    {
      id: 2,
      title: "AI Price Alert: High Demand in Coimbatore",
      message: "Market demand for Country Tomatoes in Coimbatore region is predicted to rise by 12% next week.",
      type: "price",
      time: "1 hour ago",
      is_read: false
    },
    {
      id: 3,
      title: "Order Dispatch Update",
      message: "Order #FD-2026-98401 has been picked up from Madurai Farm Hub and is now in transit.",
      type: "delivery",
      time: "3 hours ago",
      is_read: true
    },
    {
      id: 4,
      title: "New Smart Buyer Match",
      message: "96% Match found: FreshMart Supermarket is looking for 600 kg Country Tomatoes at ₹34/kg.",
      type: "match",
      time: "Yesterday",
      is_read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Notifications & Alerts</h1>
            <p className="text-xs text-slate-500">Real-time alerts for orders, AI price forecasts, and buyer matches</p>
          </div>
          <button
            onClick={markAllRead}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition flex items-start gap-4 ${
                n.is_read
                  ? 'bg-white border-slate-200 opacity-80'
                  : 'bg-emerald-50/60 border-emerald-300 shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                n.type === 'order'
                  ? 'bg-blue-600'
                  : n.type === 'price'
                  ? 'bg-emerald-600'
                  : n.type === 'delivery'
                  ? 'bg-amber-600'
                  : 'bg-indigo-600'
              }`}>
                {n.type === 'order' ? <ShoppingBag className="w-5 h-5" /> : n.type === 'price' ? <TrendingUp className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
