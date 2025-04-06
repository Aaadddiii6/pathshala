# Pathshala - XR Learning Experience

**Team:** Team Hubble

## Vision

Pathshala aims to revolutionize education by providing immersive and accessible XR (Extended Reality) learning experiences for students from every section of society, bridging the gap between urban and rural, rich and poor. We believe in leveraging technology to make quality education universally available.

## Project Description

This repository contains the web application front-end for the Pathshala platform. It provides the user interface for students and potentially educators to interact with the learning modules and resources. Currently, it features an AI-powered study assistant to help students with their queries.

## Key Features (Current & Planned)

- **AI Study Assistant:** An integrated chatbot (powered by Gemini AI) to answer student questions across various subjects.
- **XR Module Integration:**Interface to launch and interact with XR learning modules.
- **User Authentication:** Secure login for students and educators.
- **Progress Tracking:** Features to monitor student learning progress.
- **Accessible UI:** Built with Material UI for a clean and responsive user experience.

## Technology Stack

- **Frontend Framework:** React.js
- **UI Library:** Material UI (Material Dashboard 2 React template)
- **AI Integration:** Gemini AI API
- **Language:** JavaScript
- **Package Manager:** npm

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (or yarn) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd pathshala
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```

    _(If you use yarn: `yarn install`)_

3.  **Environment Variables:**

    - This project requires an API key for Gemini AI. It's currently hardcoded in `src/layouts/chatbot/index.js`. For development, this might be acceptable, but for production or sharing, you **MUST** use environment variables. Create a `.env` file in the root directory and add your key:

    ```
    REACT_APP_GEMINI_API_KEY=your_gemini_ai_api_key_here
    ```

    - Update the code in `src/layouts/chatbot/index.js` to read the key from `process.env.REACT_APP_GEMINI_API_KEY` instead of the hardcoded constant.

4.  **Run the development server:**

    ```bash
    npm start
    ```

    _(If you use yarn: `yarn start`)_

    This will open the application in your default browser, usually at `http://localhost:3000`.

## License

_(Optional: Specify the license under which this project is distributed. E.g., MIT, Apache 2.0)_

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE.md file for details (if applicable).
