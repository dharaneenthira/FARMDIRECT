import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, ShoppingBag, ArrowRight, ShieldCheck, TrendingUp, 
  Users, MapPin, CheckCircle, AlertTriangle, Cpu, Truck, 
  CreditCard, BarChart2, Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { t } = useLanguage();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* HERO SECTION */}
      <section className="relative hero-gradient text-white pt-20 pb-32 overflow-hidden">
        {/* Background decorative glowing circles */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-700/80 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SIH26033 – AI-Powered Agricultural Marketplace</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                FarmDirect – <span className="text-emerald-400">From Farm to Buyer,</span> Directly.
              </h1>
              <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl leading-relaxed">
                {t('subtitle')} Connect directly with farmers, discover fair prices, and make agricultural trading simpler without intermediary commissions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => { switchRole('farmer'); navigate('/farmer-dashboard'); }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition flex items-center gap-2 text-sm"
                >
                  🌾 {t('imFarmer')}
                </button>
                <button
                  onClick={() => { switchRole('buyer'); navigate('/marketplace'); }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 transition flex items-center gap-2 text-sm"
                >
                  🛒 {t('imBuyer')}
                </button>
                <Link
                  to="/marketplace"
                  className="text-emerald-300 hover:text-white font-semibold flex items-center gap-1 text-sm underline-offset-4 hover:underline"
                >
                  {t('exploreMarketplace')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 flex flex-wrap gap-6 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 0% Intermediary Fee
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> AI Price Prediction
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" /> Live GPS Delivery
                </div>
              </div>
            </div>

            {/* Visual Diagram: Farmer -> FarmDirect -> Buyer */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-emerald-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-6">
                <div className="text-center pb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Direct Platform Workflow</span>
                  <h3 className="text-lg font-bold text-white">Intermediary Elimination Engine</h3>
                </div>

                <div className="flex items-center justify-between relative px-2">
                  
                  {/* Farmer Node */}
                  <div className="flex flex-col items-center text-center space-y-2 z-10">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-800/90 border-2 border-emerald-500 flex items-center justify-center text-2xl shadow-lg">
                      🌾
                    </div>
                    <span className="text-xs font-bold text-white">Farmer</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">+18% Profit</span>
                  </div>

                  {/* Flow Arrow 1 */}
                  <div className="flex-1 flex flex-col items-center px-2">
                    <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 to-green-400 relative">
                      <div className="absolute right-0 -top-1 w-2 h-2 border-r-2 border-t-2 border-green-400 transform rotate-45"></div>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 font-mono">Direct Trade</span>
                  </div>

                  {/* FarmDirect AI Node */}
                  <div className="flex flex-col items-center text-center space-y-2 z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-slate-950 shadow-xl font-bold">
                      <Sprout className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold text-emerald-300">FarmDirect</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">AI Hub</span>
                  </div>

                  {/* Flow Arrow 2 */}
                  <div className="flex-1 flex flex-col items-center px-2">
                    <div className="h-0.5 w-full bg-gradient-to-r from-green-400 to-emerald-500 relative">
                      <div className="absolute right-0 -top-1 w-2 h-2 border-r-2 border-t-2 border-emerald-500 transform rotate-45"></div>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 font-mono">Fair Price</span>
                  </div>

                  {/* Buyer Node */}
                  <div className="flex flex-col items-center text-center space-y-2 z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-900/90 border-2 border-blue-500 flex items-center justify-center text-2xl shadow-lg">
                      🏪
                    </div>
                    <span className="text-xs font-bold text-white">Buyer</span>
                    <span className="text-[10px] text-blue-400 font-semibold">-15% Cost</span>
                  </div>

                </div>

                {/* Savings Callout */}
                <div className="bg-emerald-950/80 border border-emerald-800 p-3 rounded-xl text-center text-xs text-emerald-200">
                  <span className="font-bold text-white">Cut Out 3-4 Intermediaries:</span> Farmers earn up to 22% higher prices while buyers get fresher produce at 15% lower cost.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: PROBLEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">Problem Statement (SIH26033)</span>
            <h2 className="text-3xl font-black text-slate-900">Why the Traditional Agri-Market is Broken</h2>
            <p className="text-slate-600">Multiple middleman layers exploit supply chain gaps, dampening farmer revenues while burdening end consumers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Multiple Intermediaries</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Crops pass through 3 to 5 traders, agents, and mandi brokers before reaching the consumer.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                📉
              </div>
              <h3 className="text-lg font-bold text-slate-900">Lower Farmer Earnings</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Farmers receive only 25% - 35% of the final consumer price due to heavy middleman cuts.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                🏷️
              </div>
              <h3 className="text-lg font-bold text-slate-900">Higher Consumer Prices</h3>
              <p className="text-slate-600 text-sm leading-relaxed">End consumers pay inflated retail prices due to compounded transport and commission margins.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                🔍
              </div>
              <h3 className="text-lg font-bold text-slate-900">Limited Market Information</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Lack of transparent real-time mandi rates leaves farmers vulnerable to price manipulation.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                🤝
              </div>
              <h3 className="text-lg font-bold text-slate-900">Finding Suitable Buyers</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Farmers struggle to discover reliable bulk buyers outside local regional mandis.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                ⏳
              </div>
              <h3 className="text-lg font-bold text-slate-900">Post-Harvest Spoilage</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Delays in finding buyers cause perishable produce like tomatoes to spoil before sale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR SOLUTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-800">Our Solution</span>
            <h2 className="text-3xl font-black text-white">The FarmDirect Ecosystem</h2>
            <p className="text-slate-400">Combining AI pricing algorithms, smart matching matrix, and direct digital logistics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Direct Farmer-Buyer Connection</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Instant direct communication and contract negotiations between farmers and bulk buyers.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Fair Price Recommendation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">AI analyzes mandi trends, historical prices, and harvest volumes to recommend optimal farmgate prices.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">AI-Based Buyer Matching</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Smart matrix matches farmer crops with nearby buyers based on required quantity, distance, and price.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Real-Time Demand Forecasting</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Predictive analytics help farmers plan harvest schedules according to seasonal market demand.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Digital Orders & Payments</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Instant order confirmation with simulated UPI, Card, and Cash on Delivery payments.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Location-Based Logistics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Live GPS delivery route visualizer tracking harvest shipments directly from farm to storefront.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (8 STEPS) */}
      <section className="py-20 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-900/80 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-700">Step-by-Step Workflow</span>
            <h2 className="text-3xl font-black text-white">How FarmDirect Works</h2>
            <p className="text-emerald-200">A seamless 8-step journey from crop harvest to payment receipt.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "Step 1", title: "Farmer Registration", desc: "Farmer creates profile with location, farm size, and crop expertise." },
              { step: "Step 2", title: "Upload Crop & Quantity", desc: "List produce details, expected harvest date, and quality grade." },
              { step: "Step 3", title: "Market Data Analysis", desc: "System gathers regional mandi prices and demand indices." },
              { step: "Step 4", title: "AI Price & Demand Prediction", desc: "AI algorithm predicts optimal selling price and market demand." },
              { step: "Step 5", title: "Smart Buyer Matching", desc: "Platform automatically ranks buyers with high match percentage." },
              { step: "Step 6", title: "Direct Order", desc: "Buyer places order directly; farmer accepts terms via chat." },
              { step: "Step 7", title: "Delivery Tracking", desc: "Live GPS tracking monitors shipment from farmgate to buyer location." },
              { step: "Step 8", title: "Payment & Transaction", desc: "Instant payment release upon verified produce delivery." }
            ].map((item, idx) => (
              <div key={idx} className="bg-emerald-900/40 border border-emerald-800 p-5 rounded-2xl space-y-3 relative overflow-hidden">
                <span className="text-3xl font-black text-emerald-500/30 absolute right-3 top-2">{item.step}</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-emerald-950 font-bold flex items-center justify-center text-xs">
                  {idx + 1}
                </div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-emerald-200 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BENEFITS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Farmers Benefits */}
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-2xl">
                  🌾
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-950">Benefits for Farmers</h3>
                  <p className="text-emerald-700 text-xs">Maximize your earnings & market independence</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-emerald-900 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Better Selling Price:</strong> Capture full market value without middleman deductions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Reduced Commissions:</strong> Save 15% - 25% usually lost to mandi brokers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Market Price Visibility:</strong> Access transparent AI-backed price trends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Direct Buyer Access:</strong> Connect directly with supermarkets, hotels, and wholesalers.</span>
                </li>
              </ul>
            </div>

            {/* Buyers Benefits */}
            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-200 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl">
                  🏪
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-950">Benefits for Buyers</h3>
                  <p className="text-blue-700 text-xs">Source fresh produce reliably & transparently</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-blue-900 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Competitive Wholesale Prices:</strong> Purchase farm-fresh produce at 10%-15% lower cost.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Direct Farm Sourcing:</strong> Guaranteed freshness straight from verified local fields.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Traceability & Quality:</strong> Full visibility into harvest date, farm location, and grade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Assured Supply:</strong> Smart buyer matching secures crop availability in advance.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: DEMO STATISTICS */}
      <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-4xl font-black text-emerald-400 block">12,400+</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Registered Farmers</span>
            </div>
            <div>
              <span className="text-4xl font-black text-emerald-400 block">3,850+</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Buyers</span>
            </div>
            <div>
              <span className="text-4xl font-black text-emerald-400 block">45,000+</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tons Produce Listed</span>
            </div>
            <div>
              <span className="text-4xl font-black text-emerald-400 block">98.6%</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Direct Trade Success</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="py-20 hero-gradient text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">Transform Agricultural Trading Today</h2>
          <p className="text-emerald-100 text-base max-w-2xl mx-auto">Join India's premier direct farmer-to-buyer platform. Reduce intermediary costs and build sustainable trade relationships.</p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => { switchRole('farmer'); navigate('/farmer-dashboard'); }}
              className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-8 py-4 rounded-xl text-base shadow-xl transition"
            >
              Start Selling Directly 🌾
            </button>
            <button
              onClick={() => { switchRole('buyer'); navigate('/marketplace'); }}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/20 text-base transition"
            >
              Start Buying Directly 🛒
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
