import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignUp from "assets/images/bg-sign-up-cover.jpeg";

// Auth context
import { useAuth } from "context/auth";

function StudentSignUp() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create mock user
      const mockUser = {
        id: "1",
        email: email,
        userType: "student",
        name: name,
      };

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred during sign up");
    }
  };

  return (
    <CoverLayout
      title="Join us today"
      description="Enter your details to create your account"
      image={bgSignUp}
    >
      <MDBox component="form" role="form" method="POST" onSubmit={handleSignUp}>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            sign up
          </MDButton>
        </MDBox>
        <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Already have an account?{" "}
            <MDTypography
              component={Link}
              to="/authentication/student-sign-in"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign in
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </CoverLayout>
  );
}

export default StudentSignUp;
