import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({
  currentUser: null,
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: () => {},
  isLoading: true
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginUser = async (credentials) => {
    // Logic to login the user
    setIsLoading(true);
    // Assume an API call to login the user
    // On successful login:
    setCurrentUser({ /* user data */ });
    setIsLoading(false);
  };

  const registerUser = async (userData) => {
    // Logic to register the user
    setIsLoading(true);
    // Assume an API call to register the user
    // On successful registration:
    setCurrentUser({ /* user data */ });
    setIsLoading(false);
  };

  const logoutUser = () => {
    // Logic to logout the user
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, loginUser, registerUser, logoutUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
