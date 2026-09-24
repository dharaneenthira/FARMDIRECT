import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { User, MapPin, Phone, Mail, Award, Sprout, Save, Camera, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const FarmerProfile = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [formData, setFormData] = useState({
    farmerName: user ? user.name : "Murugan Agricultural Farm",
    email: user ? user.email : "farmer@farmdirect.com",
    phone: user ? user.phone || "+91 98430 11223" : "+91 98430 11223",
    farmName: "Green Valley Organic Farms",
    farmLocation: "Vadipatti, Madurai, Tamil Nadu",
    farmSize: "12.5",
    cropsGrown: "Country Tomatoes, Sona Masoori Rice, Red Onions, Green Chillies",
    experience: "14",
    photoUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80"
  });

  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    addToast("Farmer Profile successfully updated!", "success");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="farmer" />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Farmer Profile & Farm Credentials</h1>
            <p className="text-xs text-slate-500">Manage your farm verification details visible to direct buyers</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            {editing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Card & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Summary Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center">
            <div className="relative inline-block">
              <img
                src={formData.photoUrl}
                alt={formData.farmerName}
                className="w-32 h-32 rounded-3xl object-cover mx-auto border-4 border-emerald-500 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 bg-emerald-600 text-white p-1.5 rounded-xl border-2 border-white">
                <Camera className="w-4 h-4" />
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">{formData.farmerName}</h2>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">{formData.farmName}</p>
              <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Farmer
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-left space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{formData.farmLocation}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{formData.email}</span>
              </div>
            </div>
          </div>

          {/* Right Edit Form */}
          <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Farmer Name</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={formData.farmerName}
                    onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Farm Name</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={formData.farmName}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="text"
                    disabled={!editing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    disabled={!editing}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Farm Size (Acres)</label>
                  <input
                    type="number"
                    disabled={!editing}
                    value={formData.farmSize}
                    onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Farming Experience (Years)</label>
                  <input
                    type="number"
                    disabled={!editing}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Farm Location Address</label>
                <input
                  type="text"
                  disabled={!editing}
                  value={formData.farmLocation}
                  onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Primary Crops Grown</label>
                <textarea
                  rows={2}
                  disabled={!editing}
                  value={formData.cropsGrown}
                  onChange={(e) => setFormData({ ...formData, cropsGrown: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {editing && (
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition text-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Profile Changes
                </button>
              )}
            </form>
          </div>

        </div>

      </main>
    </div>
  );
};
