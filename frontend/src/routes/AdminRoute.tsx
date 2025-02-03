import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { useAuth } from '../hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
