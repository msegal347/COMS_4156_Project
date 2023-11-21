import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const userToken = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <Route {...rest} render={props => {
      if (!userToken) {
        return <Redirect to="/login" />;
      }

      if (!roles.includes(userRole)) {
        return <Redirect to="/" />;
      }

      return <Component {...props} />;
    }} />
  );
};

export default ProtectedRoute;
