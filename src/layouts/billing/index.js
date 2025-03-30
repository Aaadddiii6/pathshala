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
import MenuItem from "@mui/material/MenuItem";

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
      <MDBox
        sx={{
          position: "relative",
          backgroundColor: "white",
          minHeight: "100vh",
          padding: { xs: "0", sm: "20px" },
        }}
      >
        <MDBox
          sx={{
            backgroundColor: "#f8f9fa",
            borderRadius: { xs: "0", sm: "15px" },
            padding: { xs: "10px", sm: "20px" },
            marginBottom: { xs: "0", sm: "20px" },
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            height: { xs: "100vh", sm: "auto" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MDBox sx={{ display: { xs: "none", sm: "block" } }}>
            <MDTypography
              variant="h4"
              color="dark"
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              AI Learning Assistant
            </MDTypography>
            <MDTypography
              variant="body1"
              color="text"
              sx={{ mb: 3, fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              Get instant help with your studies
            </MDTypography>
          </MDBox>

          <MDBox
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              flexWrap: "wrap",
              alignItems: "center",
              mb: { xs: 1, sm: 3 },
              px: { xs: 1, sm: 0 },
            }}
          >
            <MDInput
              select
              label="Subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              sx={{
                display: { xs: "none", sm: "block" },
                minWidth: "150px",
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: "dark",
                },
                "& .MuiInputLabel-root": {
                  color: "dark",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.3)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              <MenuItem value="">All Subjects</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Chemistry">Chemistry</MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
            </MDInput>
          </MDBox>

          <MDBox
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 2,
              px: { xs: 1, sm: 0 },
            }}
          >
            {messages.map((message, index) => (
              <MDBox
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: message.type === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <MDBox
                  sx={{
                    maxWidth: "80%",
                    backgroundColor: message.type === "user" ? "#E8F5E9" : "#E3F2FD",
                    color: message.type === "user" ? "#2E7D32" : "#1976D2",
                    padding: "10px 15px",
                    borderRadius: "15px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    position: "relative",
                  }}
                >
                  <MDTypography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {message.content}
                  </MDTypography>
                  {message.type === "user" && (
                    <MDBox
                      sx={{
                        position: "absolute",
                        right: "-8px",
                        bottom: "-8px",
                        backgroundColor: "#E8F5E9",
                        borderRadius: "50%",
                        width: "16px",
                        height: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ fontSize: "12px", color: "#2E7D32" }}>person</Icon>
                    </MDBox>
                  )}
                </MDBox>
              </MDBox>
            ))}
          </MDBox>

          <MDBox
            sx={{
              display: "flex",
              gap: 1,
              px: { xs: 1, sm: 0 },
            }}
          >
            <MDInput
              type="text"
              placeholder="Ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: "dark",
                },
                "& .MuiInputLabel-root": {
                  color: "dark",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.3)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.4)",
                },
              }}
            />
            <MDButton
              variant="gradient"
              color="info"
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              sx={{
                borderRadius: "8px",
                minWidth: "auto",
                px: 2,
                py: 1,
              }}
            >
              <Icon>send</Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
