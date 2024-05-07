const drawerWidth = 240;
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const menu = [
  {
    label: 'Home',
    link: '/portal/doctor',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: 'Reports',
    link: '/portal/patient',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: 'Requests',
    link: '/portal/admin',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
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
                <li>
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
