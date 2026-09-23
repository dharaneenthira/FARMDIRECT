import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Sprout, Upload, Save, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

export const AddProduct = () => {
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    category_id: '1',
    description: '',
    price_per_unit: '',
    unit: 'kg',
    available_quantity: '',
    harvest_date: 'Harvested Today',
    location: 'Madurai, Tamil Nadu',
    quality_grade: 'Grade A+',
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
  });

  const [error, setError] = useState('');

  const sampleImages = [
    { label: 'Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
    { label: 'Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Onions', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80' },
    { label: 'Mangoes', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80' },
    { label: 'Bananas', url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80' },
    { label: 'Coconut', url: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80' },
  ];

  const handlePublish = (status = 'published') => {
    if (!formData.name || !formData.price_per_unit || !formData.available_quantity) {
      setError('Please fill in all required fields (Product Name, Price, and Quantity).');
      return;
    }
    setError('');

    // Call backend API or local mock
    fetch('http://localhost:8000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, status })
    })
      .then(() => {
        addToast(`Product "${formData.name}" successfully published! Smart Buyer Matching active.`, 'success');
        navigate('/marketplace');
      })
      .catch(() => {
        addToast(`Product "${formData.name}" published locally in demo mode!`, 'success');
        navigate('/marketplace');
      });
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role="farmer" />

      <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Publish New Crop Listing</h1>
            <p className="text-xs text-slate-500">List your farm produce directly to regional & national buyers</p>
          </div>
          <Link
            to="/ai-price-prediction"
            className="bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition hover:bg-emerald-900 self-start sm:self-auto"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Check AI Price Recommendation
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-4xl space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Product / Crop Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fresh Madurai Country Tomatoes"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Crop Category</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="1">Vegetables</option>
                <option value="2">Grains & Rice</option>
                <option value="3">Fruits</option>
                <option value="4">Spices & Herbs</option>
              </select>
            </div>

            {/* Price Per Unit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Expected Price (₹ per unit) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  placeholder="e.g. 32"
                  value={formData.price_per_unit}
                  onChange={(e) => setFormData({ ...formData, price_per_unit: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-4 top-2.5 text-xs text-slate-400 font-bold">₹/{formData.unit}</span>
              </div>
            </div>

            {/* Quantity & Unit */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Available Quantity <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 800"
                  value={formData.available_quantity}
                  onChange={(e) => setFormData({ ...formData, available_quantity: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="kg">kg (Kilograms)</option>
                  <option value="ton">Tons</option>
                  <option value="piece">Pieces</option>
                  <option value="box">Boxes</option>
                </select>
              </div>
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Quality Grade</label>
              <select
                value={formData.quality_grade}
                onChange={(e) => setFormData({ ...formData, quality_grade: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Grade A+">Grade A+ (Export Quality)</option>
                <option value="Grade A">Grade A (Standard Premium)</option>
                <option value="Grade B">Grade B (Commercial Grade)</option>
              </select>
            </div>

            {/* Harvest Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Harvest Date</label>
              <input
                type="text"
                placeholder="e.g. Harvested Yesterday"
                value={formData.harvest_date}
                onChange={(e) => setFormData({ ...formData, harvest_date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Crop Description</label>
            <textarea
              rows={3}
              placeholder="Describe farming techniques, organic certifications, freshness, and delivery readiness..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Image Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Crop Photo</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {sampleImages.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, image_url: img.url })}
                  className={`rounded-xl overflow-hidden border-2 transition text-left relative ${
                    formData.image_url === img.url ? 'border-emerald-600 ring-2 ring-emerald-400' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-16 object-cover" />
                  <span className="block text-[10px] font-bold text-center py-1 bg-slate-900 text-white">{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handlePublish('published')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-sm flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Publish Product Live
            </button>
            <button
              type="button"
              onClick={() => handlePublish('draft')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-xl border border-slate-300 transition text-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save as Draft
            </button>
          </div>

        </div>

      </main>
    </div>
  );
};
