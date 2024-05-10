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

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/onboarding/doctor" element={<DoctorOnboardingPage />} />
        <Route path="/register/doctor" element={<SignUpPage />} />
        <Route path="/login/doctor" element={<LoginPage />} />
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
