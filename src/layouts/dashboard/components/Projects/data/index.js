/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const data = {
  columns: [
    { Header: "Topic", accessor: "name", width: "30%" },
    { Header: "Type", accessor: "type", width: "20%" },
    { Header: "Completion", accessor: "completion", width: "25%" },
    { Header: "Status", accessor: "status", width: "25%" },
  ],

  rows: [
    {
      name: "Virtual Chemistry Lab",
      type: "VR Experience",
      completion: "95%",
      status: "Completed",
    },
    {
      name: "3D Human Anatomy",
      type: "AR Model",
      completion: "85%",
      status: "In Progress",
    },
    {
      name: "Solar System Explorer",
      type: "VR Simulation",
      completion: "100%",
      status: "Completed",
    },
    {
      name: "Historical Monuments",
      type: "AR Tour",
      completion: "75%",
      status: "In Progress",
    },
    {
      name: "Physics Experiments",
      type: "VR Lab",
      completion: "90%",
      status: "Completed",
    },
    {
      name: "Geographic Features",
      type: "AR Map",
      completion: "60%",
      status: "In Progress",
    },
  ],
};

export default data;
