import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        dashboard: {
          // Teacher Dashboard
          teachingHours: "Teaching Hours",
          hoursThisWeek: "hours this week",
          totalStudents: "Total Students",
          newStudents: "new students",
          avgClassPerformance: "Average Class Performance",
          thanLastMonth: "than last month",
          upcomingClasses: "Upcoming Classes",
          classes: "classes",
          weeklyTeachingHours: "Weekly Teaching Hours by Subject",
          classPerformance: "Class Performance",
          subjectWisePerformance: "Subject-wise Performance",
          studentAttendance: "Student Attendance",
          weeklyAttendance: "Weekly Attendance",

          // Student Dashboard
          studyHours: "Study Hours",
          classesTaken: "Classes Taken",
          thisWeek: "this week",
          avgTestScores: "Average Test Scores",
          rank: "Rank",
          spotsUp: "spots up",
          websiteViews: "Website Views",
          lastPerformance: "Last Performance",
          dailyTasks: "Daily Tasks",
          thanLastWeek: "than last week",
          completedTasks: "Completed Tasks",
          lastCampaignPerformance: "Last Campaign Performance",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
