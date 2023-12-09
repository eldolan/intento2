import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('auth-token');
    return authToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
