import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
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

// Component to handle root entry redirect based on auth status
const RootRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'farmer') {
    return <Navigate to="/farmer-dashboard" replace />;
  }

  if (user.role === 'buyer') {
    return <Navigate to="/buyer-dashboard" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

// Layout component to conditionally display Navbar & Footer
const MainContent = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const showNav = user && !isAuthPage;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {showNav && <Navbar />}
      <div className="flex-1">
        <Routes>
          {/* Root Entry: Authentication is FIRST screen */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Feature Routes (Require Login) */}
          <Route 
            path="/marketplace" 
            element={
              <ProtectedRoute>
                <Marketplace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-price-prediction" 
            element={
              <ProtectedRoute>
                <AiPricePrediction />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/demand-forecast" 
            element={
              <ProtectedRoute>
                <DemandForecasting />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/smart-buyer-matching" 
            element={
              <ProtectedRoute>
                <SmartBuyerMatching />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
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
          
          {/* Farmer Portal (Protected) */}
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
          
          {/* Buyer Portal (Protected) */}
          <Route 
            path="/buyer-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <BuyerDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Shared Orders & Communications (Protected) */}
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
          
          {/* Admin Portal (Protected) */}
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

          {/* Catch-all fallback */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </div>
      {showNav && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <Router>
              <MainContent />
            </Router>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
