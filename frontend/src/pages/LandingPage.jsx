import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, ShoppingBag, ArrowRight, ShieldCheck, TrendingUp, 
  Users, MapPin, CheckCircle, Search, Truck, 
  CreditCard, BarChart2, Star, ArrowUpRight, ChevronRight, Leaf
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Fresh Country Tomatoes",
    farmer_name: "Murugan Farms",
    farmer_rating: 4.9,
    location: "Madurai, Tamil Nadu",
    price_per_unit: 32,
    unit: "kg",
    available_quantity: 850,
    quality_grade: "Grade A+",
    category: "Vegetables",
    image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Salem Small Red Onions",
    farmer_name: "Lakshmi Orchards",
    farmer_rating: 4.95,
    location: "Salem, Tamil Nadu",
    price_per_unit: 40,
    unit: "kg",
    available_quantity: 1200,
    quality_grade: "Grade A",
    category: "Vegetables",
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Fresh Cavendish Bananas",
    farmer_name: "Salem Orchards",
    farmer_rating: 4.9,
    location: "Salem, Tamil Nadu",
    price_per_unit: 55,
    unit: "kg",
    available_quantity: 950,
    quality_grade: "Grade A",
    category: "Fruits",
    image_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Organic Sona Masoori Rice",
    farmer_name: "Velu Agro Farms",
    farmer_rating: 4.8,
    location: "Thanjavur, Tamil Nadu",
    price_per_unit: 68,
    unit: "kg",
    available_quantity: 2400,
    quality_grade: "Grade A+",
    category: "Grains",
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Pollachi Tender Coconuts",
    farmer_name: "Murugan Organic Farm",
    farmer_rating: 4.9,
    location: "Coimbatore, Tamil Nadu",
    price_per_unit: 35,
    unit: "piece",
    available_quantity: 600,
    quality_grade: "Grade A+",
    category: "Fruits",
    image_url: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Fresh Organic Green Chillies",
    farmer_name: "Velu Agro Farms",
    farmer_rating: 4.85,
    location: "Dindigul, Tamil Nadu",
    price_per_unit: 45,
    unit: "kg",
    available_quantity: 400,
    quality_grade: "Grade A+",
    category: "Organic Products",
    image_url: "https://images.unsplash.com/photo-1588879460618-924a0ec42ef7?auto=format&fit=crop&w=600&q=80"
  }
];

const CATEGORIES = [
  { name: "Vegetables", icon: "🥦", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80", count: "140+ Items" },
  { name: "Fruits", icon: "🍎", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80", count: "85+ Items" },
  { name: "Grains", icon: "🌾", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80", count: "60+ Items" },
  { name: "Pulses", icon: "🫘", image: "https://images.unsplash.com/photo-1515543904379-3d757abe9962?auto=format&fit=crop&w=400&q=80", count: "45+ Items" },
  { name: "Spices", icon: "🌶️", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80", count: "50+ Items" },
  { name: "Organic Products", icon: "🌿", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80", count: "90+ Items" },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 10);
    addToast(`Added ${product.name} (10 ${product.unit}) to cart!`, 'success');
  };

  const handleBuyNow = (product) => {
    addToCart(product, 10);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-600/60 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-300 shadow-sm">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Direct Farmgate Agricultural Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Fresh From Farms. <br />
                <span className="text-emerald-400">Directly to You.</span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Buy fresh agricultural products directly from trusted farmers at transparent prices.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/marketplace"
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-7 py-3.5 rounded-xl shadow-xl shadow-emerald-500/20 transition flex items-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" /> Shop Now
                </Link>
                <Link
                  to="/add-product"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl border border-white/20 transition flex items-center gap-2 text-sm"
                >
                  <Sprout className="w-4 h-4 text-emerald-300" /> Sell Your Products
                </Link>
              </div>

              {/* Prominent Search Bar */}
              <form onSubmit={handleHeroSearch} className="pt-4 max-w-xl mx-auto lg:mx-0">
                <div className="bg-white p-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-700/50">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for vegetables, fruits, grains..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="w-full text-slate-800 text-sm bg-transparent border-none focus:outline-none placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shrink-0"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick Highlights */}
              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Farm Quality
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" /> Direct Logistics
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Transparent Pricing
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80"
                  alt="Fresh Agricultural Produce"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Featured Farm</span>
                      <h3 className="font-extrabold text-base">Madurai Organic Agro Belt</h3>
                      <p className="text-xs text-slate-300">Fresh Harvest • Direct Delivery</p>
                    </div>
                    <Link
                      to="/marketplace"
                      className="bg-emerald-500 text-emerald-950 p-2.5 rounded-xl font-black text-xs hover:bg-emerald-400 transition"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Categories</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Explore Agricultural Categories</h2>
            </div>
            <Link
              to="/marketplace"
              className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
            >
              View All Categories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => navigate(`/marketplace?category=${encodeURIComponent(cat.name)}`)}
                className="group cursor-pointer bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 p-4 rounded-2xl transition text-center space-y-3 shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-md group-hover:scale-110 transition">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-800">{cat.name}</h3>
                  <span className="text-[11px] text-slate-500 font-semibold">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. PRODUCT MARKETPLACE PREVIEW */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Direct Produce</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Fresh Products Near You</h2>
            </div>
            <Link
              to="/marketplace"
              className="bg-emerald-900 hover:bg-emerald-800 text-emerald-100 font-bold px-4 py-2 rounded-xl text-xs transition"
            >
              Explore Full Marketplace →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col justify-between"
              >
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-800">
                    {product.quality_grade}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow">
                    {product.category}
                  </span>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold text-amber-700 border border-amber-200 shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{product.farmer_rating}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <p className="font-semibold text-slate-700">Farmer: {product.farmer_name}</p>
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {product.location}
                      </p>
                    </div>

                    <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex items-center justify-between mt-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-800 block">Direct Price</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-emerald-900">₹{product.price_per_unit}</span>
                          <span className="text-xs font-bold text-emerald-700">/{product.unit}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Stock</span>
                        <span className="text-xs font-extrabold text-slate-800">{product.available_quantity} {product.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-slate-600" /> Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 px-3 rounded-xl text-xs shadow-md transition"
                    >
                      Buy Now
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SMART FARMING TOOLS (AI Services) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">Market Intelligence</span>
            <h2 className="text-3xl font-black text-slate-900">Smart Farming Tools</h2>
            <p className="text-slate-600 text-sm">Data-driven analytics and forecasting services built for agricultural trade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: AI Price Predictor */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-emerald-400 transition space-y-5 shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/30">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">AI Price Predictor</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Check current and predicted market prices across regional mandis to price your crops for optimal profit margins.
                </p>
              </div>
              <Link
                to="/ai-price-prediction"
                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-900 group"
              >
                Explore → <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>

            {/* Card 2: Demand Forecast */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-emerald-400 transition space-y-5 shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/30">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Demand Forecast</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Understand upcoming seasonal demand trends and buyer volume expectations for your harvested crops.
                </p>
              </div>
              <Link
                to="/demand-forecast"
                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-900 group"
              >
                Explore → <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>

            {/* Card 3: Buyer Matching */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-emerald-400 transition space-y-5 shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-600/30">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Buyer Matching</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Find verified wholesale and retail buyers actively searching for your specific agricultural crops.
                </p>
              </div>
              <Link
                to="/smart-buyer-matching"
                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-900 group"
              >
                Explore → <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FARMER SECTION */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 uppercase tracking-widest">
                Farmer Direct Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">Are you a farmer?</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Sell your products directly to buyers and manage your orders from one place. Gain full control over crop pricing and logistics.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold pt-2">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center gap-3">
                  <span className="text-emerald-400 text-lg">📦</span>
                  <span>Add Products</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center gap-3">
                  <span className="text-emerald-400 text-lg">📑</span>
                  <span>Manage Orders</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center gap-3">
                  <span className="text-emerald-400 text-lg">💰</span>
                  <span>Track Earnings</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex items-center gap-3">
                  <span className="text-emerald-400 text-lg">📊</span>
                  <span>View Market Prices</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/add-product"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-3.5 rounded-xl shadow-xl transition inline-flex items-center gap-2 text-sm"
                >
                  Start Selling Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                alt="Farmer in Field"
                className="rounded-3xl shadow-2xl border-4 border-slate-800 object-cover w-full h-[380px]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 6. TRUST SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Trust & Reliability</span>
            <h2 className="text-3xl font-black text-slate-900">Why Farmers & Buyers Choose FarmDirect</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Verified Farmers</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Direct identity & farm location verification.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Transparent Pricing</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Clear pricing with zero hidden fees.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Secure Orders</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Escrow-backed payment protection.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Reliable Delivery</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Integrated GPS order dispatch.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Direct Communication</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Connect directly with buyers and sellers.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Simple Process</span>
            <h2 className="text-3xl font-black text-slate-900">How FarmDirect Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* For Buyers */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm">🛒</span>
                <h3 className="text-xl font-extrabold text-slate-900">For Buyers</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Find Products</h4>
                    <p className="text-xs text-slate-500">Search fresh produce from verified regional farmers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Order Directly</h4>
                    <p className="text-xs text-slate-500">Place orders at transparent prices without brokers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Receive Farm-Fresh Products</h4>
                    <p className="text-xs text-slate-500">Get crops delivered directly to your location.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Farmers */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm">🌾</span>
                <h3 className="text-xl font-extrabold text-slate-900">For Farmers</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">List Your Products</h4>
                    <p className="text-xs text-slate-500">Post crop details, quantities, and price expectations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Connect With Buyers</h4>
                    <p className="text-xs text-slate-500">Receive direct inquiries from commercial and retail buyers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Sell & Track Orders</h4>
                    <p className="text-xs text-slate-500">Ship produce and receive direct payment payouts.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
