import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const appComp = props.children;
  return props.loggedIn ? appComp : <Navigate to='/sign-in' />;
};

export default ProtectedRoute;
