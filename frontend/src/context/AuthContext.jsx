import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USERS = {
  farmer: {
    id: 1,
    name: "Murugan (Organic Farmer)",
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
    name: "FarmDirect Admin",
    email: "admin@farmdirect.com",
    role: "admin",
    location: "Chennai Headquarters",
    phone: "+91 90000 00000"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_USERS.farmer);
  const [token, setToken] = useState("demo-jwt-token-sih2026");

  const switchRole = (role) => {
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
    }
  };

  const login = (userData, tokenStr) => {
    setUser(userData);
    setToken(tokenStr);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
