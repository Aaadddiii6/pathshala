import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function ARGames() {
  const games = [
    {
      title: "Math Adventure",
      description: "Solve math problems in an exciting AR adventure world",
      icon: "calculate",
      color: "info",
    },
    {
      title: "Science Explorer",
      description: "Explore scientific concepts through interactive AR experiments",
      icon: "science",
      color: "success",
    },
    {
      title: "Language Quest",
      description: "Learn languages through immersive AR scenarios",
      icon: "translate",
      color: "warning",
    },
    {
      title: "History Journey",
      description: "Travel through time with AR historical reconstructions",
      icon: "history",
      color: "error",
    },
    {
      title: "Geography Explorer",
      description: "Explore the world through AR maps and landmarks",
      icon: "public",
      color: "primary",
    },
    {
      title: "Art Studio",
      description: "Create and interact with 3D art in AR space",
      icon: "palette",
      color: "secondary",
    },
  ];

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
                  AR Games
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <Grid container spacing={3}>
                  {games.map((game, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <Card
                        sx={{
                          height: "100%",
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                        }}
                      >
                        <MDBox p={3}>
                          <MDBox display="flex" alignItems="center" mb={2}>
                            <Icon sx={{ color: `${game.color}.main`, mr: 1, fontSize: "2rem" }}>
                              {game.icon}
                            </Icon>
                            <MDTypography variant="h5" color="white" fontWeight="bold">
                              {game.title}
                            </MDTypography>
                          </MDBox>
                          <MDTypography variant="body2" color="white" mb={3}>
                            {game.description}
                          </MDTypography>
                          <MDButton
                            variant="gradient"
                            color={game.color}
                            fullWidth
                            startIcon={<Icon>play_arrow</Icon>}
                          >
                            Play Now
                          </MDButton>
                        </MDBox>
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

export default ARGames;
