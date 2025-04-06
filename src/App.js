import React, { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";
import teacherRoutes from "routes/teacherRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { AuthProvider, useAuth } from "context/auth";

// Images
import brandWhite from "assets/images/Pathshala_logo.png";
import brandDark from "assets/images/Pathshala_logo.png";
import bgImage from "assets/images/v960-ning-05.jpg";
import ARView from "layouts/ar-view";

// Separate component for auth-dependent content
function AppContent() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const { userType, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const isAuthRoute = pathname.startsWith("/authentication");

  // Simplified navigation logic to prevent multiple redirects
  useEffect(() => {
    const handleNavigation = () => {
      // Don't redirect if already on an auth route
      if (isAuthRoute) {
        return;
      }

      // If not authenticated, redirect to sign-up
      if (!isAuthenticated) {
        navigate("/authentication/student-sign-up", { replace: true });
        return;
      }

      // If authenticated but on wrong dashboard
      if (isAuthenticated && userType) {
        if (userType === "teacher" && pathname === "/dashboard") {
          navigate("/teacher-dashboard", { replace: true });
        } else if (userType === "student" && pathname === "/teacher-dashboard") {
          navigate("/dashboard", { replace: true });
        }
      }
    };

    handleNavigation();
  }, [isAuthenticated, userType, pathname, navigate, isAuthRoute]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return (
          <React.Fragment key={route.key}>
            <Route exact path={route.route} element={route.component} />
            {getRoutes(route.collapse)}
          </React.Fragment>
        );
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="md"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom={{ xs: "calc(2rem + 80px)", sm: "2rem" }}
      zIndex={99}
      color="dark"
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
          bgColor: "info.main",
          color: "white",
          boxShadow: "lg",
        },
      }}
      onClick={handleConfiguratorOpen}
      title="Accessibility Settings"
      role="button"
      aria-label="Open accessibility settings"
    >
      <Icon fontSize="small" color="inherit">
        accessibility_new
      </Icon>
    </MDBox>
  );

  return (
    <MDBox
      sx={{
        position: "relative",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {isAuthenticated && !isAuthRoute && (
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="Pathshala"
          routes={userType === "teacher" ? teacherRoutes : routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      <MDBox
        sx={({ breakpoints }) => ({
          minHeight: "100vh",
          position: "relative",
          marginLeft: isAuthenticated && !isAuthRoute ? (miniSidenav ? "120px" : "274px") : "0",
          transition: "margin-left 0.3s ease-in-out",
          padding: "16px",
          [breakpoints.down("sm")]: {
            marginLeft: "0",
            padding: "8px",
          },
          [breakpoints.down("md")]: {
            marginLeft: "0",
            padding: "12px",
          },
        })}
      >
        {layout === "dashboard" && !isAuthRoute && (
          <>
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          {getRoutes(teacherRoutes)}
          <Route path="/ar-view" element={<ARView />} />
          <Route
            path="*"
            element={
              <Navigate
                to={
                  isAuthenticated
                    ? userType === "teacher"
                      ? "/teacher-dashboard"
                      : "/dashboard"
                    : "/authentication/student-sign-up"
                }
                replace
              />
            }
          />
        </Routes>
      </MDBox>
    </MDBox>
  );
}

// Main App component
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
