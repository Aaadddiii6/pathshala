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

  const [userType, setUserType] = useState(() => {
    const savedType = localStorage.getItem("userType");
    return savedType || null;
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

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("userType");
    }
  }, [userType]);

  const login = (profileData, type) => {
    setIsAuthenticated(true);
    if (profileData) {
      setUserProfile(profileData);
    }
    if (type) {
      setUserType(type);
    }
    localStorage.setItem("isAuthenticated", "true");
    if (profileData) {
      localStorage.setItem("userProfile", JSON.stringify(profileData));
    }
    if (type) {
      localStorage.setItem("userType", type);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setUserType(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userType");
  };

  const updateProfile = (profileData) => {
    setUserProfile(profileData);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userProfile, userType, login, logout, updateProfile }}
    >
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
