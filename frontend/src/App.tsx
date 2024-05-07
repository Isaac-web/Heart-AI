import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DoctorOnboardingPage from './pages/DoctorOnboardingPage';
import Dashboard from './pages/Dashboard';
import PortalContainer from './components/PortalContainer';

const App = () => {
  return (
    <main>
      <Routes>
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
