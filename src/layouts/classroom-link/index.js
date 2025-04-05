import React, { useState } from "react";
import {
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Import videos
import classroomVideo from "assets/videos/clasroom.mp4";
import classroom2Video from "assets/videos/classroom2.mp4";
import classroom3Video from "assets/videos/classroom3.mp4";

const classrooms = [
  {
    title: "Live Interactive Class",
    description: "Host live interactive sessions with real-time student participation",
    videoSrc: classroomVideo,
  },
  {
    title: "Virtual Lab Session",
    description: "Conduct virtual lab experiments and demonstrations",
    videoSrc: classroom2Video,
  },
  {
    title: "Group Discussion",
    description: "Facilitate group discussions and collaborative learning",
    videoSrc: classroom3Video,
  },
];

function ClassroomLink() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classLink, setClassLink] = useState("");

  const handleProvideLinkClick = (classroom) => {
    setSelectedClass(classroom);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setClassLink("");
  };

  const handleSubmitLink = () => {
    // Here you would typically save the link to your backend
    console.log(`Saving link for ${selectedClass?.title}: ${classLink}`);
    handleCloseDialog();
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
                <MDTypography variant="h6" color="white">
                  Classroom Links
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
                  {classrooms.map((classroom) => (
                    <Grid item xs={12} md={4} key={classroom.title}>
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
                        <MDBox
                          position="relative"
                          borderRadius="lg"
                          mt={-3}
                          mx={2}
                          className="card-header"
                          sx={{ transition: "transform 0.2s" }}
                        >
                          <MDBox
                            component="video"
                            src={classroom.videoSrc}
                            autoPlay
                            muted
                            loop
                            borderRadius="lg"
                            shadow="md"
                            width="100%"
                            height="100%"
                            position="relative"
                            zIndex={1}
                          />
                        </MDBox>
                        <MDBox p={3} mt={-1} textAlign="center">
                          <MDTypography variant="h5" fontWeight="regular" sx={{ mt: 2, mb: 1 }}>
                            {classroom.title}
                          </MDTypography>
                          <MDTypography variant="body2" color="text">
                            {classroom.description}
                          </MDTypography>
                          <MDButton
                            variant="gradient"
                            color="info"
                            onClick={() => handleProvideLinkClick(classroom)}
                            sx={{ mt: 3 }}
                            startIcon={<Icon>link</Icon>}
                          >
                            Provide Link
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

        {/* Dialog for providing classroom link */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            <MDTypography variant="h6">Provide Link for {selectedClass?.title}</MDTypography>
          </DialogTitle>
          <DialogContent>
            <MDBox mt={2}>
              <TextField
                autoFocus
                margin="dense"
                label="Classroom Link"
                type="url"
                fullWidth
                variant="outlined"
                value={classLink}
                onChange={(e) => setClassLink(e.target.value)}
                placeholder="Enter your classroom link (e.g., Zoom, Google Meet)"
              />
            </MDBox>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="error">
              Cancel
            </Button>
            <Button onClick={handleSubmitLink} color="primary" variant="contained">
              Save Link
            </Button>
          </DialogActions>
        </Dialog>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ClassroomLink;
