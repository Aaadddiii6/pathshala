import { useState } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function UserSwitch() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <MDBox
        position="relative"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Welcome to Pathshala
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          Choose your role to continue
        </MDTypography>
        <MDBox mt={4} mb={3}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            <MDBox
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="white"
              fontWeight="regular"
              sx={({ borders: { borderRadius } }) => ({
                display: "flex",
                alignItems: "center",
                borderRadius: borderRadius.lg,
                m: 1,
                p: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              })}
            >
              <MDBox
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Student"
                width="24px"
                height="24px"
                mr={2}
              />
              <MDTypography variant="button" fontWeight="regular" color="white">
                Sign In as Student
              </MDTypography>
            </MDBox>
            <MDBox
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="regular"
              sx={({ borders: { borderRadius } }) => ({
                display: "flex",
                alignItems: "center",
                borderRadius: borderRadius.lg,
                m: 1,
                p: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              })}
            >
              <MDBox
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Student"
                width="24px"
                height="24px"
                mr={2}
              />
              <MDTypography variant="button" fontWeight="regular" color="white">
                Sign Up as Student
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </BasicLayout>
  );
}

export default UserSwitch;
