import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Card, IconButton, Box, MenuItem } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function SubjectQuizCreator({ subject }) {
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    timeLimit: 30,
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ],
  });

  const handleQuizDataChange = (field) => (event) => {
    setQuizData({ ...quizData, [field]: event.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
          explanation: "",
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically save the quiz data to your backend
    console.log("Saving quiz:", { ...quizData, subject });
  };

  const getSubjectTitle = () => {
    return subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, " ");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Create {getSubjectTitle()} Quiz
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        required
                        fullWidth
                        label="Quiz Title"
                        value={quizData.title}
                        onChange={handleQuizDataChange("title")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        required
                        fullWidth
                        label="Time Limit (minutes)"
                        type="number"
                        value={quizData.timeLimit}
                        onChange={handleQuizDataChange("timeLimit")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MDInput
                        required
                        fullWidth
                        label="Quiz Description"
                        multiline
                        rows={2}
                        value={quizData.description}
                        onChange={handleQuizDataChange("description")}
                      />
                    </Grid>

                    {quizData.questions.map((question, questionIndex) => (
                      <Grid item xs={12} key={questionIndex}>
                        <Card>
                          <MDBox p={3}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <MDTypography variant="h6">
                                    Question {questionIndex + 1}
                                  </MDTypography>
                                  {quizData.questions.length > 1 && (
                                    <IconButton
                                      color="error"
                                      onClick={() => removeQuestion(questionIndex)}
                                    >
                                      <Icon>delete</Icon>
                                    </IconButton>
                                  )}
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <MDInput
                                  required
                                  fullWidth
                                  label="Question"
                                  multiline
                                  rows={2}
                                  value={question.question}
                                  onChange={(e) =>
                                    handleQuestionChange(questionIndex, "question", e.target.value)
                                  }
                                />
                              </Grid>
                              {question.options.map((option, optionIndex) => (
                                <Grid item xs={12} md={6} key={optionIndex}>
                                  <MDInput
                                    required
                                    fullWidth
                                    label={`Option ${optionIndex + 1}`}
                                    value={option}
                                    onChange={(e) =>
                                      handleOptionChange(questionIndex, optionIndex, e.target.value)
                                    }
                                  />
                                </Grid>
                              ))}
                              <Grid item xs={12} md={6}>
                                <MDInput
                                  select
                                  required
                                  fullWidth
                                  label="Correct Answer"
                                  value={question.correctAnswer}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      questionIndex,
                                      "correctAnswer",
                                      parseInt(e.target.value)
                                    )
                                  }
                                >
                                  {question.options.map((_, index) => (
                                    <MenuItem key={index} value={index}>
                                      Option {index + 1}
                                    </MenuItem>
                                  ))}
                                </MDInput>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <MDInput
                                  fullWidth
                                  label="Explanation (Optional)"
                                  value={question.explanation}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      questionIndex,
                                      "explanation",
                                      e.target.value
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                          </MDBox>
                        </Card>
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <MDButton
                        variant="outlined"
                        color="info"
                        fullWidth
                        onClick={addQuestion}
                        startIcon={<Icon>add</Icon>}
                      >
                        Add Question
                      </MDButton>
                    </Grid>

                    <Grid item xs={12}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        type="submit"
                        startIcon={<Icon>save</Icon>}
                      >
                        Save Quiz
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

// Add PropTypes validation
SubjectQuizCreator.propTypes = {
  subject: PropTypes.string.isRequired,
};

export default SubjectQuizCreator;
