import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USER_PROFILES = {
  farmer: {
    id: 1,
    name: "Murugan Agricultural Farm",
    email: "farmer@farmdirect.com",
    role: "farmer",
    location: "Madurai, Tamil Nadu",
    phone: "+91 98430 11223",
    farmName: "Green Valley Organic Farms",
    farmSize: 12.5,
    rating: 4.9,
    experience: 14
  },
  buyer: {
    id: 2,
    name: "FreshMart Procurement",
    email: "buyer@farmdirect.com",
    role: "buyer",
    location: "Coimbatore, Tamil Nadu",
    phone: "+91 91234 98765",
    businessName: "FreshMart Hyperlocal Stores",
    buyerType: "Wholesaler"
  },
  admin: {
    id: 3,
    name: "FarmDirect System Admin",
    email: "admin@farmdirect.com",
    role: "admin",
    location: "Chennai Headquarters",
    phone: "+91 90000 00000"
  }
};

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage (or null for guests)
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('farmdirect_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('farmdirect_token') || null;
    } catch {
      return null;
    }
  });

  const login = (userData, tokenStr = 'jwt-token-farmdirect-session') => {
    setUser(userData);
    setToken(tokenStr);
    try {
      localStorage.setItem('farmdirect_user', JSON.stringify(userData));
      localStorage.setItem('farmdirect_token', tokenStr);
    } catch (e) {
      console.error("Failed to save auth session to localStorage", e);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('farmdirect_user');
      localStorage.removeItem('farmdirect_token');
    } catch (e) {
      console.error("Failed to clear auth session from localStorage", e);
    }
  };

  const switchRole = (role) => {
    if (DEMO_USER_PROFILES[role]) {
      login(DEMO_USER_PROFILES[role]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
