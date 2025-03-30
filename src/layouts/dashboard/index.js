import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// i18n
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation();

  const subjectsData = {
    labels: ["Mathematics", "Physics", "Chemistry"],
    datasets: {
      label: "Hours Studied",
      data: [12, 8, 6],
    },
  };

  const testScoresData = {
    labels: ["Mathematics", "Physics", "Chemistry"],
    datasets: {
      label: "Test Scores (%)",
      data: [92, 85, 88],
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        py={2}
        sx={{
          background: "transparent",
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={6} sm={6} md={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="weekend"
              title="Study Hours"
              count="15:21"
              percentage={{
                color: "success",
                amount: "+12%",
                label: "This Week",
              }}
              sx={{ height: "100%", minHeight: "140px" }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Classes Taken"
              count="8"
              percentage={{
                color: "success",
                amount: "+2",
                label: "This Week",
              }}
              sx={{ height: "100%", minHeight: "140px" }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Average Test Score"
              count="85%"
              percentage={{
                color: "success",
                amount: "+14%",
                label: "vs Last Month",
                sx: { display: { xs: "none", sm: "block" } },
              }}
              sx={{ height: "100%", minHeight: "140px" }}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Rank"
              count="12"
              percentage={{
                color: "success",
                amount: "+3",
                label: "Spots Up",
              }}
              sx={{ height: "100%", minHeight: "140px" }}
            />
          </Grid>
        </Grid>
        <MDBox mt={4}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="info"
                title={t("dashboard.websiteViews")}
                description={t("dashboard.lastPerformance")}
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="success"
                title={t("dashboard.dailyTasks")}
                description={t("dashboard.thanLastWeek")}
                date="updated 4 min ago"
                chart={subjectsData}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="dark"
                title={t("dashboard.completedTasks")}
                description={t("dashboard.lastCampaignPerformance")}
                date="just updated"
                chart={testScoresData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
