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

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setLayout,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

// Images
import bgImage from "assets/images/background2.avif";

function PageLayout({ background, children }) {
  const [controller, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if we're on an authentication page
    const isAuthPage = pathname.startsWith("/authentication");
    setLayout(dispatch, isAuthPage ? "page" : "dashboard");

    // Reset sidenav styles on authentication pages
    if (isAuthPage) {
      setMiniSidenav(dispatch, true);
      setTransparentSidenav(dispatch, true);
      setWhiteSidenav(dispatch, true);
    } else {
      // Reset to default styles for dashboard
      setMiniSidenav(dispatch, false);
      setTransparentSidenav(dispatch, false);
      setWhiteSidenav(dispatch, false);
    }
  }, [pathname, dispatch]);

  return (
    <MDBox
      width="100%"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{
        overflowX: "hidden",
        margin: "0 auto",
        position: "relative",
        backgroundImage: pathname.startsWith("/authentication") ? "none" : `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "& > *": {
          width: "100%",
          maxWidth: "100%",
        },
      }}
    >
      {children}
    </MDBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
