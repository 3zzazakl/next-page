import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Show a loading indicator while the authentication state is being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated, render the children components
  if (currentUser) {
    return children;
  }

  // Redirect to the login page if not authenticated
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
