import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  // Perform the logout action on component mount
  useEffect(() => {
    // Replace this with your actual logout logic if needed
    // For example, if you are using localStorage:
    localStorage.clear();

    // After logout, navigate to the signup page
    navigate('/signup');
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;