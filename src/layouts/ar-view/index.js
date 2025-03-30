import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, IconButton, Box, Typography, Button, CircularProgress } from "@mui/material";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";

function ARView() {
  const { id } = useParams();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const location = useLocation();
  const navigate = useNavigate();
  const [isARSupported, setIsARSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [modelData, setModelData] = useState(null);
  const [isARMode, setIsARMode] = useState(false);

  // Define scenarios data
  const scenarios = [
    {
      id: 1,
      title: "Human Skull",
      description: "Study the structure of the human skull and learn about cranial anatomy.",
      modelUrl: "/models/skull.glb",
      scale: "0.5 0.5 0.5",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 2,
      title: "Human Cell",
      description: "Explore the complex structure of a human cell in 3D.",
      modelUrl: "/models/cell.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 3,
      title: "Drone",
      description: "Examine the components and structure of a modern drone.",
      modelUrl: "/models/drone.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 4,
      title: "Eye Implant",
      description: "Learn about the structure and function of an eye implant.",
      modelUrl: "/models/eye_implant.glb",
      scale: "0.2 0.2 0.2",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 5,
      title: "Rocket Engine",
      description: "Explore the internal workings of a rocket engine.",
      modelUrl: "/models/rocket_engine.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 6,
      title: "High-End Laptop",
      description: "Study the internal components of a modern laptop.",
      modelUrl: "/models/High_end_laptop.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
    },
  ];

  // Get the current scenario
  const scenario = scenarios.find((s) => s.id === parseInt(id));

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
    script.onload = () => {
      setIsScriptLoaded(true);
      setIsLoading(false);
    };
    script.onerror = () => {
      setError("Failed to load the model viewer script. Please check your internet connection.");
      setIsLoading(false);
    };
    document.head.appendChild(script);

    checkARSupport();

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // In a real application, you would fetch the model data based on the ID
    // For now, we'll use some mock data
    const mockModels = {
      1: {
        title: "Human Skull",
        modelUrl: "/models/skull.glb",
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0",
        position: "0 0 0",
      },
      2: {
        title: "Human Cell",
        modelUrl: "/models/cell.glb",
        scale: "0.3 0.3 0.3",
        rotation: "0 0 0",
        position: "0 0 0",
      },
      // Add more models as needed
    };

    setModelData(mockModels[id]);

    // Add model-viewer script if not already present
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement("script");
      script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
      script.type = "module";
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector('script[src*="model-viewer"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [id]);

  const handleModelError = (error) => {
    console.error("Model loading error:", error);
    setError("Failed to load the 3D model. Please check if the model file exists.");
    setIsLoading(false);
  };

  const handleModelLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  if (!scenario) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#000",
            color: "#fff",
            padding: "20px",
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            Scenario Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            The requested AR scenario could not be found.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/ar-learning")}
            sx={{
              backgroundColor: "rgba(33, 150, 243, 0.9)",
              "&:hover": {
                backgroundColor: "rgba(33, 150, 243, 1)",
              },
            }}
          >
            Back to AR Learning
          </Button>
        </Box>
      </DashboardLayout>
    );
  }

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
        <IconButton
          onClick={() => navigate("/ar-learning")}
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <Icon>arrow_back</Icon>
        </IconButton>

        <MDBox
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 1,
            display: "flex",
            gap: 1,
          }}
        >
          {isARSupported && (
            <Button
              variant="contained"
              color={isARMode ? "secondary" : "primary"}
              onClick={() => setIsARMode(!isARMode)}
              startIcon={<Icon>{isARMode ? "view_in_ar" : "view_in_ar"}</Icon>}
              sx={{
                backgroundColor: isARMode ? "#f50057" : "#1a73e8",
                "&:hover": {
                  backgroundColor: isARMode ? "#c51162" : "#1557b0",
                },
              }}
            >
              {isARMode ? "Exit AR" : "Enter AR"}
            </Button>
          )}
        </MDBox>

        <model-viewer
          src={scenario.modelUrl}
          alt={scenario.title}
          ar={isARMode}
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          shadow-intensity="1"
          auto-rotate
          camera-orbit="45deg 55deg 2.5m"
          min-camera-orbit="auto auto 0.1m"
          max-camera-orbit="auto auto 10m"
          scale={scenario.scale}
          rotation={scenario.rotation}
          position={scenario.position}
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#f8f9fa",
          }}
          onerror={handleModelError}
          onload={handleModelLoad}
        >
          {isARMode && (
            <button
              slot="ar-button"
              style={{
                backgroundColor: "#1a73e8",
                borderRadius: "4px",
                border: "none",
                color: "white",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              View in AR
            </button>
          )}
        </model-viewer>
      </MDBox>
    </DashboardLayout>
  );
}

export default ARView;
