import Chatbot from './pages/patient/Chatbot';
import Reports from './pages/patient/Reports';

import PatientDashboard from './pages/patient/PatientDashboard';

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DoctorOnboardingPage from './pages/DoctorOnboardingPage';
import PortalContainer from './components/PortalContainer';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AppointmentsPage from './pages/AppointmentsPage';
import MedicalReports from './pages/MedicalReports';
import DoctorPortal from './components/DoctorPortal';
import NewMedicalReportPage from './pages/NewMedicalReportPage';
import PatientOnboardingPage from './pages/PatientOnboardingPage';
import MedicalReportDetails from './pages/MedicalReportDetails';
import LandingPage from './pages/LandingPage';
import Auth from './pages/auth/AuthPage';
import PatientsPage from './pages/PatientsPage';

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
        <Route index element={<LandingPage />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/dashboard/patient" element={<PatientDashboard />}>
          <Route path="chatbot/:sessionId" element={<Chatbot />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="reports" element={<Reports />} />
          <Route
            path="/dashboard/patient"
            element={<Navigate to="/dashboard/patient/chatbot" />}
          />
        </Route>

        {/* <Route path="/doctor/dashboard" element={<DoctorDashboard />} /> */}
        <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
        <Route path="/onboarding/doctor" element={<DoctorOnboardingPage />} />
        <Route path="/onboarding/patient" element={<PatientOnboardingPage />} />
        <Route path="/register/doctor" element={<SignUpPage />} />
        <Route path="/register/patient" element={<SignUpPage />} />
        <Route path="/login/doctor" element={<LoginPage />} />
        <Route path="/login/patient" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalContainer />}>
          <Route path="/portal/patient" element={<PatientDashboard />}>
            <Route
              path="/portal/patient/medical-reports/:id"
              element={<>Report Details</>}
            />
            <Route path="chatbot/:sessionId" element={<Chatbot />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="reports" element={<Reports />} />
            <Route
              path="/portal/patient"
              element={<Navigate to="/portal/patient/chatbot" />}
            />
          </Route>

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
              path="/portal/doctor/medical-reports/:id"
              element={<MedicalReportDetails />}
            />
            <Route
              path="/portal/doctor/medical-reports"
              element={<MedicalReports />}
            />
            <Route path="/portal/doctor/patients" element={<PatientsPage />} />
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
