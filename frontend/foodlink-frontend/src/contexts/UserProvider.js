import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoading(true);
      setCurrentUser({ token }); 
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loginUser = async (credentials) => {
    try {
      const response = await api.loginUser(credentials);
      localStorage.setItem('token', response.data.token);
      setCurrentUser({ ...response.data.user, token: response.data.token });
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await api.registerUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const contextValue = {
    currentUser,
    loginUser,
    registerUser,
    logoutUser,
    isLoading
  };

  return (
    <UserContext.Provider value={contextValue}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
