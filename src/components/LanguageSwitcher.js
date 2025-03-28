import { useState } from "react";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MDBox>
      <MDButton
        variant="text"
        color="white"
        onClick={handleClick}
        startIcon={<Icon>language</Icon>}
      >
        Language
      </MDButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>English</MenuItem>
        <MenuItem onClick={handleClose}>Spanish</MenuItem>
        <MenuItem onClick={handleClose}>French</MenuItem>
      </Menu>
    </MDBox>
  );
}

export default LanguageSwitcher;
