import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateMyBooks({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const tokenUser = localStorage.getItem("token-user");
    if (tokenUser) {
      setUser(tokenUser);
      setLoading(false); // Stop loading if token exists
    } else {
      navigate('/signin'); // Redirect if not authenticated
    }
  }, [navigate]);

  // While loading, do not show children
  if (loading) {
    return <div>Loading...</div>; // You can customize this with a loader
  }

  // If user is authenticated, render children
  return <div>{children}</div>;
}

export default PrivateMyBooks;
