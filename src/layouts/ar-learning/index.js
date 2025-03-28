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
            <Card sx={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}>
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

              {/* Search and Filter Options */}
              <MDBox display="flex" flexWrap="wrap" gap={2} mb={4} p={2}>
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
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#2196F3",
                      fontSize: "14px",
                    }}
                    className="search-input"
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
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#2196F3",
                      fontSize: "14px",
                      cursor: "pointer",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 8px center",
                      backgroundSize: "20px",
                    }}
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        style={{
                          background: "#1a237e",
                          color: "#2196F3",
                          padding: "8px",
                        }}
                      >
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
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#2196F3",
                      fontSize: "14px",
                      cursor: "pointer",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 8px center",
                      backgroundSize: "20px",
                    }}
                  >
                    {subjects.map((subject) => (
                      <option
                        key={subject}
                        value={subject}
                        style={{
                          background: "#1a237e",
                          color: "#2196F3",
                          padding: "8px",
                        }}
                      >
                        {subject}
                      </option>
                    ))}
                  </select>
                </MDBox>
              </MDBox>

              {/* Display Scenarios */}
              <Grid container spacing={3} p={2}>
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
                        <MDBox display="flex" alignItems="center" mb={2} sx={{ cursor: "pointer" }}>
                          <Icon sx={{ color: "#2196F3", mr: 1, fontSize: "2rem" }}>view_in_ar</Icon>
                          <MDTypography
                            variant="h5"
                            color="#2196F3"
                            fontWeight="bold"
                            sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                          >
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
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                          }}
                        />
                        <MDTypography
                          variant="body2"
                          color="#2196F3"
                          mb={3}
                          sx={{
                            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                            opacity: 0.9,
                          }}
                        >
                          {scenario.description}
                        </MDTypography>
                        <MDButton
                          variant="gradient"
                          color="info"
                          fullWidth
                          onClick={() => handleARView(scenario.id)}
                          sx={{
                            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                            "&:hover": {
                              background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                            },
                          }}
                        >
                          View in AR
                        </MDButton>
                      </MDBox>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <style>
        {`
          .search-input::placeholder {
            color: rgba(33, 150, 243, 0.7);
          }
          .search-input::-webkit-input-placeholder {
            color: rgba(33, 150, 243, 0.7);
          }
          .search-input:-ms-input-placeholder {
            color: rgba(33, 150, 243, 0.7);
          }
        `}
      </style>
    </DashboardLayout>
  );
}

export default ARLearning;
