// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import React from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/background2.avif";

function TeacherSignIn() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Here you would typically validate credentials
    // For now, we'll just redirect to the teacher dashboard
    navigate("/teacher-dashboard");
  };

  return (
    <CoverLayout
      title="Welcome Back"
      description="Sign in to continue teaching and inspiring students"
      image={bgImage}
    >
      <Card sx={{ width: "100%" }}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Teacher Sign In
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your credentials to continue
          </MDTypography>
        </MDBox>
        <MDBox pt={3} pb={2} px={3}>
          <MDBox component="form" role="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDInput type="email" label="Email" fullWidth placeholder="Enter your email" />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  type="password"
                  label="Password"
                  fullWidth
                  placeholder="Enter your password"
                />
              </Grid>
            </Grid>
            <MDBox display="flex" alignItems="center" mt={2} mb={2}>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/teacher-sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                Sign In
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default TeacherSignIn;
