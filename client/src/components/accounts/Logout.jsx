
import React from 'react';
import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";



const notifySucess = (str) => {
  toast.success(`${str}`, {
    duration: 4000,
    position: "top-center",
    // Styling
    style: {
      padding: "16px",
      color: "#06D001",
    },
    className: "",

    // Custom Icon
    // icon: '👏',
    // icon: '👏',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#9BEC00",
      secondary: "#fff",
    },

    // Aria
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });
};

const Logout = ({ isUserAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    isUserAuthenticated(false);
     
    navigate('/account');

  }, [isUserAuthenticated, navigate]);

  return null;
};

export default Logout;