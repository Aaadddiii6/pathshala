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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
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

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    route: "/",
    component: <SignUp />,
  },
  {
    type: "route",
    name: "Student Sign In",
    key: "student-sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Teacher Sign In",
    key: "teacher-sign-in",
    route: "/authentication/teacher-sign-in",
    component: <TeacherSignIn />,
  },
  {
    type: "route",
    name: "Teacher Sign Up",
    key: "teacher-sign-up",
    route: "/authentication/teacher-sign-up",
    component: <TeacherSignUp />,
  },
  {
    type: "route",
    name: "Admin Sign In",
    key: "admin-sign-in",
    route: "/authentication/admin",
    component: <AdminSignIn />,
  },
  {
    type: "collapse",
    name: "Student Dashboard",
    key: "student-dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Teacher Dashboard",
    key: "teacher-dashboard",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/teacher-dashboard",
    component: <TeacherDashboard />,
  },
  {
    type: "collapse",
    name: "Virtual Classroom",
    key: "virtual-classroom",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "AR Learning",
    key: "ar-learning",
    icon: <Icon fontSize="small">view_in_ar</Icon>,
    route: "/ar-learning",
    component: <ARLearning />,
  },
  {
    type: "collapse",
    name: "Teacher Consultants",
    key: "teacher-consultants",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/teacher-consultants",
    component: <TeacherConsultants />,
  },
  {
    type: "collapse",
    name: "Chatbot",
    key: "chatbot",
    icon: <Icon fontSize="small">chat</Icon>,
    route: "/chatbot",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Quiz",
    key: "quiz",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/quiz",
    component: <Quiz />,
    collapse: [
      {
        type: "route",
        name: "All Quizzes",
        key: "all-quizzes",
        route: "/quiz",
        component: <Quiz />,
      },
      {
        type: "route",
        name: "Mathematics Quiz",
        key: "mathematics-quiz",
        route: "/quiz/mathematics",
        component: <MathematicsQuiz />,
      },
      {
        type: "route",
        name: "Physics Quiz",
        key: "physics-quiz",
        route: "/quiz/physics",
        component: <PhysicsQuiz />,
      },
      {
        type: "route",
        name: "Chemistry Quiz",
        key: "chemistry-quiz",
        route: "/quiz/chemistry",
        component: <ChemistryQuiz />,
      },
      {
        type: "route",
        name: "Biology Quiz",
        key: "biology-quiz",
        route: "/quiz/biology",
        component: <BiologyQuiz />,
      },
      {
        type: "route",
        name: "Computer Science Quiz",
        key: "computer-science-quiz",
        route: "/quiz/computer-science",
        component: <ComputerScienceQuiz />,
      },
      {
        type: "route",
        name: "English Quiz",
        key: "english-quiz",
        route: "/quiz/english",
        component: <EnglishQuiz />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export default routes;
