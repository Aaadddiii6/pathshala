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

import { useState } from "react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/background2.avif";

// Auth context
import { useAuth } from "context/auth";

function SignIn() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Check for admin credentials
      if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
        login("admin");
        navigate("/admin-dashboard");
        return;
      }

      // Determine user type based on the current route
      const userType = pathname.includes("teacher") ? "teacher" : "student";

      // For demo purposes, we'll just log in with any credentials
      login(userType);

      // Navigate based on user type
      if (userType === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occurred during sign in");
    }
  };

  return (
    <CoverLayout
      title="Welcome Back"
      description="Sign in to continue your learning journey"
      image={bgImage}
    >
      <Card sx={{ width: "100%" }}>
        <MDBox
          variant="gradient"
          bgColor={pathname.includes("teacher") ? "info" : "info"}
          borderRadius="lg"
          coloredShadow={pathname.includes("teacher") ? "info" : "info"}
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {pathname.includes("teacher") ? "Teacher Sign In" : "Student Sign In"}
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {pathname.includes("teacher") ? "Welcome back, teacher!" : "Welcome back, student!"}
          </MDTypography>
        </MDBox>
        <MDBox pt={3} pb={2} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDInput
                  type="email"
                  label="Email"
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  type="password"
                  label="Password"
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <MDBox mt={3} mb={1}>
              <MDButton
                variant="gradient"
                color={pathname.includes("teacher") ? "info" : "info"}
                fullWidth
                type="submit"
              >
                Sign In
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to={
                    pathname.includes("teacher")
                      ? "/authentication/teacher-sign-up"
                      : "/authentication/student-sign-up"
                  }
                  variant="button"
                  color={pathname.includes("teacher") ? "info" : "info"}
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
            {error && (
              <MDTypography variant="button" color="error" textAlign="center" mt={2}>
                {error}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignIn;
