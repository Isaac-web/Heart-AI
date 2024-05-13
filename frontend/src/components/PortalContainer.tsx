import { Outlet } from 'react-router-dom';

const drawerWidth = 70;

import Header from './Header';
import Sidebar from './Sidebar';

const PortalContainer = () => {
  return (
    <section className="w-full">
      <Sidebar />
      <main
        style={{
          marginLeft: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
        className=""
      >
        <Header />

        <Outlet />
      </main>
    </section>
  );
};

export default PortalContainer;
