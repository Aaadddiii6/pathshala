import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Import 3D models and images
import skeleton from "../../assets/3dModels/skeleton.obj";
import skull from "../../assets/3dModels/Craneo3DS.3ds";
import machine from "../../assets/3dModels/industrialmachine.fbx";
import dna from "../../assets/3dModels/ДНК.fbx";

import skeletonImage from "../../assets/images/skeleton.png";
import skullImage from "../../assets/images/skull.png";
import machineImage from "../../assets/images/machine.png";
import dnaImage from "../../assets/images/dna.png";

function ARLearning() {
  const scenarios = [
    {
      id: 1,
      title: "Human Skeleton",
      image: skeletonImage,
      model: skeleton,
      description:
        "Explore the human skeletal system in 3D. Learn about bones, joints, and their functions.",
      category: "Biology",
      subject: "Anatomy",
      type: "3D Model",
    },
    {
      id: 2,
      title: "Human Skull",
      image: skullImage,
      model: skull,
      description: "Study the structure of the human skull and learn about cranial anatomy.",
      category: "Biology",
      subject: "Anatomy",
      type: "3D Model",
    },
    {
      id: 3,
      title: "Simple Machine",
      image: machineImage,
      model: machine,
      description:
        "Understand the principles of simple machines through interactive 3D visualization.",
      category: "Physics",
      subject: "Mechanics",
      type: "3D Model",
    },
    {
      id: 4,
      title: "DNA Structure",
      image: dnaImage,
      model: dna,
      description: "Explore the double helix structure of DNA and learn about genetic information.",
      category: "Biology",
      subject: "Genetics",
      type: "3D Model",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [showAR, setShowAR] = useState(null);

  useEffect(() => {
    // Add model-viewer script
    const script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    script.type = "module";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const categories = ["All", "Biology", "Physics", "Chemistry", "Mathematics"];
  const subjects = ["All", "Anatomy", "Mechanics", "Genetics", "Chemistry"];

  const filteredScenarios = scenarios.filter(
    (scenario) =>
      scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || scenario.category === selectedCategory) &&
      (selectedSubject === "All" || scenario.subject === selectedSubject)
  );

  const handleARView = (id) => {
    setShowAR(showAR === id ? null : id);
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
                  AR Learning
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                {/* Search and Filter Options */}
                <MDBox display="flex" flexWrap="wrap" gap={2} mb={4}>
                  <MDBox flexGrow={1} minWidth="200px">
                    <input
                      type="text"
                      placeholder="Search topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                      }}
                    />
                  </MDBox>
                  <MDBox minWidth="200px">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                      }}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </MDBox>
                  <MDBox minWidth="200px">
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                      }}
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </MDBox>
                </MDBox>

                {/* Display Scenarios */}
                <Grid container spacing={3}>
                  {filteredScenarios.map((scenario) => (
                    <Grid item xs={12} md={6} lg={4} key={scenario.id}>
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
                          <MDBox
                            display="flex"
                            alignItems="center"
                            mb={2}
                            sx={{ cursor: "pointer" }}
                          >
                            <Icon sx={{ color: "info.main", mr: 1, fontSize: "2rem" }}>
                              view_in_ar
                            </Icon>
                            <MDTypography variant="h5" color="white" fontWeight="bold">
                              {scenario.title}
                            </MDTypography>
                          </MDBox>
                          <img
                            src={scenario.image}
                            alt={scenario.title}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginBottom: "16px",
                            }}
                          />
                          <MDTypography variant="body2" color="white" mb={3}>
                            {scenario.description}
                          </MDTypography>
                          {showAR === scenario.id ? (
                            <MDBox>
                              <model-viewer
                                src={scenario.model}
                                alt={`3D model of ${scenario.title}`}
                                ar
                                ar-modes="webxr scene-viewer quick-look"
                                camera-controls
                                poster={scenario.image}
                                shadow-intensity="1"
                                auto-rotate
                                style={{ width: "100%", height: "300px", margin: "0 auto" }}
                              >
                                <button slot="ar-button" className="ar-button">
                                  View in AR
                                </button>
                              </model-viewer>
                              <MDButton
                                variant="gradient"
                                color="error"
                                fullWidth
                                onClick={() => handleARView(scenario.id)}
                                sx={{ mt: 2 }}
                              >
                                Close AR View
                              </MDButton>
                            </MDBox>
                          ) : (
                            <MDButton
                              variant="gradient"
                              color="info"
                              fullWidth
                              onClick={() => handleARView(scenario.id)}
                              startIcon={<Icon>view_in_ar</Icon>}
                            >
                              View in AR
                            </MDButton>
                          )}
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

export default ARLearning;
