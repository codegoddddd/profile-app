import React, { createContext, useContext, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  // State to track user login status
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to set login status to true
  const login = () => {
    setLoggedIn(true);
  };

  // Function to set login status to false
  const logout = () => {
    setLoggedIn(false);
  };

  // Provide the authentication state and functions to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
