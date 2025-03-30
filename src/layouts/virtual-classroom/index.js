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

// Video
import classroomVideo from "assets/videos/clasroom.mp4";
import classroom2Video from "assets/videos/classroom2.mp4";
import classroom3Video from "assets/videos/classroom3.mp4";

// Timer component
import Timer from "components/Timer";

function VirtualClassroom() {
  const [showTimer, setShowTimer] = useState(false);
  const [studyHours, setStudyHours] = useState(0);

  const handleGoToClassroom = (link) => {
    window.open(link, "_blank");
    setShowTimer(true);
  };

  const handleStopTimer = (seconds) => {
    setShowTimer(false);
    const hours = seconds / 3600;
    setStudyHours((prevHours) => prevHours + hours);
  };

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
                <MDBox display="flex" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    Virtual Classroom
                  </MDTypography>
                  <MDBox display="flex" alignItems="center">
                    <Icon sx={{ color: "white", mr: 1 }}>timer</Icon>
                    <MDTypography variant="h6" color="white">
                      Total Study Hours: {studyHours.toFixed(2)}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox pt={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ height: "100%" }}>
                      <MDBox position="relative" height="200px" borderRadius="lg" overflow="hidden">
                        <video
                          src={classroomVideo}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </MDBox>
                      <MDBox p={3}>
                        <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                          Mathematics Class
                        </MDTypography>
                        <MDTypography variant="body2" color="text" mb={2}>
                          Join your classmates in an interactive mathematics session. Solve complex
                          equations, work on problem sets, and collaborate on mathematical projects
                          in real-time.
                        </MDTypography>
                        <MDBox display="flex" alignItems="center" mb={2}>
                          <Icon sx={{ color: "info.main", mr: 1 }}>schedule</Icon>
                          <MDTypography variant="body2" color="text">
                            Next class starts in 15 minutes
                          </MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" mb={3}>
                          <Icon sx={{ color: "info.main", mr: 1 }}>group</Icon>
                          <MDTypography variant="body2" color="text">
                            25 students attending
                          </MDTypography>
                        </MDBox>
                        <MDButton
                          variant="gradient"
                          color="info"
                          fullWidth
                          onClick={() =>
                            handleGoToClassroom(
                              "https://www.spatial.io/s/another_badger479s-Virtual-Area-67e58a5d421b9508955eed40"
                            )
                          }
                          startIcon={<Icon>video_camera_front</Icon>}
                        >
                          Go to Mathematics Class
                        </MDButton>
                      </MDBox>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ height: "100%" }}>
                      <MDBox position="relative" height="200px" borderRadius="lg" overflow="hidden">
                        <video
                          src={classroom2Video}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </MDBox>
                      <MDBox p={3}>
                        <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                          Physics Class
                        </MDTypography>
                        <MDTypography variant="body2" color="text" mb={2}>
                          Experience physics concepts through interactive simulations and
                          experiments. Learn about mechanics, thermodynamics, and quantum physics in
                          a virtual environment.
                        </MDTypography>
                        <MDBox display="flex" alignItems="center" mb={2}>
                          <Icon sx={{ color: "info.main", mr: 1 }}>schedule</Icon>
                          <MDTypography variant="body2" color="text">
                            Next class starts in 15 minutes
                          </MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" mb={3}>
                          <Icon sx={{ color: "info.main", mr: 1 }}>group</Icon>
                          <MDTypography variant="body2" color="text">
                            25 students attending
                          </MDTypography>
                        </MDBox>
                        <MDButton
                          variant="gradient"
                          color="info"
                          fullWidth
                          onClick={() =>
                            handleGoToClassroom(
                              "https://www.spatial.io/s/another_badger479s-Virtual-Area-67e58a5d421b9508955eed40"
                            )
                          }
                          startIcon={<Icon>video_camera_front</Icon>}
                        >
                          Go to Physics Class
                        </MDButton>
                      </MDBox>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ height: "100%" }}>
                      <MDBox position="relative" height="200px" borderRadius="lg" overflow="hidden">
                        <video
                          src={classroom3Video}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </MDBox>
                      <MDBox p={3}>
                        <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                          Chemistry Lab
                        </MDTypography>
                        <MDTypography variant="body2" color="text" mb={2}>
                          Conduct virtual chemistry experiments in a safe environment. Mix
                          compounds, observe reactions, and learn about molecular structures in 3D.
                        </MDTypography>
                        <MDBox display="flex" alignItems="center" mb={2}>
                          <Icon sx={{ color: "info.main", mr: 1 }}>schedule</Icon>
                          <MDTypography variant="body2" color="text">
                            Next class starts in 15 minutes
                          </MDTypography>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" mb={3}>
                          <Icon sx={{ color: "info.main", mr: 1 }}>group</Icon>
                          <MDTypography variant="body2" color="text">
                            25 students attending
                          </MDTypography>
                        </MDBox>
                        <MDButton
                          variant="gradient"
                          color="info"
                          fullWidth
                          onClick={() =>
                            handleGoToClassroom(
                              "https://www.spatial.io/s/another_badger479s-3D-Hangout-67e58c7c1c467e8ae4c49c32?share=6928208671902124317"
                            )
                          }
                          startIcon={<Icon>video_camera_front</Icon>}
                        >
                          Go to Chemistry Lab
                        </MDButton>
                      </MDBox>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ height: "100%" }}>
                      <MDBox p={3}>
                        <MDTypography variant="h5" fontWeight="bold" gutterBottom>
                          Upcoming Classes
                        </MDTypography>
                        <MDBox mt={3}>
                          <MDBox display="flex" alignItems="center" mb={2}>
                            <Icon sx={{ color: "info.main", mr: 1 }}>schedule</Icon>
                            <MDTypography variant="body2" color="text">
                              Mathematics - 10:00 AM
                            </MDTypography>
                          </MDBox>
                          <MDBox display="flex" alignItems="center" mb={2}>
                            <Icon sx={{ color: "info.main", mr: 1 }}>schedule</Icon>
                            <MDTypography variant="body2" color="text">
                              Physics - 11:30 AM
                            </MDTypography>
                          </MDBox>
                          <MDBox display="flex" alignItems="center" mb={2}>
                            <Icon sx={{ color: "info.main", mr: 1 }}>schedule</Icon>
                            <MDTypography variant="body2" color="text">
                              Chemistry - 2:00 PM
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {showTimer && <Timer onStop={handleStopTimer} />}
    </DashboardLayout>
  );
}

export default VirtualClassroom;
