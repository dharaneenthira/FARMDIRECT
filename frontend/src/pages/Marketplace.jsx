import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, MapPin, Award, ShoppingCart, Eye, 
  ArrowUpDown, Check, ShieldCheck, Sprout
} from 'lucide-react';
import { RatingStars } from '../components/RatingStars';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Fresh Country Tomatoes",
    farmer_name: "Murugan (Organic Farm)",
    farmer_rating: 4.9,
    location: "Madurai, Tamil Nadu",
    price_per_unit: 32.0,
    unit: "kg",
    available_quantity: 850,
    quality_grade: "Grade A+",
    distance_km: 12.4,
    category: "Vegetables",
    image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Organic Sona Masoori Rice",
    farmer_name: "Velu (Thanjavur Agro)",
    farmer_rating: 4.8,
    location: "Thanjavur, Tamil Nadu",
    price_per_unit: 58.0,
    unit: "kg",
    available_quantity: 2400,
    quality_grade: "Grade A+",
    distance_km: 45.0,
    category: "Grains & Rice",
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Salem Small Red Onions",
    farmer_name: "Lakshmi (Salem Orchards)",
    farmer_rating: 4.95,
    location: "Salem, Tamil Nadu",
    price_per_unit: 28.0,
    unit: "kg",
    available_quantity: 1200,
    quality_grade: "Grade A",
    distance_km: 22.0,
    category: "Vegetables",
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Salem Alphonso Mangoes",
    farmer_name: "Lakshmi (Salem Orchards)",
    farmer_rating: 4.95,
    location: "Salem, Tamil Nadu",
    price_per_unit: 140.0,
    unit: "kg",
    available_quantity: 450,
    quality_grade: "Grade A+",
    distance_km: 30.0,
    category: "Fruits",
    image_url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Fresh Cavendish Bananas",
    farmer_name: "Lakshmi (Salem Orchards)",
    farmer_rating: 4.95,
    location: "Salem, Tamil Nadu",
    price_per_unit: 26.0,
    unit: "kg",
    available_quantity: 950,
    quality_grade: "Grade A",
    distance_km: 28.0,
    category: "Fruits",
    image_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Pollachi Tender Coconuts",
    farmer_name: "Murugan (Organic Farm)",
    farmer_rating: 4.9,
    location: "Coimbatore, Tamil Nadu",
    price_per_unit: 42.0,
    unit: "piece",
    available_quantity: 600,
    quality_grade: "Grade A+",
    distance_km: 18.5,
    category: "Fruits",
    image_url: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80"
  }
];

import { API_BASE_URL } from '../config';

export const Marketplace = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200);
  const [qualityGrade, setQualityGrade] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const { addToCart } = useCart();
  const { addToast } = useNotification();
  const { t } = useLanguage();
  const { user } = useAuth();

  // Try fetching backend API if running
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {
        // Fallback to mock dataset
      });
  }, []);

  // Filtering & Sorting
  let filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesPrice = p.price_per_unit <= maxPrice;
    const matchesQuality = qualityGrade === 'All' || p.quality_grade === qualityGrade;
    return matchesSearch && matchesCategory && matchesPrice && matchesQuality;
  });

  if (sortBy === 'price_low') {
    filtered.sort((a, b) => a.price_per_unit - b.price_per_unit);
  } else if (sortBy === 'price_high') {
    filtered.sort((a, b) => b.price_per_unit - a.price_per_unit);
  } else if (sortBy === 'distance') {
    filtered.sort((a, b) => a.distance_km - b.distance_km);
  } else {
    filtered.sort((a, b) => b.id - a.id);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="space-y-2 z-10">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Direct Agricultural Marketplace
            </span>
            <h1 className="text-3xl font-black">FarmDirect Marketplace</h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Buy fresh crops directly from verified regional farmers. Zero middleman fees, 100% price transparency.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-xs text-emerald-300 z-10">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Farmgate Quality Assured</span>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              >
                <option value="All">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains & Rice">Grains & Rice</option>
                <option value="Fruits">Fruits</option>
                <option value="Spices & Herbs">Spices & Herbs</option>
              </select>
            </div>

            {/* Sorting Select */}
            <div className="md:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              >
                <option value="newest">{t('newest')}</option>
                <option value="price_low">{t('priceLowHigh')}</option>
                <option value="price_high">{t('priceHighLow')}</option>
                <option value="distance">{t('nearest')}</option>
              </select>
            </div>

          </div>

          {/* Secondary Filters: Max Price Slider & Quality */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700">Max Price: ₹{maxPrice}/kg</span>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-36 accent-emerald-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Quality Grade:</span>
              {['All', 'Grade A+', 'Grade A'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setQualityGrade(grade)}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition ${
                    qualityGrade === grade
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>

            <div className="text-slate-500 font-semibold">
              Showing <span className="text-emerald-600 font-bold">{filtered.length}</span> verified crop listings
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4">
            <Sprout className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching crops found</h3>
            <p className="text-xs text-slate-500">Try adjusting your category filters or search query.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setMaxPrice(200); setQualityGrade('All'); }}
              className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm card-hover-effect flex flex-col justify-between"
              >
                {/* Image & Grade Overlay */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-700">
                    {p.quality_grade}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" /> {p.distance_km} km away
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-slate-900 line-clamp-1">{p.name}</h3>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-xs font-semibold text-slate-700 block">{p.farmer_name}</span>
                        <RatingStars rating={p.farmer_rating || 4.8} />
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{p.location}</span>
                    </div>
                  </div>

                  {/* Pricing & Stock */}
                  <div className="bg-slate-50 p-3 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Farm Price</span>
                      <span className="text-xl font-black text-emerald-700">₹{p.price_per_unit}</span>
                      <span className="text-xs text-slate-500"> / {p.unit}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Available</span>
                      <span className="text-xs font-bold text-slate-800">{p.available_quantity} {p.unit}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to={`/product/${p.id}`}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </Link>
                    <button
                      onClick={() => {
                        if (!user) {
                          addToast('Please log in to continue.', 'error');
                          navigate('/login');
                          return;
                        }
                        addToCart(p, 10);
                        addToast(`Added 10 ${p.unit} of ${p.name} to Cart!`, 'success');
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow transition"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> {t('addToCart')}
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
