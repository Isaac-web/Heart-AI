import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import { useAppStore } from '@/store';
import { useEffect } from 'react';

const PortalContainer = () => {
  const store = useAppStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/portal/patient'))
      store.app.collapseDrawer();
  }, []);

  return (
    <section className="w-full">
      <Sidebar />
      <main
        style={{
          marginLeft: `${store.app.drawerWidth}px`,
          width: `calc(100% - ${store.app.drawerWidth}px)`,
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
