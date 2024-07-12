import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navbarMenu } from "../app/layouts/appLayout/components/menuJson.js";
import { permissionCheck } from "@/features/PermissionCheck";

export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const auth = useSelector((state) => state.auth);
  const currentRoute = useLocation().pathname;
  const buscarRuta = (objeto, rutaActual) => {
    let result = null;
    objeto.forEach((element) => {
      if (element.path === rutaActual) {
        result = element;
      }
      if (element.subMenu) {
        const resultSubmenu = buscarRuta(element.subMenu, rutaActual);
        if (resultSubmenu != null) {
          result = resultSubmenu;
        }
      }
    });
    return result;
  };
  const route = buscarRuta(navbarMenu, currentRoute);
  const permissionsList = auth.permissions;
  const result = permissionCheck(route.permission, permissionsList);

  if (!auth.Authstatus) {
    return <Navigate to={redirectTo} />;
  }
  if(result != null && !result){
    return <Navigate to={"no-autorizado"} />;
  }
  if(result == null){ 
    // return <Navigate to={"no-autorizado"} />;
  }else{
    return <Outlet />;
  }

  
};
