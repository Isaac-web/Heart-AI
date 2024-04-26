// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
// import PageNotFound from "@/pages/errors/not_found/NotFound";
import Protected from "@/pages/protected/Protected";

// utils
import {
  HOME_PAGE,
  LOGIN,
  REGISTER,
  ADMIN,
  // PAGE_NOT_FOUND,
  PATIENT,
  CHAT_BOT,
} from "@/utils/routes";

// contexts
import { AppContextProvider } from "@/contexts/AppContext";
import Patient from "@/pages/patient/Patient";
import Doctor from "@/pages/doctor/Doctor";
import Chatbot from "@/pages/chatbot/Chatbot";

export default function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path={HOME_PAGE} element={<Home />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route element={<Protected allowedRoles={["patient"]} />}>
            <Route path={PATIENT} element={<Patient />} />
            <Route path={CHAT_BOT} element={<Chatbot />} />
          </Route>
          <Route element={<Protected allowedRoles={["doctor"]} />}>
            <Route path={ADMIN} element={<Doctor />} />
          </Route>
          {/* <Route path={PAGE_NOT_FOUND} element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </AppContextProvider>
  );
}
