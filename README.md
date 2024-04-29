# HeartAI: Heart Disease Prediction App 

Welcome to the HeartAI Documentation, your comprehensive guide to understanding and utilizing our predictive healthcare system. This document provides a comprehensive overview of the HeartAI system, including its frontend interface, backend architecture, AI model integration, and mobile application.

## Purpose

The HeartAI system is designed to inform users of their heart health, effectively encouraging them to take proper care of their hearts. By leveraging artificial intelligence (AI) models, users are sensitised on their risk of heart disease and also, receive personalized insights and guidance. In addition, the system facilitates seamless communication between users and the chatbot interface.

# App Components

## HeartAi Frontend
The HeartAI Frontend is a user-friendly web application interface that allows users to interact with the HeartAI system. Below is an overview of its features, components, and technologies used. The doctor and the patients are the users in this case.

### Features
- **Certified Doctor Reports**: Medical reports are generated directly through the application, providing additional insights and recommendations from healthcare professionals.
- **Chatbot Integration**: Users can interact with an AI chatbot to receive personalized insights and guidance based on predictions from their health data.
- **Detailed Reports**: Users can view detailed reports generated from their health data, providing comprehensive information about their heart health status and potential risk factors.

## HeartAi Backend
The HeartAI Backend serves as the core infrastructure of the HeartAI system, handling data analysis, machine learning, user authentication, and communication between users and healthcare professionals..

### Features
- **Heart Disease Prediction**: Predicts heart disease risk based on user input and medical records using advanced ML algorithms.
- **User Authentication**: Ensures secure user authentication via bcrypt and JSON Web Tokens (JWT).
- **Medical Report Management**: Allows users to upload and manage medical reports for precise prediction and communication.
- **Scalability**: Built on Express.js and MongoDB for high scalability and ease of extension.

### API Endpoints
- `/users`: Handles user management tasks.
- `/chat-messages` : Manages chat message interactions.
- `/medical-reports `: Facilitates management of medical reports.
- `/chat-sessions` : Manages chat session endpoints.
- `/predictions` : Handles heart disease prediction endpoints.

### Technologies Used
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing user data, medical reports, and chat messages
- bcrypt: Password hashing library for secure user authentication.
- Joi: Data validation library for API input validation.
- JSON Web Tokens (JWT): Authentication mechanism for API requests.
- Other libraries and dependencies specified in `package.json`

### Installation
- Clone the repository: [https://github.com/dzeble/Heart-Disease-Prediction-Group-2.git](https://github.com/dzeble/Heart-Disease-Prediction-Group-2.git)
- Navigate to the project directory: `cd heart-disease-system`.
- Install dependencies: `npm install`.
- Configure environment variables in a `.env` file.
- Launch the server: `npm run dev`


# Web app
 A web app for Doctors to send reports and prediction results to patients.

### Compomemts
-  **Header**: Displays the HeartAI logo and a "Login" button for access.
- **Hero Section** : Welcomes users to the application and provides an overview of its purpose.
- **Authentication Page** : Allows doctors to sign in after verification.
- **Features Section**: Showcases key features of the HeartAI application.
- **Footer**: Displays the HeartAI logo and a "Get Started" button for quick access to the signup process.

### Technologies used
- **React.js**: JavaScript library for building user interfaces.
- **React Router**: Library for routing in React applications.
- **Material UI**: React component library implementing Google's Material Design.
- **Tailwind CSS**: Utility-first CSS framework for rapidly building custom designs.

### Getting Started
To set up and run the HeartAI Frontend on your local machine:
- Clone the repository or download the project files from [https://github.com/dzeble/Heart-Disease-Prediction-Group-2.git](https://github.com/dzeble/Heart-Disease-Prediction-Group-2.git) .
- Install dependencies using `npm install` or `yarn install`.
- Start the development server with `npm run dev` or `yarn dev`.
- Access the application in your web browser at [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

## UI snippets




# HeartAi Mobile Application
The HeartAI Mobile Application allows users to have access to heart disease predictions,  and heart health management  information through interactions with the system bot.

## Features
- **Mobile Chatbot**: ntegration of the AI chatbot into a mobile-friendly interface for seamless interaction.
- **Dashboard**: Visual representation of user health data and heart disease risk predictions.
- **Notification System**: Reminders for medication, appointments, and health check-ups to promote proactive health management.
- **Secure Access**: Biometric authentication and encrypted data transmission ensure secure access to sensitive health information.

### Technologies used
- **React Native**: JavaScript framework for building native mobile applications.
- **Expo**: Development platform for building React Native applications.
- **Firebase**: Backend services for mobile and web applications, including authentication and real-time database.
- **Redux**: State management library for JavaScript applications.
- **Axios**: Promise-based HTTP client for making requests from the mobile app to the server.

### Getting Started
Run the following commands from your terminal:
1. https://github.com/dzeble/Heart-Disease-Prediction-Group-2.git to clone this repo
2. 'flutter pub get' in the project root directory to install all the required dependencies.
3. From your terminal, run `flutter run`.
`
 ### Testing
  - Compatible with iOS and Android devices.
  - Testing performed on various screen sizes and resolutions to ensure responsiveness.

 ## Ui Snippets
<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/4dcf47fb-8b27-45db-954b-2fb3b1ff9a1b" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/04fc01e4-40ec-4d99-b8ae-45c6e10d5727" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/2bd5a1e9-1fd5-4f1c-9e3d-113fb99adaf4" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/46f69f06-ea1f-4458-adbf-b08290d17a43" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/c3dbeb1e-b604-4f33-93a3-1a0547ebf00c" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/39b76901-558e-4728-8646-2c23f7912c61" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/06fb1b4b-eff4-4f18-9e28-63da8609f75d" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/37e68684-458e-43ac-be86-5088441221b7" width="100" heigth="200">
    
## Conclusion
HeartAI represents a paradigm shift in predictive healthcare, empowering individuals to take control of their heart health through data-driven insights and expert guidance. With its user-friendly interface, robust architecture, and emphasis on privacy and security, HeartAI is poised to revolutionize the way we approach preventive healthcare in the digital age.

# Contributors
Samuel Berchie Opoku, Sven Dzeble, Moro Njie, Emeralda Kusi Yeboah, Faddal Ibrahim, Isaac kanyiti Takyi, Jeffrey Ofori Kwakye, Manu Adam Onyina, Isaac Asiamah, Abdul Razak Abubakari.

# Additional Information
You can have a different view of our app through our text documenation
[https://reallygreattech.atlassian.net/l/ce/zLU7a72u](https://reallygreattech.atlassian.net/l/ce/zLU7a72u)
Or  look up our presentation for a graphic view of the project 
[https://docs.google.com/presentation/d/1kKyBZ7KIlsZSamtCHpwalDawTKrAagyB_vK7t5eTMzA/edit?pli=1#slide=id.g106ddb05087_0_625](https://docs.google.com/presentation/d/1kKyBZ7KIlsZSamtCHpwalDawTKrAagyB_vK7t5eTMzA/edit?pli=1#slide=id.g106ddb05087_0_625)
