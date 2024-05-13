import logo from '../assets/images/heart-ai-logo.png';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.assign('/login');
  };

  const isAuthPage = () => {
    const pathname = location.pathname;
    return pathname === '/login' || pathname === '/register';
  };

  const drawerWidth = 60;

  return (
    <>
      {/* <div
        className="z-20 flex justify-between bg-base-300 h-14 px-10"
        style={{
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <div className=""></div>
        <div className="">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Header;
