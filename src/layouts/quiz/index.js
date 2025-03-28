import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Quiz() {
  const navigate = useNavigate();

  const subjects = [
    { name: "Mathematics", icon: "functions", path: "/quiz/mathematics" },
    { name: "Physics", icon: "science", path: "/quiz/physics" },
    { name: "Chemistry", icon: "biotech", path: "/quiz/chemistry" },
    { name: "Biology", icon: "psychology", path: "/quiz/biology" },
    { name: "Computer Science", icon: "computer", path: "/quiz/computer-science" },
    { name: "English", icon: "menu_book", path: "/quiz/english" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={2}
        sx={{
          background: "transparent",
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <MDTypography variant="h4" mb={4} color="#E6E6FA">
          Available Quizzes
        </MDTypography>
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid item xs={12} sm={6} md={4} key={subject.name}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
                  backdropFilter: "blur(10px)",
                  borderRadius: "15px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))",
                    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.45)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <MDTypography variant="h4" color="#E6E6FA" mr={2}>
                      <i className="material-icons">{subject.icon}</i>
                    </MDTypography>
                    <MDTypography variant="h5" color="#E6E6FA">
                      {subject.name}
                    </MDTypography>
                  </Box>
                  <MDTypography variant="body2" color="#D8BFD8">
                    Test your knowledge in {subject.name.toLowerCase()}. Each quiz contains
                    multiple-choice questions and detailed explanations.
                  </MDTypography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(subject.path)}
                    sx={{
                      background: "linear-gradient(135deg, #4B79A1, #283E51)",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "600",
                      boxShadow: "0 4px 16px 0 rgba(75, 121, 161, 0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #5B89B1, #384E61)",
                        boxShadow: "0 6px 20px 0 rgba(75, 121, 161, 0.4)",
                      },
                    }}
                  >
                    Take Quiz
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Quiz;
