import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const {user} = useSelector(state => state.auth);
  if (!user.Authstatus) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};
