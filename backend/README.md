# HeartAi BACKEND
# HeartAI

This project integrates expertise in data analysis, artificial intelligence (AI)/machine learning (ML), chatbot development, and full-stack development to construct a user-friendly system for predicting heart disease risk and facilitating communication between users and healthcare professionals.

## Features

- **Heart Disease Prediction**: Leveraging advanced data analysis and ML algorithms to forecast heart disease risk based on user input and medical records.
- **User Authentication**: Ensuring secure user authentication via bcrypt and JSON Web Tokens (JWT) for heightened security.
- **Real-time Communication**: Enabling users to engage in live chat sessions with healthcare professionals for inquiries, advice, and consultations.
- **Medical Report Management**: Empowering users to upload and manage their medical reports for precise prediction and communication.
- **Scalable and Extendable**: Constructed on Express.js and MongoDB, the system offers high scalability and ease of extension with additional features.

## Installation

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Navigate to the project directory: `cd heart-disease-system`
3. Install dependencies: `npm install`
4. Configure environment variables:
   - Create a `.env` file based on the `.env.example` template.
   - Fill in the required environment variables (e.g., MongoDB connection URI, JWT secret).
5. Launch the server: `npm start`

## Usage

1. Access the web interface by visiting `http://localhost:PORT` in your web browser.
2. Register an account or log in if you already have one.
3. Explore the heart disease prediction tools, upload medical reports, and engage in chat sessions with healthcare professionals.

## API Endpoints

- `/users`: Handles user management tasks such as registration, login, and profile management.
- `/chat-messages`: Manages endpoints for chat message interactions.
- `/medical-reports`: Facilitates management of medical reports.
- `/chat-sessions`: Manages chat session endpoints.
- `/predictions`: Handles heart disease prediction endpoints.

## Technologies Used

- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing user data, medical reports, and chat messages
- bcrypt: Library for secure password hashing
- Joi: Schema validation library for user input validation
- JSON Web Tokens (JWT): Secure authentication mechanism
- Other libraries and dependencies specified in `package.json`



