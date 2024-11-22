// Importación de dependencias necesarias
import { navbarMenu } from '@/app/layouts/appLayout/components/menuJson';
import { ChargeState } from '@/app/layouts/chargeState/ChargeState'; 
import { NoAuthPage } from '@/app/layouts/unAuth/NoAuthPage'; 
import { permissionCheck } from '@/features/PermissionCheck'; 
import React, { useMemo, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
import IdleJs from 'idle-js'; 
import { LogOutApp } from '@/features/auth/LoginThunk';
import { dialogChange } from '@/features/ui/UiSlice';

export const ProtectedRoutes = ({ redirectTo = "/login" }) => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation(); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); // Hook para redireccionar

  // Función recursiva para buscar la ruta actual dentro del menú de navegación
  const buscarRuta = (menu, rutaActual) => {
    for (const item of menu) {
      if (item.path === rutaActual) return item; // Coincide con la ruta actual
      if (item.subMenu) { // Si hay un submenú, busca dentro de él
        const found = buscarRuta(item.subMenu, rutaActual);
        if (found) return found;
      }
    }
    return null; // Si no encuentra nada, devuelve null
  };

  // Obtiene información de la ruta actual mediante el hook `useMemo` para optimizar el rendimiento
  const currentRoute = useMemo(
    () => buscarRuta(navbarMenu, location.pathname),
    [location.pathname] // Se actualiza cuando cambia la ruta
  );

  // Función para verificar si el usuario tiene permisos para acceder a la ruta actual
  const checkPermissionStatus = () => {
    if (!currentRoute) return false; // Si no existe la ruta, deniega el acceso
    return permissionCheck(currentRoute.permission, auth.permissions); // Verifica los permisos
  };

  // Resultado de los permisos, memoizado para optimizar
  const permissionStatus = useMemo(checkPermissionStatus, [currentRoute, auth.permissions]);
// *** Manejo de inactividad con idle-js ***
useEffect(() => {
  const handleLogout = () => {
    dispatch(LogOutApp()); // Acción para cerrar sesión
    navigate('/login'); // Redirige al usuario a la página de login
  };

  // Configuración de idle-js
  const idle = new IdleJs({
    idle: 5 * 60 * 1000, // Tiempo de inactividad en milisegundos (5 minuto)
    events: ["mousemove", "keydown", "click", "touchstart"], // Eventos que reinician el timer
    onIdle: handleLogout, // Acción cuando el usuario está inactivo
    onActive: () => console.log("Usuario activo nuevamente."), // Opcional: acción cuando el usuario regresa
    keepTracking: true, // Mantener el seguimiento activo continuamente
    startAtIdle: false, // Comienza en estado activo
  });

  idle.start(); // Inicia el seguimiento

  // Limpieza al desmontar el componente
  return () => {
    idle.stop(); // Detiene el seguimiento de inactividad
  };
}, [dispatch, navigate]); // Ejecuta solo al montar el componente, a menos que cambie el dispatcher o navigate
  

  // Renderiza las rutas protegidas o muestra componentes alternativos según el estado de permisos
  return permissionStatus === true ? ( 
    <Outlet /> // Muestra el contenido de la ruta si tiene permisos
  ) : permissionStatus === null ? (
    <ChargeState /> // Muestra estado de carga si los permisos están pendientes
  ) : (
    <NoAuthPage /> // Muestra página de no autorizado si no tiene permisos
  );
};
