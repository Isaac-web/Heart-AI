const drawerWidth = 240;
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const PortalContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <section className="w-full">
      <aside
        style={{ width: drawerWidth }}
        className={`h-screen  dark:bg-blue-950 fixed`}
      >
        Left
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
