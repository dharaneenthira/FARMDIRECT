import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Sprout } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, deliveryFee, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Your Direct Trade Shopping Cart</h1>
            <p className="text-xs text-slate-500">Sourced directly from verified Indian farmers with zero intermediary cuts</p>
          </div>
          <Link to="/marketplace" className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4">
            <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Your Cart is Currently Empty</h3>
            <p className="text-xs text-slate-500">Explore our agricultural marketplace to add fresh farm produce.</p>
            <Link
              to="/marketplace"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow"
            >
              Explore Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                      <span className="text-xs text-emerald-700 font-semibold block">{item.farmer_name || 'Verified Farmer'}</span>
                      <span className="text-xs text-slate-500">Price: ₹{item.price_per_unit} / {item.unit}</span>
                    </div>
                  </div>

                  {/* Quantity & Controls */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 10)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-bold text-slate-900 text-xs">{item.quantity} {item.unit}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 10)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="text-sm font-black text-emerald-700 block">₹{item.price_per_unit * item.quantity}</span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 font-bold hover:underline"
                >
                  Clear Shopping Cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 h-fit">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Crops Subtotal</span>
                  <span className="font-bold text-slate-900">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Agro Logistics & Delivery</span>
                  <span className="font-bold text-slate-900">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Intermediary Fee Saved</span>
                  <span>- ₹{Math.round(cartSubtotal * 0.18)} (0% Commission)</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total Payable</span>
                  <span className="text-2xl font-black text-emerald-700">₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    addToast('Please log in to continue.', 'error');
                    navigate('/login', { state: { from: { pathname: '/checkout' } } });
                    return;
                  }
                  navigate('/checkout');
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center text-[11px] text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
                Guaranteed Direct Payment to Farmers upon Verified Delivery
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
