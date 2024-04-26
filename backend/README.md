# HEART DISEASE PREDICTION BACKEND

Welcome to the Heart Disease Prediction and Communication System! This project combines expertise in data analysis, AI/ML, LLM/Chatbot development, and full-stack development to create a user-friendly system aimed at predicting heart disease risk and facilitating communication between users and healthcare professionals.

## Overview

This system consists of a mobile application and a web interface, providing users with easy access to heart disease prediction tools and seamless communication with medical professionals.

## Features

- **Heart Disease Prediction**: Utilizes advanced data analysis and machine learning algorithms to predict the risk of heart disease based on user input and medical reports.
- **User Authentication**: Secure user authentication using bcrypt and JSON Web Tokens (JWT) for enhanced security.
- **Real-time Communication**: Allows users to engage in real-time chat sessions with healthcare professionals for inquiries, advice, and consultation.
- **Medical Report Management**: Enables users to upload and manage their medical reports for accurate prediction and communication.
- **Scalable and Extendable**: Built on top of Express.js and MongoDB, the system is highly scalable and easy to extend with additional features.

## Installation

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Navigate to the project directory: `cd heart-disease-system`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file based on the `.env.example` template
   - Populate the required environment variables (e.g., MongoDB connection URI, JWT secret)
5. Start the server: `npm start`

## Usage

1. Access the web interface by navigating to `http://localhost:PORT` in your web browser.
2. Register an account or log in if you already have one.
3. Explore the heart disease prediction tools, upload medical reports, and engage in chat sessions with healthcare professionals.

## API Endpoints

- `/users`: User management endpoints (registration, login, profile)
- `/chat-messages`: Endpoints for managing chat messages
- `/medical-reports`: Endpoints for managing medical reports
- `/chat-sessions`: Endpoints for managing chat sessions
- `/predictions`: Endpoints for heart disease prediction

## Technologies Used

- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing user data, medical reports, and chat messages
- bcrypt: Library for hashing passwords securely
- Joi: Schema validation library for validating user input
- JSON Web Tokens (JWT): Secure authentication mechanism
- Other libraries and dependencies as specified in `package.json`

## Contributing

We welcome contributions from the community! If you have any ideas for improvements or would like to report issues, please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the [MIT License](LICENSE).
