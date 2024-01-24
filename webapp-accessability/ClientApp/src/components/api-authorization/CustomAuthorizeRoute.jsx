import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const CustomAuthorizeRoute = ({ element, path }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://localhost:7288/authenticatie/JWTcheck', { credentials: 'include' });
        if (response.ok) {
          setIsAuthorized(true);
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
  }, [path]); 

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return isAuthorized ? element : <Navigate to="/login" />;
};

export default CustomAuthorizeRoute;

