/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ScienceIcon from "@mui/icons-material/Science";
import ChemistryIcon from "@mui/icons-material/WaterDrop";
import FunctionsIcon from "@mui/icons-material/Functions";
import BiotechIcon from "@mui/icons-material/Biotech";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useState } from "react";

function Overview() {
  const [currentUser] = useState({
    name: "Anubhav Kumar",
    role: "Class 11th Student",
    email: "anubhav.kumar@rsbv.edu.in",
    phone: "+91 98765 43210",
    location: "RSBV School, Delhi",
    bio: "A passionate student of Class 11th at RSBV School, Delhi. Currently pursuing Science stream with Mathematics. Active participant in school's Science Club and Mathematics Olympiad team. Aspires to pursue Engineering in Computer Science. Enjoys solving complex mathematical problems and participating in coding competitions.",
  });

  const [connections] = useState([
    {
      name: "Priya Gupta",
      role: "Class 11th Student",
      email: "priya.gupta@rsbv.edu.in",
      phone: "+91 98765 43211",
      location: "RSBV School, Delhi",
      bio: "Science stream student, member of Science Club",
    },
    {
      name: "Arjun Singh",
      role: "Class 11th Student",
      email: "arjun.singh@rsbv.edu.in",
      phone: "+91 98765 43212",
      location: "RSBV School, Delhi",
      bio: "Mathematics enthusiast, Olympiad participant",
    },
    {
      name: "Neha Patel",
      role: "Class 11th Student",
      email: "neha.patel@rsbv.edu.in",
      phone: "+91 98765 43213",
      location: "RSBV School, Delhi",
      bio: "Science stream student, active in school activities",
    },
    {
      name: "Rahul Verma",
      role: "Class 11th Student",
      email: "rahul.verma@rsbv.edu.in",
      phone: "+91 98765 43214",
      location: "RSBV School, Delhi",
      bio: "Mathematics stream student, coding enthusiast",
    },
  ]);

  const BookCard = ({ icon, label, title, description, authors }) => (
    <MDBox
      sx={{
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "120px",
          mb: 2,
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {label}
      </MDTypography>
      <MDTypography variant="h6" fontWeight="bold" mb={1}>
        {title}
      </MDTypography>
      <MDTypography variant="body2" color="text" mb={2}>
        {description}
      </MDTypography>
      <MDBox sx={{ mt: "auto" }}>
        <MDBox display="flex" alignItems="center" mb={2}>
          {authors.map((author, index) => (
            <MDBox
              key={index}
              component="img"
              src={author.image}
              alt={author.name}
              width="24px"
              height="24px"
              borderRadius="50%"
              sx={{ ml: index > 0 ? -1 : 0 }}
            />
          ))}
        </MDBox>
        <MDBox
          component="button"
          variant="contained"
          color="info"
          sx={{
            width: "100%",
            py: 1,
            px: 2,
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <MDTypography variant="button" color="white">
            Read More
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );

  BookCard.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description={currentUser.bio}
                info={{
                  fullName: currentUser.name,
                  mobile: currentUser.phone,
                  email: currentUser.email,
                  location: currentUser.location,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Most Read Books
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Your reading journey and recommendations
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <BookCard
                icon={<ScienceIcon sx={{ fontSize: 60 }} />}
                label="Physics"
                title="Fundamentals of Physics"
                description="Essential textbook for Class 11th Physics covering mechanics, thermodynamics, and modern physics."
                authors={[
                  { image: team1, name: "Dr. Sharma" },
                  { image: team2, name: "Prof. Verma" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <BookCard
                icon={<ChemistryIcon sx={{ fontSize: 60 }} />}
                label="Chemistry"
                title="Organic Chemistry"
                description="Comprehensive guide to organic chemistry concepts and reactions for advanced learners."
                authors={[
                  { image: team3, name: "Dr. Patel" },
                  { image: team4, name: "Prof. Kumar" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <BookCard
                icon={<FunctionsIcon sx={{ fontSize: 60 }} />}
                label="Mathematics"
                title="Advanced Calculus"
                description="In-depth coverage of calculus topics including limits, derivatives, and integrals."
                authors={[
                  { image: team2, name: "Dr. Singh" },
                  { image: team1, name: "Prof. Gupta" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <BookCard
                icon={<BiotechIcon sx={{ fontSize: 60 }} />}
                label="Biology"
                title="Cell Biology"
                description="Detailed exploration of cell structure, function, and molecular biology concepts."
                authors={[
                  { image: team4, name: "Dr. Reddy" },
                  { image: team3, name: "Prof. Sharma" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
