import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
 
  const { isAuthenticated, loading} = useAuth()
  if(loading) return <h1>Loading...</h1>

  if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>

  return <>{children}</>;
};

export default ProtectedRoute;
