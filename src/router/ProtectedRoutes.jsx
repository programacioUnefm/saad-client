import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const auth = useSelector(state => state.auth);
  
  if (!auth.Authstatus) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};
