import Dashboard from "layouts/dashboard";
import TeacherDashboard from "layouts/teacher-dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import TeacherSignIn from "layouts/authentication/teacher-sign-in";
import TeacherSignUp from "layouts/authentication/teacher-sign-up";
import AdminSignIn from "layouts/authentication/admin";
import TeacherConsultants from "layouts/teacher-consultants";
import Quiz from "layouts/quiz";
import MathematicsQuiz from "layouts/quiz/mathematics";
import PhysicsQuiz from "layouts/quiz/physics";
import ChemistryQuiz from "layouts/quiz/chemistry";
import BiologyQuiz from "layouts/quiz/biology";
import ComputerScienceQuiz from "layouts/quiz/computer-science";
import EnglishQuiz from "layouts/quiz/english";
import ARLearning from "layouts/ar-learning";
import VirtualClassroom from "layouts/virtual-classroom";
import Chatbot from "layouts/chatbot";
import ARView from "layouts/ar-view";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Student Sign Up",
    key: "student-sign-up",
    route: "/authentication/student-sign-up",
    component: <SignUp />,
  },
  {
    type: "route",
    name: "Teacher Sign Up",
    key: "teacher-sign-up",
    route: "/authentication/teacher-sign-up",
    component: <SignUp />,
  },
  {
    type: "route",
    name: "Student Sign In",
    key: "student-sign-in",
    route: "/authentication/student-sign-in",
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Teacher Sign In",
    key: "teacher-sign-in",
    route: "/authentication/teacher-sign-in",
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Admin Login",
    key: "admin-login",
    route: "/authentication/admin-login",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Classroom",
    key: "virtual-classroom",
    route: "/virtual-classroom",
    icon: <Icon fontSize="medium">video_camera_front</Icon>,
    component: <VirtualClassroom />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AR Learning",
    key: "ar-learning",
    route: "/ar-learning",
    icon: <Icon fontSize="medium">view_in_ar</Icon>,
    component: <ARLearning />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Quiz",
    key: "quiz",
    route: "/quiz",
    icon: <Icon fontSize="medium">quiz</Icon>,
    component: <Quiz />,
    collapse: [
      {
        name: "Mathematics",
        key: "mathematics",
        route: "/quiz/mathematics",
        component: <MathematicsQuiz />,
      },
      {
        name: "Physics",
        key: "physics",
        route: "/quiz/physics",
        component: <PhysicsQuiz />,
      },
      {
        name: "Chemistry",
        key: "chemistry",
        route: "/quiz/chemistry",
        component: <ChemistryQuiz />,
      },
      {
        name: "Biology",
        key: "biology",
        route: "/quiz/biology",
        component: <BiologyQuiz />,
      },
      {
        name: "Computer Science",
        key: "computer-science",
        route: "/quiz/computer-science",
        component: <ComputerScienceQuiz />,
      },
      {
        name: "English",
        key: "english",
        route: "/quiz/english",
        component: <EnglishQuiz />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Chatbot",
    key: "chatbot",
    route: "/chatbot",
    icon: <Icon fontSize="medium">chat</Icon>,
    component: <Chatbot />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Teacher Consultants",
    key: "teacher-consultants",
    route: "/teacher-consultants",
    icon: <Icon fontSize="medium">people</Icon>,
    component: <TeacherConsultants />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    route: "/notifications",
    icon: <Icon fontSize="medium">notifications</Icon>,
    component: <Notifications />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <Icon fontSize="medium">person</Icon>,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "AR View",
    key: "ar-view",
    route: "/ar-view/:id",
    component: <ARView />,
  },
];

export default routes;
