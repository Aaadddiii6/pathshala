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
    question: "What is the past tense of 'go'?",
    options: ["went", "gone", "going", "goed"],
    correctAnswer: 0,
  },
  {
    question: "Which of these is a proper noun?",
    options: ["London", "city", "country", "continent"],
    correctAnswer: 0,
  },
  {
    question: "What is the plural form of 'child'?",
    options: ["children", "childs", "childes", "child"],
    correctAnswer: 0,
  },
  {
    question: "Which word is an antonym of 'happy'?",
    options: ["sad", "glad", "mad", "bad"],
    correctAnswer: 0,
  },
  {
    question: "What is the correct form of the verb in: 'She ___ to school every day.'",
    options: ["goes", "go", "going", "went"],
    correctAnswer: 0,
  },
  {
    question: "Which of these is a preposition?",
    options: ["in", "run", "happy", "book"],
    correctAnswer: 0,
  },
  {
    question: "What is the comparative form of 'good'?",
    options: ["better", "gooder", "more good", "best"],
    correctAnswer: 0,
  },
  {
    question: "Which sentence is in the present perfect tense?",
    options: [
      "I have finished my homework",
      "I finish my homework",
      "I finished my homework",
      "I am finishing my homework",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the opposite of 'begin'?",
    options: ["end", "start", "middle", "continue"],
    correctAnswer: 0,
  },
  {
    question: "Which word is a synonym of 'beautiful'?",
    options: ["pretty", "ugly", "plain", "simple"],
    correctAnswer: 0,
  },
];

function EnglishQuiz() {
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
                  English Quiz
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

export default EnglishQuiz;
