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

  const handleARView = (scenarioId) => {
    navigate(`/ar-view/${scenarioId}`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          position: "relative",
          backgroundColor: "white",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <MDBox
          sx={{
            backgroundColor: "#f8f9fa",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <MDTypography variant="h4" color="dark" gutterBottom>
            AR Learning Experience
          </MDTypography>
          <MDTypography variant="body1" color="text" sx={{ mb: 3 }}>
            Explore interactive 3D models in augmented reality
          </MDTypography>
          <MDBox
            sx={{
              display: "flex",
              gap: 2,
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
            <MDBox sx={{ display: "flex", gap: 2 }}>
              <MDInput
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  minWidth: "150px",
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
                  minWidth: "150px",
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

        <Grid container spacing={3}>
          {filteredScenarios.map((scenario) => (
            <Grid item xs={12} sm={6} md={4} key={scenario.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={scenario.image}
                  alt={scenario.title}
                  sx={{
                    objectFit: "cover",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <MDTypography variant="h6" color="dark" gutterBottom>
                    {scenario.title}
                  </MDTypography>
                  <MDTypography variant="body2" color="text" sx={{ mb: 2 }}>
                    {scenario.description}
                  </MDTypography>
                  <MDBox sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip
                      label={scenario.category}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        color: "#2196F3",
                      }}
                    />
                    <Chip
                      label={scenario.subject}
                      size="small"
                      sx={{
                        backgroundColor: "rgba(33, 150, 243, 0.1)",
                        color: "#2196F3",
                      }}
                    />
                  </MDBox>
                </CardContent>
                <MDBox sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleARView(scenario.id)}
                    sx={{
                      backgroundColor: "#2196F3",
                      "&:hover": {
                        backgroundColor: "#1976D2",
                      },
                      color: "white",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textTransform: "none",
                      width: "100%",
                    }}
                  >
                    {isARSupported ? "View in AR" : "View 3D Model"}
                  </Button>
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ARLearning;
