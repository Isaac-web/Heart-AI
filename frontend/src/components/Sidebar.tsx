import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard,
  DocumentScannerTwoTone,
  Event,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { useAppStore } from '@/store';

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
];

const patientMenu = [
  {
    label: 'Medical Reports',
    link: '/portal/patient/chatbot',
    icon: <Dashboard />,
  },
  {
    label: 'Appointments',
    link: '/portal/patient/chatbot',
    icon: <Event />,
  },
];

const currentUser = {
  _id: '123',
  name: 'John doe',
  email: 'johndoe@gmail.com',
};

const Sidebar = () => {
  const location = useLocation();
  const store = useAppStore();

  const menu = location.pathname.startsWith('/portal/patient')
    ? patientMenu
    : doctorMenu;

  const handleToggleSidebar = () => {
    if (store.app.drawerCollapsed) {
      store.app.expandDrawer();
    } else {
      store.app.collapseDrawer();
    }
  };

  return (
    <aside
      style={{ width: store.app.drawerWidth }}
      className={`h-screen py-5 dark:bg-black/50 fixed overflow-hidden border-r border-base-200 flex flex-col justify-between`}
    >
      <div>
        <div className="px-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-slate-600" />
          {!store.app.drawerCollapsed && (
            <span className="font-semibold">Heart AI</span>
          )}
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

      <div>
        <div className="px-2">
          <div className="divider" />
        </div>

        <div
          className={`px-5 flex items-center gap-3 ${
            !store.app.drawerCollapsed ? 'justify-start' : 'justify-center'
          }`}
        >
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
              <h3 className="text-xl font-bold w-full h-full bg-primary text-white/70 flex justify-center items-center">
                {currentUser.name.charAt(0)}
              </h3>
            </div>
          </div>

          {!store.app.drawerCollapsed && (
            <div>
              <p>{currentUser.name}</p>
              <p className="text-xs">{currentUser.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
