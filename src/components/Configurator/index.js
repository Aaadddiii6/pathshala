// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    fixedSidenav,
    darkMode,
    fontSize,
    textToSpeech,
    colorInversion,
    colorBlindness,
    highContrast,
  } = controller;

  const handleCloseConfigurator = () => dispatch({ type: "OPEN_CONFIGURATOR", value: false });

  const sidenavColors = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ];

  return (
    <Card
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        padding: 0,
        transform: openConfigurator ? "translateX(0)" : "translateX(100%)",
        transformOrigin: "top right",
        transition: "transform 0.5s ease-in-out",
        overflow: "hidden",
        height: "100%",
        maxWidth: "100%",
        marginLeft: 0,
        marginRight: 0,
      }}
    >
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Accessibility Settings</MDTypography>
          <MDTypography variant="body2" color="text">
            Customize your learning experience
          </MDTypography>
        </MDBox>
        <MDBox component="a" href="#configurator" sx={{ mt: -2, mr: -1 }}>
          <Icon fontSize="small" onClick={handleCloseConfigurator}>
            close
          </Icon>
        </MDBox>
      </MDBox>

      <MDBox pt={4} pb={3} px={3}>
        {/* Text Size Control */}
        <MDBox>
          <MDTypography variant="h6">Text Size</MDTypography>
          <MDBox pt={2}>
            <Slider
              value={fontSize}
              onChange={(e, newValue) => dispatch({ type: "FONT_SIZE", value: newValue })}
              min={12}
              max={24}
              step={1}
              marks
              valueLabelDisplay="auto"
              aria-label="Text size"
            />
            <MDTypography variant="caption" color="text">
              {fontSize}px
            </MDTypography>
          </MDBox>
        </MDBox>

        {/* Text to Speech */}
        <MDBox mt={3}>
          <MDTypography variant="h6">Text to Speech</MDTypography>
          <MDBox pt={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={textToSpeech}
                  onChange={() => dispatch({ type: "TEXT_TO_SPEECH", value: !textToSpeech })}
                />
              }
              label="Enable text-to-speech for content"
            />
          </MDBox>
        </MDBox>

        {/* Color Inversion */}
        <MDBox mt={3}>
          <MDTypography variant="h6">Color Inversion</MDTypography>
          <MDBox pt={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={colorInversion}
                  onChange={() => dispatch({ type: "COLOR_INVERSION", value: !colorInversion })}
                />
              }
              label="Invert colors for better contrast"
            />
          </MDBox>
        </MDBox>

        {/* Color Blindness Support */}
        <MDBox mt={3}>
          <MDTypography variant="h6">Color Blindness Support</MDTypography>
          <MDBox pt={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={colorBlindness}
                  onChange={() => dispatch({ type: "COLOR_BLINDNESS", value: !colorBlindness })}
                />
              }
              label="Enable color blindness friendly mode"
            />
          </MDBox>
        </MDBox>

        {/* High Contrast Mode */}
        <MDBox mt={3}>
          <MDTypography variant="h6">High Contrast Mode</MDTypography>
          <MDBox pt={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={highContrast}
                  onChange={() => dispatch({ type: "HIGH_CONTRAST", value: !highContrast })}
                />
              }
              label="Enable high contrast mode"
            />
          </MDBox>
        </MDBox>

        {/* Theme Settings */}
        <MDBox mt={3}>
          <MDTypography variant="h6">Theme Settings</MDTypography>
          <MDBox pt={2}>
            <MDButton
              variant={darkMode ? "gradient" : "outlined"}
              color={darkMode ? "info" : "dark"}
              onClick={() => dispatch({ type: "DARKMODE", value: !darkMode })}
              fullWidth
            >
              {darkMode ? "Dark Mode" : "Light Mode"}
            </MDButton>
          </MDBox>
        </MDBox>

        {/* Sidenav Colors */}
        <MDBox mt={3}>
          <MDTypography variant="h6">Navigation Colors</MDTypography>
          <MDBox pt={0.5}>
            {sidenavColors.map((color) => (
              <MDBox
                key={color}
                width="2.5rem"
                height="2.5rem"
                bgColor={color}
                borderRadius="50%"
                display="inline-block"
                cursor="pointer"
                border={sidenavColor === color ? "2px solid #fff" : "none"}
                position="relative"
                mr={1}
                onClick={() => dispatch({ type: "SIDENAV_COLOR", value: color })}
              />
            ))}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Configurator;
