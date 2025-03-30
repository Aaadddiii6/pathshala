import Grid from "@mui/material/Grid";

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

function TeacherDashboard() {
  const { t } = useTranslation();

  const subjectsData = {
    labels: ["Mathematics", "Physics", "Chemistry"],
    datasets: {
      label: t("dashboard.weeklyTeachingHours"),
      data: [15, 12, 10],
    },
  };

  const studentPerformanceData = {
    labels: ["Mathematics", "Physics", "Chemistry"],
    datasets: {
      label: t("dashboard.subjectWisePerformance"),
      data: [85, 78, 82],
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
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="dark"
              icon="school"
              title={t("dashboard.teachingHours")}
              count="37"
              percentage={{
                color: "success",
                amount: "+5",
                label: t("dashboard.hoursThisWeek"),
              }}
              sx={{ height: "100%", minHeight: "140px" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              icon="groups"
              title={t("dashboard.totalStudents")}
              count="156"
              percentage={{
                color: "success",
                amount: "+12",
                label: t("dashboard.newStudents"),
              }}
              sx={{ height: "100%", minHeight: "140px" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="grade"
              title={t("dashboard.avgClassPerformance")}
              count="82%"
              percentage={{
                color: "success",
                amount: "+8%",
                label: t("dashboard.thanLastMonth"),
              }}
              sx={{ height: "100%", minHeight: "140px" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="primary"
              icon="event"
              title={t("dashboard.upcomingClasses")}
              count="8"
              percentage={{
                color: "success",
                amount: "Today",
                label: t("dashboard.classes"),
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
                title={t("dashboard.teachingHours")}
                description={t("dashboard.weeklyTeachingHours")}
                date="updated 4 min ago"
                chart={subjectsData}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="success"
                title={t("dashboard.classPerformance")}
                description={t("dashboard.subjectWisePerformance")}
                date="updated 4 min ago"
                chart={studentPerformanceData}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <ReportsBarChart
                color="dark"
                title={t("dashboard.studentAttendance")}
                description={t("dashboard.weeklyAttendance")}
                date="just updated"
                chart={{
                  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                  datasets: {
                    label: "Attendance (%)",
                    data: [95, 92, 88, 94, 90],
                  },
                }}
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

export default TeacherDashboard;
