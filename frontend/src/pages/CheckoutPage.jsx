import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, CreditCard, ShieldCheck, MapPin, 
  Truck, ArrowRight, Check, AlertCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

import { API_BASE_URL } from '../config';

export const CheckoutPage = () => {
  const { cartItems, cartSubtotal, deliveryFee, cartTotal, clearCart } = useCart();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [address, setAddress] = useState('FreshMart Hyperlocal Warehouse, RS Puram, Coimbatore, Tamil Nadu - 641002');
  const [phone, setPhone] = useState('+91 91234 98765');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Card, Cash on Delivery
  const [processing, setProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setProcessing(true);

    const itemsPayload = cartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }));

    fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: itemsPayload,
        delivery_address: address,
        payment_method: paymentMethod
      })
    })
      .then(res => res.json())
      .then(data => {
        setProcessing(false);
        setConfirmedOrder(data);
        setStep(3);
        clearCart();
        addToast('Order successfully placed and paid via Simulated Payment!', 'success');
      })
      .catch(() => {
        // Fallback simulated order success
        setProcessing(false);
        const mockOrder = {
          order_id: 1,
          order_number: `FD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          total_amount: cartTotal,
          status: 'Order Placed'
        };
        setConfirmedOrder(mockOrder);
        setStep(3);
        clearCart();
        addToast('Order placed successfully (Demo Mode)!', 'success');
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Step Indicator Wizard */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          {[
            { stepNum: 1, title: 'Delivery Address' },
            { stepNum: 2, title: 'Payment & Summary' },
            { stepNum: 3, title: 'Order Confirmation' }
          ].map((s) => (
            <div key={s.stepNum} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s.stepNum ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {step > s.stepNum ? <Check className="w-4 h-4" /> : s.stepNum}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${
                step >= s.stepNum ? 'text-slate-900' : 'text-slate-400'
              }`}>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Address Input */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" /> Delivery Address & Contact Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Delivery Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
            >
              Continue to Payment Method <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Payment & Final Summary */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Select Payment Option (Simulated)
            </h2>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'UPI', label: 'UPI Direct (GPay/PhonePe)', icon: '📱' },
                { id: 'Card', label: 'Credit / Debit Card', icon: '💳' },
                { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition flex flex-col gap-2 ${
                    paymentMethod === m.id
                      ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-xs font-bold">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Produce Total:</span>
                <span className="font-bold">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Agro Delivery Fee:</span>
                <span className="font-bold">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-emerald-700 pt-2 border-t border-slate-200">
                <span>Total Amount to Pay:</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-xs"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
              >
                {processing ? 'Processing Payment...' : `Complete Order & Pay ₹${cartTotal}`}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Modal / Screen */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Payment Successful</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Order Confirmed!</h2>
              <p className="text-xs text-slate-500 mt-1">Order Number: <span className="font-mono font-bold text-slate-800">{confirmedOrder?.order_number || 'FD-2026-98401'}</span></p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-bold text-emerald-700">₹{confirmedOrder?.total_amount || cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method:</span>
                <span className="font-bold text-slate-800">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Status:</span>
                <span className="font-bold text-blue-600">Preparing Harvest for Pickup</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <button
                onClick={() => navigate('/delivery-tracking/1')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" /> Track Delivery Live
              </button>
              <button
                onClick={() => navigate('/buyer-dashboard')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl transition text-xs"
              >
                Go to Buyer Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
