import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Phone, ShieldCheck, Navigation, Clock } from 'lucide-react';

export const MapTracker = ({ 
  origin = "Madurai Organic Farm Hub", 
  destination = "Coimbatore Supermarket",
  driverName = "Ramesh Kumar (AgroExpress Fleet)",
  driverPhone = "+91 98765 43210",
  vehicleNo = "TN 59 AB 2024",
  eta = "Today, 5:30 PM",
  initialProgress = 65
}) => {
  const [progress, setProgress] = useState(initialProgress);

  // Live truck pulse movement animation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 95 ? 40 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="text-lg font-bold text-white">Live Farm-to-Buyer Delivery Tracking</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">Vehicle: <span className="text-emerald-400 font-mono font-bold">{vehicleNo}</span></p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700/60">
          <Clock className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Estimated Arrival</span>
            <span className="text-sm font-black text-emerald-300">{eta}</span>
          </div>
        </div>
      </div>

      {/* Visual Map Canvas / Graphic Container */}
      <div className="relative w-full h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
        {/* Subtle Map Grid Background Patterns */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Route Line SVG */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-600/40" style={{ filter: 'drop-shadow(0 0 6px #10b981)' }}>
          <path
            d="M 60 180 Q 200 60, 450 140 T 780 100"
            fill="none"
            strokeWidth="4"
            strokeDasharray="8 6"
          />
        </svg>

        {/* Origin Pin (Madurai) */}
        <div className="absolute left-[8%] bottom-[20%] flex flex-col items-center z-10">
          <div className="w-9 h-9 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="mt-1 px-2 py-0.5 bg-slate-900/90 text-emerald-300 text-[10px] font-bold rounded border border-emerald-800">
            {origin}
          </span>
        </div>

        {/* Moving Truck Icon */}
        <div
          className="absolute z-20 flex flex-col items-center transition-all duration-1000 ease-linear"
          style={{
            left: `${Math.min(Math.max(progress, 15), 82)}%`,
            top: `${35 + Math.sin(progress * 0.1) * 15}%`
          }}
        >
          <div className="w-11 h-11 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white animate-bounce">
            <Truck className="w-6 h-6" />
          </div>
          <span className="mt-1 px-2.5 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500 shadow">
            In Transit ({progress}%)
          </span>
        </div>

        {/* Destination Pin (Coimbatore) */}
        <div className="absolute right-[8%] top-[25%] flex flex-col items-center z-10">
          <div className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="mt-1 px-2 py-0.5 bg-slate-900/90 text-blue-300 text-[10px] font-bold rounded border border-blue-800">
            {destination}
          </span>
        </div>

        {/* Live Status Overlay Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs flex items-center gap-2">
          <Navigation className="w-4 h-4 text-emerald-400 animate-spin" />
          <span className="text-slate-300 font-medium">GPS Signal: <strong className="text-emerald-400">Strong (4G Connected)</strong></span>
        </div>
      </div>

      {/* Progress Bar & Driver Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="md:col-span-2 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Route Progress</span>
            <span className="text-emerald-400 font-bold">{progress}% Completed</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-600 to-green-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Driver Contact Card */}
        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Assigned Driver</span>
            <span className="text-xs font-bold text-white">{driverName}</span>
          </div>
          <a
            href={`tel:${driverPhone}`}
            className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1 text-xs font-bold transition"
          >
            <Phone className="w-3.5 h-3.5" /> Call
          </a>
        </div>
      </div>

    </div>
  );
};
