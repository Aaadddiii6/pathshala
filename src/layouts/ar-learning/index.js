import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Icon,
  InputAdornment,
  Button,
  CardMedia,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuItem } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

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
  const [selectedModel, setSelectedModel] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
          setIsARSupported(true); // Temporarily set to true for testing
        }
      } catch (error) {
        console.log("AR support check failed:", error);
        setIsARSupported(true); // Temporarily set to true for testing
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
      modelUrl: "/models/skull.glb",
      scale: "0.5 0.5 0.5",
      rotation: "0 0 0",
      position: "0 0 0",
      image: skullImage,
      category: "Anatomy",
      subject: "Biology",
    },
    {
      id: 2,
      title: "Human Cell",
      description: "Explore the complex structure of a human cell in 3D.",
      modelUrl: "/models/cell.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
      image: cellImage,
      category: "Anatomy",
      subject: "Biology",
    },
    {
      id: 3,
      title: "Drone",
      description: "Examine the components and structure of a modern drone.",
      modelUrl: "/models/drone.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
      image: droneImage,
      category: "Technology",
      subject: "Computer Science",
    },
    {
      id: 4,
      title: "Eye Implant",
      description: "Learn about the structure and function of an eye implant.",
      modelUrl: "/models/eye_implant.glb",
      scale: "0.2 0.2 0.2",
      rotation: "0 0 0",
      position: "0 0 0",
      image: eyeImplantImage,
      category: "Technology",
      subject: "Biology",
    },
    {
      id: 5,
      title: "Rocket Engine",
      description: "Explore the internal workings of a rocket engine.",
      modelUrl: "/models/rocket_engine.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
      image: rocketEngineImage,
      category: "Engineering",
      subject: "Physics",
    },
    {
      id: 6,
      title: "High-End Laptop",
      description: "Study the internal components of a modern laptop.",
      modelUrl: "/models/High_end_laptop.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
      image: laptopImage,
      category: "Technology",
      subject: "Computer Science",
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

  const handleModelError = (error) => {
    console.error("Model loading error:", error);
    setError("Failed to load the 3D model. Please check if the model file exists.");
    setIsLoading(false);
  };

  const handleModelLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleViewInAR = (scenario) => {
    setSelectedModel(scenario);
    setIsPreviewOpen(true);
  };

  const handleActivateAR = () => {
    if (selectedModel) {
      setIsPreviewOpen(false);
      navigate(`/ar-view/${selectedModel.id}`, { state: { activateAR: true } });
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedModel(null);
    setError(null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          position: "relative",
          backgroundColor: "white",
          minHeight: "100vh",
          padding: { xs: "10px", sm: "20px" },
        }}
      >
        <MDBox
          sx={{
            backgroundColor: "#f8f9fa",
            borderRadius: "15px",
            padding: { xs: "15px", sm: "20px" },
            marginBottom: { xs: "15px", sm: "20px" },
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <MDTypography
            variant="h4"
            color="dark"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            AR Learning Experience
          </MDTypography>
          <MDTypography
            variant="body1"
            color="text"
            sx={{ mb: 3, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Explore interactive 3D models in augmented reality
          </MDTypography>
          <MDBox
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              flexWrap: "wrap",
              alignItems: "center",
              mb: 3,
            }}
          >
            <MDInput
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                width: { xs: "100%", sm: "auto" },
                "& .MuiInputBase-input": {
                  color: "dark",
                },
                "& .MuiInputLabel-root": {
                  color: "dark",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.3)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.4)",
                },
              }}
            />
            <MDBox
              sx={{ display: "flex", gap: { xs: 1, sm: 2 }, width: { xs: "100%", sm: "auto" } }}
            >
              <MDInput
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  flex: { xs: 1, sm: "auto" },
                  minWidth: { xs: "auto", sm: "150px" },
                  backgroundColor: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    color: "dark",
                  },
                  "& .MuiInputLabel-root": {
                    color: "dark",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.3)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
              </MDInput>
              <MDInput
                select
                label="Subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                sx={{
                  flex: { xs: 1, sm: "auto" },
                  minWidth: { xs: "auto", sm: "150px" },
                  backgroundColor: "white",
                  borderRadius: "8px",
                  "& .MuiInputBase-input": {
                    color: "dark",
                  },
                  "& .MuiInputLabel-root": {
                    color: "dark",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.3)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <MenuItem value="">All Subjects</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
              </MDInput>
            </MDBox>
          </MDBox>
        </MDBox>

        <MDBox py={3}>
          <Grid container spacing={2}>
            {filteredScenarios.map((scenario, index) => (
              <Grid item xs={6} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "15px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={scenario.image}
                    alt={scenario.title}
                    sx={{
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <MDBox p={2}>
                    <MDTypography
                      variant="h6"
                      color="dark"
                      gutterBottom
                      sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                    >
                      {scenario.title}
                    </MDTypography>
                    <MDTypography
                      variant="body2"
                      color="text"
                      paragraph
                      sx={{ display: { xs: "none", sm: "block" } }}
                    >
                      {scenario.description}
                    </MDTypography>
                    <MDBox sx={{ mt: "auto" }}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={() => handleViewInAR(scenario)}
                        sx={{
                          borderRadius: "8px",
                          textTransform: "none",
                          fontSize: "0.875rem",
                          py: 1,
                        }}
                      >
                        View in AR
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </MDBox>

      {/* Preview Modal */}
      <Dialog
        open={isPreviewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            height: "90vh",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          {selectedModel && (
            <Box sx={{ height: "100%", position: "relative" }}>
              <model-viewer
                src={selectedModel.modelUrl}
                alt={selectedModel.title}
                camera-controls
                shadow-intensity="1"
                auto-rotate
                camera-orbit="45deg 55deg 2.5m"
                min-camera-orbit="auto auto 0.1m"
                max-camera-orbit="auto auto 10m"
                scale={selectedModel.scale}
                rotation={selectedModel.rotation}
                position={selectedModel.position}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#f8f9fa",
                }}
                onerror={handleModelError}
                onload={handleModelLoad}
              />
              {isLoading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {error && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography color="error">{error}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button onClick={handleClosePreview}>Close Preview</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleActivateAR}
            startIcon={<Icon>view_in_ar</Icon>}
            sx={{
              backgroundColor: "#1a73e8",
              "&:hover": {
                backgroundColor: "#1557b0",
              },
            }}
          >
            Activate AR
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default ARLearning;
