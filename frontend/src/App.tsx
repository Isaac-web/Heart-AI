import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DoctorSignUpPage from "./pages/DoctorSignUpPage";
import DoctorOnboardPerfonalInforPage from "./pages/DoctorOnboardPerfonalInforPage";
import PatientDashboard from "./pages/patient/PatientDashboard";

const App = () => {
  return (
    <main>
      {/* <nav>Logo</nav> */}
      <Routes>
        <Route
          path="/doctor/onboarding"
          element={<DoctorOnboardPerfonalInforPage />}
        />
        <Route path="/register/doctor" element={<DoctorSignUpPage />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default App;
