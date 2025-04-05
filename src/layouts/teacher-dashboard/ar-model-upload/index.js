import React, { useState } from "react";
import { Grid, Card, TextField, MenuItem, Box } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function ARModelUpload() {
  const [modelData, setModelData] = useState({
    title: "",
    description: "",
    file: null,
    category: "",
    subject: "",
    scale: "0.5 0.5 0.5",
    rotation: "0 0 0",
    position: "0 0 0",
  });
  const [previewUrl, setPreviewUrl] = useState("");

  const categories = ["Anatomy", "Technology", "Science", "Engineering"];
  const subjects = ["Biology", "Physics", "Chemistry", "Computer Science"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.toLowerCase().endsWith(".glb")) {
      setModelData({ ...modelData, file });
      // Create a preview URL for the file
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      alert("Please upload a GLB file");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModelData({ ...modelData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you would typically:
    // 1. Upload the GLB file to your server/storage
    // 2. Save the model data to your database
    // 3. Update the AR models list in the student dashboard
    console.log("Uploading model:", modelData);

    // Reset form after submission
    setModelData({
      title: "",
      description: "",
      file: null,
      category: "",
      subject: "",
      scale: "0.5 0.5 0.5",
      rotation: "0 0 0",
      position: "0 0 0",
    });
    setPreviewUrl("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Upload AR Model
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <MDBox mb={2}>
                        <MDButton
                          variant="contained"
                          component="label"
                          color="info"
                          fullWidth
                          startIcon={<Icon>upload_file</Icon>}
                        >
                          Upload GLB File
                          <input type="file" hidden accept=".glb" onChange={handleFileChange} />
                        </MDButton>
                        {modelData.file && (
                          <MDTypography variant="body2" color="success" mt={1}>
                            Selected file: {modelData.file.name}
                          </MDTypography>
                        )}
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        required
                        fullWidth
                        label="Model Title"
                        name="title"
                        value={modelData.title}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        select
                        required
                        fullWidth
                        label="Category"
                        name="category"
                        value={modelData.category}
                        onChange={handleInputChange}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </MDInput>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        select
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={modelData.subject}
                        onChange={handleInputChange}
                      >
                        {subjects.map((subject) => (
                          <MenuItem key={subject} value={subject}>
                            {subject}
                          </MenuItem>
                        ))}
                      </MDInput>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        required
                        fullWidth
                        label="Scale (x y z)"
                        name="scale"
                        value={modelData.scale}
                        onChange={handleInputChange}
                        placeholder="0.5 0.5 0.5"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MDInput
                        required
                        fullWidth
                        label="Model Description"
                        name="description"
                        value={modelData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <MDInput
                          fullWidth
                          label="Rotation (x y z)"
                          name="rotation"
                          value={modelData.rotation}
                          onChange={handleInputChange}
                          placeholder="0 0 0"
                        />
                        <MDInput
                          fullWidth
                          label="Position (x y z)"
                          name="position"
                          value={modelData.position}
                          onChange={handleInputChange}
                          placeholder="0 0 0"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        type="submit"
                        disabled={
                          !modelData.file ||
                          !modelData.title ||
                          !modelData.description ||
                          !modelData.category ||
                          !modelData.subject
                        }
                        startIcon={<Icon>save</Icon>}
                      >
                        Upload Model
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ARModelUpload;
