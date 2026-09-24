import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();
  const { addToast } = useNotification();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const fallbackPath = user.role === 'farmer' ? '/farmer-dashboard' : user.role === 'buyer' ? '/buyer-dashboard' : '/admin-dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};
