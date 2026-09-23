import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      order_number: "FD-2026-98401",
      buyer_name: "FreshMart Supermarket",
      farmer_name: "Murugan Agricultural Farm",
      product_name: "Fresh Country Tomatoes",
      quantity: "500 kg",
      total_amount: 16050,
      payment_method: "UPI Direct",
      payment_status: "Paid",
      status: "In Transit",
      delivery_address: "RS Puram, Coimbatore - 641002",
      date: "Today, 10:30 AM",
      timeline_step: 4 // 1: Order Placed, 2: Confirmed, 3: Preparing, 4: Picked Up / In Transit, 5: Out for Delivery, 6: Delivered
    },
    {
      id: 2,
      order_number: "FD-2026-98389",
      buyer_name: "Annapoorna Hotel Chain",
      farmer_name: "Velu Thanjavur Agro",
      product_name: "Organic Sona Masoori Rice",
      quantity: "1200 kg",
      total_amount: 69650,
      payment_method: "Bank Transfer",
      payment_status: "Paid",
      status: "Delivered",
      delivery_address: "T Nagar, Chennai - 600017",
      date: "Yesterday",
      timeline_step: 6
    },
    {
      id: 3,
      order_number: "FD-2026-98312",
      buyer_name: "SouthAgro Wholesalers",
      farmer_name: "Lakshmi Salem Orchards",
      product_name: "Salem Red Onions",
      quantity: "800 kg",
      total_amount: 22450,
      payment_method: "UPI Direct",
      payment_status: "Paid",
      status: "Confirmed",
      delivery_address: "Salem Agricultural Market",
      date: "2 Days Ago",
      timeline_step: 2
    }
  ]);

  const timelineSteps = [
    "Order Placed", "Confirmed", "Preparing", "Picked Up", "In Transit", "Delivered"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Order Management & Tracking</h1>
            <p className="text-xs text-slate-500">Track real-time harvest dispatches and delivery timelines</p>
          </div>
        </div>

        {/* Order Cards List */}
        <div className="space-y-6">
          {orders.map((o) => (
            <div key={o.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              {/* Top Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-slate-900 text-sm">{o.order_number}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      o.status === 'In Transit'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : o.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {o.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Placed on {o.date}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-emerald-700">₹{o.total_amount}</span>
                  <Link
                    to={`/delivery-tracking/${o.id}`}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow transition"
                  >
                    <Truck className="w-3.5 h-3.5" /> Track Live
                  </Link>
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Buyer</span>
                  <span className="font-bold text-slate-800">{o.buyer_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Farmer</span>
                  <span className="font-bold text-slate-800">{o.farmer_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Product & Qty</span>
                  <span className="font-bold text-slate-800">{o.product_name} ({o.quantity})</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block">Payment Method</span>
                  <span className="font-bold text-emerald-700">{o.payment_method} ({o.payment_status})</span>
                </div>
              </div>

              {/* Visual Timeline Progress */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-3">Order Status Timeline</span>
                <div className="grid grid-cols-6 gap-1 relative">
                  {timelineSteps.map((stepName, idx) => {
                    const isPassed = o.timeline_step >= idx + 1;
                    return (
                      <div key={idx} className="flex flex-col items-center text-center space-y-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition ${
                          isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {isPassed ? '✓' : idx + 1}
                        </div>
                        <span className={`text-[10px] font-semibold ${isPassed ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                          {stepName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
