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
          const response = await api.getCurrentUser(); 
          setCurrentUser(response.data);
        } catch (error) {
          console.error("Error fetching current user's details:", error);
          localStorage.removeItem('token');
        } finally {
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
      setIsLoading(true);
      const response = await api.loginUser(credentials);
      localStorage.setItem('token', response.data.token);
      setCurrentUser({ ...response.data.user, token: response.data.token });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setIsLoading(true);
      const response = await api.registerUser(userData);
      setCurrentUser({ ...response.data.user, token: response.data.token }); // Assuming the API returns user data and token on registration
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
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
