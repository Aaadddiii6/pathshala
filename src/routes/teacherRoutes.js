import TeacherDashboard from "layouts/teacher-dashboard";
import CreateQuiz from "layouts/quiz/create-quiz";
import SubjectQuizCreator from "layouts/quiz/create-quiz/subject-quiz-creator";
import ARModelUpload from "layouts/teacher-dashboard/ar-model-upload";
import ClassroomLink from "layouts/classroom-link";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/student-sign-up";
import Chatbot from "layouts/chatbot";

// @mui icons
import Icon from "@mui/material/Icon";

const teacherRoutes = [
  {
    type: "collapse",
    name: "Teacher Dashboard",
    key: "teacher-dashboard",
    route: "/teacher-dashboard",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    component: <TeacherDashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Create Quizzes",
    key: "create-quizzes",
    route: "/teacher/create-quizzes",
    icon: <Icon fontSize="medium">quiz</Icon>,
    component: <CreateQuiz />,
    collapse: [
      {
        name: "Mathematics Quiz",
        key: "mathematics-quiz",
        route: "/teacher/create-quizzes/mathematics",
        component: <SubjectQuizCreator subject="mathematics" />,
      },
      {
        name: "Physics Quiz",
        key: "physics-quiz",
        route: "/teacher/create-quizzes/physics",
        component: <SubjectQuizCreator subject="physics" />,
      },
      {
        name: "Chemistry Quiz",
        key: "chemistry-quiz",
        route: "/teacher/create-quizzes/chemistry",
        component: <SubjectQuizCreator subject="chemistry" />,
      },
      {
        name: "Biology Quiz",
        key: "biology-quiz",
        route: "/teacher/create-quizzes/biology",
        component: <SubjectQuizCreator subject="biology" />,
      },
      {
        name: "Computer Science Quiz",
        key: "computer-science-quiz",
        route: "/teacher/create-quizzes/computer-science",
        component: <SubjectQuizCreator subject="computer-science" />,
      },
      {
        name: "English Quiz",
        key: "english-quiz",
        route: "/teacher/create-quizzes/english",
        component: <SubjectQuizCreator subject="english" />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Upload AR Models",
    key: "ar-models",
    route: "/teacher/ar-models",
    icon: <Icon fontSize="medium">view_in_ar</Icon>,
    component: <ARModelUpload />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Classroom Links",
    key: "classroom-links",
    route: "/teacher/classroom-links",
    icon: <Icon fontSize="medium">video_camera_front</Icon>,
    component: <ClassroomLink />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Chatbot Assistant",
    key: "chatbot",
    icon: <Icon fontSize="small">support_agent</Icon>,
    route: "/chatbot",
    component: <Chatbot />,
  },
];

export default teacherRoutes;
