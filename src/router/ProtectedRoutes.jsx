import { navbarMenu } from '@/app/layouts/appLayout/components/menuJson';
import { permissionCheck } from '@/features/PermissionCheck';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Función recursiva para buscar una ruta específica en el menú
  const buscarRuta = (menu, rutaActual) => {
    for (const item of menu) {
      if (item.path === rutaActual) return item;
      if (item.subMenu) {
        const found = buscarRuta(item.subMenu, rutaActual);
        if (found) return found;
      }
    }
    return null;
  };

  

  // Memoriza la ruta actual para evitar cálculos innecesarios
  const currentRoute = useMemo(
    () => buscarRuta(navbarMenu, location.pathname),
    [location.pathname]
  );

  // Verifica el estado de permisos
  const checkPermissionStatus = () => {
    if (!currentRoute) return false; // Si no encuentra la ruta, deniega acceso
    return permissionCheck(currentRoute.permission, auth.permissions);
  };

  const permissionStatus = useMemo(checkPermissionStatus, [currentRoute, auth.permissions]);

  // Redirige si el usuario no tiene permisos suficientes
  useEffect(() => {
    if (permissionStatus == false) navigate("/no-autorizado");
  }, [permissionStatus, navigate]);

  // Si el usuario no está autenticado, redirige al login
  if (!auth.Authstatus) {
    return <Navigate to={redirectTo} />;
  }

  // Renderiza la ruta protegida o nada si no tiene permisos
  return permissionStatus ? <Outlet /> : null;
};
