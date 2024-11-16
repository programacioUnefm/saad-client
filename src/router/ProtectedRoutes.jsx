import { navbarMenu } from '@/app/layouts/appLayout/components/menuJson';
import { permissionCheck } from '@/features/PermissionCheck';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, Outlet, useLocation } from 'react-router-dom';


export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const auth = useSelector((state) => state.auth);
  const permissionsList = auth.permissions;
  const currentRoute = useLocation().pathname;
  //buscar ruta es una funcion para buscar la ruta en especifico dentro del archivo navbar el cual contien los permisos que se necesitan para poder entrar a dicha ruta
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

  

  //este useMemo se utiliza para memorizar el resulta de la función buscarRuta
  const route = useMemo(
    () => buscarRuta(navbarMenu, currentRoute),
    [currentRoute]
  );
  const navigate = useNavigate();
  // funcion que returna null si esta cargando, false si no tiene permisos y true si tiene permisos
  // esta funcion sirve para ver los privilegios del usuario al entrar a una ruta
  const permissionStatus = permissionCheck(route.permission, permissionsList);

  // este useEffect es para renderizar el componente no autorizado si no posee permisos suficientes el usuario, los permisos están en el archivo navbarMenu el cual es un menú echo como un JSON
  useEffect(() => {
    permissionStatus === false && navigate("/no-autorizado");
  }, [permissionStatus, navigate]);

  if (!auth.Authstatus) {
    return <Navigate to={redirectTo} />;
  }

  // Cuando permissionStatus es true, renderiza el Outlet
  // Outlet es la ruta a la que se está redirigiendo en verdad
  return permissionStatus ? <Outlet /> : null;
};


