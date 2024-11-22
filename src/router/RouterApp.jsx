import React, { useEffect} from "react"; 
import { Navigate, Route, Routes } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { LoginPage } from "../login/pages/LoginPage";
import { ComprasPage } from "../app/administrativo/compras/ComprasPage";
import { ContabilidadPage } from "../app/administrativo/contabilidad/ContabilidadPage";
import { HabilitaduriaPage } from "../app/administrativo/habilitaduria/HabilitaduriaPage";
import { PresupuestoPage } from "../app/administrativo/presupuesto/PresupuestoPage";
import { DashboardPage } from "../app/dasboard/DashboardPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { RegistroControl } from "../app/administrativo/compras/components/RegistroControl";
import { Administrativo } from "../app/administrativo/Administrativo";
import { Movimientos } from "../app/administrativo/compras/components/Movimientos";
import { Cierres } from "../app/administrativo/compras/components/Cierres";
import { Reportes } from "../app/administrativo/compras/components/Reportes";
import { TablasBasicas } from "../app/administrativo/compras/components/TablasBasicas";
import { PlanCompras } from "../app/administrativo/compras/components/PlanCompras";
import { UsersListPage } from "../app/control/admin_users/UsersListPage";
import { layoutChanged, themeChange } from "../features/ui/UiSlice";
import { VerifyUser } from "../features/auth/LoginThunk";
import { login } from "../features/auth/AuthSlice";
import { LogsPage } from "@/app/control/log/LogsPage";
import { ActuacionPage } from "@/app/personal/expediente/regDatos/actuacion/ActuacionPage";
import { NoAuthPage } from "@/app/layouts/unAuth/NoAuthPage";
import { DatosPersonalesPage } from "@/app/personal/expediente/tablasBasicas/datosPersonales/DatosPersonalesPage";
import { MyAccountConfig } from "@/app/myaccount/MyAccountConfig";
import { PublicRoutes } from "./PublicRoutes";
import { NotFoundPage } from "@/app/layouts/404page/NotFoundPage";

export const RouterApp = () => {
  // Variables iniciales obtenidas del almacenamiento local
  let theme = localStorage.getItem("vite-ui-theme"); // Tema de la interfaz
  let token = localStorage.getItem("token_access"); // Token de autenticación
  let defaultLayout = localStorage.getItem("layoutList"); // Diseño predeterminado

  // Uso del estado global para saber si el usuario está autenticado
  const { Authstatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux

  // Efecto para inicializar configuraciones al cargar el componente
  useEffect(() => {
    // Verifica si existe un layout guardado, si no, lo inicializa
    if (defaultLayout == null || defaultLayout == undefined) {
      localStorage.setItem("layoutList", "list"); // Establece "list" como diseño por defecto
      dispatch(layoutChanged("list")); // Actualiza el estado global del layout
    } else {
      dispatch(layoutChanged(defaultLayout)); // Usa el diseño guardado
    }

    // Verifica si hay un token de autenticación
    if (token != null && token != undefined) {
      dispatch(VerifyUser(token)); // Verifica el token con una acción
    } else {
      // Si no hay token, actualiza el estado de autenticación a "no autenticado"
      dispatch(login({ Authstatus: false, name: "", role: [], token: "" }));
    }

    // Cambia el tema de la aplicación al cargado desde localStorage
    dispatch(themeChange(theme));
  }, []); // El array vacío indica que se ejecuta solo al montar el componente

  return (
    <>
      {/* Definición de las rutas de la aplicación */}
      <Routes>
        {/* Rutas para manejar errores y páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} /> {/* Página 404 */}
        <Route path="/no-encontrada" element={<NotFoundPage />} />
        {/* Rutas públicas: accesibles sin autenticación */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />{" "}
          {/* Página de inicio de sesión */}
        </Route>
        {/* Redirección de la raíz dependiendo del estado de autenticación */}
        <Route
          path="/"
          element={
            Authstatus ? (
              <Navigate to="/inicio" replace /> // Si está autenticado, redirige a /inicio
            ) : (
              <Navigate to="/login" replace /> // Si no, redirige a /login
            )
          }
        />
        {/* Página de acceso no autorizado */}
        <Route path="/no-autorizado" element={<NoAuthPage />} />
        {/* Rutas privadas: solo accesibles con autenticación */}
        <Route element={<ProtectedRoutes />}>
          {/* Página principal del usuario */}
          <Route path="/inicio" element={<DashboardPage />} />
          <Route path="/mi-cuenta" element={<MyAccountConfig />} />

          {/* Módulo administrativo */}
          <Route path="/administrativo" element={<Administrativo />} />
          <Route path="/administrativo/compras" element={<ComprasPage />} />
          <Route
            path="/administrativo/compras/registro-control"
            element={<RegistroControl />}
          />
          <Route
            path="/administrativo/compras/plan-compras"
            element={<PlanCompras />}
          />
          <Route
            path="/administrativo/compras/movimientos"
            element={<Movimientos />}
          />
          <Route path="/administrativo/compras/cierres" element={<Cierres />} />
          <Route
            path="/administrativo/compras/reportes"
            element={<Reportes />}
          />
          <Route
            path="/administrativo/compras/tablas-basicas"
            element={<TablasBasicas />}
          />
          <Route path="/contabilidad" element={<ContabilidadPage />} />
          <Route path="/habilitaduria" element={<HabilitaduriaPage />} />
          <Route path="/presupuesto" element={<PresupuestoPage />} />

          {/* Módulo personal */}
          <Route
            path="/personal/expediente/registro-datos/actuacion"
            element={<ActuacionPage />}
          />
          <Route
            path="/personal/tablas-basicas/datos-personales"
            element={<DatosPersonalesPage />}
          />

          {/* Módulo de control */}
          <Route path="/control/usuarios" element={<UsersListPage />} />
          <Route path="/control/bitacora" element={<LogsPage />} />
        </Route>
      </Routes>
    </>
  );
};
