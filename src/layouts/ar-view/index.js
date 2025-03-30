import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, IconButton, Box, Typography, Button, CircularProgress } from "@mui/material";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "context";

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
  const { modelUrl, scale, rotation, position, title, description } = location.state || {};

  // Define scenarios data
  const scenarios = [
    {
      id: 1,
      title: "Human Skeleton",
      description: "Explore the human skeletal system in 3D",
      modelUrl: "/models/skull.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 2,
      title: "Cell Structure",
      description: "Study the complex structure of a cell",
      modelUrl: "/models/cell.glb",
      scale: "0.2 0.2 0.2",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 3,
      title: "Drone",
      description: "Examine the components of a modern drone",
      modelUrl: "/models/drone.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 4,
      title: "Eye Implant",
      description: "Learn about modern eye implant technology",
      modelUrl: "/models/eye_implant.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 5,
      title: "Rocket Engine",
      description: "Explore the inner workings of a rocket engine",
      modelUrl: "/models/rocket_engine.glb",
      scale: "0.4 0.4 0.4",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 6,
      title: "Laptop",
      description: "Study the internal components of a laptop",
      modelUrl: "/models/laptop.glb",
      scale: "0.3 0.3 0.3",
      rotation: "0 0 0",
      position: "0 0 0",
    },
    {
      id: 7,
      title: "Solenoid",
      description: "Understand the electromagnetic principles of a solenoid",
      modelUrl: "/models/solenoid.gltf",
      scale: "0.3 0.3 0.3",
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
              ar={isARSupported}
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
              {isARSupported && (
                <button
                  slot="ar-button"
                  style={{
                    backgroundColor: "#2196F3",
                    borderRadius: "4px",
                    border: "none",
                    color: "white",
                    padding: "8px 16px",
                    cursor: "pointer",
                    position: "absolute",
                    bottom: "16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                  }}
                >
                  View in AR
                </button>
              )}
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

        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#2196F3",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {scenario.title}
        </Typography>

        {!isARSupported && (
          <Box
            sx={{
              backgroundColor: "rgba(33, 150, 243, 0.2)",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              maxWidth: "400px",
            }}
          >
            <Typography variant="body1" sx={{ color: "#fff", textAlign: "center" }}>
              You&apos;re viewing this on a device that doesn&apos;t support AR. You can still
              interact with the 3D model using your mouse:
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
              • Left click + drag to rotate
              <br />
              • Right click + drag to pan
              <br />• Scroll to zoom
            </Typography>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}

export default ARView;
