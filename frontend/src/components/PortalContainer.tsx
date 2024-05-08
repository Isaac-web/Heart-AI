const drawerWidth = 240;
import { Dashboard, DocumentScannerTwoTone, Event } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const menu = [
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

const PortalContainer = () => {
  return (
    <section className="w-full">
      <aside
        style={{ width: drawerWidth }}
        className={`h-screen  dark:bg-black/50 fixed`}
      >
        <div className="px-3 pt-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-slate-600" />
          <span className="font-semibold">Heart AI</span>
        </div>

        <div className="px-2">
          <div className="divider" />
        </div>

        <div>
          <ul className="menu bg w-full">
            {menu.map((m) => (
              <Link to={m.link}>
                <li className="bg-active">
                  <a>
                    {m.icon}
                    <span>{m.label}</span>
                  </a>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </aside>

      <main
        style={{
          marginLeft: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
        className=""
      >
        <Outlet />
      </main>
    </section>
  );
};

export default PortalContainer;
