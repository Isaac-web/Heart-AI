import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import { paths } from '@/utils/routes';
import { AppContextProvider } from '@/contexts/AppContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Doctor from './pages/doctor/Doctor';
import MedicalReportForm from './pages/MedicalReportForm';
import Home from './pages/home/Home';
import { useEffect } from 'react';
import { getUserId } from './utils/auth';
import { getCurrentUser } from './api/auth';
import Header from './components/Header';
import Chatbot from './pages/chatbot/Chatbot';

const DoctorsPortal = () => {
  const navigate = useNavigate();

  const ensureUserIsDoctor = async () => {
    if (!getUserId()) navigate('/login');

    const user = await getCurrentUser();
    if (user.userType !== 'doctor') navigate('/login');
  };

  useEffect(() => {
    ensureUserIsDoctor();
  }, []);

  return <Outlet />;
};

export default function App() {
  return (
    <AppContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path={paths.HOME_PAGE} element={<Home />} />
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.REGISTER} element={<Register />} />
          <Route path={paths.CHAT_BOT} element={<Chatbot />} />

          <Route path={paths.DOCTOR} element={<DoctorsPortal />}>
            <Route path={paths.DOCTOR} element={<Doctor />} />
            <Route
              path={paths.MEDICAL_REPORT_FORM}
              element={<MedicalReportForm />}
            />
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  );
}
