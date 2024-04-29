import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { paths } from '@/utils/routes';
import { AppContextProvider } from '@/contexts/AppContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Doctor from './pages/doctor/Doctor';
import MedicalReportForm from './pages/MedicalReportForm';

export default function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.REGISTER} element={<Register />} />
          <Route
            path={paths.MEDICAL_REPORT_FORM}
            element={<MedicalReportForm />}
          />
          <Route path={paths.DOCTOR} element={<Doctor />} />

          {/* <Route path={paths.PATIENT} element={<Patient />} /> */}
          {/* <Route path={paths.HOME_PAGE} element={<WelcomePage />} /> */}
        </Routes>
      </Router>
    </AppContextProvider>
  );
}
