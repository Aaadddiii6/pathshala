import { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function AccessibilityMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [colorInversion, setColorInversion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
    document.documentElement.style.fontSize = `${newValue}px`;
  };

  const handleColorInversion = () => {
    setColorInversion(!colorInversion);
    document.body.style.filter = !colorInversion ? "invert(1)" : "none";
  };

  const handleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <AccessibilityNewIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 300,
            maxWidth: 400,
          },
        }}
      >
        <MDBox p={2}>
          <MDTypography variant="h6" mb={2}>
            Accessibility Settings
          </MDTypography>

          <Box mb={2}>
            <Typography gutterBottom>Font Size</Typography>
            <Slider
              value={fontSize}
              onChange={handleFontSizeChange}
              min={12}
              max={24}
              step={1}
              valueLabelDisplay="auto"
            />
            <Typography variant="caption" color="textSecondary">
              {fontSize}px
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch checked={colorInversion} onChange={handleColorInversion} color="primary" />
            }
            label="Color Inversion"
          />

          <FormControlLabel
            control={
              <Switch checked={highContrast} onChange={handleHighContrast} color="primary" />
            }
            label="High Contrast Mode"
          />

          <MDTypography variant="caption" color="textSecondary" display="block" mt={2}>
            These settings help make the content more accessible for visually challenged students.
          </MDTypography>
        </MDBox>
      </Menu>
    </>
  );
}

export default AccessibilityMenu;
