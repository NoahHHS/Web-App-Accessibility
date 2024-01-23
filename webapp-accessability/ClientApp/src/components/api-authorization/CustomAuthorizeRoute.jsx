import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const CustomAuthorizeRoute = ({ element, path }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://localhost:7288//authenticatie', { credentials: 'include' }); // zet naar false en component laat niet zien!
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
  }, [path]); // Re-run the effect if the path changes

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return isAuthorized ? element : <Navigate to="/login" />;
};

export default CustomAuthorizeRoute;
