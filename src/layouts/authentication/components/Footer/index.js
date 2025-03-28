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

// react-router-dom components
import { Link } from "react-router-dom";
import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function Footer({ light }) {
  return (
    <MDBox component="footer" py={3}>
      <Grid container justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <MDTypography variant="button" color={light ? "text" : "white"}>
            &copy; {new Date().getFullYear()} All rights reserved.
          </MDTypography>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool,
};

export default Footer;
