import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, MapPin, Calendar, Award, Phone, MessageSquare, 
  ShoppingCart, ArrowLeft, Star, CheckCircle, Truck 
} from 'lucide-react';
import { RatingStars } from '../components/RatingStars';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';

import { API_BASE_URL } from '../config';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useNotification();
  const { t } = useLanguage();

  const [quantity, setQuantity] = useState(25);
  const [product, setProduct] = useState({
    id: 1,
    name: "Fresh Country Tomatoes",
    description: "Naturally grown juicy farm-fresh country tomatoes. Harvested straight from Madurai fields without artificial chemical sprays.",
    price_per_unit: 32.0,
    unit: "kg",
    available_quantity: 850,
    harvest_date: "Harvested Yesterday",
    location: "Vadipatti, Madurai, Tamil Nadu",
    quality_grade: "Grade A+ (Export Quality)",
    distance_km: 12.4,
    image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    farmer_name: "Murugan Agricultural Farm",
    farmer_rating: 4.9,
    farmer_experience: 14,
    farmer_phone: "+91 98430 11223",
    reviews: [
      { id: 1, name: "FreshMart Coimbatore", rating: 5, comment: "Exceptional quality tomatoes delivered directly without damage!" },
      { id: 2, name: "Annapoorna Foods", rating: 5, comment: "Fresh farmgate taste, perfect for restaurant supply." }
    ]
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.name) setProduct(data);
      })
      .catch(() => {});
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>

        {/* Product Details Main Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Large Image */}
          <div className="lg:col-span-6 bg-slate-100 relative p-6 flex items-center justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full max-h-[420px] object-cover rounded-2xl shadow-lg"
            />
            <span className="absolute top-9 left-9 bg-emerald-950/80 backdrop-blur-md text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-700">
              {product.quality_grade}
            </span>
          </div>

          {/* Right Info & Actions */}
          <div className="lg:col-span-6 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Direct Farm Listing</span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{product.name}</h1>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {product.location} ({product.distance_km || 12.4} km away)
                </p>
              </div>

              {/* Price Banner */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Direct Farmgate Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-emerald-800">₹{product.price_per_unit}</span>
                    <span className="text-xs text-emerald-700 font-bold">/ {product.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Harvest Stock</span>
                  <span className="text-sm font-bold text-emerald-900">{product.available_quantity} {product.unit} Available</span>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 font-bold block text-[10px]">HARVEST DATE</span>
                  <span className="font-bold text-slate-800">{product.harvest_date}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 font-bold block text-[10px]">FARM LOCATION</span>
                  <span className="font-bold text-slate-800">{product.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs leading-relaxed">{product.description}</p>

              {/* Quantity Selector */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Quantity ({product.unit}):</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(10, quantity - 10))}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold rounded-l-xl text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-black text-slate-900 text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 10)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold rounded-r-xl text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Subtotal: ₹{product.price_per_unit * quantity}</span>
                </div>
              </div>

            </div>

            {/* Actions Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    addToast(`Added ${quantity} ${product.unit} to Cart!`, 'success');
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition"
                >
                  <ShoppingCart className="w-4 h-4" /> {t('addToCart')}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  ⚡ {t('buyNow')}
                </button>
              </div>

              <Link
                to={`/chat?product=${product.id}`}
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" /> Contact Farmer Directly
              </Link>
            </div>

          </div>
        </div>

        {/* Farmer Profile Card & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Farmer Card */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Verified Farmer Profile</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center text-xl">
                🌾
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{product.farmer_name}</h4>
                <RatingStars rating={product.farmer_rating || 4.9} />
                <span className="text-xs text-slate-500 mt-1 block">{product.farmer_experience || 14} Years Agricultural Experience</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-600">Verified Phone: <strong className="text-slate-900">{product.farmer_phone}</strong></span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">Direct Farmgate</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Verified Buyer Reviews</h3>
            <div className="space-y-3">
              {product.reviews && product.reviews.map(r => (
                <div key={r.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900">{r.name || 'Verified Wholesale Buyer'}</span>
                    <RatingStars rating={r.rating} />
                  </div>
                  <p className="text-xs text-slate-600 italic">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
