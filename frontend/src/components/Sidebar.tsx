import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard,
  DocumentScannerTwoTone,
  Event,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  PeopleOutline,
  PersonOutline,
  QuestionAnswer,
  ReceiptLong,
} from '@mui/icons-material';
import { useAppStore } from '@/store';
// import appLogo from '../assets/images/heart-ai-logo.png';
import { useEffect } from 'react';
import appLogo from '../assets/images/logo-white.png';

const doctorMenu = [
  {
    label: 'Overview',
    link: '/portal/doctor',
    icon: <Dashboard />,
  },
  {
    label: 'Appointments',
    link: '/portal/doctor/appointments',
    icon: <Event />,
  },
  {
    label: 'Medical Reports',
    link: '/portal/doctor/medical-reports',
    icon: <DocumentScannerTwoTone />,
  },
  {
    label: 'All Patients',
    link: '/portal/doctor/patients',
    icon: <PeopleOutline />,
  },
];

const patientMenu = [
  {
    label: 'Medical Reports',
    link: '/portal/patient/reports',
    icon: <ReceiptLong />,
  },
  {
    label: 'Chatbot',
    link: '/portal/patient/chatbot',
    icon: <QuestionAnswer />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const store = useAppStore();

  const getUserType = (): string => {
    if (location.pathname.startsWith('/portal/doctor')) return 'doctor';

    return 'patient';
  };

  const menu = getUserType() === 'patient' ? patientMenu : doctorMenu;

  const handleToggleSidebar = () => {
    if (store.app.drawerCollapsed) {
      store.app.expandDrawer();
    } else {
      store.app.collapseDrawer();
    }
  };

  const userLoading = () => {
    if (getUserType() === 'patient') return store.auth.user.loading;
    return store.auth.doctor.loading;
  };

  const getCurrentUser = () => {
    const currentUser = {
      _id: '',
      name: '',
      email: '',
    };

    if (getUserType() === 'patient') {
      currentUser._id = store.auth.user.data._id;
      currentUser.name = store.auth.user.data.name;
      currentUser.email = store.auth.user.data.email;
    } else {
      currentUser._id = store.auth.doctor.data._id;
      currentUser.name = store.auth.doctor.data.name;
      currentUser.email = store.auth.doctor.data.email;
    }

    return currentUser;
  };

  useEffect(() => {
    if (getUserType() === 'patient') {
      store.auth.user.getCurrentUser();
    } else if (getUserType() === 'doctor') {
      store.auth.doctor.getCurrentDoctor();
    }
  }, []);

  return (
    <aside
      style={{ width: store.app.drawerWidth }}
      className={`h-screen py-5 dark:bg-black/50 fixed overflow-hidden border-r border-base-200 flex flex-col justify-between`}
    >
      <div>
        <div className="px-3 flex items-center gap-3">
          <div className="min-w-12 min-h-12 p-2 max-w-12 max-h-12 rounded-md bg-black/40">
            <img src={appLogo} />
          </div>
          {/* {!store.app.drawerCollapsed && (
            <span className="font-bold">Heart AI</span>
          )} */}
        </div>

        <div
          className={`mt-5 flex justify-${
            store.app.drawerCollapsed ? 'center' : 'end mr-2'
          }`}
        >
          <button
            className="btn btn-sm rounded-full"
            onClick={handleToggleSidebar}
          >
            {store.app.drawerCollapsed ? (
              <KeyboardDoubleArrowRight style={{ fontSize: '1em' }} />
            ) : (
              <KeyboardDoubleArrowLeft style={{ fontSize: '1em' }} />
            )}
          </button>
        </div>

        <div className="px-2">
          <div className="divider" />
        </div>

        <div>
          <ul className="menu  rounded-box">
            {menu.map((m) =>
              !store.app.drawerCollapsed ? (
                <li>
                  <Link to={m.link}>
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </Link>
                </li>
              ) : (
                <li className="z-50">
                  <Link to={m.link}>
                    <div className="tooltip tooltip-right " data-tip={m.label}>
                      {m.icon}
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {getCurrentUser() && (
        <div>
          <div className="px-2">
            <div className="divider" />
          </div>

          {userLoading() ? (
            <p className="text-xs text-center">loading...</p>
          ) : (
            <div
              className={`px-5 flex items-center gap-3 ${
                !store.app.drawerCollapsed ? 'justify-start' : 'justify-center'
              }`}
            >
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {/* <h3 className="text-xl font-bold w-full h-full bg-primary text-white/70 flex justify-center items-center">
                    {getCurrentUser()?.name?.charAt(0)}
                  </h3> */}
                  <div className="text-xl font-bold w-full h-full bg-primary text-white/70 flex justify-center items-center">
                    <PersonOutline className="" />
                  </div>
                </div>
              </div>

              {!store.app.drawerCollapsed && (
                <div className="flex flex-col gap-1">
                  {/* <p>{getCurrentUser().name}</p> */}
                  <p className="text-xs">{getCurrentUser().email}</p>
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      localStorage.clear();
                      window.location.assign('/');
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
