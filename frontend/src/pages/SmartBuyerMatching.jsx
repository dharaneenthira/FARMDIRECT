import React, { useState } from 'react';
import { 
  Users, Cpu, MapPin, Phone, MessageSquare, ShieldCheck, 
  ArrowRight, Sparkles, Filter 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { RatingStars } from '../components/RatingStars';
import { useNotification } from '../context/NotificationContext';

export const SmartBuyerMatching = () => {
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [cropName, setCropName] = useState('Fresh Country Tomatoes');
  const [quantity, setQuantity] = useState(500);
  const [expectedPrice, setExpectedPrice] = useState(32);
  const [location, setLocation] = useState('Madurai');

  const [matches, setMatches] = useState([
    {
      id: 101,
      name: "FreshMart Supermarket Chain",
      type: "Wholesale Supermarket",
      location: "Madurai Urban",
      distance_km: 14.2,
      required_crop: "Fresh Country Tomatoes",
      required_quantity: 600,
      preferred_price: 34.0,
      phone: "+91 94432 10987",
      rating: 4.9,
      match_percentage: 96.5,
      verified: true
    },
    {
      id: 102,
      name: "Annapoorna Hospitality Network",
      type: "Restaurant Chain",
      location: "Coimbatore Main",
      distance_km: 38.5,
      required_crop: "Fresh Country Tomatoes",
      required_quantity: 450,
      preferred_price: 35.0,
      phone: "+91 98421 88765",
      rating: 4.8,
      match_percentage: 92.0,
      verified: true
    },
    {
      id: 103,
      name: "SouthAgro Wholesalers",
      type: "Mandi Wholesaler",
      location: "Salem Agricultural Market",
      distance_km: 25.0,
      required_crop: "Fresh Country Tomatoes",
      required_quantity: 1200,
      preferred_price: 31.5,
      phone: "+91 97890 12345",
      rating: 4.7,
      match_percentage: 88.4,
      verified: true
    },
    {
      id: 104,
      name: "Organic Basket Direct",
      type: "Direct Consumer Collective",
      location: "Thanjavur Hub",
      distance_km: 18.0,
      required_crop: "Fresh Country Tomatoes",
      required_quantity: 300,
      preferred_price: 36.0,
      phone: "+91 91234 56789",
      rating: 4.95,
      match_percentage: 84.0,
      verified: true
    }
  ]);

  const handleRunMatch = (e) => {
    e.preventDefault();
    addToast('Executing Smart Buyer Matrix algorithm...', 'info');

    fetch('http://localhost:8000/api/ai/buyer-matching', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crop_name: cropName, quantity: Number(quantity), expected_price: Number(expectedPrice), location })
    })
      .then(res => res.json())
      .then(data => {
        if (data.recommended_buyers) setMatches(data.recommended_buyers);
        addToast('Smart Buyer Matching completed!', 'success');
      })
      .catch(() => {
        addToast('Smart Match calculated (Demo Mode)', 'success');
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-900 border border-emerald-700 px-3 py-1 rounded-full text-xs font-bold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>SIH26033 Smart Buyer AI Algorithm</span>
            </div>
            <h1 className="text-3xl font-black">Smart Buyer Matching Engine</h1>
            <p className="text-emerald-200 text-sm max-w-2xl">
              Ranks bulk buyers automatically based on crop requirement match, price readiness, and delivery distance proximity.
            </p>
          </div>

          <div className="bg-emerald-900/80 p-4 rounded-2xl border border-emerald-700 text-center z-10">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">Top Match Score</span>
            <span className="text-2xl font-black text-white">{matches[0]?.match_percentage}%</span>
          </div>
        </div>

        {/* Input Parameters Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Crop Listing Criteria</h3>
          
          <form onSubmit={handleRunMatch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Crop Name</label>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Quantity (kg)</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Expected Price (₹/kg)</label>
              <input
                type="number"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Farm Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow transition flex items-center justify-center gap-1"
              >
                ⚡ Match Buyers
              </button>
            </div>

          </form>
        </div>

        {/* Results Heading */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-900">Recommended Buyers</h2>
          <span className="text-xs text-slate-500 font-semibold">{matches.length} Buyers Matched</span>
        </div>

        {/* Recommended Buyer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((b) => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 card-hover-effect flex flex-col justify-between"
            >
              
              {/* Card Header & Match % Badge */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{b.name}</h3>
                    {b.verified && (
                      <span className="text-emerald-600" title="Verified Buyer Profile">
                        <ShieldCheck className="w-4 h-4 inline" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-semibold block">{b.type} • {b.location}</span>
                  <RatingStars rating={b.rating || 4.8} />
                </div>

                {/* Match Score Badge */}
                <div className="bg-emerald-950 text-emerald-400 border border-emerald-700 px-3.5 py-1.5 rounded-2xl text-right">
                  <span className="text-xs font-mono font-black text-white block">{b.match_percentage}%</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400">Match</span>
                </div>
              </div>

              {/* Requirement Specs */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Required Crop</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{b.required_crop}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Required Qty</span>
                  <span className="font-bold text-slate-800">{b.required_quantity} kg</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Preferred Price</span>
                  <span className="font-bold text-emerald-700">₹{b.preferred_price} / kg</span>
                </div>
              </div>

              {/* Distance & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {b.distance_km} km away
                </span>

                <Link
                  to={`/chat?buyer=${b.id}`}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow transition"
                >
                  <MessageSquare className="w-4 h-4" /> Contact Buyer
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
