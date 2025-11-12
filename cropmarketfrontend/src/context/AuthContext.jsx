import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [name, setName] = useState(() => localStorage.getItem('name'));

  useEffect(() => {
    // keep state in sync if user opens another tab and changes localStorage
    const onStorage = () => {
      setToken(localStorage.getItem('token'));
      setName(localStorage.getItem('name'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = ({ token, name }) => {
    localStorage.setItem('token', token);
    if (name) localStorage.setItem('name', name);
    setToken(token);
    setName(name || null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setToken(null);
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ token, name, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
