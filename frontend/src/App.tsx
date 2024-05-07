import { Routes, Route } from 'react-router-dom';
import PatientDashboard from './pages/patient/PatientDashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DoctorOnboardingPage from './pages/DoctorOnboardingPage';
import Dashboard from './pages/Dashboard';
import PortalContainer from './components/PortalContainer';
import DoctorDashboard from './pages/doctor/DoctorDashboard';

const App = () => {
  return (
    <main>
      <Routes>
        {/* <Route
          path="/doctor/onboarding"
          element={<DoctorOnboardPerfonalInforPage />}
        /> */}
        {/* <Route path="/register/doctor" element={<DoctorSignUpPage />} /> */}
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<Dashboard />} />
        <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
        <Route path="/register/doctor" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<PortalContainer />}>
          <Route path="/portal/doctor" element={<DoctorDashboard />} />
          <Route path="/portal/patient" element={<>Patient</>} />
          <Route path="/portal/admin" element={<>Admin</>} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
