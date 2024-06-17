import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const token = localStorage.getItem("token_access");
  const { user } = useSelector((state) => state.login);
  if (token == null ) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};
