//import React from 'react';
//import { Navigate, useLocation } from 'react-router-dom';

//const ProtectedRoute = ({ children, roles }) => {
//const location = useLocation();
//const userToken = localStorage.getItem('token');
//const userRole = localStorage.getItem('role'); // Assume role is stored after login

//if (!userToken) {
// User not logged in, redirect to login page
//return <Navigate to="/login" state={{ from: location }} replace />;
//}

//if (!roles.includes(userRole)) {
// User role not authorized, redirect to unauthorized page or home
//return <Navigate to="/unauthorized" replace />;
//}

// User is authorized, render the children components
//return children;
//};

//export default ProtectedRoute;

// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userToken = localStorage.getItem('token');

  if (!userToken) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, render the children components regardless of the role
  return children;
};

export default ProtectedRoute;
