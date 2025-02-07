/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Redirect to /admin if no token is found
  if (!token) {
    return <Navigate to="/admin" />;
  }

  // Render children if passed, otherwise render Outlet for nested routes
  return children || <Outlet />;
};

export default AdminRoute;
