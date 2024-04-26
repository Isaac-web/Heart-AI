// libraries
import { createContext, useState } from "react";
export const AppContext = createContext({});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appContextState] = useState("app context provider works");

  return (
    <AppContext.Provider
      value={{
        appContextState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
