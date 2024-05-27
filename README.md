<<<<<<< HEAD
# Heart-Disease-Prediction-Group-2
A Chat Bot to Converse with Concerning Heart Disease Conditions
=======
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

 ### Web app Components:
 - **Doctor's Portal**:
    Allows users to register or sign in to view pending report requests in the form of booked appointments.  The doctor gets to see all patients, all generated reports and the healthy and unhealthy patients .Doctors are able to issue reportrequests by selecting  patient and typing in patient heart details to generate a report.

- **Patient's Portal**
  Patient signs up or signs in to be able to book for appointments from available doctors in system, view generated reports and also chat with bot concerning report.

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
- **Fluttere**: Dart framework for building native mobile applications.
- **animate_do**
- **chatview**
- **awesome_dialog**
- **dio**: Promise-based HTTP client for making requests from the mobile app to the server.
- **widget_loading**
- **shared_preferences**
- **adaptive_theme**
- **rive**

### Getting Started
Run the following commands from your terminal:
1. `git clone` https://github.com/dzeble/Heart-Disease-Prediction-Group-2.git to clone this repo
2. `flutter pub get` in the project root directory to install all the required dependencies.
3. From your terminal, run `flutter run`.

 ### Testing
  - Compatible with iOS and Android devices.
  - Testing performed on various screen sizes and resolutions to ensure responsiveness.

 ## Ui Snippets
<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/28adc4c0-d338-4c5d-a936-5973b4c7b830" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/45445a29-6323-4c76-87fb-5700334a597d" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/ce2898dd-c7d6-418a-b625-9e6fae21dbe6" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/b22c7959-4221-40f3-9850-2182693c9e8f" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/0b56bb2e-5600-4b4e-bfff-9370d483ac09" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/b1ab5888-389e-48b1-af7a-9b1ecb68217c" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/72f39db4-f218-4bbb-b907-31aaf76ee3cd" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/c2963f9b-831e-4b14-ab60-7c310ce168fd" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/a1f017e3-f868-42c4-8163-61ba447deb6b" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/ff9a1b0e-161f-471b-b77e-f8c006255b2b" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/fed6249b-1c7e-4603-8502-f740f34cb1d0" width="100" heigth="200">

<img src="https://github.com/dzeble/Heart-Disease-Prediction-Group-2/assets/83512618/8884cc2d-1b39-4c4f-8660-243174f71c5e" width="100" heigth="200">
    
## Conclusion
HeartAI represents a paradigm shift in predictive healthcare, empowering individuals to take control of their heart health through data-driven insights and expert guidance. With its user-friendly interface, robust architecture, and emphasis on privacy and security, HeartAI is poised to revolutionize the way we approach preventive healthcare in the digital age.

# Contributors
Samuel Berchie Opoku, Sven Dzeble, Moro Njie, Emeralda Kusi Yeboah, Faddal Ibrahim, Isaac kanyiti Takyi, Jeffrey Ofori Kwakye, Manu Adam Onyina, Isaac Asiamah, Abdul Razak Abubakari.

# Additional Information
You can have a different view of our app through our text documenation
[https://reallygreattech.atlassian.net/l/ce/zLU7a72u](https://reallygreattech.atlassian.net/l/ce/zLU7a72u)
Or  look up our presentation for a graphic view of the project 
[https://docs.google.com/presentation/d/1kKyBZ7KIlsZSamtCHpwalDawTKrAagyB_vK7t5eTMzA/edit?pli=1#slide=id.g106ddb05087_0_625](https://docs.google.com/presentation/d/1kKyBZ7KIlsZSamtCHpwalDawTKrAagyB_vK7t5eTMzA/edit?pli=1#slide=id.g106ddb05087_0_625)
>>>>>>> 5c9bb552ce5283780d11946f4122c902532af6f2
