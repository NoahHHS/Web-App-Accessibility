import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement

const CustomAuthorizeRoute = ({ element, path, requiredRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
          const response = await fetch('https://localhost:7288/authenticatie/JWTcheck', { credentials: 'include' });
          if (response.ok) {
              const token = await response.text();
              if (token) {
                  const decoded = jwtDecode(token);
                  const roles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                  const hasRequiredRole = requiredRoles.some(role => roles.includes(role));
                  setIsAuthorized(hasRequiredRole);
              }
          } else {
              setIsAuthorized(false);
          }
      } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthorized(false);
      } finally {
          setIsLoading(false);
      }
    };

    checkAuth();
  }, [path, requiredRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? element : <Navigate to="/login" />;
};

export default CustomAuthorizeRoute;
