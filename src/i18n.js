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
    hi: {
      translation: {
        dashboard: {
          // Teacher Dashboard
          teachingHours: "शिक्षण घंटे",
          hoursThisWeek: "इस सप्ताह के घंटे",
          totalStudents: "कुल छात्र",
          newStudents: "नए छात्र",
          avgClassPerformance: "औसत कक्षा प्रदर्शन",
          thanLastMonth: "पिछले महीने की तुलना में",
          upcomingClasses: "आगामी कक्षाएं",
          classes: "कक्षाएं",
          weeklyTeachingHours: "विषय के अनुसार साप्ताहिक शिक्षण घंटे",
          classPerformance: "कक्षा प्रदर्शन",
          subjectWisePerformance: "विषय-वार प्रदर्शन",
          studentAttendance: "छात्र उपस्थिति",
          weeklyAttendance: "साप्ताहिक उपस्थिति",

          // Student Dashboard
          studyHours: "अध्ययन घंटे",
          classesTaken: "ली गई कक्षाएं",
          thisWeek: "इस सप्ताह",
          avgTestScores: "औसत परीक्षा अंक",
          rank: "रैंक",
          spotsUp: "स्थान ऊपर",
          websiteViews: "वेबसाइट व्यूज",
          lastPerformance: "पिछला प्रदर्शन",
          dailyTasks: "दैनिक कार्य",
          thanLastWeek: "पिछले सप्ताह की तुलना में",
          completedTasks: "पूर्ण किए गए कार्य",
          lastCampaignPerformance: "अंतिम अभियान प्रदर्शन",
        },
      },
    },
    gu: {
      translation: {
        dashboard: {
          // Teacher Dashboard
          teachingHours: "શિક્ષણ કલાકો",
          hoursThisWeek: "આ અઠવાડિયાના કલાકો",
          totalStudents: "કુલ વિદ્યાર્થીઓ",
          newStudents: "નવા વિદ્યાર્થીઓ",
          avgClassPerformance: "સરેરાશ વર્ગ પ્રદર્શન",
          thanLastMonth: "ગયા મહિના કરતાં",
          upcomingClasses: "આગામી વર્ગો",
          classes: "વર્ગો",
          weeklyTeachingHours: "વિષય મુજબ સાપ્તાહિક શિક્ષણ કલાકો",
          classPerformance: "વર્ગ પ્રદર્શન",
          subjectWisePerformance: "વિષય-વાર પ્રદર્શન",
          studentAttendance: "વિદ્યાર્થી હાજરી",
          weeklyAttendance: "સાપ્તાહિક હાજરી",

          // Student Dashboard
          studyHours: "અભ્યાસ કલાકો",
          classesTaken: "લીધેલા વર્ગો",
          thisWeek: "આ અઠવાડિયે",
          avgTestScores: "સરેરાશ પરીક્ષા સ્કોર",
          rank: "રેન્ક",
          spotsUp: "સ્થાન ઉપર",
          websiteViews: "વેબસાઇટ વ્યૂઝ",
          lastPerformance: "છેલ્લું પ્રદર્શન",
          dailyTasks: "દૈનિક કાર્યો",
          thanLastWeek: "ગયા અઠવાડિયા કરતાં",
          completedTasks: "પૂર્ણ થયેલા કાર્યો",
          lastCampaignPerformance: "છેલ્લા અભિયાનનું પ્રદર્શન",
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
