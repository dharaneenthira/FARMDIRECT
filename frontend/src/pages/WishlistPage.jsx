import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { addToast } = useNotification();

  const wishlistProducts = [
    {
      id: 2,
      name: "Organic Sona Masoori Rice",
      farmer_name: "Velu (Thanjavur Agro)",
      price_per_unit: 58.0,
      unit: "kg",
      location: "Thanjavur, TN",
      image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Salem Alphonso Mangoes",
      farmer_name: "Lakshmi (Salem Orchards)",
      price_per_unit: 140.0,
      unit: "kg",
      location: "Salem, TN",
      image_url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Saved Wishlist Crops</h1>
            <p className="text-xs text-slate-500">Track price drops & buy directly when harvest is available</p>
          </div>
          <Link to="/marketplace" className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Marketplace
          </Link>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4">
            <Heart className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-500">Save crops from the marketplace to get price drop notifications.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlistProducts.map((p) => (
              <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex gap-4 items-center">
                <img src={p.image_url} alt={p.name} className="w-24 h-24 rounded-2xl object-cover border border-slate-200" />
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                  <span className="text-xs text-emerald-700 font-semibold block">{p.farmer_name}</span>
                  <span className="text-sm font-black text-slate-900 block">₹{p.price_per_unit} / {p.unit}</span>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        addToCart(p, 10);
                        addToast(`Added ${p.name} to Cart!`, 'success');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Buy Now
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold p-1"
                    >
                      <Trash2 className="w-4 h-4" />
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
