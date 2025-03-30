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
import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

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

function SignUp() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    education: "",
    interests: "",
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      // Check for admin credentials
      if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
        login("admin");
        navigate("/admin-dashboard");
        return;
      }

      // Create user profile
      const userProfile = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        education: formData.education,
        interests: formData.interests.split(",").map((interest) => interest.trim()),
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage for persistence
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      // Determine user type based on the current route
      const userType = pathname.includes("teacher") ? "teacher" : "student";

      // Login user and save profile
      login(userProfile, userType);

      // Navigate based on user type
      if (userType === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occurred during sign up");
    }
  };

  return (
    <CoverLayout
      title="Join Our Learning Community"
      description="Create your account to start your learning journey"
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
            {pathname.includes("teacher") ? "Teacher Sign Up" : "Student Sign Up"}
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {pathname.includes("teacher")
              ? "Create your teacher account"
              : "Create your student account"}
          </MDTypography>
        </MDBox>
        <MDBox pt={3} pb={2} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDInput
                  type="text"
                  label="Name"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
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
              <Grid item xs={12}>
                <MDInput
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  type="tel"
                  label="Phone"
                  fullWidth
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  type="text"
                  label="Address"
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  type="text"
                  label="Education"
                  fullWidth
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  type="text"
                  label="Interests (comma-separated)"
                  fullWidth
                  name="interests"
                  value={formData.interests}
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
                Sign Up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to={
                    pathname.includes("teacher")
                      ? "/authentication/teacher-sign-in"
                      : "/authentication/student-sign-in"
                  }
                  variant="button"
                  color={pathname.includes("teacher") ? "info" : "info"}
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
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

export default SignUp;
