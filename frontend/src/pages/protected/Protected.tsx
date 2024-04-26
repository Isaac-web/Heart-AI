//libraries
import { Navigate, Outlet, useLocation } from "react-router-dom";

// contexts
// import AdminContextProvider from "@contexts/AdminContext";
// import useAuth from "@/hooks/useAuth";
// import Unauthorized from "@/pages/errors/unauthorized/Unauthorized";

type UserRole = "patient" | "doctor";
type AllowedRoles = UserRole[];

interface ProtectedRoutesProps {
  allowedRoles: AllowedRoles;
  children?: JSX.Element;
}
const ProtectedRoutes = ({ allowedRoles }: ProtectedRoutesProps) => {
  //   const { auth } = useAuth();
  const location = useLocation();

  const auth = { user: { name: "John Doe" }, roles: ["patient"] };

  return auth?.roles?.find((role: UserRole) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <>Unauthorized</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
