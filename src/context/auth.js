import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  // Clear any existing auth data on mount
  useEffect(() => {
    localStorage.removeItem("auth");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userType");
  }, []);

  const login = (userType) => {
    setIsAuthenticated(true);
    setUserType(userType);
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, userType }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setUserType(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userType");
    navigate("/authentication/sign-up");
  };

  const updateProfile = (profileData) => {
    setUserProfile(profileData);
  };

  const value = {
    isAuthenticated,
    userProfile,
    userType,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
