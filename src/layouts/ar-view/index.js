import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, IconButton, Box, Typography, Button, CircularProgress } from "@mui/material";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "context";

function ARView() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const [isARSupported, setIsARSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [modelViewer, setModelViewer] = useState(null);

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

  const handleModelError = (error) => {
    console.error("Model loading error:", error);
    setError("Failed to load the 3D model. Please check if the model file exists.");
    setIsLoading(false);
  };

  const handleModelLoad = () => {
    setIsLoading(false);
    setError(null);

    // Get the model-viewer element
    const viewer = document.querySelector("model-viewer");
    if (viewer) {
      setModelViewer(viewer);

      // If we have the activateAR state, trigger AR mode
      if (location.state?.activateAR) {
        // Find and click the AR button
        const arButton = viewer.querySelector('[slot="ar-button"]');
        if (arButton) {
          arButton.click();
        }
      }
    }
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
      <Box p={3}>
        <Card sx={{ height: "calc(100vh - 200px)", position: "relative" }}>
          <IconButton
            onClick={() => navigate("/ar-learning")}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                background: "rgba(255, 255, 255, 1)",
              },
              zIndex: 1000,
            }}
          >
            <Icon>close</Icon>
          </IconButton>

          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {error ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                zIndex: 1000,
              }}
            >
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate("/ar-learning")}>
                Back to AR Learning
              </Button>
            </Box>
          ) : (
            <model-viewer
              src={scenario.modelUrl}
              alt={scenario.title}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              camera-orbit="45deg 55deg 2.5m"
              min-camera-orbit="auto auto 0.1m"
              max-camera-orbit="auto auto 100m"
              scale={scenario.scale}
              rotation={scenario.rotation}
              position={scenario.position}
              environment-image="neutral"
              shadow-intensity="1"
              exposure="1"
              shadow-softness="1"
              animation-name="*"
              interaction-prompt="auto"
              interaction-prompt-style="basic"
              interaction-prompt-threshold="0"
              touch-action="pan-y"
              onerror={handleModelError}
              onload={handleModelLoad}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f5",
              }}
            >
              <button
                slot="ar-button"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  padding: "8px 16px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                👋 Activate AR
              </button>
            </model-viewer>
          )}
        </Card>

        <Box mt={2}>
          <Typography variant="h5" color="#2196F3" gutterBottom>
            {scenario.title}
          </Typography>
          <Typography variant="body1" color="#2196F3">
            {scenario.description}
          </Typography>
          {!isARSupported && isMobile && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              AR is not supported on your device. You can still view the 3D model in the viewer
              above.
            </Typography>
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default ARView;
