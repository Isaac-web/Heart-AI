import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from '@/pages/WelcomePage';
import { paths } from '@/utils/routes';
import { AppContextProvider } from '@/contexts/AppContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Patient from './pages/patient/Patient';

export default function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path={paths.HOME_PAGE} element={<WelcomePage />} />
          <Route path={paths.PATIENT} element={<Patient />} />
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.REGISTER} element={<Register />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}
