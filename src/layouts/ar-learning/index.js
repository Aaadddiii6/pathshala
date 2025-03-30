import { useState, useEffect } from "react";
import { Card, Grid, Icon, InputAdornment, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import new images
import droneImage from "assets/images/drone.png";
import eyeImplantImage from "assets/images/eye_implant.png";
import rocketEngineImage from "assets/images/rocket_engine.png";
import laptopImage from "assets/images/High_end_laptop.png";
import skullImage from "assets/images/skull.png";
import cellImage from "assets/images/cell.png";
import solenoidImage from "assets/images/solenoid.png";

function ARLearning() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [isARSupported, setIsARSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );

    // Check if AR is supported
    const checkARSupport = async () => {
      try {
        if ("xr" in navigator) {
          const supported = await navigator.xr.isSessionSupported("immersive-ar");
          setIsARSupported(supported);
        } else if ("webxr" in navigator) {
          setIsARSupported(true);
        } else {
          setIsARSupported(false);
        }
      } catch (error) {
        console.log("AR support check failed:", error);
        setIsARSupported(false);
      }
    };

    // Add model-viewer script
    const script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    script.type = "module";
    document.head.appendChild(script);

    checkARSupport();

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const categories = ["All", "Anatomy", "Technology", "Science", "Engineering"];
  const subjects = ["All", "Biology", "Physics", "Chemistry", "Computer Science"];

  const scenarios = [
    {
      id: 1,
      title: "Human Skull",
      description: "Study the structure of the human skull and learn about cranial anatomy.",
      category: "Anatomy",
      subject: "Biology",
      image: skullImage,
      modelUrl: "/models/skull.glb",
      scale: "0.5 0.5 0.5",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 2,
      title: "Human Cell",
      description: "Explore the complex structure of a human cell in 3D.",
      category: "Anatomy",
      subject: "Biology",
      image: cellImage,
      modelUrl: "/models/cell.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 3,
      title: "Drone",
      description: "Examine the components and structure of a modern drone.",
      category: "Technology",
      subject: "Computer Science",
      image: droneImage,
      modelUrl: "/models/drone.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 4,
      title: "Eye Implant",
      description: "Learn about the structure and function of an eye implant.",
      category: "Technology",
      subject: "Biology",
      image: eyeImplantImage,
      modelUrl: "/models/eye_implant.glb",
      scale: "0.2 0.2 0.2",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 5,
      title: "Rocket Engine",
      description: "Explore the internal workings of a rocket engine.",
      category: "Engineering",
      subject: "Physics",
      image: rocketEngineImage,
      modelUrl: "/models/rocket_engine.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 6,
      title: "High-End Laptop",
      description: "Study the internal components of a modern laptop.",
      category: "Technology",
      subject: "Computer Science",
      image: laptopImage,
      modelUrl: "/models/laptop.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 7,
      title: "Solenoid",
      description: "Understand the electromagnetic principles of a solenoid.",
      category: "Engineering",
      subject: "Physics",
      image: solenoidImage,
      modelUrl: "/models/solenoid.gltf",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
  ];

  const filteredScenarios = scenarios.filter((scenario) => {
    const matchesSearch =
      scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scenario.category === selectedCategory;
    const matchesSubject = selectedSubject === "All" || scenario.subject === selectedSubject;
    return matchesSearch && matchesCategory && matchesSubject;
  });

  const handleARView = (scenarioId) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      navigate("/ar-view", {
        state: {
          modelUrl: scenario.modelUrl,
          scale: scenario.scale,
          rotation: scenario.rotation,
          position: scenario.position,
          title: scenario.title,
          description: scenario.description,
        },
      });
    }
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
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
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
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
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
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => handleARView(scenario.id)}
                          disabled={!isARSupported && isMobile}
                          sx={{
                            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                            "&:hover": {
                              background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                            },
                            "&.Mui-disabled": {
                              background: "rgba(33, 150, 243, 0.5)",
                              cursor: "not-allowed",
                            },
                          }}
                        >
                          {isARSupported
                            ? "View in AR"
                            : isMobile
                            ? "AR Not Supported on this Device"
                            : "View 3D Model"}
                        </Button>
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
