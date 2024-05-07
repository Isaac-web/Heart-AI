import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DoctorSignUpPage from './pages/DoctorSignUpPage';
import DoctorOnboardingPage from './pages/DoctorOnboardingPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/doctor/dashboard" element={<Dashboard />} />
        <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
        <Route path="/register/doctor" element={<DoctorSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default App;
