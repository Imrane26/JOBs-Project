import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null });

  useEffect(() => {
    // Check if there's a token in localStorage/sessionStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth({ token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
