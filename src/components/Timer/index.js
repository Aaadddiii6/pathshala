import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

function Timer({ onStop }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStop = () => {
    setIsRunning(false);
    onStop(time);
  };

  return (
    <MDBox
      position="fixed"
      bottom={20}
      right={20}
      bgColor="info.main"
      borderRadius="lg"
      p={2}
      boxShadow="lg"
      zIndex={1000}
    >
      <MDBox display="flex" alignItems="center" gap={2}>
        <MDBox>
          <MDTypography variant="h6" color="white" gutterBottom>
            Study Time
          </MDTypography>
          <MDTypography variant="h4" color="white" fontWeight="bold">
            {formatTime(time)}
          </MDTypography>
        </MDBox>
        <MDButton
          variant="gradient"
          color="error"
          onClick={handleStop}
          startIcon={<Icon>stop</Icon>}
        >
          Stop Timer
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

Timer.propTypes = {
  onStop: PropTypes.func.isRequired,
};

export default Timer;
