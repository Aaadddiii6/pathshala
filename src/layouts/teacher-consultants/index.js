// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const consultants = [
  {
    name: "Dr. Priya Sharma",
    role: "Mathematics Expert",
    image: team1,
    subjects: ["Mathematics", "Physics"],
    experience: "15 years",
    availability: "Available",
    rating: 4.8,
    students: 1200,
  },
  {
    name: "Prof. Rajesh Verma",
    role: "Science Specialist",
    image: team2,
    subjects: ["Physics", "Chemistry"],
    experience: "12 years",
    availability: "Available",
    rating: 4.9,
    students: 950,
  },
  {
    name: "Dr. Anjali Patel",
    role: "Biology Expert",
    image: team3,
    subjects: ["Biology", "Chemistry"],
    experience: "10 years",
    availability: "Available",
    rating: 4.7,
    students: 800,
  },
  {
    name: "Prof. Amit Kumar",
    role: "Computer Science",
    image: team4,
    subjects: ["Computer Science", "Mathematics"],
    experience: "8 years",
    availability: "Available",
    rating: 4.6,
    students: 700,
  },
];

function TeacherConsultants() {
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
                  Available Teacher Consultants
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <Grid container spacing={3}>
                  {consultants.map((consultant, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card sx={{ height: "100%" }}>
                        <MDBox p={3}>
                          <Grid container spacing={3} alignItems="center">
                            <Grid item>
                              <MDAvatar
                                src={consultant.image}
                                alt={consultant.name}
                                size="lg"
                                shadow="md"
                              />
                            </Grid>
                            <Grid item xs>
                              <MDBox display="flex" alignItems="center" mb={1}>
                                <MDTypography variant="h6" fontWeight="medium">
                                  {consultant.name}
                                </MDTypography>
                                <MDBox ml={1}>
                                  <MDTypography
                                    variant="caption"
                                    color="success"
                                    fontWeight="medium"
                                  >
                                    {consultant.availability}
                                  </MDTypography>
                                </MDBox>
                              </MDBox>
                              <MDTypography variant="body2" color="text" mb={1}>
                                {consultant.role}
                              </MDTypography>
                              <MDBox display="flex" alignItems="center" mb={2}>
                                <Icon fontSize="small" color="warning">
                                  star
                                </Icon>
                                <MDTypography variant="body2" color="text" ml={0.5}>
                                  {consultant.rating}
                                </MDTypography>
                                <MDTypography variant="body2" color="text" ml={2}>
                                  • {consultant.students} students
                                </MDTypography>
                              </MDBox>
                              <MDTypography variant="body2" color="text" mb={2}>
                                Subjects: {consultant.subjects.join(", ")}
                              </MDTypography>
                              <MDTypography variant="body2" color="text" mb={2}>
                                Experience: {consultant.experience}
                              </MDTypography>
                              <MDButton
                                variant="gradient"
                                color="info"
                                fullWidth
                                onClick={() => (window.location.href = "/chatbot")}
                              >
                                Start Consultation
                              </MDButton>
                            </Grid>
                          </Grid>
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

export default TeacherConsultants;
