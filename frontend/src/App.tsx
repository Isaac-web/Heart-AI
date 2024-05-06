import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DoctorSignUpPage from './pages/DoctorSignUpPage';
import DoctorOnboardingPage from './pages/DoctorOnboardingPage';

const App = () => {
  return (
    <main>
      {/* <nav>Logo</nav> */}
      <Routes>
        <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
        <Route path="/register/doctor" element={<DoctorSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default App;
