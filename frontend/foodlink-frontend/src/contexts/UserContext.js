import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    console.log('UserProvider useEffect triggered');
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (token) {
      setIsLoading(true);
      api.getCurrentUser()
        .then(response => {
          console.log('Current user fetched:', response.data);
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error("Error fetching current user's details:", error);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log('No token found, user is not logged in');
      setIsLoading(false);
    }
  }, []);

  const loginUser = async (loginResponse) => {
    console.log('Setting current user with login response:', loginResponse);
    try {
      setIsLoading(true);
  
      if (loginResponse.token) {
        localStorage.setItem('token', loginResponse.token);
        console.log('Token set in localStorage:', loginResponse.token);
      } else {
        console.warn('No token received from backend');
      }
  
      setCurrentUser({ ...loginResponse.user, token: loginResponse.token });
    } catch (error) {
      console.error('Error setting current user:', error);
      setError(error); // Set error state
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    console.log('Attempting to register user:', userData);
    try {
      setIsLoading(true);
      const response = await api.registerUser(userData);
      console.log('Registration successful, response:', response);
      setCurrentUser({ ...response.data.user, token: response.data.token });
    } catch (error) {
      console.error('Registration error:', error);
      setError(error); // Set error state
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    console.log('Logging out user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const contextValue = {
    currentUser,
    loginUser,
    registerUser,
    logoutUser,
    isLoading,
    error // Expose error in context
  };

  return (
    <UserContext.Provider value={contextValue}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
