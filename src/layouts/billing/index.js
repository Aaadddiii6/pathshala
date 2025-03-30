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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useState, useRef, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Gemini AI
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with your API key
// Note: You should store this in an environment variable in production
const API_KEY = "AIzaSyDZqWj2MAe2k2EQAiLBl30ZPPjcsOMO7L0";
const genAI = new GoogleGenerativeAI(API_KEY, {
  apiVersion: "v1",
});

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
];

const quickActions = [
  { label: "Help with Homework", icon: "assignment" },
  { label: "Study Tips", icon: "school" },
  { label: "Practice Problems", icon: "calculate" },
  { label: "Concept Explanation", icon: "lightbulb" },
  { label: "Exam Preparation", icon: "quiz" },
  { label: "Project Ideas", icon: "science" },
];

function Billing() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        type: "ai",
        content:
          "Hello! I'm your AI Study Assistant. How can I help you today? Select a subject or use one of the quick actions to get started.",
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    const context = selectedSubject ? `Context: Helping with ${selectedSubject}. ` : "";
    const fullPrompt = `${context}${userMessage}`;

    // Add user message to chat
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setMessage("");
    setIsLoading(true);
    setError(null);

    try {
      // Get response from Gemini
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      });
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("Empty response from AI");
      }

      // Add AI response to chat
      setMessages((prev) => [...prev, { type: "ai", content: text }]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      let errorMessage = "I apologize, but I'm having trouble processing your request.";

      if (error.message && error.message.includes("API key")) {
        errorMessage = "API key error: Please check your Gemini API key configuration.";
      } else if (error.message && error.message.includes("quota")) {
        errorMessage =
          "API quota exceeded: The daily limit for AI requests has been reached. Please try again later.";
      }

      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    const subjectContext = selectedSubject ? ` for ${selectedSubject}` : "";
    const prompt = `${action.label}${subjectContext}`;
    setMessage(prompt);
    // Use setTimeout to ensure the state updates before sending
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject === selectedSubject ? null : subject);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ height: "calc(100vh - 200px)" }}>
              <MDBox
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Chat Header */}
                <MDBox
                  p={2}
                  borderBottom="1px solid"
                  borderColor="divider"
                  sx={{
                    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                  }}
                >
                  <MDTypography variant="h6" fontWeight="medium">
                    AI Study Assistant
                  </MDTypography>
                  {error && (
                    <MDTypography variant="caption" color="error" fontWeight="regular">
                      {error}
                    </MDTypography>
                  )}
                </MDBox>

                {/* Subject Selection */}
                <MDBox
                  p={2}
                  borderBottom="1px solid"
                  borderColor="divider"
                  sx={{
                    background: "linear-gradient(45deg, #f3f4f6 30%, #e5e7eb 90%)",
                    maxHeight: { xs: "120px", sm: "auto" },
                    overflowY: "auto",
                  }}
                >
                  <MDTypography variant="body2" color="text" mb={1} fontWeight="medium">
                    Select Subject:
                  </MDTypography>
                  <MDBox display="flex" gap={1} flexWrap="wrap">
                    {subjects.map((subject) => (
                      <Chip
                        key={subject}
                        label={subject}
                        color={selectedSubject === subject ? "primary" : "default"}
                        onClick={() => handleSubjectSelect(subject)}
                        sx={{
                          m: 0.5,
                          "&:hover": {
                            backgroundColor: "primary.light",
                            color: "white",
                          },
                        }}
                      />
                    ))}
                  </MDBox>
                </MDBox>

                {/* Quick Actions */}
                <MDBox
                  p={2}
                  borderBottom="1px solid"
                  borderColor="divider"
                  sx={{
                    background: "linear-gradient(45deg, #f8fafc 30%, #f1f5f9 90%)",
                    maxHeight: { xs: "120px", sm: "auto" },
                    overflowY: "auto",
                  }}
                >
                  <MDTypography variant="body2" color="text" mb={1} fontWeight="medium">
                    Quick Actions:
                  </MDTypography>
                  <MDBox display="flex" gap={1} flexWrap="wrap">
                    {quickActions.map((action) => (
                      <MDButton
                        key={action.label}
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => handleQuickAction(action)}
                        startIcon={<Icon>{action.icon}</Icon>}
                        sx={{
                          m: 0.5,
                          background: "linear-gradient(45deg, #4f46e5 30%, #818cf8 90%)",
                          "&:hover": {
                            background: "linear-gradient(45deg, #4338ca 30%, #6366f1 90%)",
                          },
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          padding: { xs: "4px 8px", sm: "6px 12px" },
                        }}
                      >
                        {action.label}
                      </MDButton>
                    ))}
                  </MDBox>
                </MDBox>

                {/* Messages Area */}
                <MDBox
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {messages.map((msg, index) => (
                    <MDBox
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      <MDBox
                        sx={{
                          maxWidth: "80%",
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: msg.type === "user" ? "primary.main" : "grey.100",
                          color: msg.type === "user" ? "white" : "text.primary",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        <MDTypography variant="body2">{msg.content}</MDTypography>
                      </MDBox>
                    </MDBox>
                  ))}
                  {isLoading && (
                    <MDBox
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <MDBox
                        sx={{
                          maxWidth: "80%",
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: "grey.100",
                        }}
                      >
                        <MDTypography variant="body2">Thinking...</MDTypography>
                      </MDBox>
                    </MDBox>
                  )}
                  <div ref={messagesEndRef} />
                </MDBox>

                {/* Input Area */}
                <MDBox
                  p={2}
                  borderTop="1px solid"
                  borderColor="divider"
                  sx={{
                    background: "white",
                  }}
                >
                  <MDBox display="flex" gap={1}>
                    <MDInput
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        selectedSubject ? `Ask about ${selectedSubject}...` : "Type your message..."
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                      multiline
                      maxRows={3}
                    />
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isLoading}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        height: "fit-content",
                        alignSelf: "flex-end",
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
