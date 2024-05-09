<<<<<<< HEAD
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
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import PatientDashboard from './pages/patient/PatientDashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DoctorOnboardingPage from './pages/DoctorOnboardingPage';
import PortalContainer from './components/PortalContainer';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AppointmentsPage from './pages/AppointmentsPage';
import MedicalReports from './pages/MedicalReports';
import DoctorPortal from './components/DoctorPortal';
import NewMedicalReportPage from './pages/NewMedicalReportPage';
>>>>>>> c19ad538fbd5d1563a96a88978bc79ce7d40df11

const App = () => {
  return (
    <main>
      <Routes>
<<<<<<< HEAD
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
=======
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
>>>>>>> c19ad538fbd5d1563a96a88978bc79ce7d40df11
        <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
        <Route path="/register/doctor" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalContainer />}>
          <Route path="/portal/doctor" element={<DoctorPortal />}>
            <Route
              path="/portal/doctor/overview"
              element={<DoctorDashboard />}
            />
            <Route
              path="/portal/doctor/appointments"
              element={<AppointmentsPage />}
            />
            <Route
              path="/portal/doctor/medical-reports"
              element={<MedicalReports />}
            />
            <Route
              path="/portal/doctor/medical-reports/new"
              element={<NewMedicalReportPage />}
            />
            <Route
              path="/portal/doctor"
              element={<Navigate to={'/portal/doctor/overview'} />}
            />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
