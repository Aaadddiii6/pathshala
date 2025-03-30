import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const questions = [
  {
    question: "What is the SI unit of force?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    correctAnswer: 0,
  },
  {
    question: "What is the speed of light in vacuum?",
    options: ["299,792,458 m/s", "199,792,458 m/s", "399,792,458 m/s", "499,792,458 m/s"],
    correctAnswer: 0,
  },
  {
    question: "What is the formula for kinetic energy?",
    options: ["KE = 1/2 mv²", "KE = mv²", "KE = 2mv²", "KE = 1/2 mv"],
    correctAnswer: 0,
  },
  {
    question: "What is the law of conservation of energy?",
    options: [
      "Energy cannot be created or destroyed",
      "Energy can be created but not destroyed",
      "Energy can be destroyed but not created",
      "Energy can be both created and destroyed",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the unit of electric current?",
    options: ["Ampere", "Volt", "Ohm", "Watt"],
    correctAnswer: 0,
  },
  {
    question: "What is the formula for gravitational force?",
    options: ["F = Gm₁m₂/r²", "F = Gm₁m₂/r", "F = Gm₁m₂/r³", "F = Gm₁m₂/r⁴"],
    correctAnswer: 0,
  },
  {
    question: "What is the principle of relativity?",
    options: [
      "Laws of physics are the same in all inertial frames",
      "Laws of physics change in different frames",
      "Only some laws are the same in all frames",
      "Laws of physics are different in all frames",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the unit of frequency?",
    options: ["Hertz", "Watt", "Joule", "Newton"],
    correctAnswer: 0,
  },
  {
    question: "What is the law of conservation of momentum?",
    options: [
      "Total momentum remains constant in a closed system",
      "Momentum can be created",
      "Momentum can be destroyed",
      "Momentum changes randomly",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the formula for power?",
    options: ["P = W/t", "P = Wt", "P = W/t²", "P = W²/t"],
    correctAnswer: 0,
  },
];

function PhysicsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowResult(true);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getOptionStyle = (optionIndex) => {
    if (!showResult) {
      return {
        color: "#000000",
        borderColor: "#E6E6FA",
        backgroundColor: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#F5F5F5",
          borderColor: "#E6E6FA",
        },
      };
    }

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      return {
        backgroundColor: "#4CAF50 !important",
        borderColor: "#4CAF50 !important",
        color: "#FFFFFF !important",
        boxShadow: "0 4px 8px rgba(76, 175, 80, 0.3) !important",
        "&:hover": {
          backgroundColor: "#45a049 !important",
          boxShadow: "0 6px 12px rgba(76, 175, 80, 0.4) !important",
        },
      };
    }

    if (
      optionIndex === selectedAnswer &&
      optionIndex !== questions[currentQuestion].correctAnswer
    ) {
      return {
        backgroundColor: "#F44336 !important",
        borderColor: "#F44336 !important",
        color: "#FFFFFF !important",
        boxShadow: "0 4px 8px rgba(244, 67, 54, 0.3) !important",
        "&:hover": {
          backgroundColor: "#da190b !important",
          boxShadow: "0 6px 12px rgba(244, 67, 54, 0.4) !important",
        },
      };
    }

    return {
      color: "#000000",
      borderColor: "#E6E6FA",
      backgroundColor: "#FFFFFF",
    };
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              }}
            >
              <CardContent>
                <MDTypography variant="h4" color="#E6E6FA" mb={3}>
                  Physics Quiz
                </MDTypography>

                <MDTypography variant="h6" color="#E6E6FA" mb={2}>
                  Question {currentQuestion + 1} of {questions.length}
                </MDTypography>

                <MDTypography variant="h5" color="#E6E6FA" mb={4}>
                  {questions[currentQuestion].question}
                </MDTypography>

                <Grid container spacing={2}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <Grid item xs={12} key={index}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        sx={{
                          ...getOptionStyle(index),
                          padding: "12px 24px",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          textTransform: "none",
                          transition: "all 0.3s ease",
                          borderWidth: "2px",
                          "&.Mui-disabled": {
                            backgroundColor: "#FFFFFF !important",
                            color: "#000000 !important",
                            borderColor: "#E6E6FA !important",
                          },
                        }}
                      >
                        {option}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {showResult && (
                  <MDBox mt={3} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={handleNextQuestion}
                      sx={{
                        background: "linear-gradient(135deg, #4B79A1, #283E51)",
                        color: "#FFFFFF",
                        padding: "10px 20px",
                        fontSize: "1rem",
                        "&:hover": {
                          background: "linear-gradient(135deg, #5B89B1, #384E61)",
                        },
                      }}
                    >
                      {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                    </Button>
                  </MDBox>
                )}

                {currentQuestion === questions.length - 1 && showResult && (
                  <MDBox mt={3}>
                    <MDTypography variant="h5" color="#E6E6FA">
                      Quiz Complete! Your score: {score} out of {questions.length}
                    </MDTypography>
                  </MDBox>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PhysicsQuiz;
