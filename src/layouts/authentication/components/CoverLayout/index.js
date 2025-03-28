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
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Footer component
import Footer from "layouts/authentication/components/Footer";

function CoverLayout({ color, header, title, description, image, top, children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <PageLayout background="white">
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.6),
              rgba(gradients[color] ? gradients[color].state : gradients.info.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundColor: ({ palette: { black }, functions: { rgba } }) => rgba(black.main, 0.4),
        }}
      />
      <MDBox position="absolute" top={20} right={20} zIndex={3}>
        <IconButton
          onClick={handleClick}
          sx={{
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <Icon>account_circle</Icon>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 180,
            },
          }}
        >
          <MenuItem component={Link} to="/authentication/sign-in" onClick={handleClose}>
            <MDTypography variant="button" color="text">
              Student Sign In
            </MDTypography>
          </MenuItem>
          <MenuItem component={Link} to="/authentication/sign-up" onClick={handleClose}>
            <MDTypography variant="button" color="text">
              Student Sign Up
            </MDTypography>
          </MenuItem>
          <MenuItem component={Link} to="/authentication/teacher-sign-in" onClick={handleClose}>
            <MDTypography variant="button" color="text">
              Teacher Sign In
            </MDTypography>
          </MenuItem>
          <MenuItem component={Link} to="/authentication/teacher-sign-up" onClick={handleClose}>
            <MDTypography variant="button" color="text">
              Teacher Sign Up
            </MDTypography>
          </MenuItem>
          <MenuItem component={Link} to="/authentication/admin" onClick={handleClose}>
            <MDTypography variant="button" color="text">
              Admin Login
            </MDTypography>
          </MenuItem>
        </Menu>
      </MDBox>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        position="relative"
        zIndex={2}
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={7} lg={6} xl={5}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.string,
  header: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
