/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import { AuthProvider } from "context/auth";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import bgImage from "assets/images/v960-ning-05.jpg";
import ARView from "layouts/ar-view";

export default function App() {
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

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
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
      bottom="2rem"
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

  const isAuthRoute = pathname.startsWith("/authentication/");

  return (
    <AuthProvider>
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
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
              {!pathname.includes("/authentication") && pathname !== "/" && (
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="Pathshala"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
              )}
              <MDBox
                sx={({ breakpoints }) => ({
                  minHeight: "100vh",
                  position: "relative",
                  marginLeft: !pathname.includes("/authentication")
                    ? miniSidenav
                      ? "120px"
                      : "274px"
                    : "0",
                  transition: "all 0.3s ease-in-out",
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
                  <Route path="/ar-view/:id" element={<ARView />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </MDBox>
            </MDBox>
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
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
            {!pathname.includes("/authentication") && pathname !== "/" && (
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Pathshala"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            )}
            <MDBox
              sx={({ breakpoints }) => ({
                minHeight: "100vh",
                position: "relative",
                marginLeft: !pathname.includes("/authentication")
                  ? miniSidenav
                    ? "120px"
                    : "274px"
                  : "0",
                transition: "all 0.3s ease-in-out",
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
                <Route path="/ar-view/:id" element={<ARView />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </MDBox>
          </MDBox>
        </ThemeProvider>
      )}
    </AuthProvider>
  );
}
