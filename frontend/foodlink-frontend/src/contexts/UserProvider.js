import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setIsLoading(true);
          // Assume an API call to fetch current user details using the token
          const response = await api.getCurrentUser(); // Add this API call to fetch user details
          setCurrentUser(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching current user's details:", error);
          localStorage.removeItem('token'); // Remove invalid token
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkCurrentUser();
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

  const logoutUser = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const contextValue = {
    currentUser,
    loginUser,
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