const drawerWidth = 280;

const PortalContainer = () => {
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
        Rest of portal
      </main>
    </section>
  );
};

export default PortalContainer;
