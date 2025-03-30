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
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
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

    // Login user and save profile
    login(userProfile);

    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <CoverLayout
      header="Join us today"
      title="Enter your details to register"
      description="Fill in the form below to create your account"
      image="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      top={10}
    >
      <Card sx={{ p: 2 }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white">
            Join us today
          </MDTypography>
          <MDTypography variant="button" color="white" fontSize="0.875rem">
            Enter your details to register
          </MDTypography>
        </MDBox>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MDInput
                type="text"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="tel"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="text"
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="text"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <MDInput
                type="text"
                label="Interests (comma-separated)"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          {error && (
            <MDTypography variant="caption" color="error" display="block" mt={1}>
              {error}
            </MDTypography>
          )}
          <MDBox mt={2} mb={1}>
            <MDButton type="submit" variant="gradient" color="info" fullWidth size="small">
              Sign Up
            </MDButton>
          </MDBox>
          <MDBox mt={1} mb={1} textAlign="center">
            <MDTypography variant="button" color="text" fontSize="0.875rem">
              Already have an account?{" "}
              <MDTypography
                component="a"
                href="/authentication/sign-in"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
                fontSize="0.875rem"
              >
                Sign In
              </MDTypography>
            </MDTypography>
          </MDBox>
        </form>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
