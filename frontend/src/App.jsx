import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

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
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/ai-price-prediction" element={<AiPricePrediction />} />
                    <Route path="/demand-forecast" element={<DemandForecasting />} />
                    <Route path="/smart-buyer-matching" element={<SmartBuyerMatching />} />
                    <Route path="/cart" element={<CartPage />} />
                    
                    {/* Protected Farmer Views */}
                    <Route 
                      path="/farmer-dashboard" 
                      element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                          <FarmerDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/farmer-profile" 
                      element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                          <FarmerProfile />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/add-product" 
                      element={
                        <ProtectedRoute allowedRoles={['farmer']}>
                          <AddProduct />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Protected Buyer Views */}
                    <Route 
                      path="/buyer-dashboard" 
                      element={
                        <ProtectedRoute allowedRoles={['buyer']}>
                          <BuyerDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/checkout" 
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/wishlist" 
                      element={
                        <ProtectedRoute>
                          <WishlistPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Shared Orders & Tracking (Protected) */}
                    <Route 
                      path="/orders" 
                      element={
                        <ProtectedRoute>
                          <OrderManagement />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/delivery-tracking/:id" 
                      element={
                        <ProtectedRoute>
                          <DeliveryTrackingPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/chat" 
                      element={
                        <ProtectedRoute>
                          <ChatPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/notifications" 
                      element={
                        <ProtectedRoute>
                          <NotificationsPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Protected Admin Views */}
                    <Route 
                      path="/admin-dashboard" 
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/analytics" 
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AnalyticsPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Auth Routes */}
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
