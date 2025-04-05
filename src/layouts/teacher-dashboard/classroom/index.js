import { Box, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Classroom() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Virtual Classroom
        </Typography>
        <Typography variant="body1">
          Manage your virtual classroom here. This feature will be implemented soon.
        </Typography>
      </Box>
    </DashboardLayout>
  );
}

export default Classroom;
