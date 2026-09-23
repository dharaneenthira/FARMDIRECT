import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapTracker } from '../components/MapTracker';
import { ArrowLeft, ShieldCheck, Truck, MapPin, Clock, Phone } from 'lucide-react';

export const DeliveryTrackingPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/orders" className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
            </Link>
            <h1 className="text-2xl font-black text-slate-900">Real-Time Delivery Route Tracking</h1>
            <p className="text-xs text-slate-500">Live GPS tracking for Order <span className="font-mono font-bold text-slate-800">#FD-2026-98401</span></p>
          </div>

          <div className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Live AgroExpress Fleet Active
          </div>
        </div>

        {/* Map Tracker Interactive Component */}
        <MapTracker
          origin="Madurai Organic Farm Hub"
          destination="FreshMart Supermarket, Coimbatore"
          driverName="Ramesh Kumar (AgroExpress Fleet)"
          driverPhone="+91 98765 43210"
          vehicleNo="TN 59 AB 2024"
          eta="Today, 5:30 PM"
          initialProgress={68}
        />

        {/* Dispatch Details Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              🌾
            </div>
            <h3 className="text-sm font-bold text-slate-900">Farmer Origin Dispatch</h3>
            <p className="text-xs text-slate-600">Green Valley Organic Farms, Vadipatti, Madurai</p>
            <span className="text-[10px] text-emerald-700 font-bold block bg-emerald-50 px-2.5 py-1 rounded w-fit">
              Harvested & Dispatched Today 7:00 AM
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              🏪
            </div>
            <h3 className="text-sm font-bold text-slate-900">Buyer Store Destination</h3>
            <p className="text-xs text-slate-600">FreshMart Store, RS Puram, Coimbatore</p>
            <span className="text-[10px] text-blue-700 font-bold block bg-blue-50 px-2.5 py-1 rounded w-fit">
              Estimated Delivery Today 5:30 PM
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              📦
            </div>
            <h3 className="text-sm font-bold text-slate-900">Produce & Temperature</h3>
            <p className="text-xs text-slate-600">500 kg Fresh Country Tomatoes (Grade A+)</p>
            <span className="text-[10px] text-amber-700 font-bold block bg-amber-50 px-2.5 py-1 rounded w-fit">
              Controlled Storage: 18°C Fresh
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
