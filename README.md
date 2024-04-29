# HeartAI: Heart Disease Prediction App 

Welcome to the HeartAI Documentation, your comprehensive guide to understanding and utilizing our predictive healthcare system. From heart disease prediction to real-time communication with healthcare professionals, this documentation covers every aspect of the system's features, installation, and usage.

## Introduction

HeartAI is a revolutionary healthcare system designed to empower individuals to proactively manage their heart health. Leveraging cutting-edge technologies such as artificial intelligence (AI) and machine learning (ML), HeartAI provides accurate predictions of heart disease risk while facilitating seamless communication between users and healthcare professionals.

## Features

### Heart Disease Prediction
- Utilizes advanced ML algorithms to forecast heart disease risk based on user input and medical records.
- Provides detailed reports outlining potential risk factors and actionable insights for improving heart health.

### Real-time Communication
- Enables users to engage in live chat sessions with certified healthcare professionals for inquiries, advice, and consultations.
- Facilitates secure and confidential communication to address user concerns and provide personalized guidance.

### Medical Report Management
- Empowers users to upload, store, and manage their medical reports within the system for precise prediction and communication.
- Ensures data privacy and compliance with healthcare regulations through robust security measures.

### Data and Chatbot Integration
- HeartAI integrates a vast repository of anonymized medical data to enhance the accuracy of its predictive models.
- The chatbot interface utilizes natural language processing (NLP) and AI to provide responsive and contextually relevant interactions with users.

### Scalable and Extendable
- Built on modern web technologies such as Express.js and MongoDB, offering high scalability and ease of extension with additional features.
- Adheres to best practices in software development to deliver a robust and reliable healthcare solution for users worldwide.

## Mobile app
- A mobile app for patients to request for prediction results and ask follow up questions.

### Prerequisites
- Node.js and npm installed on your system
- MongoDB database instance for storing user data and medical records

### Steps
1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Navigate to the project directory: `cd heart-ai`
3. Install dependencies: `npm install`
4. Configure environment variables:
   - Create a `.env` file based on the `.env.example` template.
   - Specify the required environment variables (e.g., MongoDB connection URI, JWT secret).
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

## Conclusion

HeartAI represents a paradigm shift in predictive healthcare, empowering individuals to take control of their heart health through data-driven insights and expert guidance. With its user-friendly interface, robust architecture, and emphasis on privacy and security, HeartAI is poised to revolutionize the way we approach preventive healthcare in the digital age.

# Contributors
Samuel Berchie Opoku, Sven Dzeble, Moro Njie, Emeralda Kusi Yeboah, Faddal Ibrahim, Isaac kanyiti Takyi, Jeffrey Ofori Kwakye, Manu Adam Onyina, Isaac Asiamah, Abdul Razak Abubakari.
