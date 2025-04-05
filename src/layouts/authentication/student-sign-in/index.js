import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "context/auth";

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/bg-sign-in-cover.jpeg";

function StudentSignIn() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
      // For demo purposes, we'll just log in with any credentials
      login("student");

      // Navigate to student dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={bgSignIn}
    >
      <MDBox component="form" role="form" method="POST" onSubmit={handleSubmit}>
        <MDBox mb={2}>
          <MDInput
            type="email"
            label="Email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </MDBox>
        {error && (
          <MDTypography variant="caption" color="error" mb={2}>
            {error}
          </MDTypography>
        )}
        <MDBox mt={4} mb={1}>
          <MDButton type="submit" variant="gradient" color="info" fullWidth>
            sign in
          </MDButton>
        </MDBox>
        <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Don&apos;t have an account?{" "}
            <MDTypography
              component={Link}
              to="/authentication/student-sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </CoverLayout>
  );
}

export default StudentSignIn;
