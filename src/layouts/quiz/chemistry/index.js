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
    question: "What is the atomic number of Carbon?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 0,
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    correctAnswer: 0,
  },
  {
    question: "What is the formula for water?",
    options: ["H₂O", "CO₂", "O₂", "N₂"],
    correctAnswer: 0,
  },
  {
    question: "What is the pH of a neutral solution?",
    options: ["7", "0", "14", "1"],
    correctAnswer: 0,
  },
  {
    question: "What is the most abundant element in the universe?",
    options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
    correctAnswer: 0,
  },
  {
    question: "What is the process of a liquid turning into a gas?",
    options: ["Evaporation", "Condensation", "Sublimation", "Deposition"],
    correctAnswer: 0,
  },
  {
    question: "What is the atomic mass unit of Carbon-12?",
    options: ["12", "6", "24", "3"],
    correctAnswer: 0,
  },
  {
    question: "What is the name of the process where plants convert CO₂ to glucose?",
    options: ["Photosynthesis", "Respiration", "Fermentation", "Digestion"],
    correctAnswer: 0,
  },
  {
    question: "What is the charge of an electron?",
    options: ["-1", "+1", "0", "-2"],
    correctAnswer: 0,
  },
  {
    question: "What is the name of the bond formed by sharing of electrons?",
    options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
    correctAnswer: 0,
  },
];

function ChemistryQuiz() {
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
                  Chemistry Quiz
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

export default ChemistryQuiz;
