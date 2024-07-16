import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navbarMenu } from "../app/layouts/appLayout/components/menuJson.js";
import { permissionCheck } from "@/features/PermissionCheck";
import { dialogChange, resetDialog } from "@/features/ui/UiSlice.js";

export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const auth = useSelector((state) => state.auth);
  const currentRoute = useLocation().pathname;
  const dispatch = useDispatch();
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
  
  if(currentRoute != "/inicio" && currentRoute != "/no-autorizado" && currentRoute != "/"){
    localStorage.setItem("lastUrl", currentRoute)  
  }
  let result = null;
  if (route != null) {
    result = permissionCheck(route.permission, permissionsList);
  }
  if (!auth.Authstatus) {
    dispatch(
      dialogChange({
        title: "Sin autorización",
        message: "Estás intentando entrar a la fuerza en el sistema, esto podrá ser visto por los administradores.",
        status: true,
        duration: 3000,
        variant: "destructive",
      })
    );
    setTimeout(() => {
      dispatch(resetDialog());
    }, 500);
    return <Navigate to={redirectTo} />;
  }
  
  if (result == null) {
    return <Navigate to={"no-autorizado"} />;
    // return <Navigate to={"inicio"} />;
  } else {
    return <Outlet />;
  }
};
