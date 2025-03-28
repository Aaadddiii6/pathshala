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

// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {
  const { palette, boxShadows, transitions, breakpoints, functions } = theme;
  const { transparentSidenav, whiteSidenav, miniSidenav, darkMode } = ownerState;

  const sidebarWidth = 220;
  const { transparent, gradients, white, background } = palette;
  const { xxl } = boxShadows;
  const { pxToRem, linearGradient } = functions;

  let backgroundValue = darkMode
    ? background.sidenav
    : linearGradient(gradients.dark.main, gradients.dark.state);

  if (transparentSidenav) {
    backgroundValue = transparent.main;
  } else if (whiteSidenav) {
    backgroundValue = white.main;
  }

  const drawerOpenStyles = () => ({
    transform: "translateX(0)",
    width: sidebarWidth,
    border: "none",
    borderRight: "none",
    boxShadow: transparentSidenav ? "none" : xxl,
    marginBottom: transparentSidenav ? 0 : "inherit",
    left: 0,
    right: "auto",
    transition: transitions.create(["width", "background-color"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen,
    }),
  });

  const drawerCloseStyles = () => ({
    transform: "translateX(0)",
    width: pxToRem(96),
    overflowX: "hidden",
    border: "none",
    borderRight: "none",
    boxShadow: transparentSidenav ? "none" : xxl,
    marginBottom: transparentSidenav ? 0 : "inherit",
    left: 0,
    right: "auto",
    transition: transitions.create(["width", "background-color"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),
  });

  return {
    "& .MuiDrawer-paper": {
      position: "fixed",
      background: backgroundValue,
      height: "calc(100vh - 32px)",
      margin: "16px 0",
      padding: 0,
      border: "none",
      borderRight: "none",
      boxSizing: "border-box",
      borderRadius: "0 16px 16px 0",
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),

      [breakpoints.down("xl")]: {
        height: "100vh",
        margin: 0,
        boxShadow: "none",
        borderRadius: 0,
      },
    },
  };
});
