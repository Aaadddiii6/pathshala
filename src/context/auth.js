import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth === "true";
  });

  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    } else {
      localStorage.removeItem("userProfile");
    }
  }, [userProfile]);

  const login = (profileData) => {
    setIsAuthenticated(true);
    if (profileData) {
      setUserProfile(profileData);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  const updateProfile = (profileData) => {
    setUserProfile(profileData);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
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
