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

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";

function Projects() {
  const { t } = useTranslation();

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium" color="#FFFFFF">
          {name}
        </MDTypography>
        <MDTypography variant="caption" color="#FFFFFF">
          {email}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  Author.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  Author.defaultProps = {
    image: "",
  };

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="#FFFFFF" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption" color="#FFFFFF">
        {description}
      </MDTypography>
    </MDBox>
  );

  Job.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  const renderAuthors = (authors) => (
    <MDBox display="flex" alignItems="center" gap={1}>
      {authors.map((author, index) => (
        <MDBox key={index} display="flex" alignItems="center">
          <MDBox
            component="img"
            src={author.image}
            alt={author.name}
            width="24px"
            height="24px"
            borderRadius="50%"
            mr={1}
          />
          <MDTypography variant="button" color="white" fontWeight="medium">
            {author.name}
          </MDTypography>
          {index < authors.length - 1 && (
            <MDTypography variant="button" color="white" mx={1}>
              and
            </MDTypography>
          )}
        </MDBox>
      ))}
    </MDBox>
  );

  const renderJob = (job) => (
    <MDBox display="flex" alignItems="center" gap={1}>
      <MDTypography variant="button" color="white" fontWeight="medium">
        {job}
      </MDTypography>
    </MDBox>
  );

  return (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))",
        backdropFilter: "blur(10px)",
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <MDBox p={2}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <MDTypography variant="h6" fontWeight="bold" color="#FFFFFF">
            AR/VR Learning Experiences
          </MDTypography>
          <MDButton variant="outlined" color="info" size="small">
            View All
          </MDButton>
        </MDBox>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <DataTable
            table={{
              columns: [
                { Header: "Topic", accessor: "topic", width: "30%" },
                { Header: "Type", accessor: "type", width: "20%" },
                { Header: "Completion", accessor: "completion", width: "25%" },
                { Header: "Status", accessor: "status", width: "25%" },
              ],
              rows: [
                {
                  topic: <Author name="Virtual Chemistry Lab" email="Interactive 3D Lab" />,
                  type: <Job title="VR Experience" description="Chemistry Simulations" />,
                  completion: (
                    <MDBox width="8rem" textAlign="left">
                      <MDProgress value={95} color="info" variant="gradient" label={false} />
                      <MDTypography variant="caption" color="#FFFFFF" fontWeight="medium">
                        95%
                      </MDTypography>
                    </MDBox>
                  ),
                  status: (
                    <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="#FFFFFF"
                      fontWeight="medium"
                    >
                      Completed
                    </MDTypography>
                  ),
                },
                {
                  topic: <Author name="3D Human Anatomy" email="Interactive Body Model" />,
                  type: <Job title="AR Model" description="Anatomy Visualization" />,
                  completion: (
                    <MDBox width="8rem" textAlign="left">
                      <MDProgress value={85} color="info" variant="gradient" label={false} />
                      <MDTypography variant="caption" color="#FFFFFF" fontWeight="medium">
                        85%
                      </MDTypography>
                    </MDBox>
                  ),
                  status: (
                    <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="#FFFFFF"
                      fontWeight="medium"
                    >
                      In Progress
                    </MDTypography>
                  ),
                },
                {
                  topic: <Author name="Solar System Explorer" email="Space Simulation" />,
                  type: <Job title="VR Simulation" description="Space Exploration" />,
                  completion: (
                    <MDBox width="8rem" textAlign="left">
                      <MDProgress value={100} color="info" variant="gradient" label={false} />
                      <MDTypography variant="caption" color="#FFFFFF" fontWeight="medium">
                        100%
                      </MDTypography>
                    </MDBox>
                  ),
                  status: (
                    <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="#FFFFFF"
                      fontWeight="medium"
                    >
                      Completed
                    </MDTypography>
                  ),
                },
                {
                  topic: <Author name="Historical Monuments" email="Cultural Heritage" />,
                  type: <Job title="AR Tour" description="Historical Sites" />,
                  completion: (
                    <MDBox width="8rem" textAlign="left">
                      <MDProgress value={75} color="info" variant="gradient" label={false} />
                      <MDTypography variant="caption" color="#FFFFFF" fontWeight="medium">
                        75%
                      </MDTypography>
                    </MDBox>
                  ),
                  status: (
                    <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="#FFFFFF"
                      fontWeight="medium"
                    >
                      In Progress
                    </MDTypography>
                  ),
                },
                {
                  topic: <Author name="Physics Experiments" email="Science Lab" />,
                  type: <Job title="VR Lab" description="Physics Simulations" />,
                  completion: (
                    <MDBox width="8rem" textAlign="left">
                      <MDProgress value={90} color="info" variant="gradient" label={false} />
                      <MDTypography variant="caption" color="#FFFFFF" fontWeight="medium">
                        90%
                      </MDTypography>
                    </MDBox>
                  ),
                  status: (
                    <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="#FFFFFF"
                      fontWeight="medium"
                    >
                      Completed
                    </MDTypography>
                  ),
                },
                {
                  topic: <Author name="Geographic Features" email="Geography Explorer" />,
                  type: <Job title="AR Map" description="Geographic Visualization" />,
                  completion: (
                    <MDBox width="8rem" textAlign="left">
                      <MDProgress value={60} color="info" variant="gradient" label={false} />
                      <MDTypography variant="caption" color="#FFFFFF" fontWeight="medium">
                        60%
                      </MDTypography>
                    </MDBox>
                  ),
                  status: (
                    <MDTypography
                      component="a"
                      href="#"
                      variant="caption"
                      color="#FFFFFF"
                      fontWeight="medium"
                    >
                      In Progress
                    </MDTypography>
                  ),
                },
              ],
            }}
            showTotalEntries={false}
            entriesPerPage={false}
            tableHead={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
              opacity: 1,
            }}
            tableBody={{
              color: "#FFFFFF",
              fontWeight: "medium",
              opacity: 1,
            }}
            tablePagination={{
              color: "#FFFFFF",
            }}
            isSorted={false}
            noEndBorder
            showEntriesPerPage={false}
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Projects;
