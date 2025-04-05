import { Box, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Chatbot() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          AI Chatbot
        </Typography>
        <Typography variant="body1">
          Interact with the AI chatbot here. This feature will be implemented soon.
        </Typography>
      </Box>
    </DashboardLayout>
  );
}

export default Chatbot;
