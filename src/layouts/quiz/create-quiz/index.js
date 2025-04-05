import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, CardActions, Button, IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const subjects = [
  {
    name: "Mathematics",
    icon: "calculate",
    description: "Create math quizzes with various topics like algebra, geometry, calculus etc.",
    route: "/teacher/create-quizzes/mathematics",
  },
  {
    name: "Physics",
    icon: "science",
    description: "Design physics quizzes covering mechanics, electricity, waves and more.",
    route: "/teacher/create-quizzes/physics",
  },
  {
    name: "Chemistry",
    icon: "biotech",
    description: "Build chemistry quizzes on organic, inorganic and physical chemistry.",
    route: "/teacher/create-quizzes/chemistry",
  },
  {
    name: "Biology",
    icon: "psychology",
    description: "Create biology quizzes on anatomy, genetics, ecology and more.",
    route: "/teacher/create-quizzes/biology",
  },
  {
    name: "Computer Science",
    icon: "computer",
    description: "Design programming and computer theory quizzes.",
    route: "/teacher/create-quizzes/computer-science",
  },
  {
    name: "English",
    icon: "menu_book",
    description: "Create language and literature quizzes.",
    route: "/teacher/create-quizzes/english",
  },
];

function CreateQuiz() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Create Quizzes
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container spacing={3} p={2}>
                  {subjects.map((subject) => (
                    <Grid item xs={12} md={6} lg={4} key={subject.name}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        <CardContent>
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                          >
                            <MDTypography variant="h5" fontWeight="medium">
                              {subject.name}
                            </MDTypography>
                            <IconButton>
                              <Icon fontSize="medium">{subject.icon}</Icon>
                            </IconButton>
                          </MDBox>
                          <MDTypography variant="body2" color="text">
                            {subject.description}
                          </MDTypography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                          <Button
                            component={Link}
                            to={subject.route}
                            variant="contained"
                            color="info"
                            startIcon={<Icon>add</Icon>}
                          >
                            Create New Quiz
                          </Button>
                          <Button
                            component={Link}
                            to={`${subject.route}/manage`}
                            variant="outlined"
                            color="info"
                            startIcon={<Icon>edit</Icon>}
                          >
                            Manage Quizzes
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateQuiz;
