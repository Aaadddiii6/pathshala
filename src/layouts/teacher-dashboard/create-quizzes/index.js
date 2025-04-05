import { Box, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function CreateQuizzes() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Create Quizzes
        </Typography>
        <Typography variant="body1">
          Create and manage quizzes for your students here. This feature will be implemented soon.
        </Typography>
      </Box>
    </DashboardLayout>
  );
}

export default CreateQuizzes;
