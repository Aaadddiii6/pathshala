import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, IconButton, Box, Typography, Button, CircularProgress } from "@mui/material";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function ARView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isARSupported, setIsARSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { modelUrl, scale, rotation, position, title, description } = location.state || {};

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

  if (!modelUrl) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Box p={3}>
          <Typography variant="h4" color="error">
            No model selected
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/ar-learning")}
            sx={{ mt: 2 }}
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
              src={modelUrl}
              alt={title}
              ar={isARSupported}
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              camera-orbit="45deg 55deg 2.5m"
              min-camera-orbit="auto auto 0.1m"
              max-camera-orbit="auto auto 100m"
              scale={scale}
              rotation={rotation}
              position={position}
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
            {title}
          </Typography>
          <Typography variant="body1" color="#2196F3">
            {description}
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
