import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { LandingPage } from './pages/LandingPage';
import { Marketplace } from './pages/Marketplace';
import { ProductDetails } from './pages/ProductDetails';
import { AiPricePrediction } from './pages/AiPricePrediction';
import { DemandForecasting } from './pages/DemandForecasting';
import { SmartBuyerMatching } from './pages/SmartBuyerMatching';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { FarmerProfile } from './pages/FarmerProfile';
import { AddProduct } from './pages/AddProduct';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderManagement } from './pages/OrderManagement';
import { DeliveryTrackingPage } from './pages/DeliveryTrackingPage';
import { ChatPage } from './pages/ChatPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/ai-price-prediction" element={<AiPricePrediction />} />
                    <Route path="/demand-forecast" element={<DemandForecasting />} />
                    <Route path="/smart-buyer-matching" element={<SmartBuyerMatching />} />
                    
                    {/* Farmer Views */}
                    <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                    <Route path="/farmer-profile" element={<FarmerProfile />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    
                    {/* Buyer Views */}
                    <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    
                    {/* Shared Orders & Tracking */}
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/delivery-tracking/:id" element={<DeliveryTrackingPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    
                    {/* Admin Views */}
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    
                    {/* Auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </Router>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
