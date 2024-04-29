//libraries
import { createContext, useState } from "react";
import React from "react";

const AuthContext = createContext({
  auth: { roles: [], user: {} },
  //   setAuth: React.Dispatch<React.SetStateAction<{ roles: string[] }>>,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //   const [auth, setAuth] = useState(
  const [auth] = useState(JSON.parse(localStorage.getItem("auth") || "{}"));

  return (
    // <AuthContext.Provider value={{ auth, setAuth }}>
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
