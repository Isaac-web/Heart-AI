import { Routes, Route } from "react-router-dom";
// import DoctorSignUpPage from "./pages/DoctorSignUpPage";
// import DoctorOnboardPerfonalInforPage from "./pages/DoctorOnboardPerfonalInforPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DoctorOnboardingPage from "./pages/DoctorOnboardingPage";
import Dashboard from "./pages/Dashboard";
import PortalContainer from "./components/PortalContainer";
import Chatbot from "./pages/patient/Chatbot";
import Reports from "./pages/patient/Reports";

const App = () => {
  return (
    <main>
      <Routes>
        {/* <Route
          path="/doctor/onboarding"
          element={<DoctorOnboardPerfonalInforPage />}
        /> */}
        {/* <Route path="/register/doctor" element={<DoctorSignUpPage />} /> */}
        {/* <Route path="/dashboard/patient" element={<PatientDashboard />} /> */}

        <Route path="/dashboard/patient" element={<PatientDashboard />}>
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route path="/doctor/dashboard" element={<Dashboard />} />
        <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
        <Route path="/register/doctor" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalContainer />} />
      </Routes>
    </main>
  );
};

export default App;
