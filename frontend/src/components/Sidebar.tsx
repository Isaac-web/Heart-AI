import { Link, useLocation } from 'react-router-dom';
import { Dashboard, DocumentScannerTwoTone, Event } from '@mui/icons-material';

const drawerWidth = 70;

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

const Sidebar = () => {
  const location = useLocation();

  const menu = location.pathname.startsWith('/portal/patient')
    ? patientMenu
    : doctorMenu;

  return (
    <aside
      style={{ width: drawerWidth }}
      className={`h-screen  dark:bg-black/50 fixed overflow-hidden border-r border-base-200`}
    >
      <div className="px-3 pt-5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-slate-600" />
        <span className="font-semibold">Heart AI</span>
      </div>

      <div className="px-2">
        <div className="divider" />
      </div>

      <div>
        <ul className="menu  rounded-box">
          {menu.map((m) => (
            <li>
              <Link to={m.link}>{m.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
